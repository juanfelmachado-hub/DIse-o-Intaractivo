/**
 * Las manos del lector, cada cuadro, en coordenadas del mundo.
 *
 * El Quest entrega las articulaciones de cada mano en 3D y en metros (WebXR Hand
 * Input): no hay que estimar profundidad desde una cámara RGB. Lo que sí hay es
 * temblor y pérdidas cortas de seguimiento; esta clase las trata así:
 *
 *  - ESTABILIZACIÓN: cada articulación usada (puntas del pulgar y del índice,
 *    palma, muñeca) pasa por un filtro One Euro (`filters.js`): quieta, la mano
 *    no tiembla; rápida, no se atrasa. La orientación se suaviza con un slerp
 *    cuyo peso crece con la velocidad de giro.
 *  - PINZA con umbrales ADAPTATIVOS (se escalan con el tamaño de la mano: la de
 *    un niño es más chica), HISTÉRESIS (cierra a PINCH_ON, abre a PINCH_OFF) y
 *    CONFIRMACIÓN TEMPORAL: hay que sostener el cierre PINCH_CONFIRM s y la
 *    apertura RELEASE_CONFIRM s. Un parpadeo del tracking no agarra ni suelta.
 *  - ANCLA: mientras la pinza está cerrada, el punto de agarre queda fijo en el
 *    sistema de la muñeca: al abrir los dedos el objeto no se corre ni sale
 *    disparado.
 *  - CONTINUIDAD: si la mano deja de verse, su punto se congela (nada se
 *    teletransporta) y lo agarrado se conserva LOST_GRACE s; si vuelve, el punto
 *    pasa del valor congelado al real en RECOVER s (sin saltos); si no vuelve,
 *    se suelta con velocidad cero.
 *
 * Con controles: el punto de agarre está 5 cm delante de la empuñadura y el
 * botón lateral (squeeze) es la pinza. Todo lo demás (agarrar, tocar, gestos)
 * funciona igual con manos o con controles.
 */
import { Quaternion, Vector3 } from '@iwsdk/core';
import { OneEuro3 } from './filters.js';

/** Umbrales configurables (metros y segundos). */
export const HAND_CFG = {
    /** Pinza para una mano de tamaño de referencia (HAND_REF); se escala con la mano real. */
    PINCH_ON: 0.018,
    PINCH_OFF: 0.04,
    /** Distancia muñeca → nudillo del dedo medio de una mano adulta típica. */
    HAND_REF: 0.085,
    /** Tiempo que debe sostenerse el cierre / la apertura de la pinza. */
    PINCH_CONFIRM: 0.03,
    RELEASE_CONFIRM: 0.05,
    /** One Euro de las articulaciones: corte con la mano quieta (Hz) y aumento con la velocidad. */
    FILTER_MIN_CUTOFF: 1.6,
    FILTER_BETA: 18,
    /** Velocidad suavizada (para lanzar y golpear): constante de tiempo. */
    VEL_TAU: 0.06,
    /** Si una mano deja de verse más de esto, se suelta lo que tenía. */
    LOST_GRACE: 0.35,
    /** Al reaparecer, el punto vuelve del valor congelado al real en este tiempo. */
    RECOVER: 0.2,
};

const SIDES = ['left', 'right'];

class HandState {
    constructor(side) {
        this.side = side;
        this.kind = null; // 'hand' | 'controller' | null
        this.tracked = false;
        this.lostFor = 0;
        this.point = new Vector3(); // punto de agarre: entre pulgar e índice (o frente al control)
        this.quat = new Quaternion(); // orientación de la mano/control
        this.index = new Vector3(); // punta del índice (o punta del control)
        this.palm = new Vector3(); // centro de la palma (o empuñadura)
        this.thumb = new Vector3();
        this.wrist = new Vector3();
        this.vel = new Vector3(); // velocidad suavizada del punto de agarre (m/s)
        this.indexVel = new Vector3();
        this.palmVel = new Vector3();
        this.speed = 0;
        this.size = HAND_CFG.HAND_REF; // tamaño de la mano (m)
        this.pinchDist = 1;
        this.grab = false; // pinza cerrada / botón apretado (confirmado)
        this.grabStart = false;
        this.grabEnd = false;
        this.open = true; // dedos abiertos (pinza bien abierta)
        this._pending = 0; // tiempo acumulado del cambio de pinza sin confirmar
        this._anchor = new Vector3(); // punto de agarre en el sistema de la muñeca
        this._iq = new Quaternion();
        this._rawQ = new Quaternion();
        this._jump = null; // 'next' | 'now': el punto salta al terminar el ancla (no es velocidad)
        this._prev = new Vector3();
        this._prevIndex = new Vector3();
        this._prevPalm = new Vector3();
        this._has = false;
        this._recover = 0;
        this._frozen = new Vector3();
        this._frozenIndex = new Vector3();
        this._frozenPalm = new Vector3();
        this.f = {
            thumb: new OneEuro3(HAND_CFG.FILTER_MIN_CUTOFF, HAND_CFG.FILTER_BETA),
            index: new OneEuro3(HAND_CFG.FILTER_MIN_CUTOFF, HAND_CFG.FILTER_BETA),
            palm: new OneEuro3(HAND_CFG.FILTER_MIN_CUTOFF, HAND_CFG.FILTER_BETA),
            wrist: new OneEuro3(HAND_CFG.FILTER_MIN_CUTOFF, HAND_CFG.FILTER_BETA),
        };
    }

    resetFilters() { for (const k in this.f) this.f[k].reset(); }
}

export class Hands {
    constructor(world) {
        this.world = world;
        this.h = { left: new HandState('left'), right: new HandState('right') };
        this.list = [this.h.left, this.h.right];
        this._q = new Quaternion();
        this._t = new Vector3();
        this._mid = new Vector3();
        this._fwd = new Vector3();
    }

    /** Pose de un espacio XR en el mundo (el rig del jugador puede no estar en el origen). */
    pose(frame, space, ref, outPos, outQuat) {
        const p = space && frame.getPose(space, ref);
        if (!p) return false;
        const t = p.transform;
        outPos.set(t.position.x, t.position.y, t.position.z);
        if (outQuat) outQuat.set(t.orientation.x, t.orientation.y, t.orientation.z, t.orientation.w);
        const m = this.world.player.matrixWorld;
        outPos.applyMatrix4(m);
        if (outQuat) outQuat.premultiply(this._q.setFromRotationMatrix(m));
        return true;
    }

    joint(frame, hand, name, ref, out) {
        const j = hand.get(name);
        const p = j && frame.getJointPose?.(j, ref);
        if (!p) return false;
        const t = p.transform.position;
        out.set(t.x, t.y, t.z).applyMatrix4(this.world.player.matrixWorld);
        return true;
    }

    /** Cambio de pinza con confirmación temporal: devuelve el nuevo estado confirmado. */
    confirm(s, want, dt) {
        if (want === s.grab) { s._pending = 0; return s.grab; }
        s._pending += dt;
        const need = want ? HAND_CFG.PINCH_CONFIRM : HAND_CFG.RELEASE_CONFIRM;
        if (s._pending + 1e-6 >= need) { s._pending = 0; return want; }
        return s.grab;
    }

    readHand(frame, src, ref, s, dt) {
        const okT = this.joint(frame, src.hand, 'thumb-tip', ref, s.thumb);
        const okI = this.joint(frame, src.hand, 'index-finger-tip', ref, s.index);
        if (!okT || !okI) return false;
        const okW = this.pose(frame, src.hand.get('wrist'), ref, s.wrist, s._rawQ);
        if (!this.joint(frame, src.hand, 'middle-finger-metacarpal', ref, s.palm)) s.palm.copy(s.wrist);
        // tamaño de la mano: muñeca → nudillo medio (aprox. ×1,6 desde el metacarpo)
        if (okW && this.joint(frame, src.hand, 'middle-finger-phalanx-proximal', ref, this._t)) {
            s.size += (s.wrist.distanceTo(this._t) - s.size) * Math.min(1, dt * 2);
        }
        // estabilización
        s.f.thumb.filter(s.thumb, dt);
        s.f.index.filter(s.index, dt);
        s.f.palm.filter(s.palm, dt);
        s.f.wrist.filter(s.wrist, dt);
        if (okW) {
            // slerp adaptativo: girar rápido sigue al instante, quieto no tiembla
            const ang = s.quat.angleTo(s._rawQ);
            const a = s._has ? Math.min(1, 0.25 + ang * 6) : 1;
            s.quat.slerp(s._rawQ, a);
        }

        const scale = Math.max(0.7, Math.min(1.25, s.size / HAND_CFG.HAND_REF));
        s.pinchDist = s.thumb.distanceTo(s.index);
        s.point.copy(s.thumb).add(s.index).multiplyScalar(0.5);
        s.kind = 'hand';
        const was = s.grab;
        const want = was ? s.pinchDist < HAND_CFG.PINCH_OFF * scale : s.pinchDist < HAND_CFG.PINCH_ON * scale;
        s.grab = this.confirm(s, want, dt);
        s.open = s.pinchDist > HAND_CFG.PINCH_OFF * scale * 1.4;
        s.grabStart = s.grab && !was;
        s.grabEnd = !s.grab && was;
        if (s.grabStart) {
            // ancla: el punto de agarre en el sistema de la muñeca
            s._anchor.copy(s.point).sub(s.wrist).applyQuaternion(s._iq.copy(s.quat).invert());
        }
        if (s.grab || s.grabEnd) {
            // el cuadro en que se suelta también usa el ancla (se suelta donde estaba)
            s.point.copy(s._anchor).applyQuaternion(s.quat).add(s.wrist);
        }
        if (s.grabEnd) s._jump = 'next'; // el cuadro siguiente vuelve al punto real
        return true;
    }

    readController(frame, src, ref, s) {
        if (!this.pose(frame, src.gripSpace, ref, s.palm, s.quat)) return false;
        s.wrist.copy(s.palm);
        // punto de agarre 5 cm delante de la empuñadura; "índice" = punta del control
        this._fwd.set(0, -0.02, -0.05).applyQuaternion(s.quat);
        s.point.copy(s.palm).add(this._fwd);
        this._fwd.set(0, -0.03, -0.08).applyQuaternion(s.quat);
        s.index.copy(s.palm).add(this._fwd);
        s.thumb.copy(s.point);
        const b = src.gamepad?.buttons;
        const pressed = !!(b?.[1]?.pressed);
        s.kind = 'controller';
        const was = s.grab;
        s.grab = pressed;
        s.open = !pressed;
        s.grabStart = s.grab && !was;
        s.grabEnd = !s.grab && was;
        s.pinchDist = s.grab ? 0 : 1;
        return true;
    }

    update(dt) {
        const xr = this.world.renderer.xr;
        const frame = xr.isPresenting ? xr.getFrame() : null;
        const ref = frame ? xr.getReferenceSpace() : null;
        const seen = { left: false, right: false };
        if (frame && ref) {
            for (const src of frame.session.inputSources) {
                const s = this.h[src.handedness];
                if (!s) continue;
                const kind0 = s.kind;
                if (src.hand ? this.readHand(frame, src, ref, s, dt) : this.readController(frame, src, ref, s)) {
                    seen[src.handedness] = true;
                    // cambió la fuente (mano ↔ control): el punto salta, pero no es un movimiento
                    if (s._has && kind0 && kind0 !== s.kind) s._switched = true;
                }
            }
        }
        const a = 1 - Math.exp(-Math.max(dt, 1e-4) / HAND_CFG.VEL_TAU);
        for (const side of SIDES) {
            const s = this.h[side];
            if (seen[side]) {
                if (s.lostFor > 0 && s._has) {
                    // reaparece: se parte del punto congelado (sin salto) y se llega al real en RECOVER s
                    s._recover = 1;
                    s._jump = 'now';
                }
                s.lostFor = 0;
                s.tracked = true;
                if (s._switched) {
                    // lo que tenía la mano anterior se suelta sin lanzarlo
                    s._switched = false;
                    s._recover = 0;
                    s._jump = 'now';
                    s.vel.set(0, 0, 0);
                    s.indexVel.set(0, 0, 0);
                    s.palmVel.set(0, 0, 0);
                }
                if (s._recover > 0) {
                    s._recover = Math.max(0, s._recover - dt / HAND_CFG.RECOVER);
                    const r = s._recover * s._recover;
                    s.point.lerp(s._frozen, r);
                    s.index.lerp(s._frozenIndex, r);
                    s.palm.lerp(s._frozenPalm, r);
                }
                if (s._jump === 'now') {
                    s._jump = null; // salto del punto (fin del ancla o reaparición): no es un movimiento
                } else if (s._has && dt > 0) {
                    this._t.copy(s.point).sub(s._prev).divideScalar(dt);
                    s.vel.lerp(this._t, a);
                    this._t.copy(s.index).sub(s._prevIndex).divideScalar(dt);
                    s.indexVel.lerp(this._t, a);
                    this._t.copy(s.palm).sub(s._prevPalm).divideScalar(dt);
                    s.palmVel.lerp(this._t, a);
                }
                if (s._jump === 'next') s._jump = 'now';
                s.speed = s.vel.length();
                s._prev.copy(s.point);
                s._prevIndex.copy(s.index);
                s._prevPalm.copy(s.palm);
                if (s._recover <= 0) {
                    s._frozen.copy(s.point);
                    s._frozenIndex.copy(s.index);
                    s._frozenPalm.copy(s.palm);
                }
                s._has = true;
            } else {
                s.lostFor += dt;
                s.grabStart = false;
                // congelada: el punto se queda donde estaba (nada se teletransporta)
                s.point.copy(s._frozen);
                s.index.copy(s._frozenIndex);
                s.palm.copy(s._frozenPalm);
                s.vel.multiplyScalar(Math.max(0, 1 - dt * 12));
                s.indexVel.set(0, 0, 0);
                s.palmVel.set(0, 0, 0);
                s.speed = s.vel.length();
                if (s.tracked && s.lostFor > HAND_CFG.LOST_GRACE) {
                    // pérdida larga: se suelta de forma controlada (sin velocidad)
                    s.tracked = false;
                    s.grabEnd = s.grab;
                    s.grab = false;
                    s._has = false;
                    s._pending = 0;
                    s.vel.set(0, 0, 0);
                    s.speed = 0;
                    s.resetFilters();
                } else s.grabEnd = false;
            }
        }
    }
}

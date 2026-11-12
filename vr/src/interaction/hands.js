/**
 * Las manos del lector, cada cuadro, en coordenadas del mundo.
 *
 * Lee las articulaciones reales del hand tracking de WebXR (punta del pulgar,
 * punta del índice, muñeca y centro de la palma). Si una mano usa control,
 * usa la empuñadura del control: el botón lateral (squeeze) es el "agarre" y
 * el gatillo también vale. Así todo lo demás (agarrar, tocar, gestos) funciona
 * igual con manos o con controles.
 *
 * Pinza con histéresis: se cierra a menos de PINCH_ON entre las puntas del
 * pulgar y el índice y solo se abre por encima de PINCH_OFF, así no oscila.
 *
 * Mientras la pinza está cerrada, el punto de agarre queda ANCLADO a la muñeca
 * (donde estaba al cerrarla): al abrir los dedos para soltar, el punto medio
 * entre pulgar e índice se corre varios centímetros; sin el ancla, el objeto
 * se arrastraría y saldría lanzado justo al soltarlo.
 */
import { Quaternion, Vector3 } from '@iwsdk/core';

/** Umbrales configurables (metros y segundos). */
export const HAND_CFG = {
    PINCH_ON: 0.018,
    PINCH_OFF: 0.04,
    /** Velocidad suavizada: constante de tiempo. */
    VEL_TAU: 0.06,
    /** Si una mano deja de verse más de esto, se suelta lo que tenía (pérdida de tracking). */
    LOST_GRACE: 0.25,
};

const SIDES = ['left', 'right'];
const JOINTS = ['thumb-tip', 'index-finger-tip', 'wrist', 'middle-finger-metacarpal', 'index-finger-metacarpal'];

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
        this._anchor = new Vector3(); // punto de agarre en el sistema de la muñeca
        this._iq = new Quaternion();
        this._jump = null; // 'next' | 'now': el punto salta al terminar el ancla (no es velocidad)
        this.vel = new Vector3(); // velocidad suavizada del punto de agarre (m/s)
        this.indexVel = new Vector3();
        this.speed = 0;
        this.pinchDist = 1;
        this.grab = false; // pinza cerrada / botón apretado
        this.grabStart = false;
        this.grabEnd = false;
        this._prev = new Vector3();
        this._prevIndex = new Vector3();
        this._has = false;
    }
}

export class Hands {
    constructor(world) {
        this.world = world;
        this.h = { left: new HandState('left'), right: new HandState('right') };
        this.list = [this.h.left, this.h.right];
        this._m = new Vector3();
        this._q = new Quaternion();
        this._s = new Vector3();
        this._t = new Vector3();
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

    update(dt) {
        const xr = this.world.renderer.xr;
        const frame = xr.isPresenting ? xr.getFrame() : null;
        const ref = frame ? xr.getReferenceSpace() : null;
        const seen = { left: false, right: false };
        if (frame && ref) {
            for (const src of frame.session.inputSources) {
                const s = this.h[src.handedness];
                if (!s) continue;
                if (src.hand) {
                    const okT = this.joint(frame, src.hand, 'thumb-tip', ref, s.thumb);
                    const okI = this.joint(frame, src.hand, 'index-finger-tip', ref, s.index);
                    if (!okT || !okI) continue;
                    if (!this.joint(frame, src.hand, 'middle-finger-metacarpal', ref, s.palm)) this.joint(frame, src.hand, 'wrist', ref, s.palm);
                    this.pose(frame, src.hand.get('wrist'), ref, s.wrist, s.quat);
                    s.pinchDist = s.thumb.distanceTo(s.index);
                    s.point.copy(s.thumb).add(s.index).multiplyScalar(0.5);
                    s.kind = 'hand';
                    const was = s.grab;
                    s.grab = was ? s.pinchDist < HAND_CFG.PINCH_OFF : s.pinchDist < HAND_CFG.PINCH_ON;
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
                } else {
                    if (!this.pose(frame, src.gripSpace, ref, s.palm, s.quat)) continue;
                    // punto de agarre 4 cm delante de la empuñadura; "índice" = punta del control
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
                    s.grabStart = s.grab && !was;
                    s.grabEnd = !s.grab && was;
                    s.pinchDist = s.grab ? 0 : 1;
                }
                seen[src.handedness] = true;
            }
        }
        const a = 1 - Math.exp(-Math.max(dt, 1e-4) / HAND_CFG.VEL_TAU);
        for (const side of SIDES) {
            const s = this.h[side];
            if (seen[side]) {
                s.lostFor = 0;
                s.tracked = true;
                if (s._jump === 'now') {
                    s._jump = null; // vuelve al punto real tras soltar: no es un movimiento
                } else if (s._has && dt > 0) {
                    this._t.copy(s.point).sub(s._prev).divideScalar(dt);
                    s.vel.lerp(this._t, a);
                    this._t.copy(s.index).sub(s._prevIndex).divideScalar(dt);
                    s.indexVel.lerp(this._t, a);
                }
                if (s._jump === 'next') s._jump = 'now';
                s.speed = s.vel.length();
                s._prev.copy(s.point);
                s._prevIndex.copy(s.index);
                s._has = true;
            } else {
                s.lostFor += dt;
                s.grabStart = false;
                if (s.tracked && s.lostFor > HAND_CFG.LOST_GRACE) {
                    // pérdida de tracking: se suelta con seguridad
                    s.tracked = false;
                    s.grabEnd = s.grab;
                    s.grab = false;
                    s._has = false;
                    s.vel.set(0, 0, 0);
                    s.indexVel.set(0, 0, 0);
                    s.speed = 0;
                } else s.grabEnd = false;
            }
        }
    }
}

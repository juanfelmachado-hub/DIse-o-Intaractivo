/**
 * ReactionSystem — Nico y el Guardián reaccionan a las manos.
 *
 * Contactos reales entre las puntas de los dedos (y la palma) y la forma
 * ajustada de cada personaje (interaction/shapes). Cada contacto se clasifica:
 *
 *   caricia   contacto lento y sostenido, moviendo la mano (sobre todo en la cabeza)
 *   toque     contacto breve
 *   empujón   contacto sostenido que avanza hacia el personaje
 *   golpe     contacto que llega más rápido que HIT_SPEED
 *   agarre    pinza cerca del cuerpo (lo maneja HandInteractionSystem)
 *
 * Guardián (procedural, sin físicas pesadas): squash & stretch en el cuerpo;
 * la flor (el hueso de la cabeza) se balancea con inercia; se ilumina o gira
 * según la emoción. Se mueve LIBRE por la habitación, también fuera del libro:
 *  - se agarra con la pinza y se lleva a cualquier lado (lo persigue un resorte);
 *  - al soltarlo (o tras un golpe fuerte) flota donde quedó, frenado por el aire,
 *    durante STAY s (estado LIBRE); después vuelve solo, despacio, junto a Nico
 *    (VOLVIENDO), porque la historia lo necesita cerca;
 *  - un toque o un empujón suave lo desplaza un poco y el resorte lo devuelve;
 *  - nunca atraviesa la página ni el piso real (interaction/surfaces).
 *
 * Nico: sonríe y da un saltito con una caricia en la cabeza; se sorprende con
 * un toque o un golpe. Lo que pasa al levantarlo está en HandInteractionSystem.
 *
 * Máquina de estados por personaje: IDLE (movimiento autónomo) → OBSERVANDO
 * (la mano se acerca) → SORPRESA → REACCIÓN → RECUPERACIÓN → IDLE; el
 * Guardián además: AGARRADO (control del usuario) → LIBRE → VOLVIENDO → IDLE. Con tiempos de enfriamiento para no repetir la misma
 * reacción. Todo se suma como capa (interaction/layers): nunca cancela un
 * diálogo ni una animación de la historia.
 */
import { createSystem, Euler, Quaternion, Vector3, VisibilityState } from '@iwsdk/core';
import gsap from 'gsap';
import { OffsetLayer } from '../interaction/layers.js';
import { boundRadius, distanceToBox, fitLocalBox } from '../interaction/shapes.js';
import { groundAt } from '../interaction/surfaces.js';

export const REACT_CFG = {
    CONTACT: 0.01, // dedo a menos de 1 cm de la superficie = contacto
    PALM_CONTACT: 0.02,
    HIT_SPEED: 0.8, // m/s
    PUSH_SPEED: 0.12,
    PET_TIME: 0.45,
    PET_TRAVEL: 0.02, // la mano recorrió 2 cm acariciando
    COOLDOWN: 1.2,
    // resorte del Guardián (metros reales)
    K: 38,
    DAMP: 6.5,
    K_THROWN: 9,
    /** Guardián suelto: tiempo que se queda donde lo dejaron antes de volver (s). */
    STAY: 6,
    /** Resorte suave del regreso autónomo. */
    K_HOME: 4,
    DAMP_HOME: 4,
    /** Freno del aire mientras flota libre (1/s). */
    AIR: 1.6,
    /** Distancia máxima a su sitio (m): solo para no perderlo en la habitación. */
    FREE_MAX: 2.5,
};

/** Tamaño máximo creíble del Guardián (m): una medida mayor es un error de medición. */
const GUARDIAN_MAX = 0.5;
const STATES = ['IDLE', 'OBSERVANDO', 'AGARRADO', 'SORPRESA', 'REACCION', 'RECUPERACION', 'LIBRE', 'VOLVIENDO'];

class Character {
    constructor(name) {
        this.name = name;
        this.state = 'IDLE';
        this.timer = 0;
        this.cool = {};
        this.contact = { left: null, right: null };
    }
    set(state, time = 0) {
        this.state = state;
        this.timer = time;
    }
    ready(kind) {
        return !(this.cool[kind] > 0);
    }
    use(kind, t = REACT_CFG.COOLDOWN) {
        this.cool[kind] = t;
    }
    tick(dt) {
        for (const k in this.cool) this.cool[k] -= dt;
        if (this.timer > 0) {
            this.timer -= dt;
            if (this.timer <= 0) {
                const next = { SORPRESA: 'REACCION', REACCION: 'RECUPERACION', RECUPERACION: 'IDLE', OBSERVANDO: 'IDLE' };
                this.set(next[this.state] ?? 'IDLE', this.state === 'SORPRESA' ? 0.4 : this.state === 'REACCION' ? 0.6 : 0);
            }
        }
    }
}

export class ReactionSystem extends createSystem({}) {
    init() {
        this.v = new Vector3();
        this.w = new Vector3();
        this.n = new Vector3();
        this.base = new Vector3();
        this.q = new Quaternion();
        this.axis = new Vector3();
        this.eul = new Euler();
        this.g = null; // Guardián actual
        this.nico = null;
        this.gc = new Character('guardian');
        this.nc = new Character('nico');
        this.off = new Vector3(); // desplazamiento del Guardián (m, mundo)
        this.vel = new Vector3();
        this.squash = 0;
        this.squashV = 0;
        this.spin = 0;
        this.spinV = 0;
        this.sway = new Vector3(); // flor: ángulo (x, z) y su velocidad
        this.swayV = new Vector3();
        this.prevBase = new Vector3();
        this.baseVel = new Vector3();
        this.thrown = 0;
        this.free = 0; // tiempo que le queda suelto donde lo dejaron
        this.held = null;
        this.world.globals.reactions = { guardian: this.gc, nico: this.nc, STATES, resetGuardian: () => this.resetGuardian() };
    }

    // ------------------------------------------------------------ personajes de la escena actual
    attach(c) {
        const scene = c.story.scene;
        const g = scene?.guardian ?? null;
        if (g !== this.g) {
            if (this.gLayer) c.layers.remove(this.gLayer);
            if (this.flowerLayer) c.layers.remove(this.flowerLayer);
            if (this.gItem) this.world.globals.interact.remove(this.gItem);
            this.gLayer = this.flowerLayer = this.gItem = null;
            this.g = g;
            this.off.set(0, 0, 0);
            this.vel.set(0, 0, 0);
            this.free = 0;
            this.lastBase = null;
            this.gBox = null;
            if (g) {
                this.gLayer = c.layers.add(new OffsetLayer(g));
                const head = Object.values(g.bones ?? {}).find((b) => /Head$/i.test(b.name));
                if (head) this.flowerLayer = c.layers.add(new OffsetLayer(head));
            }
        }
        // su forma se mide cuando ya apareció del todo (al aparecer crece desde cero)
        if (g && !this.gItem && g.visible && g.presence > 0.9 && g.appearT >= 1) {
            this.gBox = this.measureGuardian(g);
            if (this.gBox) {
                this.gBoxAge = 0;
                this.gItem = this.world.globals.interact.add({
                    object: g,
                    box: this.gBox,
                    kind: 'guardian',
                    priority: 0, // Nico y los objetos de los juegos van primero si se tocan a la vez
                    enabled: () => g.visible && g.presence > 0.6,
                    onGrab: (hand) => this.grabGuardian(hand),
                    onHold: (hand) => this.holdGuardian(hand),
                    onRelease: (hand) => this.releaseGuardian(hand),
                });
            }
        }
        const nico = scene?.nico ?? null;
        if (nico !== this.nico) {
            this.nico = nico;
            this.nBox = null;
            this.nBoxAge = 0;
        }
    }

    /**
     * Caja del Guardián ajustada a su malla en la pose actual. Su cuerpo es una malla
     * con esqueleto (Mixamo, en centímetros): si se mide antes de que el esqueleto se
     * actualice sale ~75 veces más grande (medido: 7,9 m en vez de 8 cm). Una medida
     * absurda (> GUARDIAN_MAX m) se descarta y se reintenta.
     */
    measureGuardian(g) {
        const b = fitLocalBox(g);
        if (b.isEmpty()) return null;
        const size = b.getSize(this._gs ??= new Vector3()).multiplyScalar(g.getWorldScale(this._gw ??= new Vector3()).x);
        if (Math.max(size.x, size.y, size.z) > GUARDIAN_MAX) return null;
        return b;
    }

    /** Se vuelve a medir cada segundo (su animación cambia la silueta). */
    refitGuardian(dt) {
        if (!this.gItem || this.held) return;
        this.gBoxAge = (this.gBoxAge ?? 0) + dt;
        if (this.gBoxAge < 1) return;
        this.gBoxAge = 0;
        const b = this.measureGuardian(this.g);
        if (!b) return;
        this.gBox.copy(b);
        this.gItem.radius = boundRadius(this.g, this.gBox);
    }

    // ------------------------------------------------------------ Guardián: agarrar y lanzar
    grabGuardian(hand) {
        this.held = hand;
        this.grabOff = this.w.copy(this.gWorld()).sub(hand.point).clone();
        this.gc.set('AGARRADO', 0); // control del usuario: sigue a la mano
        this.g.glow = Math.max(this.g.glow, 1.4);
    }

    holdGuardian(hand) {
        // la posición deseada sigue a la mano; el resorte la persigue (sin saltos)
        this.heldTarget = (this.heldTarget ?? new Vector3()).copy(hand.point).add(this.grabOff);
    }

    releaseGuardian(hand) {
        this.held = null;
        this.vel.copy(hand.vel).multiplyScalar(0.8);
        if (this.vel.length() > 1.5) this.vel.setLength(1.5);
        // se queda flotando donde lo dejaron (o adonde lo lanzaron); después vuelve solo
        this.free = REACT_CFG.STAY;
        this.gc.set('LIBRE', 0);
    }

    /** Media altura del Guardián (m): su origen está en el centro del cuerpo. */
    halfHeight(g) {
        if (!this.gBox) return 0.04;
        const s = g.getWorldScale(this.n).x;
        return Math.max(0.01, -this.gBox.min.y * s);
    }

    /** Botón «Reiniciar»: vuelve a su sitio, quieto. */
    resetGuardian() {
        if (this.held && this.gItem) {
            this.held = null;
            this.gItem.busy = false; // la mano lo suelta (sin lanzarlo)
        }
        this.free = 0;
        this.thrown = 0;
        this.vel.set(0, 0, 0);
        this.spinV = 0;
        this.swayV.set(0, 0, 0);
        gsap.to(this.off, { x: 0, y: 0, z: 0, duration: 0.6, ease: 'power2.inOut' });
        this.gc.set('VOLVIENDO', 0);
    }

    gWorld() {
        return this.g.getWorldPosition(this.v);
    }

    // ------------------------------------------------------------ contactos
    /** Contacto de una mano con un personaje: devuelve { d, normal, speed, point } o null. */
    probe(obj, box, hand, out) {
        let d = distanceToBox(obj, box, hand.index, this.w);
        let src = hand.index;
        let speed = hand.indexVel.length();
        let lim = REACT_CFG.CONTACT;
        if (d > lim) {
            const dp = distanceToBox(obj, box, hand.palm, this.w);
            if (dp > REACT_CFG.PALM_CONTACT) return null;
            d = dp;
            src = hand.palm;
            speed = hand.vel.length();
            lim = REACT_CFG.PALM_CONTACT;
        }
        out.d = d;
        out.lim = lim;
        out.speed = speed;
        out.point = src;
        out.vel = src === hand.index ? hand.indexVel : hand.vel;
        return out;
    }

    guardianContacts(dt, c, hands) {
        const g = this.g;
        if (!g.visible || g.presence < 0.6 || !this.gItem) return;
        const gc = this.gc;
        for (const hand of hands.list) {
            const side = hand.side;
            if (!hand.tracked || (this.held === hand)) { gc.contact[side] = null; continue; }
            const p = this.probe(g, this.gBox, hand, this._c ??= {});
            const prev = gc.contact[side];
            if (!p) {
                if (prev && prev.time < 0.3 && !prev.hit && gc.ready('toque')) {
                    // TOQUE: se comprime un poquito y recupera su forma
                    gc.use('toque', 0.6);
                    this.squashV -= 6;
                    gc.set('SORPRESA', 0.25);
                }
                gc.contact[side] = null;
                continue;
            }
            const center = this.gWorld();
            this.n.copy(center).sub(p.point);
            if (this.n.lengthSq() < 1e-8) this.n.set(0, 1, 0);
            this.n.normalize();
            if (!prev) {
                gc.contact[side] = { time: 0, travel: 0, hit: false };
                if (p.speed > REACT_CFG.HIT_SPEED && gc.ready('golpe')) {
                    // GOLPE: sale impulsado según la fuerza, gira y se balancea
                    gc.use('golpe', 1.5);
                    gc.contact[side].hit = true;
                    this.vel.addScaledVector(p.vel, 0.7);
                    if (this.vel.length() > 1.5) this.vel.setLength(1.5);
                    this.spinV += (Math.random() < 0.5 ? -1 : 1) * Math.min(14, p.speed * 9);
                    this.squashV -= 10;
                    this.swayV.x += p.vel.z * 9;
                    this.swayV.z -= p.vel.x * 9;
                    // golpe fuerte: sale despedido y flota un rato antes de volver
                    if (p.speed > REACT_CFG.HIT_SPEED * 1.6) this.free = Math.max(this.free, REACT_CFG.STAY * 0.5);
                    else this.thrown = 1.2;
                    g.glow = Math.max(g.glow, 2);
                    gc.set('SORPRESA', 0.35);
                }
                continue;
            }
            prev.time += dt;
            prev.travel += p.vel.length() * dt;
            // EMPUJÓN: el dedo entra en el cuerpo → el Guardián se aparta en esa dirección
            const pen = p.lim - p.d;
            if (pen > 0 && p.speed > REACT_CFG.PUSH_SPEED * 0.5) {
                this.off.addScaledVector(this.n, pen * 0.9);
                this.vel.addScaledVector(this.n, Math.min(0.6, p.vel.dot(this.n) > 0 ? p.vel.dot(this.n) : 0) * 0.3);
                if (gc.ready('empujon') && p.speed > REACT_CFG.PUSH_SPEED) {
                    gc.use('empujon', 1);
                    gc.set('SORPRESA', 0.3);
                    this.swayV.x += p.vel.z * 4;
                    this.swayV.z -= p.vel.x * 4;
                }
            }
            // CARICIA: lenta, sostenida y moviendo la mano
            if (p.speed < 0.25 && prev.time > REACT_CFG.PET_TIME && prev.travel > REACT_CFG.PET_TRAVEL && gc.ready('caricia')) {
                gc.use('caricia', 2.5);
                gc.set('REACCION', 0.8);
                g.glow = Math.max(g.glow, 2.2);
                gsap.timeline().to(this, { squash: 0.18, duration: 0.15, ease: 'power2.out' }).to(this, { squash: 0, duration: 0.7, ease: 'elastic.out(1, 0.35)' });
                this.vel.y += 0.25; // pequeños saltitos de felicidad
            }
        }
    }

    nicoContacts(dt, c, hands) {
        const nico = this.nico;
        if (!nico?.visible || c.pointer.drag?.object === nico) return;
        const nm = this.world.globals.nico?.mode;
        if (nm === 'held' || nm === 'falling' || nm === 'returning') return; // NicoSystem lo tiene en la mano o en el aire
        this.nBoxAge -= dt;
        if (!this.nBox || this.nBoxAge <= 0) {
            this.nBox = fitLocalBox(nico, (m) => !m.isSprite);
            this.nBoxAge = 0.6; // la pose cambia: se reajusta
        }
        const box = this.nBox;
        const headY = box.min.y + (box.max.y - box.min.y) * 0.68;
        const nc = this.nc;
        for (const hand of hands.list) {
            const side = hand.side;
            if (!hand.tracked || hand.grab) { nc.contact[side] = null; continue; }
            const p = this.probe(nico, box, hand, this._n ??= {});
            const prev = nc.contact[side];
            if (!p) {
                if (prev && prev.time < 0.3 && nc.ready('toque')) {
                    nc.use('toque', 2);
                    nico.face('o');
                    gsap.delayedCall(0.7, () => nico.face('smile'));
                    nc.set('SORPRESA', 0.5);
                }
                nc.contact[side] = null;
                continue;
            }
            if (!prev) {
                nc.contact[side] = { time: 0, travel: 0 };
                if (p.speed > REACT_CFG.HIT_SPEED && nc.ready('golpe')) {
                    nc.use('golpe', 2.5);
                    nico.face('o');
                    gsap.delayedCall(1, () => nico.face('smile'));
                    nc.set('SORPRESA', 0.6);
                }
                continue;
            }
            prev.time += dt;
            prev.travel += p.vel.length() * dt;
            const onHead = nico.worldToLocal(this.w.copy(p.point)).y > headY;
            if (onHead && p.speed < 0.25 && prev.time > REACT_CFG.PET_TIME && prev.travel > REACT_CFG.PET_TRAVEL && nc.ready('caricia')) {
                // CARICIA en la cabeza: sonrisa, corazón que brilla y un saltito
                nc.use('caricia', 3);
                nc.set('REACCION', 1);
                nico.face('smile');
                gsap.timeline().to(nico, { heartGlow: 0.9, duration: 0.2 }).to(nico, { heartGlow: 0, duration: 0.8 });
                if (!c.story.activity) nico.hop();
            }
        }
    }

    // ------------------------------------------------------------ dinámica del Guardián
    guardianDynamics(dt, c) {
        const g = this.g;
        // posición base (sin la capa) para limitarlo dentro de la maqueta
        this.gLayer.undo();
        g.getWorldPosition(this.base);
        this.gLayer.apply();
        // suelto, se queda quieto en la habitación aunque su sitio (junto a Nico) se mueva
        if (this.lastBase && this.free > 0) this.off.sub(this.n.copy(this.base).sub(this.lastBase));
        (this.lastBase ??= new Vector3()).copy(this.base);

        if (this.held) {
            // el resorte persigue la mano (rápido) y se estira un poco en la dirección del movimiento
            const want = this.w.copy(this.heldTarget ?? this.base).sub(this.base);
            this.vel.copy(want).sub(this.off).multiplyScalar(14);
            this.off.lerp(want, Math.min(1, dt * 16));
            this.squash += ((-Math.min(0.2, this.held.speed * 0.25)) - this.squash) * Math.min(1, dt * 10);
        } else if (this.free > 0) {
            // LIBRE: flota donde quedó, frenado por el aire, con un vaivén suave
            this.free -= dt;
            // tras la reacción a un golpe fuerte, el estado pasa a LIBRE mientras flota
            if (this.gc.state === 'IDLE' || this.gc.state === 'RECUPERACION') this.gc.set('LIBRE', 0);
            this.vel.multiplyScalar(Math.max(0, 1 - REACT_CFG.AIR * dt));
            this.vel.y += Math.sin(performance.now() / 600) * 0.02 * dt;
            this.off.addScaledVector(this.vel, dt);
            if (this.free <= 0) this.gc.set('VOLVIENDO', 0);
            this.squashV += (-90 * this.squash - 9 * this.squashV) * dt;
            this.squash += this.squashV * dt;
        } else {
            const home = this.gc.state === 'VOLVIENDO';
            const K = home ? REACT_CFG.K_HOME : this.thrown > 0 ? REACT_CFG.K_THROWN : REACT_CFG.K;
            const D = home ? REACT_CFG.DAMP_HOME : this.thrown > 0 ? 2.4 : REACT_CFG.DAMP;
            this.vel.addScaledVector(this.off, -K * dt).multiplyScalar(Math.max(0, 1 - D * dt));
            this.off.addScaledVector(this.vel, dt);
            if (home && this.off.length() < 0.01) this.gc.set('IDLE', 0);
            this.thrown = Math.max(0, this.thrown - dt);
            // squash & stretch: otro resorte
            this.squashV += (-90 * this.squash - 9 * this.squashV) * dt;
            this.squash += this.squashV * dt;
        }
        if (this.off.length() > REACT_CFG.FREE_MAX) this.off.setLength(REACT_CFG.FREE_MAX);

        // libre por la habitación, pero nunca atraviesa la página ni el piso real
        this.w.copy(this.base).add(this.off);
        const floor = groundAt(c, this.w) + this.halfHeight(g) + 0.005;
        if (this.w.y < floor) {
            this.off.y += floor - this.w.y;
            if (this.vel.y < 0) this.vel.y = -this.vel.y * 0.3; // rebote suave
            this.vel.x *= 0.85;
            this.vel.z *= 0.85;
        }

        // giro por golpe
        this.spinV += (-30 * this.spin - 5 * this.spinV) * dt;
        this.spin += this.spinV * dt;
        // flor con inercia: responde a la aceleración del cuerpo
        this.baseVel.copy(this.base).add(this.off).sub(this.prevBase).divideScalar(Math.max(dt, 1e-3));
        this.prevBase.copy(this.base).add(this.off);
        this.swayV.x += (-60 * this.sway.x - 4 * this.swayV.x) * dt - this.baseVel.z * 0.08 * (dt > 0 ? 1 : 0);
        this.swayV.z += (-60 * this.sway.z - 4 * this.swayV.z) * dt + this.baseVel.x * 0.08 * (dt > 0 ? 1 : 0);
        this.sway.addScaledVector(this.swayV, dt);
        this.sway.x = Math.max(-0.6, Math.min(0.6, this.sway.x));
        this.sway.z = Math.max(-0.6, Math.min(0.6, this.sway.z));

        // escribir la capa: desplazamiento en el sistema del padre del Guardián
        const L = this.gLayer;
        const parent = g.parent;
        parent.getWorldQuaternion(this.q).invert();
        const ps = parent.getWorldScale(this.n).x || 1;
        L.pos.copy(this.off).applyQuaternion(this.q).divideScalar(ps);
        const s = Math.max(-0.35, Math.min(0.35, this.squash));
        L.scale.set(1 - s * 0.6, 1 + s, 1 - s * 0.6); // volumen aproximadamente constante
        L.rot.setFromAxisAngle(this.axis.set(0, 1, 0), this.spin);
        if (this.flowerLayer) this.flowerLayer.rot.setFromEuler(this.eul.set(this.sway.x, 0, this.sway.z));
    }

    update(delta) {
        const c = this.world.globals.cuento;
        const hands = this.world.globals.hands;
        if (!c || !hands) return;
        this.attach(c);
        if (this.world.globals.cuentoPaused || this.world.globals.placing) return;
        const dt = Math.min(Math.max(delta, 0), 0.05);
        const immersive = this.world.visibilityState.peek() !== VisibilityState.NonImmersive;
        this.gc.tick(dt);
        this.nc.tick(dt);
        if (this.g && this.gLayer) {
            this.refitGuardian(dt);
            if (immersive) this.guardianContacts(dt, c, hands);
            this.guardianDynamics(dt, c);
        }
        if (this.nico && immersive) this.nicoContacts(dt, c, hands);
    }
}

/**
 * NicoSystem — Nico como un juguete de verdad (controlador del personaje).
 *
 * Con la pinza (o el botón lateral del control) Nico se levanta desde el punto
 * donde se tomó y sigue a la mano en X, Y y Z, también fuera del libro:
 *
 *   LIBRE → AGARRADO → CAYENDO → EN EL PISO → (la historia lo necesita) VUELVE
 *
 *  - AGARRADO: la posición persigue a la mano con un suavizado exponencial
 *    (sin saltos al tomarlo ni movimiento robótico); se inclina con la
 *    velocidad, cuelga (`dangle`) y balancea las piernas; si la mano va muy
 *    rápido pone cara de sorpresa. Nunca baja más que la superficie de abajo.
 *  - CAYENDO: al abrir los dedos hereda la velocidad de la mano (con tope) y cae
 *    con gravedad real (9,8 m/s²) sobre lo que haya debajo: la página si está
 *    sobre el libro, el piso real si está afuera. Rebota un poco, frena con
 *    fricción y recupera el equilibrio (saltito) al aterrizar.
 *  - Se queda donde cayó. Cuando la historia avanza (otro momento u otra
 *    página) y necesita a Nico en su lugar, vuelve caminando con un saltito.
 *
 * En el radar (llevarlo bajo la mesa) el juego sigue decidiendo: cuando Nico
 * aterriza, se le pasa el lugar al juego, que lo da por bueno o lo devuelve a
 * su última posición segura (mecánica narrativa).
 *
 * El desplazamiento se suma como capa (interaction/layers) sobre la posición
 * que anima el cuento: nunca pelea con una animación de la historia.
 */
import { createSystem, Quaternion, Vector3, VisibilityState } from '@iwsdk/core';
import gsap from 'gsap';
import { OffsetLayer } from '../interaction/layers.js';
import { fitLocalBox } from '../interaction/shapes.js';
import { groundAt } from '../interaction/surfaces.js';

export const NICO_CFG = {
    /** Qué tan rápido persigue a la mano (1/s): alto = pegado, bajo = flotante. */
    FOLLOW: 24,
    GRAVITY: 9.8,
    /** Velocidad máxima heredada de la mano al soltarlo (m/s). */
    MAX_THROW: 1.2,
    /** Rebote al caer (0 = ninguno). */
    BOUNCE: 0.22,
    /** Fricción horizontal sobre el piso (1/s). */
    FRICTION: 9,
    /** Inclinación máxima por la velocidad (rad). */
    LEAN: 0.45,
    /** Velocidad de la mano que lo sorprende (m/s). */
    FAST: 0.9,
    /** Tiempo para volver a su lugar cuando la historia lo necesita (s). */
    RETURN_TIME: 0.9,
};

export class NicoSystem extends createSystem({}) {
    init() {
        this.v = new Vector3();
        this.w = new Vector3();
        this.base = new Vector3();
        this.cur = new Vector3(); // posición deseada de Nico (mundo)
        this.vel = new Vector3();
        this.off = new Vector3();
        this.lv = new Vector3();
        this.q = new Quaternion();
        this.lean = new Vector3();
        this.ax = new Vector3(1, 0, 0);
        this.az = new Vector3(0, 0, 1);
        this.qa = new Quaternion();
        this.qb = new Quaternion();
        this.mode = 'idle'; // idle | held | falling | rest | returning
        this.nico = null;
        this.layer = null;
        this.item = null;
        this.boxAge = 0;
        const sys = this;
        this.world.globals.nico = {
            get mode() { return sys.mode; },
            get away() { return !!sys.layer && !sys.layer.idle; },
            reset: () => this.reset(true),
        };
    }

    groundAt(c, p) { return groundAt(c, p); }

    // ------------------------------------------------------------ registro
    attach(c) {
        const nico = c.story.scene?.nico ?? null;
        if (nico === this.nico) return;
        this.detach(c);
        this.nico = nico;
        if (!nico) return;
        this.layer = c.layers.add(new OffsetLayer(nico));
        this.item = this.world.globals.interact.add({
            object: nico,
            box: fitLocalBox(nico, (m) => !m.isSprite),
            kind: 'nico',
            priority: 3, // va antes que el Guardián que flota a su lado
            enabled: () => this.canGrab(c),
            onGrab: (hand) => this.grab(c, hand),
            onHold: (hand, dt) => this.hold(c, hand, dt),
            onRelease: (hand) => this.release(c, hand),
        });
        this.mode = 'idle';
        this.beatKey = this.storyKey(c);
    }

    detach(c) {
        if (this.item) this.world.globals.interact.remove(this.item);
        if (this.layer) c.layers.remove(this.layer);
        this.item = this.layer = this.nico = null;
        this.mode = 'idle';
    }

    storyKey(c) { return `${c.story.index}:${c.story.beat}`; }

    /** Se puede tomar si no hay un juego que lo use de otra forma (o si el juego lo deja arrastrar). */
    canGrab(c) {
        const n = this.nico;
        if (!n?.visible || c.story.mode !== 'reading' || c.turner.busy) return false;
        if (this.mode === 'returning') return false;
        const act = c.story.activity;
        if (!act) return true;
        if (c.pointer.draggables.has(n)) return true; // radar: llevarlo bajo la mesa
        return !!this.world.globals.tower?.active; // torre: se puede mover (su collider lo sigue)
    }

    /** Posición base (la que anima el cuento, sin la capa) en el mundo. */
    baseWorld(out) {
        const n = this.nico;
        out.copy(n.position);
        if (this.layer.applied) out.sub(this.layer._pos);
        return n.parent.localToWorld(out);
    }

    // ------------------------------------------------------------ agarrar
    grab(c, hand) {
        const n = this.nico;
        gsap.killTweensOf(this.layer.pos);
        n.getWorldPosition(this.cur);
        this.grabOff = (this.grabOff ?? new Vector3()).copy(this.cur).sub(hand.point);
        this.vel.set(0, 0, 0);
        this.mode = 'held';
        this.fastCool = 0;
        this.game = c.pointer.draggables.get(n) ?? null;
        if (this.game) {
            c.pointer.drag = { object: n, opts: this.game };
            this.game.onStart?.();
        }
        n.pose('dangle', 0.3);
        n.face('o');
        gsap.delayedCall(0.5, () => { if (this.mode === 'held') n.face('smile'); });
    }

    hold(c, hand, dt) {
        const n = this.nico;
        // la mano manda; el cuerpo la persigue con suavidad (sin saltos)
        this.v.copy(hand.point).add(this.grabOff);
        const floor = this.groundAt(c, this.v);
        if (this.v.y < floor) this.v.y = floor; // no atraviesa la página ni el piso
        const a = 1 - Math.exp(-NICO_CFG.FOLLOW * dt);
        this.w.copy(this.cur);
        this.cur.lerp(this.v, a);
        if (dt > 0) this.vel.copy(this.cur).sub(this.w).divideScalar(dt);
        // piernas que se balancean y sorpresa si se mueve rápido
        if (n.p && n.currentPose === 'dangle') {
            const sp = Math.min(1, hand.speed / 1.2);
            const s = Math.sin(performance.now() / 140);
            n.p.legRx = 0.28 + sp * 0.5 * s;
            n.p.legLx = -0.22 - sp * 0.5 * s;
        }
        this.fastCool -= dt;
        if (hand.speed > NICO_CFG.FAST && this.fastCool <= 0) {
            this.fastCool = 1.5;
            n.face('o');
            gsap.delayedCall(0.8, () => { if (this.nico === n) n.face('smile'); });
        }
    }

    release(c, hand) {
        if (this.mode !== 'held') return;
        this.vel.copy(hand.vel);
        if (this.vel.length() > NICO_CFG.MAX_THROW) this.vel.setLength(NICO_CFG.MAX_THROW);
        this.mode = 'falling';
        this.fallFrom = this.cur.y;
    }

    // ------------------------------------------------------------ caer y aterrizar
    fall(c, dt) {
        this.vel.y -= NICO_CFG.GRAVITY * dt;
        this.vel.multiplyScalar(Math.max(0, 1 - 0.4 * dt)); // aire
        this.cur.addScaledVector(this.vel, dt);
        const floor = this.groundAt(c, this.cur);
        if (this.cur.y > floor) return;
        this.cur.y = floor;
        if (this.vel.y < -0.5) {
            this.vel.y = -this.vel.y * NICO_CFG.BOUNCE; // rebote
            this.vel.x *= 0.6;
            this.vel.z *= 0.6;
            return;
        }
        this.vel.y = 0;
        const f = Math.max(0, 1 - NICO_CFG.FRICTION * dt);
        this.vel.x *= f;
        this.vel.z *= f;
        if (Math.hypot(this.vel.x, this.vel.z) < 0.02) this.land(c);
    }

    land(c) {
        const n = this.nico;
        this.vel.set(0, 0, 0);
        this.mode = 'rest';
        const high = (this.fallFrom ?? this.cur.y) - this.cur.y > 0.12;
        this.syncLayer(c, 0);
        if (this.game) {
            // el juego decide si el lugar vale (bajo la mesa) o lo devuelve a su sitio
            const opts = this.game;
            this.game = null;
            c.pointer.drag = null;
            this.layer.undo();
            n.parent.worldToLocal(this.v.copy(this.cur));
            n.position.x = this.v.x;
            n.position.z = this.v.z;
            this.layer.pos.set(0, 0, 0);
            this.layer.rot.identity();
            this.mode = 'idle';
            opts.onDrop?.(this.w.set(this.v.x, 0, this.v.z), false);
            return;
        }
        // recupera el equilibrio
        n.pose(high ? 'stop' : 'idle', 0.25);
        if (high) n.face('o');
        gsap.delayedCall(0.45, () => {
            if (this.nico !== n || this.mode === 'held') return;
            n.pose('idle', 0.5);
            n.face('smile');
            n.hop?.();
        });
        this.beatKey = this.storyKey(c);
    }

    /** La capa = posición deseada − posición base (en el sistema del padre); inclinación por la velocidad. */
    syncLayer(c, dt) {
        const n = this.nico;
        this.baseWorld(this.base);
        n.parent.worldToLocal(this.v.copy(this.cur));
        n.parent.worldToLocal(this.w.copy(this.base));
        this.layer.pos.copy(this.v).sub(this.w);
        // inclinación según la velocidad, en el sistema de Nico
        const target = this.mode === 'held' || this.mode === 'falling' ? 1 : 0;
        n.getWorldQuaternion(this.q).invert();
        this.lv.copy(this.vel).applyQuaternion(this.q);
        const L = NICO_CFG.LEAN;
        const tx = target * Math.max(-L, Math.min(L, this.lv.z * 0.9));
        const tz = target * Math.max(-L, Math.min(L, -this.lv.x * 0.9));
        const a = dt > 0 ? 1 - Math.exp(-10 * dt) : 1;
        this.lean.x += (tx - this.lean.x) * a;
        this.lean.z += (tz - this.lean.z) * a;
        this.qa.setFromAxisAngle(this.ax, this.lean.x);
        this.qb.setFromAxisAngle(this.az, this.lean.z);
        this.layer.rot.copy(this.qa).multiply(this.qb);
    }

    // ------------------------------------------------------------ volver
    /** Vuelve a la posición que le da la historia (con un saltito). */
    reset(now = false) {
        const c = this.world.globals.cuento;
        if (!this.layer || !c) return;
        if (this.mode === 'held') {
            const it = this.item;
            // se suelta primero (sin lanzarlo)
            this.mode = 'rest';
            it.busy = false;
        }
        const n = this.nico;
        this.mode = 'returning';
        this.game = null;
        gsap.killTweensOf(this.layer.pos);
        this.lean.set(0, 0, 0);
        this.layer.rot.identity();
        n.pose('run', 0.25);
        gsap.to(this.layer.pos, {
            x: 0, y: 0, z: 0,
            duration: now ? 0.5 : NICO_CFG.RETURN_TIME,
            ease: 'power2.inOut',
            onComplete: () => {
                if (this.nico !== n) return;
                this.mode = 'idle';
                n.pose('idle', 0.4);
                n.face('smile');
            },
        });
    }

    update(delta) {
        const c = this.world.globals.cuento;
        if (!c || !this.world.globals.interact) return;
        this.attach(c);
        if (!this.nico) return;
        const immersive = this.world.visibilityState.peek() !== VisibilityState.NonImmersive;
        if (!immersive) return;
        if (this.world.globals.cuentoPaused || this.world.globals.placing) return;
        const dt = Math.min(Math.max(delta, 0), 0.05);
        if (this.mode === 'falling') this.fall(c, dt);
        if (this.mode === 'held' || this.mode === 'falling' || this.mode === 'rest') this.syncLayer(c, dt);
        if (this.mode === 'rest') {
            // la historia avanzó y necesita a Nico en su lugar
            const key = this.storyKey(c);
            if (key !== this.beatKey && !this.layer.idle) this.reset();
            else if (this.layer.idle) this.mode = 'idle';
        }
        // la forma de interacción se vuelve a medir de vez en cuando (cambia de postura)
        this.boxAge += dt;
        if (this.mode === 'idle' && this.boxAge > 0.6 && this.item) {
            this.boxAge = 0;
            const b = fitLocalBox(this.nico, (m) => !m.isSprite);
            if (!b.isEmpty()) this.item.box.copy(b);
        }
    }
}

/**
 * NicoSystem — Nico como un juguete de verdad (controlador del personaje).
 *
 * Con la pinza (o el botón lateral del control) Nico se levanta desde el punto
 * donde se tomó, sigue a la mano en X, Y y Z y gira con ella en los tres ejes,
 * también fuera del libro. Es el MISMO agarre en toda la historia, también
 * durante los juegos (interaction/carry.js, igual que los zapatos):
 *
 *   LIBRE → AGARRADO → CAYENDO → EN EL PISO → (la historia lo necesita) VUELVE
 *
 *  - AGARRADO: posición y giro relativos a la mano (no salta al centro de la
 *    mano), con suavizado exponencial; cuelga (`dangle`) y balancea las
 *    piernas; si la mano va muy rápido pone cara de sorpresa. Nunca baja más
 *    que la superficie de abajo.
 *  - CAYENDO: al abrir los dedos hereda la velocidad de la mano (con tope), cae
 *    con gravedad real (9,8 m/s²) sobre la página o el piso real, rebota un
 *    poco, frena y se endereza mirando hacia donde lo dejaron.
 *  - Se queda donde cayó. Cuando la historia avanza (otro momento u otra
 *    página) y necesita a Nico en su lugar, vuelve caminando.
 *
 * En los juegos que mueven a Nico (radar, pasillo, patio) el juego sigue
 * recibiendo dónde está mientras se lo lleva, y al aterrizar decide si el lugar
 * vale (bajo la mesa, el camino, la zona segura) o lo devuelve.
 *
 * El desplazamiento se suma como capa (interaction/layers) sobre la posición
 * que anima el cuento: nunca pelea con una animación de la historia.
 */
import { createSystem, Quaternion, Vector3, VisibilityState } from '@iwsdk/core';
import gsap from 'gsap';
import { OffsetLayer } from '../interaction/layers.js';
import { fitLocalBox } from '../interaction/shapes.js';
import { Carry } from '../interaction/carry.js';

export const NICO_CFG = {
    /** Velocidad de la mano que lo sorprende (m/s). */
    FAST: 0.9,
    /** Tiempo para volver a su lugar cuando la historia lo necesita (s). */
    RETURN_TIME: 0.9,
};
// el seguimiento, la caída y el giro están en CARRY_CFG (interaction/carry.js)

export class NicoSystem extends createSystem({}) {
    init() {
        this.v = new Vector3();
        this.w = new Vector3();
        this.qa = new Quaternion();
        this.rotBack = { t: 0 };
        this.carry = null;
        this.mode = 'idle'; // idle | held | falling | rest | returning
        this.nico = null;
        this.layer = null;
        this.item = null;
        this.boxAge = 0;
        const sys = this;
        this.world.globals.nico = {
            get mode() { return sys.mode; },
            get away() { return !!sys.layer && !sys.layer.idle; },
            /** Para las pruebas: la pose deseada y la capa. */
            get carry() { return sys.carry; },
            get layer() { return sys.layer; },
            reset: () => this.reset(true),
        };
    }

    // ------------------------------------------------------------ registro
    attach(c) {
        const nico = c.story.scene?.nico ?? null;
        if (nico === this.nico) return;
        this.detach(c);
        this.nico = nico;
        if (!nico) return;
        this.layer = c.layers.add(new OffsetLayer(nico));
        this.carry = new Carry(nico, this.layer);
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

    /**
     * Se puede tomar durante toda la historia, también en los juegos (el mismo
     * agarre en todas partes). Solo no se puede mientras pasa la hoja, mientras
     * vuelve a su lugar o si la escena lo esconde.
     */
    canGrab(c) {
        const n = this.nico;
        if (!n?.visible || c.story.mode !== 'reading' || c.turner.busy) return false;
        return this.mode !== 'returning';
    }

    // ------------------------------------------------------------ agarrar
    grab(c, hand) {
        const n = this.nico;
        gsap.killTweensOf(this.layer.pos);
        gsap.killTweensOf(this.rotBack);
        this.carry.begin(hand);
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
        // la mano manda (posición y giro); el cuerpo la persigue con suavidad
        this.carry.hold(c, hand, dt);
        // en un juego (radar, pasillo, patio) el juego sigue recibiendo dónde está Nico
        if (this.game?.onMove && this.game.space) {
            this.game.space.worldToLocal(this.v.copy(this.carry.pos));
            this.game.onMove(this.w.set(this.v.x, 0, this.v.z));
        }
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
        this.carry.release(hand);
        this.mode = 'falling';
    }

    // ------------------------------------------------------------ caer y aterrizar
    land(c) {
        const n = this.nico;
        this.mode = 'rest';
        const high = this.carry.dropHeight > 0.12;
        this.carry.sync();
        if (this.game) {
            // el juego decide si el lugar vale (bajo la mesa, zona segura) o lo devuelve
            const opts = this.game;
            this.game = null;
            c.pointer.drag = null;
            this.layer.undo();
            n.parent.worldToLocal(this.v.copy(this.carry.pos));
            n.position.x = this.v.x;
            n.position.z = this.v.z;
            // lo que queda (altura y giro) se deshace suave: el juego manda desde aquí
            this.layer.pos.set(0, this.layer.pos.y, 0);
            this.mode = 'idle';
            this.settleLayer(0.35);
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

    /** Lleva la capa a cero (posición y giro) en `duration` s. */
    settleLayer(duration, onComplete) {
        const L = this.layer;
        const from = L.rot.clone();
        this.rotBack.t = 0;
        gsap.killTweensOf(this.rotBack);
        gsap.to(this.rotBack, {
            t: 1, duration, ease: 'power2.inOut',
            onUpdate: () => L.rot.slerpQuaternions(from, this.qa.identity(), this.rotBack.t),
        });
        gsap.to(L.pos, { x: 0, y: 0, z: 0, duration, ease: 'power2.inOut', onComplete });
    }

    // ------------------------------------------------------------ volver
    /** Vuelve a la posición que le da la historia (con un saltito). */
    reset(now = false) {
        const c = this.world.globals.cuento;
        if (!this.layer || !c) return;
        if (this.mode === 'held') this.item.busy = false; // se suelta primero (sin lanzarlo)
        const n = this.nico;
        this.mode = 'returning';
        this.game = null;
        gsap.killTweensOf(this.layer.pos);
        n.pose('run', 0.25);
        this.settleLayer(now ? 0.5 : NICO_CFG.RETURN_TIME, () => {
            if (this.nico !== n) return;
            this.mode = 'idle';
            n.pose('idle', 0.4);
            n.face('smile');
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
        if (this.mode === 'falling' && this.carry.fall(c, dt)) this.land(c);
        if (this.mode === 'held' || this.mode === 'falling' || this.mode === 'rest') this.carry.sync();
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

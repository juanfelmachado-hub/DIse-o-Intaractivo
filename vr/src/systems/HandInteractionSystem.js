/**
 * HandInteractionSystem — agarrar con los dedos, para todo el cuento.
 *
 * Un solo sistema para todos los objetos manipulables (Nico y lo que se
 * arrastra en los juegos, los bloques de la torre, el Guardián, el asa del
 * panel y su icono minimizado). Cada mano tiene una máquina de estados:
 *
 *     IDLE → HOVER → GRABBING → RELEASE → IDLE
 *
 *  - HOVER: la pinza (punto medio entre pulgar e índice) está a menos de
 *    HOVER_DIST de la SUPERFICIE ajustada del objeto (ver interaction/shapes):
 *    aparece un punto amarillo donde se va a tomar.
 *  - GRABBING: la pinza se CIERRA estando a menos de GRAB_DIST. Una pinza que
 *    ya venía cerrada no agarra (evita agarres accidentales). El objeto sigue
 *    a la mano desde donde se tomó (sin saltos).
 *  - RELEASE: la pinza se abre (con histéresis), el control suelta el botón
 *    lateral o se pierde el tracking: se suelta con seguridad.
 *
 * Con controles: el botón lateral (squeeze) cerca del objeto agarra igual.
 * Los objetos manipulables con la mano NO se arrastran a distancia con el rayo
 * de la mano (StoryInputSystem); con los controles el rayo sigue funcionando.
 *
 * Registro: world.globals.interact.add({ object, box, kind, onGrab, onHold,
 * onRelease, enabled?, priority? }) — `box` es la caja local de shapes.fitLocalBox.
 *
 * Prioridades: si dos objetos están casi igual de cerca gana el de mayor
 * `priority` (Nico 3, objetos de juego 3, panel 2, bloques 1, página 0,
 * Guardián 0). Bloqueo: mientras una mano pasa una página
 * (`globals.interactLock = 'page'`) o la hoja termina de girar, solo la página
 * responde; así un mismo gesto nunca activa dos acciones incompatibles.
 *
 * Nico (NicoSystem) y los demás arrastrables de los juegos usan el mismo agarre
 * 3D (interaction/carry.js): posición y giro relativos a la mano, caída con
 * gravedad al soltar, sin límites artificiales; el juego decide si el lugar
 * donde aterriza es válido.
 */
import { createSystem, Mesh, MeshBasicMaterial, Quaternion, SphereGeometry, Vector3, VisibilityState } from '@iwsdk/core';
import gsap from 'gsap';
import { Hands } from '../interaction/hands.js';
import { boundRadius, boxCenter, distanceToBox, fitLocalBox } from '../interaction/shapes.js';
import { Carry } from '../interaction/carry.js';
import { OffsetLayer } from '../interaction/layers.js';

export const GRAB_CFG = {
    HOVER_DIST: { hand: 0.05, controller: 0.06 },
    GRAB_DIST: { hand: 0.022, controller: 0.04 },
    /** Cuánto pesa cada punto de prioridad al elegir entre objetos casi igual de cerca (m). */
    PRIORITY_MM: 0.004,
};

class Registry {
    constructor() {
        this.items = new Set();
    }
    add(it) {
        it.box ??= fitLocalBox(it.object);
        it.radius = boundRadius(it.object, it.box);
        this.items.add(it);
        return it;
    }
    remove(it) { this.items.delete(it); }
}

export class HandInteractionSystem extends createSystem({}) {
    init() {
        this.hands = new Hands(this.world);
        this.registry = new Registry();
        this.world.globals.hands = this.hands;
        this.world.globals.interact = this.registry;
        this.state = { left: { mode: 'idle', target: null }, right: { mode: 'idle', target: null } };
        this.world.globals.handState = this.state;
        this.v = new Vector3();
        this.w = new Vector3();
        this.closest = new Vector3();
        this.center = new Vector3();
        this.dragItems = new Map(); // objeto arrastrable del juego → item del registro
        this.falling = new Set(); // arrastrables soltados que todavía caen
        this.qi = new Quaternion();
        this.dots = {};
        for (const side of ['left', 'right']) {
            const dot = new Mesh(new SphereGeometry(0.006, 12, 8), new MeshBasicMaterial({ color: '#ffd84d', transparent: true, opacity: 0.9, depthTest: false, fog: false }));
            dot.renderOrder = 40;
            dot.visible = false;
            dot.raycast = () => {};
            this.world.createTransformEntity(dot, { persistent: true });
            this.dots[side] = dot;
        }
    }

    // ------------------------------------------------------------ objetos arrastrables de los juegos
    /** Los arrastrables del Pointer original (Nico, zapatos…) se registran solos mientras existan. */
    syncDraggables(c) {
        const map = c.pointer.draggables;
        for (const [obj, it] of this.dragItems) {
            if (!map.has(obj) || !obj.parent) {
                // el juego ya no lo deja mover: se quita su capa al terminar de asentarse
                if (it.layer && !this.falling.has(it)) {
                    const L = it.layer;
                    gsap.to(L.pos, { x: 0, y: 0, z: 0, duration: 0.3, onComplete: () => c.layers.remove(L) });
                    L.rot.identity();
                }
                this.falling.delete(it);
                this.registry.remove(it);
                this.dragItems.delete(obj);
            }
        }
        const nico = c.story.scene?.nico;
        for (const [obj, opts] of map) {
            if (obj === nico) continue; // NicoSystem
            if (this.dragItems.has(obj)) continue;
            // prioridad alta: en un juego, lo que se arrastra va antes que el Guardián o el panel
            const it = this.registry.add({ object: obj, kind: 'drag', priority: 3, opts, ...this.dragHandlers(c) });
            this.dragItems.set(obj, it);
        }
    }

    /**
     * Agarre 3D de lo que se arrastra en los juegos (interaction/carry.js, el mismo
     * que usa Nico): sigue a la mano en X, Y y Z, gira con ella y al soltarlo cae
     * con gravedad. Mientras se lleva, el juego recibe la posición (onMove); al
     * aterrizar, el juego decide si el lugar vale (onDrop) o lo devuelve.
     */
    dragHandlers(c) {
        const sys = this;
        return {
            onGrab(hand) {
                if (this.carry?.mode === 'falling') sys.falling.delete(this);
                if (!this.layer) this.layer = c.layers.add(new OffsetLayer(this.object));
                gsap.killTweensOf(this.layer.pos);
                this.carry ??= new Carry(this.object, this.layer);
                this.carry.begin(hand);
                c.pointer.drag = { object: this.object, opts: this.opts };
                this.opts.onStart?.();
            },
            onHold(hand, dt) {
                this.carry.hold(c, hand, dt);
                const p = sys.local(this.opts.space, this.carry.pos, sys.v);
                this.opts.onMove?.(sys.w.set(p.x, 0, p.z));
                this.carry.sync();
            },
            onRelease(hand) {
                this.carry.release(hand);
                sys.falling.add(this);
            },
        };
    }

    /** Lo que se soltó cae; al quedar quieto, el juego decide si el lugar vale. */
    updateFalling(c, dt) {
        for (const it of this.falling) {
            const o = it.object;
            if (!o.parent) { this.falling.delete(it); continue; }
            if (!it.carry.fall(c, dt)) { it.carry.sync(); continue; }
            this.falling.delete(it);
            it.carry.sync();
            c.pointer.drag = null;
            // la posición en el piso pasa al juego; la altura y el giro que quedan se deshacen suave
            const L = it.layer;
            L.undo();
            const p = this.local(it.opts.space, it.carry.pos, this.v);
            o.position.x = p.x;
            o.position.z = p.z;
            L.pos.x = L.pos.z = 0;
            const from = L.rot.clone();
            const k = { t: 0 };
            gsap.to(L.pos, { y: 0, duration: 0.35, ease: 'power2.inOut' });
            gsap.to(k, { t: 1, duration: 0.35, ease: 'power2.inOut', onUpdate: () => L.rot.slerpQuaternions(from, this.qi, k.t) });
            it.opts.onDrop?.(this.w.set(p.x, 0, p.z), false);
        }
    }

    /** Punto del mundo en el sistema de `space` (sin modificar la entrada). */
    local(space, worldPoint, out) {
        out.copy(worldPoint);
        return space.worldToLocal(out);
    }

    // ------------------------------------------------------------ máquina de estados
    nearest(hand, c) {
        let best = null;
        const maxD = GRAB_CFG.HOVER_DIST[hand.kind] ?? 0.05;
        let bestD = maxD;
        let bestScore = Infinity;
        const lock = this.world.globals.interactLock ?? (c.turner?.busy ? 'page' : null);
        for (const it of this.registry.items) {
            const o = it.object;
            if (lock && it.kind !== lock) continue;
            if (!o.parent || !o.visible || (it.enabled && !it.enabled())) continue;
            if (it.busy) continue;
            // descarte rápido con la esfera envolvente
            boxCenter(o, it.box, this.center);
            if (this.center.distanceTo(hand.point) > it.radius + maxD) continue;
            const d = distanceToBox(o, it.box, hand.point, this.w);
            if (d >= maxD) continue;
            // a igual distancia (± unos mm) gana la prioridad: Nico antes que el Guardián que flota a su lado
            const score = d - (it.priority ?? 0) * GRAB_CFG.PRIORITY_MM;
            if (score < bestScore) {
                bestScore = score;
                bestD = d;
                best = it;
                this.closest.copy(this.w);
            }
        }
        void c;
        return best ? { it: best, d: bestD } : null;
    }

    update(delta) {
        const c = this.world.globals.cuento;
        const dt = Math.min(Math.max(delta, 0), 0.1);
        this.hands.update(dt);
        const immersive = this.world.visibilityState.peek() !== VisibilityState.NonImmersive;
        if (!c || !immersive || this.world.globals.placing) {
            for (const side of ['left', 'right']) this.dots[side].visible = false;
            return;
        }
        const paused = !!this.world.globals.cuentoPaused;
        this.syncDraggables(c);
        if (!paused) this.updateFalling(c, dt);

        for (const side of ['left', 'right']) {
            const hand = this.hands.h[side];
            const st = this.state[side];
            const dot = this.dots[side];
            if (st.mode === 'grab') {
                const it = st.target;
                if (!it.busy) {
                    // el objeto se soltó desde afuera (botón «Reiniciar»): sin onRelease, sin lanzarlo
                    st.mode = 'idle';
                    st.target = null;
                    dot.visible = false;
                    continue;
                }
                if (!hand.tracked || hand.grabEnd || !hand.grab || !it.object.parent || paused) {
                    st.mode = 'idle';
                    st.target = null;
                    it.busy = false;
                    it.onRelease?.(hand);
                    dot.visible = false;
                    continue;
                }
                it.onHold?.(hand, dt);
                dot.visible = true;
                dot.position.copy(hand.point);
                dot.material.color.set('#7be07b');
                continue;
            }
            if (!hand.tracked || paused) {
                st.mode = 'idle';
                dot.visible = false;
                continue;
            }
            const n = this.nearest(hand, c);
            st.mode = n ? 'hover' : 'idle';
            dot.visible = !!n;
            if (n) {
                dot.position.copy(this.closest);
                dot.material.color.set('#ffd84d');
                dot.scale.setScalar(1 + (1 - Math.min(1, n.d / 0.05)) * 0.6);
            }
            if (n && hand.grabStart && n.d <= (GRAB_CFG.GRAB_DIST[hand.kind] ?? 0.022)) {
                st.mode = 'grab';
                st.target = n.it;
                n.it.busy = true;
                n.it.onGrab?.(hand);
            }
        }
    }
}

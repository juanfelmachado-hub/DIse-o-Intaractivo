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
 * onRelease, enabled? }) — `box` es la caja local de shapes.fitLocalBox.
 */
import { createSystem, Mesh, MeshBasicMaterial, SphereGeometry, Vector3, VisibilityState } from '@iwsdk/core';
import gsap from 'gsap';
import { Hands } from '../interaction/hands.js';
import { boundRadius, boxCenter, distanceToBox, fitLocalBox } from '../interaction/shapes.js';

export const GRAB_CFG = {
    HOVER_DIST: { hand: 0.05, controller: 0.06 },
    GRAB_DIST: { hand: 0.022, controller: 0.04 },
    /** Cuánto pesa cada punto de prioridad al elegir entre objetos casi igual de cerca (m). */
    PRIORITY_MM: 0.004,
    /** Nico y lo que se arrastra: altura máxima a la que se levanta (unidades del cuento). */
    MAX_LIFT: 0.9,
    /** Velocidad de la mano a partir de la cual Nico se sorprende (m/s). */
    FAST: 0.9,
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
        this.v = new Vector3();
        this.w = new Vector3();
        this.closest = new Vector3();
        this.center = new Vector3();
        this.dragItems = new Map(); // objeto arrastrable del juego → item del registro
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
                this.registry.remove(it);
                this.dragItems.delete(obj);
            }
        }
        for (const [obj, opts] of map) {
            if (this.dragItems.has(obj)) continue;
            // prioridad alta: en un juego, lo que se arrastra va antes que el Guardián o el panel
            const it = this.registry.add({ object: obj, kind: 'drag', priority: 3, opts, lift: 0, ...this.dragHandlers(c) });
            this.dragItems.set(obj, it);
        }
    }

    dragHandlers(c) {
        const sys = this;
        return {
            onGrab(hand) {
                const space = this.opts.space;
                // desde donde se tomó: sin saltos
                sys.local(space, hand.point, sys.v);
                this.offX = this.object.position.x - sys.v.x;
                this.offZ = this.object.position.z - sys.v.z;
                this.handY0 = sys.local(space, hand.point, sys.w).y;
                this.layer = c.layers.add(new LiftLayer(this.object));
                gsap.killTweensOf(this.layer);
                c.pointer.drag = { object: this.object, opts: this.opts };
                this.opts.onStart?.();
                this.fastCool = 0;
            },
            onHold(hand, dt) {
                const space = this.opts.space;
                const p = sys.local(space, hand.point, sys.v);
                // Nico y los objetos se quedan dentro del escenario
                p.x = Math.max(-2.85, Math.min(2.85, p.x + this.offX));
                p.z = Math.max(-1.85, Math.min(1.85, p.z + this.offZ));
                this.last = { x: p.x, y: 0, z: p.z };
                this.opts.onMove?.(sys.w.set(p.x, 0, p.z));
                // se levanta con la mano (no atraviesa el piso)
                const lift = Math.max(0, Math.min(GRAB_CFG.MAX_LIFT, p.y - this.handY0 + 0.15));
                this.layer.y += (lift - this.layer.y) * Math.min(1, dt * 14);
                // Nico: piernas que se balancean y sorpresa si se mueve rápido
                const nico = c.story.scene?.nico;
                if (nico === this.object && nico.currentPose === 'dangle') {
                    const sp = Math.min(1, hand.speed / 1.2);
                    nico.p.legRx = 0.28 + sp * 0.5 * Math.sin(performance.now() / 140);
                    nico.p.legLx = -0.22 - sp * 0.5 * Math.sin(performance.now() / 140);
                    this.fastCool -= dt;
                    if (hand.speed > GRAB_CFG.FAST && this.fastCool <= 0) {
                        this.fastCool = 1.5;
                        nico.face('o');
                        gsap.delayedCall(0.8, () => nico.face('smile'));
                    }
                }
            },
            onRelease() {
                c.pointer.drag = null;
                const at = this.last ?? { x: this.object.position.x, y: 0, z: this.object.position.z };
                // baja suavemente al piso; el juego decide si el lugar es válido
                // (si no, lo regresa solo a su última posición segura)
                gsap.to(this.layer, { y: 0, duration: 0.3, ease: 'power2.out', onComplete: () => c.layers.remove(this.layer) });
                this.opts.onDrop?.(sys.w.set(at.x, 0, at.z), false);
            },
        };
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
        for (const it of this.registry.items) {
            const o = it.object;
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

        for (const side of ['left', 'right']) {
            const hand = this.hands.h[side];
            const st = this.state[side];
            const dot = this.dots[side];
            if (st.mode === 'grab') {
                const it = st.target;
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

/** Levantar un objeto del juego (Nico, zapatos) sin pelear con el código que lo mueve. */
class LiftLayer {
    constructor(object) {
        this.object = object;
        this.y = 0;
        this._y = 0;
    }
    undo() { this.object.position.y -= this._y; this._y = 0; }
    apply() { this._y = this.y; this.object.position.y += this._y; }
}

/**
 * RadarTouchSystem — el radar del juego 1 en el visor, con la punta del índice.
 *
 * En la web el radar sigue al dedo sobre la pantalla. En el visor ya no sigue
 * al rayo ni a la mirada: el indicador (anillo que late) está en la PUNTA DEL
 * ÍNDICE (o en la punta del control) y la cercanía se mide en 3D, en metros
 * reales, desde esa punta hasta la superficie de cada peligro.
 *
 *  - Más cerca de un peligro → el bip late más rápido y el anillo del dedo
 *    pulsa más seguido (la misma curva que la web).
 *  - Para descubrir un peligro hay que TOCARLO con la punta del dedo (a menos de
 *    TOUCH de su superficie). Para volver a tocar el mismo objeto hay que
 *    alejar el dedo REARM y esperar COOLDOWN (vale para las dos manos). Lo seguro (sofá, planta) responde igual que en la web.
 *  - Se usa la mano cuyo índice está más cerca de un peligro sin descubrir.
 *
 * Se engancha a RadarActivity (como el corazón a DrumActivity): fuera del visor
 * el juego sigue siendo exactamente el de la web.
 */
import { createSystem, Vector3, VisibilityState } from '@iwsdk/core';
import { RadarActivity } from '../../../src/activities/RadarActivity.js';
import { playSfx } from '../../../src/audio/sfx.js';
import { distanceToBox, fitLocalBox } from '../interaction/shapes.js';

export const RADAR_CFG = {
    /** Alcance del radar (unidades del cuento): más lejos no suena más rápido. */
    REACH: 2.6,
    /** Contacto: la punta del dedo a menos de esto de la superficie del objeto (m). */
    TOUCH: 0.012,
    /** Distancia extra para que el mismo objeto se pueda volver a tocar (m). */
    REARM: 0.03,
    /** Tiempo mínimo entre dos toques del mismo objeto (s). */
    COOLDOWN: 0.6,
    /** Cada cuánto se vuelve a medir la forma de los objetos (s). */
    REFIT: 1,
};

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export class RadarTouchSystem extends createSystem({}) {
    init() {
        this.act = null;
        this.targets = []; // { id, obj, box, hazard }
        this.tip = new Vector3();
        this.hasTip = false;
        this.armed = { left: {}, right: {} };
        this.refit = 0;
        this.lastTouch = {}; // id → instante del último toque (s)
        const sys = this;
        this.world.globals.radarTouch = {
            /** El radar táctil está en juego (todavía faltan peligros). */
            get active() { return !!sys.act && !sys.act.allFound && !sys.act.disposed; },
            /** Punta del dedo que lleva el radar (mundo) y si hay una mano visible. */
            get tip() { return sys.tip; },
            get hasTip() { return sys.hasTip; },
            get prox() { return sys.act?.prox ?? 0; },
            /** Centro (mundo) de la forma de un objeto del radar: para las pruebas. */
            centerOf: (id) => {
                const t = sys.targets.find((x) => x.id === id);
                return t ? t.obj.localToWorld(t.box.getCenter(new Vector3())) : null;
            },
        };
        const begin = RadarActivity.prototype.begin;
        const update = RadarActivity.prototype.update;
        const cleanup = RadarActivity.prototype.cleanup;
        RadarActivity.prototype.begin = function beginVR() {
            begin.call(this);
            sys.start(this);
        };
        RadarActivity.prototype.update = function updateVR(dt) {
            if (sys.act === this) return sys.tick(this, dt);
            return update.call(this, dt);
        };
        RadarActivity.prototype.cleanup = function cleanupVR() {
            if (sys.act === this) sys.stop();
            cleanup.call(this);
        };
        this.cleanupFuncs.push(() => {
            RadarActivity.prototype.begin = begin;
            RadarActivity.prototype.update = update;
            RadarActivity.prototype.cleanup = cleanup;
        });
    }

    immersive() { return this.world.visibilityState.peek() !== VisibilityState.NonImmersive; }

    start(act) {
        if (!this.immersive()) return;
        this.act = act;
        this.targets.length = 0;
        const scene = act.scene;
        for (const id of act.data.hazards) {
            const obj = scene.hotspots[id];
            if (obj) this.targets.push({ id, obj, box: fitLocalBox(obj), hazard: true });
        }
        const safe = { sofa: scene.hotspots.sofa, planta: scene.plant };
        for (const id in safe) if (safe[id]) this.targets.push({ id, obj: safe[id], box: fitLocalBox(safe[id]), hazard: false });
        for (const side in this.armed) for (const id in this.armed[side]) delete this.armed[side][id];
        for (const id in this.lastTouch) delete this.lastTouch[id];
        this.refit = 0;
        this.hasTip = false;
        act.say?.('Toca los peligros con la punta del dedo');
    }

    stop() {
        this.act = null;
        this.targets.length = 0;
        this.hasTip = false;
    }

    /** Reemplaza a RadarActivity.update en el visor. */
    tick(act, dt) {
        if (act.allFound || act.disposed) { this.hasTip = false; return; }
        const hands = this.world.globals.hands;
        const k = this.world.globals.dioramaScale ?? 0.17;
        // las formas cambian poco (los objetos se bambolean): se vuelven a medir cada REFIT s
        this.refit += dt;
        if (this.refit > RADAR_CFG.REFIT) {
            this.refit = 0;
            for (const t of this.targets) {
                const b = fitLocalBox(t.obj);
                if (!b.isEmpty()) t.box.copy(b);
            }
        }

        // la punta de cada mano: tocar y medir la cercanía
        let best = Infinity;
        let bestHand = null;
        for (const hand of hands?.list ?? []) {
            if (!hand.tracked) continue;
            const armed = this.armed[hand.side];
            let near = Infinity;
            for (const t of this.targets) {
                if (t.hazard && act.found.has(t.id)) continue;
                if (t.box.isEmpty()) continue;
                const d = distanceToBox(t.obj, t.box, hand.index);
                if (t.hazard) near = Math.min(near, d);
                if (d < RADAR_CFG.TOUCH) {
                    const now = performance.now() / 1000;
                    if (armed[t.id] !== false && now - (this.lastTouch[t.id] ?? -9) > RADAR_CFG.COOLDOWN) {
                        armed[t.id] = false;
                        this.lastTouch[t.id] = now; // una vez por toque, aunque las dos manos lo toquen
                        act.played();
                        if (t.hazard) act.tap(t.id);
                        else act.safeTap(t.id, t.obj);
                    }
                } else if (d > RADAR_CFG.TOUCH + RADAR_CFG.REARM) armed[t.id] = true;
            }
            if (near < best || !bestHand) {
                best = near;
                bestHand = hand;
            }
        }
        this.hasTip = !!bestHand;
        if (!bestHand) return; // sin manos no hay radar (ni bip)
        this.tip.copy(bestHand.index);
        if (act.allFound) { this.hasTip = false; return; }

        // misma curva que en la web: bip… bip… → bip-bip-bip-bip
        const reach = RADAR_CFG.REACH * k;
        const target = clamp(1 - best / reach, 0, 1);
        act.prox += (target - act.prox) * Math.min(1, dt * 6);
        const g = act.scene.guardian;
        if (g) g.glow = 0.6 + act.prox * 1.8;
        act.ping -= dt;
        if (act.ping <= 0) {
            const interval = 1.1 - act.prox * 0.92;
            act.ping = interval;
            const el = act.ctx.ui.el.radar;
            el.style.setProperty('--ping', `${Math.max(0.25, interval * 0.9)}s`);
            el.classList.remove('is-ping');
            void el.offsetWidth;
            el.classList.add('is-ping'); // StoryFxSystem hace latir el anillo del dedo
            playSfx('radar', { level: 0.2 + 0.8 * act.prox });
        }
    }
}

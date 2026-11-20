/**
 * StoryFxSystem — lo que en la web eran adornos HTML sobre la escena, en 3D:
 *  - anillos de los objetos tocables (StoryMarker), siempre mirando al lector;
 *  - el radar del juego 1: un anillo que late con el bip, en la punta del
 *    índice en el visor (en el navegador, en la mira del mouse);
 *  - el círculo dorado del juego 2 sobre el caparazón de Nico, que late con el
 *    "pum" y cambia de color con cada golpe (lee la misma clase y el mismo
 *    color que la UI original le pone al botón del tambor).
 */
import { createSystem, DoubleSide, Mesh, MeshBasicMaterial, RingGeometry, Vector3 } from '@iwsdk/core';
import { StoryMarker } from '../story-components.js';

function ring(color, inner, outer) {
    const m = new Mesh(
        new RingGeometry(inner, outer, 48),
        new MeshBasicMaterial({ color, transparent: true, opacity: 0.9, depthTest: false, depthWrite: false, side: DoubleSide, fog: false }),
    );
    m.renderOrder = 21;
    m.raycast = () => {};
    m.visible = false;
    return m;
}

/** Repite una animación CSS de "latido" cuando la UI vuelve a poner la clase. */
function watchClass(el, cls, onPulse) {
    const mo = new MutationObserver(() => {
        if (el.classList.contains(cls)) onPulse();
    });
    mo.observe(el, { attributes: true, attributeFilter: ['class'] });
    return () => mo.disconnect();
}

export class StoryFxSystem extends createSystem({
    markers: { required: [StoryMarker] },
}) {
    init() {
        this.v = new Vector3();
        this.radar = ring('#ffffff', 0.05, 0.075);
        this.radarPing = ring('#9ff0ff', 0.06, 0.08);
        this.drum = ring('#ffd84d', 0.12, 0.17);
        this.drumBeat = 0;
        this.radarBeat = 0;
        for (const m of [this.radar, this.radarPing, this.drum]) this.world.createTransformEntity(m, { persistent: true });
        this.wired = false;
    }

    wire(c) {
        this.wired = true;
        this.cleanupFuncs.push(
            watchClass(c.ui.el.radar, 'is-ping', () => { this.radarBeat = 1; }),
            watchClass(c.ui.el.drum, 'is-beat', () => { this.drumBeat = 1; }),
        );
    }

    face(obj, cam, size) {
        obj.quaternion.copy(cam.quaternion);
        obj.scale.setScalar(size);
    }

    update(delta) {
        const c = this.world.globals.cuento;
        if (!c) return;
        if (!this.wired) this.wire(c);
        const cam = c.viewCam;
        const dt = Math.min(delta, 0.1);
        // los anillos están en metros reales: a escala de la maqueta (un poco más grandes para verlos)
        const k = (this.world.globals.dioramaScale ?? 0.17) * 1.6;

        for (const e of this.queries.markers.entities) {
            const o = e.object3D;
            const target = o?.userData.target;
            if (!target) continue;
            target.getWorldPosition(o.position);
            o.position.y += 0.08 * k;
            this.face(o, cam, k * (1 + Math.sin(performance.now() / 260) * 0.08));
            o.visible = target.visible !== false;
        }

        // radar (juego 1)
        // en el visor el radar va en la punta del índice (RadarTouchSystem); sin mano visible, no se dibuja
        const touch = this.world.globals.radarTouch;
        const onFinger = !!touch?.active;
        const radarOn = !c.ui.el.radar.hidden && (!onFinger || touch.hasTip);
        this.radar.visible = radarOn;
        this.radarPing.visible = radarOn && this.radarBeat > 0.01;
        if (radarOn) {
            const aim = onFinger ? touch.tip : this.world.globals.cuentoAim;
            if (aim) {
                this.radar.position.copy(aim);
                this.radarPing.position.copy(aim);
            }
            this.face(this.radar, cam, 1.2 * k);
            this.face(this.radarPing, cam, k * (1 + (1 - this.radarBeat) * 2.4));
            this.radarPing.material.opacity = this.radarBeat * 0.9;
            this.radarBeat = Math.max(0, this.radarBeat - dt * 2.2);
        }

        // tambor (juego 2)
        const drumOn = !c.ui.el.drum.hidden && c.ui.drumTarget && !this.world.globals.heart?.active; // en el visor el corazón tiene su propio latido
        this.drum.visible = !!drumOn;
        if (drumOn) {
            c.ui.drumTarget.getWorldPosition(this.drum.position);
            const shield = c.ui.el.drum.style.getPropertyValue('--shield').trim();
            if (shield && shield !== this.lastShield) {
                this.lastShield = shield;
                try { this.drum.material.color.setStyle(shield.replace(/hsl\((\S+)\s+(\S+)\s+(\S+)\)/, 'hsl($1, $2, $3)')); } catch { /* color no válido: se conserva */ }
            }
            this.face(this.drum, cam, k * (1 + this.drumBeat * 0.45));
            this.drumBeat = Math.max(0, this.drumBeat - dt * 3);
        }
    }
}

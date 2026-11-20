/**
 * StoryInputSystem — los juegos originales con el rayo del control o de la mano.
 *
 * Los 5 juegos de la web escuchan un puntero (Pointer.js): tocar, arrastrar y
 * el radar que sigue al dedo. Aquí el rayo del control (gatillo) o de la mano
 * (pellizco índice-pulgar) produce esos mismos eventos, con el rayo 3D real
 * para elegir objetos y una "mira" proyectada para las coordenadas de pantalla
 * que usan el radar y los toques. Si el rayo apunta a un panel, el panel tiene
 * prioridad (lo atiende IWSDK). En el navegador sin VR, el mouse hace lo mismo.
 *
 * Maqueta (realidad mixta): los objetos se tocan dentro del mundo pequeño.
 *  - Tambor (juego 2): el tambor es el caparazón de Nico con su anillo dorado.
 *    Se golpea apuntándole y apretando el gatillo/pellizco, o tocándolo con
 *    el control o la mano (al acercarla a menos de ~6 cm).
 *  - Radar (juego 1): en el visor se juega con la punta del índice
 *    (RadarTouchSystem); el rayo ya no lleva el radar. Con el control, el
 *    gatillo sobre un peligro sigue valiendo.
 *  - Ponerse a salvo: además del botón del panel, tocar a Nico le da el
 *    siguiente paso (agacharse, cubrirse, agarrarse).
 */
import { createSystem, Plane, Ray, Raycaster, Vector2, Vector3, VisibilityState } from '@iwsdk/core';
import { unlockAudio } from '../../../src/audio/sfx.js';
import { StoryPanel } from '../story-components.js';
import { VIRTUAL } from '../story/runtime.js';

const HANDS = ['right', 'left'];

export class StoryInputSystem extends createSystem({
    panels: { required: [StoryPanel] },
}) {
    init() {
        this.ray = new Ray();
        this.aim = new Vector3();
        this.v = new Vector3();
        this.plane = new Plane(new Vector3(0, 1, 0), 0);
        this.caster = new Raycaster();
        this.hits = [];
        this.center = new Vector3();
        this.up = new Vector3(0, 1, 0);
        this.active = null; // mano que está presionando
        this.sel = { start: false, end: false };
        this.evt = { clientX: 0, clientY: 0, pointerId: 7, pointerType: 'xr', ray: this.ray, ndcX: 0, ndcY: 0, button: 0 };
        this.world.globals.cuentoAim = this.aim;
        this.drumPos = new Vector3();
        this.touchArmed = { left: true, right: true };

        // mouse en el navegador (sin VR): mismo camino que el rayo
        this.mouse = { down: false, start: false, end: false, ndc: new Vector2(), has: false };
        const el = this.world.renderer.domElement;
        const toNdc = (e) => {
            const r = el.getBoundingClientRect();
            this.mouse.ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
            this.mouse.has = true;
        };
        const down = (e) => { toNdc(e); this.mouse.down = true; this.mouse.start = true; unlockAudio(); };
        const move = (e) => toNdc(e);
        const up = (e) => { toNdc(e); this.mouse.down = false; this.mouse.end = true; };
        el.addEventListener('pointerdown', down);
        el.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
        this.cleanupFuncs.push(() => {
            el.removeEventListener('pointerdown', down);
            el.removeEventListener('pointermove', move);
            window.removeEventListener('pointerup', up);
        });
    }

    /**
     * ¿Es una mano (tracking de manos) y no un control? Con el tracking de manos
     * IWSDK también crea un "gamepad" por mano, así que `gamepads[lado]` no sirve
     * para distinguirlos: se usa la fuente real (interaction/hands.js).
     */
    isHand(side) { return this.world.globals.hands?.h[side]?.kind === 'hand'; }

    /** Estado del "seleccionar" de una mano: control (gatillo) o mano (pellizco). Sin asignaciones. */
    select(hand) {
        const pad = this.input.xr.gamepads[hand];
        const hs = this.input.xr.getSelectState(hand);
        const s = this.sel;
        s.start = !!(pad?.getSelectStart() || hs?.start);
        s.end = !!(pad?.getSelectEnd() || hs?.end);
        return s;
    }

    /** Rayo de la mano en el mundo + mira proyectada a la pantalla virtual del cuento. */
    fill(hand, c) {
        if (hand === 'mouse') {
            this.caster.setFromCamera(this.mouse.ndc, this.world.camera);
            this.ray.copy(this.caster.ray);
        } else {
            const space = this.player.raySpaces[hand];
            space.updateWorldMatrix(true, false);
            this.ray.origin.setFromMatrixPosition(space.matrixWorld);
            this.ray.direction.set(0, 0, -1).transformDirection(space.matrixWorld);
        }
        // mira: lo que toca el rayo en el escenario (radar) o el piso de la página
        let ok = false;
        if (c.pointer.tracker && c.story.scene) {
            this.caster.ray.copy(this.ray);
            this.caster.camera = c.viewCam; // los sprites del escenario la necesitan
            this.hits.length = 0;
            this.caster.intersectObject(c.story.scene.group, true, this.hits);
            if (this.hits.length) { this.aim.copy(this.hits[0].point); ok = true; }
        }
        if (!ok) {
            c.book.stage.getWorldPosition(this.v);
            this.plane.constant = -this.v.y;
            ok = !!this.ray.intersectPlane(this.plane, this.aim);
        }
        if (!ok) this.aim.copy(this.ray.direction).multiplyScalar(3 * (this.world.globals.cuentoScale ?? 1)).add(this.ray.origin);
        this.v.copy(this.aim).project(c.viewCam);
        const e = this.evt;
        e.ndcX = this.v.x;
        e.ndcY = this.v.y;
        e.clientX = ((this.v.x + 1) / 2) * VIRTUAL;
        e.clientY = ((1 - this.v.y) / 2) * VIRTUAL;
        return e;
    }

    /** ¿El rayo de esta mano apunta a un panel visible? (entonces el clic es del panel). */
    onPanel() {
        for (const e of this.queries.panels.entities) {
            const o = e.object3D;
            if (!o?.visible) continue;
            o.getWorldPosition(this.center);
            // paneles de ~64×42 cm: un círculo de 36 cm (× su escala) alrededor del centro
            const r = 3.6 * o.scale.x;
            if (this.ray.distanceSqToPoint(this.center) < r * r && this.center.sub(this.ray.origin).dot(this.ray.direction) > 0) return true;
        }
        return false;
    }

    /** ¿El rayo pasa cerca de `p` (a menos de r metros, por delante)? */
    rayNear(p, r) {
        return this.ray.distanceSqToPoint(p) < r * r && this.v.copy(p).sub(this.ray.origin).dot(this.ray.direction) > 0;
    }

    /** Tambor tocado con el cuerpo del control o la mano (flanco: hay que alejarse para volver a tocar). */
    drumTouch(c) {
        const drum = c.ui.el.drum;
        if (drum.hidden || !drum.onclick || !c.ui.drumTarget) return;
        const k = this.world.globals.dioramaScale ?? 0.17;
        c.ui.drumTarget.getWorldPosition(this.drumPos);
        for (const h of HANDS) {
            const grip = this.player.gripSpaces?.[h] ?? this.player.raySpaces[h];
            if (!grip || (!this.input.xr.gamepads[h] && !this.input.xr.getSelectState(h))) continue;
            grip.getWorldPosition(this.center);
            const d = this.center.distanceTo(this.drumPos);
            if (d < 0.06 + 0.2 * k && this.touchArmed[h]) {
                this.touchArmed[h] = false;
                unlockAudio();
                drum.onclick();
            } else if (d > 0.1 + 0.3 * k) this.touchArmed[h] = true;
        }
    }

    update() {
        const c = this.world.globals.cuento;
        if (!c || this.world.globals.cuentoPaused || this.world.globals.placing) {
            this.mouse.start = this.mouse.end = false;
            return;
        }
        const immersive = this.world.visibilityState.peek() !== VisibilityState.NonImmersive;
        const { pointer, ui, story } = c;

        // el corazón del ritmo (HeartSystem) reemplaza al toque del tambor sobre Nico
        if (immersive && !this.world.globals.heart?.active) this.drumTouch(c);

        // entradas de este cuadro
        let startHand = null;
        let ended = false;
        if (immersive) {
            for (const h of HANDS) {
                const s = this.select(h);
                if (s.start && !this.active && !startHand) startHand = h;
                if (s.end && this.active === h) ended = true;
                if (s.start) unlockAudio(); // en VR no hay "pointerdown" del documento
            }
        } else {
            if (this.mouse.start && !this.active) startHand = 'mouse';
            if (this.mouse.end && this.active === 'mouse') ended = true;
            this.mouse.start = this.mouse.end = false;
        }

        if (startHand) {
            const e = this.fill(startHand, c);
            // icono del panel minimizado o sello de la página (rayo + gatillo)
            if (this.world.globals.panel?.rayClick(this.ray) || this.world.globals.pages?.rayClick(this.ray)) startHand = null;
            // una pinza junto a un objeto es un agarre (HandInteractionSystem), no un clic a distancia
            const hs = this.world.globals.handState?.[startHand];
            if (startHand && hs && hs.mode !== 'idle' && this.isHand(startHand)) startHand = null;
        }
        if (startHand) {
            const e = this.evt;
            // con la MANO (sin control) lo manipulable no se arrastra a distancia: se agarra con los dedos
            const handOnly = startHand !== 'mouse' && this.isHand(startHand);
            let farDrag = false;
            // radar en el visor: los peligros se tocan con la punta del índice (RadarTouchSystem), no con el rayo de la mano
            const radarTouch = handOnly && this.world.globals.radarTouch?.active;
            // zapatos: se toman con los dedos (ShoesSystem), la pinza a distancia no los pone
            const shoesHand = handOnly && this.world.globals.shoes?.active;
            // corazón: se golpea con la mano (contacto + velocidad), NUNCA con la pinza ni el rayo de la mano
            const heartHand = handOnly && this.world.globals.heart?.active;
            if (handOnly && pointer.draggables.size) {
                pointer.setNdc(e);
                farDrag = !!pointer.pick(pointer.draggables);
            }
            if (!this.onPanel() && !farDrag && !radarTouch && !shoesHand) {
                story.scene?.skipReveal(); // como tocar el lienzo en la web
                const drum = ui.el.drum;
                const k = this.world.globals.dioramaScale ?? 0.17;
                const nico = story.scene?.nico;
                if (!drum.hidden && drum.onclick) {
                    if (heartHand) { /* la pinza no golpea el corazón */ }
                    // juego 2: el golpe al ritmo, apuntando al tambor de la maqueta
                    else if (ui.drumTarget) ui.drumTarget.getWorldPosition(this.drumPos);
                    if (!heartHand && (!ui.drumTarget || this.rayNear(this.drumPos, 0.05 + 0.35 * k))) drum.onclick();
                } else if (ui.onStepsGo && ui.vrSteps && nico && this.rayNear(nico.getWorldPosition(this.drumPos).addScaledVector(this.up, 0.5 * k), 0.04 + 0.5 * k)) {
                    ui.onStepsGo(); // «Ponerse a salvo»: tocar a Nico es el siguiente paso
                } else {
                    this.active = startHand;
                    // con la mano, la hoja se pasa agarrándola (PageSystem), no con el rayo
                    const fallback = pointer.fallback;
                    if (handOnly) pointer.fallback = null;
                    pointer.onDown(e);
                    pointer.fallback = fallback;
                }
            }
        }
        if (this.active) {
            const e = this.fill(this.active, c);
            if (ended) {
                pointer.onUp(e);
                this.active = null;
            } else pointer.onMove(e);
        } else if (pointer.tracker && !(immersive && this.world.globals.radarTouch?.active)) {
            // radar: sigue al rayo aunque no se presione (como el dedo/mouse en la web)
            const hand = immersive ? (this.input.xr.gamepads.right || !this.input.xr.gamepads.left ? 'right' : 'left') : this.mouse.has ? 'mouse' : null;
            if (hand) {
                const e = this.fill(hand, c);
                if (!this.onPanel()) pointer.onMove(e);
            }
        }
    }
}

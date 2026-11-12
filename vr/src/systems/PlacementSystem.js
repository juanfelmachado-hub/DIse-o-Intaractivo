/**
 * PlacementSystem — la maqueta sobre el piso real (realidad mixta).
 *
 * El cuento ya no mueve ni escala al lector: el lector camina de verdad
 * alrededor de un mundo en miniatura que está quieto en su habitación.
 *
 *  1. Al entrar a la sesión inmersiva (passthrough) se muestra una vista previa
 *     semitransparente del área de la maqueta donde apunta el rayo.
 *  2. El piso se busca con el hit-test de WebXR (EnvironmentRaycastTarget de
 *     IWSDK): solo valen superficies horizontales a la altura del piso. Si el
 *     visor no da hit-test, se usa el piso del espacio de referencia
 *     `local-floor` (y = 0), que el Quest calibra con su límite de seguridad.
 *  3. Gatillo o pellizco: el libro queda ahí, con su frente hacia el lector.
 *
 * Después: palanca izquierda/derecha gira la maqueta 30°, arriba/abajo cambia
 * su tamaño; A/X (o «Mover» en el panel) vuelve a colocarla. El panel del
 * cuento queda fijo junto a la maqueta (PanelSystem).
 */
import {
    createSystem, CanvasTexture, Color, DoubleSide, EdgesGeometry, EnvironmentRaycastTarget, Group, InputComponent, LineBasicMaterial,
    LineSegments, Mesh, MeshBasicMaterial, Object3D, PlaneGeometry, CircleGeometry, Quaternion, Euler, RaycastSpace, Plane, Ray,
    Vector3, VisibilityState, SRGBColorSpace,
} from '@iwsdk/core';
import { PlayerSpot, StoryState } from '../story-components.js';
import { DIORAMA_SCALE, DIORAMA_SCALES, fitShadow } from '../story/runtime.js';

const HANDS = ['right', 'left'];
const SNAP = Math.PI / 6;
/** Huella de la maqueta en unidades del cuento (libro abierto 6,1 × 4 + margen). */
const FOOT_W = 7.2;
const FOOT_D = 5.2;
/** Un punto del hit-test cuenta como piso si está a menos de esto del y = 0 de local-floor. */
const FLOOR_TOL = 0.25;
/** Posición de la maqueta en el navegador sin visor (la cámara de iwsdk.config.json la mira). */
const DESK = { x: 0, y: 0, z: -0.8 };

function label(lines) {
    const c = document.createElement('canvas');
    c.width = 1024;
    c.height = 256;
    const g = c.getContext('2d');
    g.fillStyle = 'rgba(20, 16, 32, 0.82)';
    g.beginPath();
    g.roundRect(8, 8, 1008, 240, 48);
    g.fill();
    g.fillStyle = '#fff8e8';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.font = '600 58px "Fredoka", system-ui, sans-serif';
    lines.forEach((t, i) => g.fillText(t, 512, 128 + (i - (lines.length - 1) / 2) * 76));
    const tex = new CanvasTexture(c);
    tex.colorSpace = SRGBColorSpace;
    const m = new Mesh(new PlaneGeometry(0.56, 0.14), new MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, fog: false }));
    m.renderOrder = 30;
    return m;
}

export class PlacementSystem extends createSystem({
    state: { required: [StoryState] },
}) {
    init() {
        this.v = new Vector3();
        this.w = new Vector3();
        this.hit = new Vector3();
        this.up = new Vector3(0, 1, 0);
        this.q = new Quaternion();
        this.e = new Euler(0, 0, 0, 'YXZ');
        this.ray = new Ray();
        this.floor = new Plane(new Vector3(0, 1, 0), 0);
        this.scaleIndex = DIORAMA_SCALES.indexOf(DIORAMA_SCALE);
        this.placing = false;
        this.placedImmersive = false;
        this.wasImmersive = null;
        this.stickArmed = { left: true, right: true };
        this.lastHand = 'right';
        this.previewYaw = 0;
        this.deskBg = new Color('#241d33');

        // sondas de hit-test (una por mano): IWSDK las pone donde el rayo toca el mundo real
        this.probes = {};
        for (const hand of HANDS) {
            const o = new Object3D();
            o.visible = false;
            const ent = this.world.createTransformEntity(o, { persistent: true });
            ent.addComponent(EnvironmentRaycastTarget, { space: hand === 'right' ? RaycastSpace.Right : RaycastSpace.Left, maxDistance: 8 });
            this.probes[hand] = o;
        }

        // vista previa: el área gris de la maqueta, su borde, el centro y la flecha del frente
        const preview = new Group();
        preview.name = 'vista-previa-maqueta';
        const area = new Mesh(new PlaneGeometry(1, 1), new MeshBasicMaterial({ color: '#b9b4c4', transparent: true, opacity: 0.32, depthWrite: false, side: DoubleSide, fog: false }));
        area.rotation.x = -Math.PI / 2;
        const edge = new LineSegments(new EdgesGeometry(area.geometry), new LineBasicMaterial({ color: '#fff8e8', transparent: true, opacity: 0.85, fog: false }));
        edge.rotation.x = -Math.PI / 2;
        const dot = new Mesh(new CircleGeometry(0.018, 24), new MeshBasicMaterial({ color: '#ff9a2e', fog: false, depthWrite: false }));
        dot.rotation.x = -Math.PI / 2;
        dot.position.y = 0.002;
        this.footprint = new Group();
        this.footprint.add(area, edge);
        const arrow = new Mesh(new CircleGeometry(0.03, 3), new MeshBasicMaterial({ color: '#ffd84d', fog: false, depthWrite: false }));
        arrow.rotation.set(-Math.PI / 2, 0, -Math.PI / 2); // apunta al lector (+z de la maqueta)
        arrow.position.y = 0.002;
        this.arrow = arrow;
        this.hint = label(['Apunta al piso y aprieta el gatillo', 'o pellizca para colocar el libro']);
        this.hintFloor = label(['Buscando el piso…', 'apunta hacia abajo']);
        preview.add(this.footprint, dot, arrow);
        preview.visible = false;
        for (const o of [area, edge, dot, arrow]) o.renderOrder = 25;
        this.preview = preview;
        this.world.createTransformEntity(preview, { persistent: true });
        for (const h of [this.hint, this.hintFloor]) {
            h.visible = false;
            this.world.createTransformEntity(h, { persistent: true });
        }
        this.sizePreview();

        this.spotEntity = this.world.createEntity();
        this.spotEntity.addComponent(PlayerSpot, { spot: 'escritorio', eye: 0, scale: DIORAMA_SCALE });

        this.world.globals.placement = {
            recenter: () => this.startPlacing(),
            nearNico: () => this.cycleScale(1, true),
            setTextScale: (s) => this.world.globals.panel?.setTextScale(s),
            rotate: (a) => this.rotate(a),
        };
        this.world.globals.dioramaScale = DIORAMA_SCALE;
        this.world.globals.cuentoScale = 1; // el lector ya no se escala
    }

    get k() { return DIORAMA_SCALES[this.scaleIndex]; }

    sizePreview() {
        const k = this.k;
        this.footprint.scale.set(FOOT_W * k, 1, FOOT_D * k);
        this.arrow.position.z = (FOOT_D * k) / 2 - 0.05;
    }

    /** Vuelve a la vista previa (al entrar en la sesión, con A/X o con «Mover»). */
    startPlacing() {
        if (this.world.visibilityState.peek() === VisibilityState.NonImmersive) return;
        this.placing = true;
        this.world.globals.placing = true;
        const c = this.world.globals.cuento;
        if (c) c.diorama.visible = false;
        this.spotEntity.setValue(PlayerSpot, 'spot', 'colocando');
    }

    /** Deja la maqueta en el piso: centro en `p`, con el frente hacia `yaw`. */
    place(p, yaw) {
        const c = this.world.globals.cuento;
        if (!c) return;
        const d = c.diorama;
        d.position.copy(p);
        d.rotation.set(0, yaw, 0);
        d.scale.setScalar(this.k);
        d.visible = true;
        d.updateMatrixWorld(true);
        fitShadow(c.env, this.k);
        this.world.globals.dioramaScale = this.k;
        this.placing = false;
        this.world.globals.placing = false;
        this.preview.visible = this.hint.visible = this.hintFloor.visible = false;
        this.spotEntity.setValue(PlayerSpot, 'spot', this.world.visibilityState.peek() === VisibilityState.NonImmersive ? 'escritorio' : 'maqueta');
        this.spotEntity.setValue(PlayerSpot, 'scale', this.k);
        this.world.globals.placedAt = performance.now(); // el panel vuelve junto a la maqueta
    }

    /** Tamaño de la maqueta (Nico ≈ 11, 16 o 21 cm), sin moverla del piso. */
    cycleScale(step, wrap = false) {
        const n = DIORAMA_SCALES.length;
        const i = wrap ? (this.scaleIndex + step + n) % n : Math.max(0, Math.min(n - 1, this.scaleIndex + step));
        if (i === this.scaleIndex) return;
        this.scaleIndex = i;
        this.sizePreview();
        const c = this.world.globals.cuento;
        if (!c || this.placing) return;
        c.diorama.scale.setScalar(this.k);
        fitShadow(c.env, this.k);
        this.world.globals.dioramaScale = this.k;
        this.spotEntity.setValue(PlayerSpot, 'scale', this.k);
    }

    /** Gira la maqueta sobre su centro (por pasos: el piso no se mueve bajo los pies). */
    rotate(a) {
        const c = this.world.globals.cuento;
        if (!c || this.placing) return;
        c.diorama.rotation.y += a;
    }

    /**
     * Punto del piso al que apunta una mano. Primero el hit-test real (solo si
     * es horizontal y está a la altura del piso); si no hay, el plano y = 0.
     * Devuelve 'hit', 'floor' o null.
     */
    floorPoint(hand) {
        const probe = this.probes[hand];
        if (probe.visible) {
            this.v.set(0, 1, 0).applyQuaternion(probe.quaternion);
            if (this.v.y > 0.9 && Math.abs(probe.position.y) < FLOOR_TOL) {
                this.hit.copy(probe.position);
                return 'hit';
            }
        }
        const space = this.player.raySpaces[hand];
        if (!space || !this.input.xr.gamepads[hand] && !this.input.xr.getSelectState(hand)) return null;
        space.updateWorldMatrix(true, false);
        this.ray.origin.setFromMatrixPosition(space.matrixWorld);
        this.ray.direction.set(0, 0, -1).transformDirection(space.matrixWorld);
        if (this.ray.direction.y > -0.05) return null; // apuntando al techo o al horizonte
        if (!this.ray.intersectPlane(this.floor, this.hit)) return null;
        if (this.hit.distanceTo(this.ray.origin) > 6) return null;
        return 'floor';
    }

    updatePlacing() {
        // la mano que se usó por última vez manda; si no tiene rayo, la otra
        let kind = null;
        let hand = null;
        for (const h of [this.lastHand, this.lastHand === 'right' ? 'left' : 'right']) {
            kind = this.floorPoint(h);
            if (kind) { hand = h; break; }
        }
        const head = this.world.camera;
        head.getWorldPosition(this.w);
        this.preview.visible = !!kind;
        if (kind) {
            this.previewYaw = Math.atan2(this.w.x - this.hit.x, this.w.z - this.hit.z);
            this.preview.position.copy(this.hit);
            this.preview.position.y += 0.002;
            this.preview.rotation.set(0, this.previewYaw, 0);
        }
        // indicación flotando frente al lector, un poco abajo
        const hint = kind ? this.hint : this.hintFloor;
        const other = kind ? this.hintFloor : this.hint;
        other.visible = false;
        hint.visible = true;
        head.getWorldQuaternion(this.q);
        this.e.setFromQuaternion(this.q);
        const yaw = this.e.y;
        hint.position.set(this.w.x - Math.sin(yaw) * 0.75, this.w.y - 0.28, this.w.z - Math.cos(yaw) * 0.75);
        hint.rotation.set(-0.35, yaw, 0, 'YXZ');

        for (const h of HANDS) {
            const pad = this.input.xr.gamepads[h];
            const hs = this.input.xr.getSelectState(h);
            if (!(pad?.getSelectStart() || hs?.start)) continue;
            this.lastHand = h;
            if (h !== hand) {
                const k2 = this.floorPoint(h);
                if (!k2) continue;
                this.previewYaw = Math.atan2(this.w.x - this.hit.x, this.w.z - this.hit.z);
            } else if (!kind) continue;
            this.spotEntity.setValue(PlayerSpot, 'eye', this.w.y - this.hit.y); // altura de los ojos sobre la maqueta
            this.place(this.hit, this.previewYaw);
            return;
        }
    }

    update(delta) {
        const c = this.world.globals.cuento;
        if (!c) return;
        const immersive = this.world.visibilityState.peek() !== VisibilityState.NonImmersive;
        if (immersive !== this.wasImmersive) {
            this.wasImmersive = immersive;
            // en el visor se ve la habitación (passthrough); en el navegador, un fondo de noche
            this.world.scene.background = immersive ? null : this.deskBg;
            if (immersive) this.startPlacing();
            else {
                // navegador sin visor: la maqueta frente a la cámara inicial
                this.placing = false;
                this.world.globals.placing = false;
                this.place(this.v.set(DESK.x, DESK.y, DESK.z), 0);
            }
        }
        if (this.placing) {
            this.updatePlacing();
            return;
        }

        if (!immersive) return;
        // A/X: volver a colocar · palanca: girar la maqueta (izq./der.) o cambiar su tamaño (arriba/abajo)
        for (const hand of HANDS) {
            const pad = this.input.xr.gamepads[hand];
            if (!pad) continue;
            if (pad.getSelectStart()) this.lastHand = hand;
            if (pad.getButtonDown(InputComponent.A_Button) || pad.getButtonDown(InputComponent.X_Button)) {
                this.lastHand = hand;
                this.startPlacing();
                return;
            }
            const axes = pad.getAxesValues(InputComponent.Thumbstick);
            const x = axes?.x ?? 0;
            const y = axes?.y ?? 0;
            const m = Math.max(Math.abs(x), Math.abs(y));
            if (m < 0.35) this.stickArmed[hand] = true;
            else if (m > 0.75 && this.stickArmed[hand]) {
                this.stickArmed[hand] = false;
                if (Math.abs(x) >= Math.abs(y)) this.rotate(x > 0 ? SNAP : -SNAP);
                else this.cycleScale(y < 0 ? 1 : -1); // palanca arriba (y < 0): más grande
            }
        }
    }
}

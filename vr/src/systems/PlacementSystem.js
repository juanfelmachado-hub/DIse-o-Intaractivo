/**
 * PlacementSystem — dónde está el lector, siempre con fundido (comodidad).
 *
 * El cuento de la web movía una cámara cinematográfica. En VR nada mueve la
 * cabeza del lector: el lector "aparece" en tres lugares, cada cambio con un
 * fundido a negro corto, y entre fundidos todo queda quieto.
 *
 *   portada   de pie frente al libro gigante cerrado
 *   general   mirando el libro desde arriba (abrir, pasar y cerrar la hoja)
 *   página    junto a Nico, a la altura de sus ojos, sobre la página
 *
 * El tamaño del lector se ajusta escalando el "rig" del jugador (escala =
 * altura de ojos deseada / altura real de la cabeza): así Nico se ve de su
 * tamaño de niño sin tocar el cuento. También: giro por pasos con la palanca,
 * recentrar (A/X o botón del panel) e "Ir junto a Nico".
 */
import { createSystem, InputComponent, Mesh, MeshBasicMaterial, SphereGeometry, BackSide, Vector3, Quaternion, Euler, VisibilityState } from '@iwsdk/core';
import { PlayerSpot, StoryPanel, StoryState } from '../story-components.js';

const EYE_COVER = 2.1;
const EYE_OVER = 3.4;
const EYE_NICO = 0.78; // sobre el piso de la página (Nico mide ≈0.95)
const FADE_OUT = 0.28;
const FADE_IN = 0.45;
const SNAP = Math.PI / 6;

export class PlacementSystem extends createSystem({
    state: { required: [StoryState] },
    panels: { required: [StoryPanel] },
}) {
    init() {
        this.v = new Vector3();
        this.w = new Vector3();
        this.q = new Quaternion();
        this.e = new Euler(0, 0, 0, 'YXZ');
        this.up = new Vector3(0, 1, 0);
        this.spotKey = '';
        this.pending = null;
        this.fading = false; // false | 'out' | 'apply' | 'in'
        this.turnArmed = { left: true, right: true };
        this.panelYaw = 0;
        this.textScale = 1;

        // fundido: una esfera negra alrededor de la cabeza, dibujada al final
        this.fade = new Mesh(
            new SphereGeometry(0.4, 16, 12),
            new MeshBasicMaterial({ color: '#05040a', side: BackSide, transparent: true, opacity: 1, depthTest: false, depthWrite: false, fog: false }),
        );
        this.fade.renderOrder = 9999;
        this.fade.frustumCulled = false;
        this.world.camera.add(this.fade);

        this.spotEntity = this.world.createEntity();
        this.spotEntity.addComponent(PlayerSpot, {});

        this.world.globals.placement = {
            recenter: () => this.go(this.spotKey, true),
            nearNico: () => this.go('page', true),
            setTextScale: (s) => { this.textScale = s; this.placePanels(false); },
        };
        // al entrar o salir de VR la altura y el origen cambian: se vuelve a colocar
        this.cleanupFuncs.push(this.world.visibilityState.subscribe(() => {
            if (this.spotKey) this.go(this.spotKey, true);
        }));
    }

    /** Lugar que pide el estado del cuento. */
    wanted(state, c) {
        const mode = state.getValue(StoryState, 'mode');
        if (mode === 'cover' || mode === 'loading') return 'cover';
        if (mode !== 'reading' || state.getValue(StoryState, 'turning') || !c.story.scene) return 'overview';
        return 'page';
    }

    /** Destino de cada lugar: posición en el piso, altura de ojos, punto que se mira. */
    target(key, c) {
        if (key === 'cover') return { x: 0, z: 4.4, floor: 0, eye: EYE_COVER, look: this.w.set(0, 2.05, 0) };
        if (key === 'overview') return { x: 0, z: 6.6, floor: 0, eye: EYE_OVER, look: this.w.set(0, 0.6, 0) };
        const nico = c.story.scene?.nico;
        c.book.stage.getWorldPosition(this.v);
        const floor = this.v.y;
        if (!nico) return { x: 0, z: 1.6, floor, eye: EYE_NICO, look: this.w.set(0, floor + 0.5, 0) };
        nico.getWorldPosition(this.w);
        const x = Math.max(-2.6, Math.min(2.6, this.w.x * 0.7));
        const z = Math.max(1.3, Math.min(1.8, this.w.z + 1.2));
        this.w.y = floor + 0.55;
        return { x, z, floor, eye: EYE_NICO, look: this.w };
    }

    /** Coloca el rig para que la cabeza quede en el lugar pedido, mirando al punto. */
    apply(key, c) {
        const t = this.target(key, c);
        const player = this.world.player;
        const head = this.world.camera;
        const hy = Math.max(0.9, head.position.y);
        const s = t.eye / hy;
        this.e.setFromQuaternion(head.quaternion);
        const headYaw = this.e.y;
        const yaw = Math.atan2(-(t.look.x - t.x), -(t.look.z - t.z));
        const theta = yaw - headYaw;
        player.scale.setScalar(s);
        player.rotation.set(0, theta, 0);
        this.v.set(head.position.x * s, 0, head.position.z * s).applyAxisAngle(this.up, theta);
        player.position.set(t.x - this.v.x, t.floor, t.z - this.v.z);
        player.updateMatrixWorld(true);
        this.spotKey = key;
        this.spotEntity.setValue(PlayerSpot, 'spot', key);
        this.spotEntity.setValue(PlayerSpot, 'eye', t.eye);
        this.spotEntity.setValue(PlayerSpot, 'scale', 1 / s);
        this.world.globals.cuentoScale = s;
        this.placePanels(true);
    }

    /** Cambio de lugar con fundido (nunca un movimiento continuo de cámara). */
    go(key, force = false) {
        const c = this.world.globals.cuento;
        if (!c || (!force && key === this.spotKey)) return;
        this.pending = key;
        // primera colocación: directo desde negro; si no, primero se oscurece
        if (!this.fading) this.fading = this.spotKey ? 'out' : 'apply';
    }

    /** Fundido con tiempo real (también en pausa): out → colocar → in. */
    stepFade(dt, c) {
        const m = this.fade.material;
        if (this.fading === 'out') {
            m.opacity = Math.min(1, m.opacity + dt / FADE_OUT);
            if (m.opacity >= 1) this.fading = 'apply';
        } else if (this.fading === 'apply') {
            m.opacity = 1;
            this.apply(this.pending, c);
            this.pending = null;
            this.fading = 'in';
        } else if (this.fading === 'in') {
            if (this.pending) { this.fading = 'apply'; return; }
            m.opacity = Math.max(0, m.opacity - dt / FADE_IN);
            if (m.opacity <= 0) this.fading = false;
        }
        this.fade.visible = m.opacity > 0.001;
    }

    /** Los paneles se colocan frente al lector (el del cuento, un poco a la izquierda). */
    placePanels(snapYaw) {
        const head = this.world.camera;
        head.getWorldPosition(this.v);
        head.getWorldQuaternion(this.q);
        this.e.setFromQuaternion(this.q);
        if (snapYaw) this.panelYaw = this.e.y;
        const s = this.world.globals.cuentoScale ?? 1;
        for (const ent of this.queries.panels.entities) {
            const obj = ent.object3D;
            if (!obj) continue;
            const role = ent.getValue(StoryPanel, 'role');
            const side = role === 'story' ? 0.42 : 0;
            const yaw = this.panelYaw + side;
            const dist = (role === 'story' ? 0.85 : 0.95) * s;
            obj.position.set(this.v.x - Math.sin(yaw) * dist, this.v.y - (role === 'story' ? 0.22 : 0.08) * s, this.v.z - Math.cos(yaw) * dist);
            obj.rotation.set(-0.12, yaw, 0, 'YXZ');
            obj.scale.setScalar(0.1 * s * (role === 'story' ? this.textScale : 1)); // los paneles se diseñan en mm
        }
    }

    update(delta) {
        const c = this.world.globals.cuento;
        const state = this.world.globals.cuentoState;
        if (!c || !state) return;
        this.stepFade(Math.min(delta, 0.1), c);

        const key = this.wanted(state, c);
        if (key !== this.spotKey && this.pending !== key) this.go(key);

        // panel perezoso: si el lector se gira mucho, el panel lo sigue con suavidad
        if (this.spotKey && !this.fading) {
            this.world.camera.getWorldQuaternion(this.q);
            this.e.setFromQuaternion(this.q);
            let d = this.e.y - this.panelYaw;
            d = Math.atan2(Math.sin(d), Math.cos(d));
            if (Math.abs(d) > 0.9) this.followTo = this.e.y;
            if (this.followTo !== undefined) {
                let f = this.followTo - this.panelYaw;
                f = Math.atan2(Math.sin(f), Math.cos(f));
                this.panelYaw += f * Math.min(1, delta * 3);
                if (Math.abs(f) < 0.02) this.followTo = undefined;
            }
            this.placePanels(false);
        }

        if (this.world.visibilityState.peek() === VisibilityState.NonImmersive) return;
        // recentrar (A o X) y giro por pasos (palanca), en cualquiera de los dos controles
        for (const hand of ['left', 'right']) {
            const pad = this.input.xr.gamepads[hand];
            if (!pad) continue;
            if (pad.getButtonDown(InputComponent.A_Button) || pad.getButtonDown(InputComponent.X_Button)) this.go(this.spotKey, true);
            const axes = pad.getAxesValues(InputComponent.Thumbstick);
            const x = axes?.x ?? 0;
            if (Math.abs(x) < 0.35) this.turnArmed[hand] = true;
            else if (Math.abs(x) > 0.75 && this.turnArmed[hand]) {
                this.turnArmed[hand] = false;
                this.snapTurn(x > 0 ? -SNAP : SNAP);
            }
        }
    }

    /** Gira el rig alrededor de la cabeza (instantáneo: sin rotación continua). */
    snapTurn(angle) {
        const player = this.world.player;
        this.world.camera.getWorldPosition(this.v);
        this.w.copy(player.position).sub(this.v).applyAxisAngle(this.up, angle);
        player.position.copy(this.v).add(this.w);
        player.rotation.y += angle;
        player.updateMatrixWorld(true);
        this.panelYaw += angle;
    }
}

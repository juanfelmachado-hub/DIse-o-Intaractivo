/**
 * GestureSystem — «¡Cúbrete!» con el cuerpo del lector.
 *
 * En «Ponerse a salvo» (debajo de la mesa), cuando llega el paso de cubrirse
 * (la postura `cover` de Nico), el Guardián pide al lector que se proteja la
 * cabeza: las dos manos cerca de la parte superior o los lados de la cabeza.
 *
 * Detección (manos reales o controles):
 *  - cada mano (centro de la palma o empuñadura del control) a menos de
 *    HEAD_NEAR del visor y no más abajo que la barbilla (HEAD_BELOW);
 *  - histéresis: se deja de contar recién a HEAD_FAR (no parpadea);
 *  - hay que sostenerlo HOLD segundos (se ve el progreso en la indicación);
 *  - no hay que tocar el visor: basta con acercar las manos.
 *
 * Al reconocerlo, Nico repite la postura, aparece «¡Bien hecho!» y el paso
 * avanza solo. Si el tracking falla, siguen valiendo tocar a Nico o el botón
 * del panel (alternativa accesible).
 */
import { CanvasTexture, createSystem, Mesh, MeshBasicMaterial, PlaneGeometry, SRGBColorSpace, Vector3, Euler, Quaternion, VisibilityState } from '@iwsdk/core';

export const GESTURE_CFG = {
    HEAD_NEAR: 0.3,
    HEAD_FAR: 0.4,
    HEAD_BELOW: 0.14,
    HOLD: 0.6,
};

export class GestureSystem extends createSystem({}) {
    init() {
        this.head = new Vector3();
        this.q = new Quaternion();
        this.e = new Euler(0, 0, 0, 'YXZ');
        this.on = { left: false, right: false };
        this.hold = 0;
        this.done = null; // el paso ya reconocido (no se repite)
        this.canvas = document.createElement('canvas');
        this.canvas.width = 1024;
        this.canvas.height = 300;
        this.tex = new CanvasTexture(this.canvas);
        this.tex.colorSpace = SRGBColorSpace;
        this.hint = new Mesh(new PlaneGeometry(0.5, 0.146), new MeshBasicMaterial({ map: this.tex, transparent: true, depthWrite: false, fog: false }));
        this.hint.renderOrder = 30;
        this.hint.visible = false;
        this.hint.raycast = () => {};
        this.world.createTransformEntity(this.hint, { persistent: true });
        this.drawn = -1;
        this.world.globals.gesture = { get progress() { return sys.hold / GESTURE_CFG.HOLD; }, get active() { return sys.hint.visible; } };
        const sys = this;
    }

    draw(level) {
        if (level === this.drawn) return;
        this.drawn = level;
        const g = this.canvas.getContext('2d');
        g.clearRect(0, 0, 1024, 300);
        g.fillStyle = 'rgba(20, 16, 32, 0.85)';
        g.beginPath();
        g.roundRect(8, 8, 1008, 284, 48);
        g.fill();
        g.fillStyle = '#fff8e8';
        g.textAlign = 'center';
        g.font = '600 56px "Fredoka", system-ui, sans-serif';
        g.fillText('¡Cúbrete tú también!', 512, 90);
        g.font = '500 44px "Fredoka", system-ui, sans-serif';
        g.fillText('Pon las dos manos sobre tu cabeza', 512, 160);
        // barra de progreso del gesto
        g.fillStyle = 'rgba(255,255,255,0.18)';
        g.beginPath();
        g.roundRect(162, 205, 700, 40, 20);
        g.fill();
        g.fillStyle = '#7be07b';
        g.beginPath();
        g.roundRect(162, 205, Math.max(40, 700 * level / 10), 40, 20);
        g.fill();
        this.tex.needsUpdate = true;
    }

    /** Paso de «cubrirse» activo en «Ponerse a salvo». */
    coverStep(c) {
        const v = c.ui.vrSteps;
        if (!c.ui.onStepsGo || !v || v.phase !== 'step') return null;
        const s = v.steps?.[v.index];
        return s?.pose === 'cover' ? v.index : null;
    }

    update(delta) {
        const c = this.world.globals.cuento;
        const hands = this.world.globals.hands;
        const immersive = this.world.visibilityState.peek() !== VisibilityState.NonImmersive;
        const step = c && immersive && !this.world.globals.cuentoPaused ? this.coverStep(c) : null;
        if (step === null || step === this.done) {
            this.hint.visible = false;
            this.hold = 0;
            if (step === null) this.done = null;
            return;
        }
        const dt = Math.min(delta, 0.1);
        const cam = this.world.camera;
        cam.getWorldPosition(this.head);
        let both = true;
        for (const side of ['left', 'right']) {
            const h = hands.h[side];
            if (!h.tracked) { this.on[side] = false; both = false; continue; }
            const d = h.palm.distanceTo(this.head);
            const high = h.palm.y > this.head.y - GESTURE_CFG.HEAD_BELOW;
            this.on[side] = this.on[side] ? d < GESTURE_CFG.HEAD_FAR && high : d < GESTURE_CFG.HEAD_NEAR && high;
            if (!this.on[side]) both = false;
        }
        this.hold = both ? this.hold + dt : Math.max(0, this.hold - dt * 2);

        // indicación frente al lector, un poco abajo (no tapa la maqueta)
        cam.getWorldQuaternion(this.q);
        this.e.setFromQuaternion(this.q);
        const yaw = this.e.y;
        this.hint.position.set(this.head.x - Math.sin(yaw) * 0.7, this.head.y - 0.12, this.head.z - Math.cos(yaw) * 0.7);
        this.hint.rotation.set(-0.1, yaw, 0, 'YXZ');
        this.hint.visible = true;
        this.draw(Math.min(10, Math.floor((this.hold / GESTURE_CFG.HOLD) * 10)));

        if (this.hold >= GESTURE_CFG.HOLD) {
            this.done = step;
            this.hold = 0;
            this.hint.visible = false;
            const scene = c.story.scene;
            const nico = scene?.nico;
            nico?.pose('cover', 0.4); // Nico imita al lector
            scene?.guardian?.mimic?.('cover');
            if (nico) {
                nico.getWorldPosition(this.head);
                this.head.y += 0.8 * c.diorama.scale.x;
                c.ui.sfxAt?.('¡Bien hecho!', this.head);
            }
            c.ui.onStepsGo?.();
        }
    }
}

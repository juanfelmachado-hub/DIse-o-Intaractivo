/**
 * PanelSystem — el panel del cuento como un objeto de la habitación.
 *
 * Ya no sigue a la cabeza: aparece junto a la maqueta (a su izquierda, mirando
 * al lector, a la altura de una mesa) y se queda quieto aunque el lector gire
 * o camine alrededor. Se mueve tomándolo de su ASA (la barra bajo el panel):
 *
 *  - mano: pinza sobre el asa (≤ 2 cm), mover, girar la muñeca para rotarlo,
 *    abrir los dedos para soltarlo;
 *  - control: botón lateral cerca del asa, o apuntarle con el rayo y apretar
 *    el botón lateral (se arrastra a distancia).
 *
 * Solo el asa lo mueve: tocar los botones o jugar no lo desplaza. «Ocultar» lo
 * minimiza a un icono junto al libro (tocarlo o apuntarle con el gatillo lo
 * devuelve). «Panel a su lugar» (menú) lo regresa junto a la maqueta. El
 * tamaño se cambia con «Texto» en el menú. La posición se conserva durante la
 * sesión; al volver a colocar el libro el panel vuelve a su lugar inicial.
 */
import {
    CanvasTexture, CircleGeometry, createSystem, Group, Mesh, MeshBasicMaterial, Quaternion, Ray, SRGBColorSpace, Vector3, Euler, VisibilityState,
    BoxGeometry, SphereGeometry,
} from '@iwsdk/core';
import { StoryPanel } from '../story-components.js';
import { fitLocalBox } from '../interaction/shapes.js';

const PANEL_H = 0.42; // alto del panel del cuento a tamaño 1 (m)
const TABLE_Y = 0.95; // altura inicial sobre el piso (m)
const TILT = -0.32; // inclinado hacia atrás: se lee mirando hacia abajo

function iconTexture() {
    const c = document.createElement('canvas');
    c.width = c.height = 256;
    const g = c.getContext('2d');
    g.fillStyle = '#2a2238';
    g.beginPath();
    g.arc(128, 128, 120, 0, Math.PI * 2);
    g.fill();
    g.strokeStyle = '#ffd84d';
    g.lineWidth = 12;
    g.stroke();
    g.fillStyle = '#fff8e8';
    for (let i = 0; i < 3; i++) {
        g.beginPath();
        g.roundRect(70, 78 + i * 38, 116 - i * 22, 18, 9);
        g.fill();
    }
    const t = new CanvasTexture(c);
    t.colorSpace = SRGBColorSpace;
    return t;
}

export class PanelSystem extends createSystem({
    panels: { required: [StoryPanel] },
}) {
    init() {
        this.pos = new Vector3(0, 1, -0.6);
        this.yaw = 0;
        this.textScale = 1;
        this.hidden = false;
        this.v = new Vector3();
        this.w = new Vector3();
        this.up = new Vector3(0, 1, 0);
        this.q = new Quaternion();
        this.e = new Euler(0, 0, 0, 'YXZ');
        this.ray = new Ray();
        this.rayGrab = null;

        // asa: una barra redondeada bajo el panel
        this.handle = new Group();
        const bar = new Mesh(new BoxGeometry(0.16, 0.018, 0.018), new MeshBasicMaterial({ color: '#d9d4e4', transparent: true, opacity: 0.92, fog: false }));
        const dots = new Mesh(new SphereGeometry(0.004, 8, 6), new MeshBasicMaterial({ color: '#2a2238', fog: false }));
        dots.position.z = 0.01;
        this.handle.add(bar, dots);
        this.bar = bar;
        this.world.createTransformEntity(this.handle, { persistent: true });

        // icono minimizado junto al libro
        this.icon = new Mesh(new CircleGeometry(0.035, 32), new MeshBasicMaterial({ map: iconTexture(), transparent: true, fog: false, depthWrite: false }));
        this.icon.renderOrder = 22;
        this.icon.visible = false;
        this.world.createTransformEntity(this.icon, { persistent: true });

        const sys = this;
        this.world.globals.panel = {
            reset: () => this.reset(),
            hide: () => { this.hidden = true; },
            show: () => { this.hidden = false; },
            get hidden() { return sys.hidden; },
            setTextScale: (s) => { this.textScale = s; },
            /** Rayo de un control al apretar el gatillo: ¿tocó el icono? */
            rayClick: (ray) => this.rayClick(ray),
        };
        this.registered = false;
    }

    /** Junto a la maqueta, a su izquierda vista desde el lector, mirándolo. */
    reset() {
        const c = this.world.globals.cuento;
        if (!c) return;
        const d = c.diorama;
        const head = this.world.camera.getWorldPosition(this.v);
        const f = this.w.copy(d.position).sub(head).setY(0);
        if (f.lengthSq() < 1e-4) f.set(0, 0, -1);
        f.normalize();
        const half = 3.6 * d.scale.x; // media maqueta (unidades del cuento × escala)
        // izquierda = (fz, 0, -fx)
        this.pos.set(d.position.x + f.z * (half + 0.32) - f.x * 0.15, d.position.y + TABLE_Y, d.position.z - f.x * (half + 0.32) - f.z * 0.15);
        this.yaw = Math.atan2(head.x - this.pos.x, head.z - this.pos.z);
        this.hidden = false;
    }

    layout() {
        const s = this.textScale;
        for (const ent of this.queries.panels.entities) {
            const obj = ent.object3D;
            if (!obj) continue;
            obj.position.copy(this.pos);
            obj.rotation.set(TILT, this.yaw, 0, 'YXZ');
            const role = ent.getValue(StoryPanel, 'role');
            obj.scale.setScalar(0.1 * (role === 'story' ? s : 1)); // los paneles se diseñan en mm
        }
        // asa bajo el borde inferior, en el plano del panel
        this.handle.position.set(0, -(PANEL_H * this.textScale) / 2 - 0.045, 0.01);
        this.handle.position.applyEuler(this.e.set(TILT, this.yaw, 0, 'YXZ')).add(this.pos);
        this.handle.rotation.set(TILT, this.yaw, 0, 'YXZ');
    }

    placeIcon(c) {
        const d = c.diorama;
        // esquina delantera izquierda del libro, un poco elevado
        this.icon.position.set(-3.3, 0.45, 2.1).multiplyScalar(d.scale.x);
        this.icon.position.y = 0.06;
        this.icon.position.applyAxisAngle(this.up, d.rotation.y).add(d.position);
        const head = this.world.camera.getWorldPosition(this.v);
        this.icon.lookAt(head);
    }

    rayClick(ray) {
        if (!this.icon.visible) return false;
        if (ray.distanceSqToPoint(this.icon.position) > 0.045 * 0.045) return false;
        this.hidden = false;
        return true;
    }

    register() {
        if (this.registered) return;
        this.registered = true;
        this.world.globals.interact.add({
            object: this.handle,
            box: fitLocalBox(this.handle).expandByScalar(0.004),
            kind: 'panel',
            priority: 2,
            enabled: () => !this.hidden && this.panelVisible(),
            onGrab: (hand) => this.grab(hand),
            onHold: (hand) => this.hold(hand),
            onRelease: () => { this.grabbing = null; },
        });
    }

    panelVisible() {
        for (const ent of this.queries.panels.entities) if (ent.object3D?.visible) return true;
        return false;
    }

    handYaw(hand) {
        this.e.setFromQuaternion(hand.quat, 'YXZ');
        return this.e.y;
    }

    grab(hand) {
        this.grabbing = { off: this.pos.clone().sub(hand.point), yaw0: this.yaw, hy0: this.handYaw(hand) };
    }

    hold(hand) {
        const g = this.grabbing;
        if (!g) return;
        this.pos.copy(hand.point).add(g.off);
        this.yaw = g.yaw0 + (this.handYaw(hand) - g.hy0);
        this.pos.y = Math.max(0.25, Math.min(2.2, this.pos.y));
    }

    /** Control: apuntar al asa con el rayo y apretar el botón lateral (arrastre a distancia). */
    rayDrag(hands) {
        for (const side of ['left', 'right']) {
            const h = hands.h[side];
            if (h.kind !== 'controller') continue;
            const space = this.player.raySpaces[side];
            if (!space) continue;
            space.updateWorldMatrix(true, false);
            this.ray.origin.setFromMatrixPosition(space.matrixWorld);
            this.ray.direction.set(0, 0, -1).transformDirection(space.matrixWorld);
            if (this.rayGrab?.side === side) {
                if (!h.grab) { this.rayGrab = null; continue; }
                this.ray.at(this.rayGrab.t, this.v);
                this.pos.copy(this.v).add(this.rayGrab.off);
                this.pos.y = Math.max(0.25, Math.min(2.2, this.pos.y));
                this.yaw = Math.atan2(this.ray.origin.x - this.pos.x, this.ray.origin.z - this.pos.z);
                continue;
            }
            if (h.grabStart && !this.rayGrab && !this.hidden && this.panelVisible()) {
                const hp = this.handle.position;
                if (this.ray.distanceSqToPoint(hp) < 0.04 * 0.04) {
                    const t = this.v.copy(hp).sub(this.ray.origin).dot(this.ray.direction);
                    if (t > 0.1) this.rayGrab = { side, t, off: this.pos.clone().sub(this.ray.at(t, this.w)) };
                }
            }
        }
    }

    update() {
        const c = this.world.globals.cuento;
        if (!c) return;
        if (!this.placedFor || this.placedFor !== this.world.globals.placedAt) {
            // la maqueta se colocó (o se movió): el panel vuelve junto a ella
            this.placedFor = this.world.globals.placedAt;
            this.reset();
        }
        if (this.world.globals.interact) this.register();
        const immersive = this.world.visibilityState.peek() !== VisibilityState.NonImmersive;
        const hands = this.world.globals.hands;
        if (immersive && hands && !this.world.globals.placing) this.rayDrag(hands);
        this.layout();
        const panelOn = this.panelVisible();
        this.handle.visible = panelOn && !this.world.globals.placing;
        this.bar.material.color.set(this.grabbing || this.rayGrab ? '#7be07b' : '#d9d4e4');

        // icono minimizado: tocarlo con el dedo lo devuelve
        const reading = this.hidden && !this.world.globals.placing;
        this.icon.visible = reading;
        if (reading) {
            this.placeIcon(c);
            if (hands) for (const h of hands.list) if (h.tracked && h.index.distanceTo(this.icon.position) < 0.04) this.hidden = false;
        }
    }
}

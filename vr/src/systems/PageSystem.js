/**
 * PageSystem — pasar las páginas del libro con la mano, como en un libro real.
 *
 * Usa el mismo PageTurner de la web (resorte, curvatura del papel según la
 * velocidad, torsión según la altura del agarre, umbral, regreso con rebote,
 * resistencia si la página todavía no se puede pasar). Solo cambia de dónde
 * sale el ángulo: en la web, del cursor en pantalla; aquí, de la mano en 3D.
 *
 * MÉTODO A — Botón en la página: un sello redondo con una flecha, impreso en
 * la esquina de la hoja (no flota delante del texto). Aparece cuando la
 * historia deja pasar la página (todas las tareas hechas). Se presiona con el
 * índice (hay que bajar el dedo sobre él; se rearma al alejarlo) o con el rayo
 * del control + gatillo. Se hunde, brilla y la hoja pasa con la animación de
 * siempre. En la hoja izquierda, otro sello para volver atrás.
 *
 * MÉTODO B — Agarrar la hoja:
 *  1. La mano se acerca al borde exterior de la hoja (franja de PAGE_EDGE
 *     unidades): aparece el punto amarillo de siempre.
 *  2. Pinza → la hoja queda tomada (PENDIENTE: todavía no gira).
 *  3. Al mover la mano más de START (hacia el lomo o hacia arriba) empieza el
 *     giro: el ángulo de la hoja es el ángulo de la mano alrededor del lomo
 *     (atan2 de su altura y su distancia al lomo), y la hoja se curva con la
 *     velocidad (deformación real de la malla, no una rotación rígida).
 *  4. Al soltar: si el progreso (más la inercia) pasa el umbral, la hoja
 *     termina de pasar sola; si no, vuelve a su lugar.
 *  Si la historia todavía no deja pasar (falta una tarea), la hoja cede un
 *  poquito, se resiste y vuelve. Desde la hoja izquierda se vuelve atrás.
 *
 * Mientras una hoja está tomada o girando, nada más se puede agarrar
 * (`globals.interactLock`), y un gesto pasa una sola hoja.
 */
import { CanvasTexture, CircleGeometry, createSystem, Group, Mesh, MeshBasicMaterial, Object3D, SRGBColorSpace, Vector3, VisibilityState, Box3 } from '@iwsdk/core';
import { BOOK } from '../../../src/book/Book.js';

export const PAGE_CFG = {
    /** Ancho de la franja del borde exterior que se puede agarrar (unidades del cuento). */
    PAGE_EDGE: 0.75,
    /** Movimiento de la mano antes de empezar a girar (unidades del cuento): evita giros accidentales. */
    START: 0.18,
    /** Cuánto cede la hoja cuando todavía no se puede pasar (rad), como en la web. */
    LOCK_MAX: 0.16,
    /** Botón: radio (unidades del cuento), altura del dedo para presionarlo y distancia para rearmarlo (m). */
    BUTTON_R: 0.24,
    PRESS_H: 0.012,
    REARM: 0.035,
};

function sealTexture(dir) {
    const c = document.createElement('canvas');
    c.width = c.height = 256;
    const g = c.getContext('2d');
    g.fillStyle = '#fff3d6';
    g.beginPath();
    g.arc(128, 128, 118, 0, Math.PI * 2);
    g.fill();
    g.lineWidth = 12;
    g.strokeStyle = '#f2a541';
    g.stroke();
    g.setLineDash([10, 12]);
    g.lineWidth = 4;
    g.strokeStyle = '#c98a3a';
    g.beginPath();
    g.arc(128, 128, 96, 0, Math.PI * 2);
    g.stroke();
    g.setLineDash([]);
    // flecha
    g.save();
    g.translate(128, 128);
    if (dir < 0) g.scale(-1, 1);
    g.fillStyle = '#2a2238';
    g.beginPath();
    g.moveTo(-46, -18);
    g.lineTo(6, -18);
    g.lineTo(6, -46);
    g.lineTo(56, 0);
    g.lineTo(6, 46);
    g.lineTo(6, 18);
    g.lineTo(-46, 18);
    g.closePath();
    g.fill();
    g.restore();
    const t = new CanvasTexture(c);
    t.colorSpace = SRGBColorSpace;
    return t;
}

export class PageSystem extends createSystem({}) {
    init() {
        this.v = new Vector3();
        this.w = new Vector3();
        this.hold = null; // { dir, kind, allow, start: Vector3, dragging }
        this.items = [];
        this.buttons = [];
        this.book = null;
        const sys = this;
        this.world.globals.pages = {
            get holding() { return !!sys.hold; },
            get dragging() { return !!sys.hold?.dragging; },
            rayClick: (ray) => this.rayClick(ray),
            buttons: this.buttons,
        };
    }

    // ------------------------------------------------------------ montaje (una vez por libro)
    build(c) {
        const book = c.book;
        this.book = book;
        const { PW, PD } = BOOK;
        const E = PAGE_CFG.PAGE_EDGE;
        for (const dir of [1, -1]) {
            // franja agarrable del borde exterior de la hoja
            const zone = new Object3D();
            book.inner.add(zone);
            const x0 = dir > 0 ? PW - E : -PW - 0.15;
            const x1 = dir > 0 ? PW + 0.15 : -PW + E;
            const box = new Box3(new Vector3(x0, -0.05, -PD / 2 - 0.1), new Vector3(x1, 0.3, PD / 2 + 0.1));
            const item = this.world.globals.interact.add({
                object: zone,
                box,
                kind: 'page',
                priority: 0, // lo que está sobre la hoja (Nico, bloques) va primero
                enabled: () => this.canGrab(c, dir),
                onGrab: (hand) => this.grab(c, dir, hand),
                onHold: (hand) => this.drag(c, hand),
                onRelease: () => this.release(c),
            });
            this.items.push(item);

            // botón impreso en la esquina de la hoja, del lado del lector
            const btn = new Group();
            const face = new Mesh(new CircleGeometry(PAGE_CFG.BUTTON_R, 40), new MeshBasicMaterial({ map: sealTexture(dir), transparent: true, depthWrite: false }));
            face.rotation.x = -Math.PI / 2;
            face.renderOrder = 3;
            const glow = new Mesh(new CircleGeometry(PAGE_CFG.BUTTON_R * 1.35, 40), new MeshBasicMaterial({ color: '#ffd84d', transparent: true, opacity: 0, depthWrite: false }));
            glow.rotation.x = -Math.PI / 2;
            glow.position.y = -0.002;
            btn.add(glow, face);
            btn.position.set(dir * (PW - 0.42), 0.012, PD / 2 - 0.42);
            btn.visible = false;
            btn.userData.noInteract = true;
            book.inner.add(btn);
            this.buttons.push({ dir, group: btn, face, glow, armed: true, press: 0, flash: 0 });
        }
    }

    // ------------------------------------------------------------ ¿se puede?
    kindFor(c, dir) { return dir < 0 && c.story.isEnd ? 'close' : 'page'; }

    canGrab(c, dir) {
        if (c.story.mode !== 'reading' || c.turner.busy) return false;
        if (this.hold) return this.hold.dir === dir;
        return c.story.canTurn(this.kindFor(c, dir), dir) !== 'none';
    }

    /** El botón aparece solo cuando la historia deja pasar (adelante) o volver (atrás). */
    canPress(c, dir) {
        if (c.story.mode !== 'reading' || c.turner.busy || this.hold || c.story.activity) return false;
        if (dir > 0) return !!c.ui.ready && c.ui.el.next.dataset.role === 'turn';
        return c.story.canTurn('page', -1) === 'ok';
    }

    // ------------------------------------------------------------ MÉTODO B: agarrar la hoja
    grab(c, dir, hand) {
        const kind = this.kindFor(c, dir);
        const allow = c.story.canTurn(kind, dir);
        this.hold = { dir, kind, allow, start: c.book.inner.worldToLocal(this.v.copy(hand.point)).clone(), dragging: false };
        this.world.globals.interactLock = 'page';
    }

    drag(c, hand) {
        const h = this.hold;
        if (!h) return;
        const t = c.turner;
        const p = c.book.inner.worldToLocal(this.v.copy(hand.point));
        if (!h.dragging) {
            // PENDIENTE: todavía no gira hasta que la mano se mueve hacia el lomo o hacia arriba
            const toward = (h.start.x - p.x) * h.dir; // hacia el lomo
            const up = p.y - h.start.y;
            if (Math.max(toward, up) < PAGE_CFG.START) return;
            if (t.busy) { h.allow = 'none'; return; }
            t.resetTo(h.kind, h.dir);
            t.locked = h.allow === 'locked';
            const zn = Math.max(-1, Math.min(1, h.start.z / (BOOK.PD / 2)));
            t.grab = { x: 0, y: 0, spineX: 0, half: 1, r: 1, zn, id: -1 };
            t.startDrag();
            h.dragging = true;
        }
        if (t.state !== 'drag') return;
        // ángulo de la mano alrededor del lomo (eje z del libro)
        let th = Math.atan2(Math.max(0, p.y), p.x);
        th = Math.max(0, Math.min(Math.PI, th));
        if (t.locked) {
            // la hoja cede un poquito y se resiste (la historia todavía no deja pasar)
            const rest = t.restAngle();
            const d = th - rest;
            th = rest + Math.sign(d) * PAGE_CFG.LOCK_MAX * Math.tanh(Math.abs(d) / 0.6);
        }
        t.target = th;
    }

    release(c) {
        const h = this.hold;
        this.hold = null;
        this.world.globals.interactLock = null;
        if (!h?.dragging) return;
        const t = c.turner;
        if (t.state === 'drag') t.onUp({ pointerId: -1 }); // termina sola o vuelve, como en la web
    }

    // ------------------------------------------------------------ MÉTODO A: el botón de la hoja
    press(c, b) {
        b.press = 1;
        b.flash = 1;
        b.armed = false;
        if (b.dir > 0) c.story.tryTurnPage();
        else c.turner.auto('page', -1);
    }

    rayClick(ray) {
        const c = this.world.globals.cuento;
        if (!c) return false;
        for (const b of this.buttons) {
            if (!b.group.visible) continue;
            b.group.getWorldPosition(this.v);
            const r = PAGE_CFG.BUTTON_R * c.diorama.scale.x;
            if (ray.distanceSqToPoint(this.v) < (r * 1.3) ** 2) {
                this.press(c, b);
                return true;
            }
        }
        return false;
    }

    buttonsUpdate(c, hands, dt) {
        const k = c.diorama.scale.x;
        const r = PAGE_CFG.BUTTON_R * k;
        for (const b of this.buttons) {
            const on = this.canPress(c, b.dir);
            b.group.visible = on || b.press > 0.05;
            b.press = Math.max(0, b.press - dt * 4);
            b.flash = Math.max(0, b.flash - dt * 2);
            const breathe = on ? 0.5 + 0.5 * Math.sin(performance.now() / 380) : 0;
            b.glow.material.opacity = Math.max(b.flash * 0.9, breathe * 0.35);
            b.face.position.y = -b.press * 0.01;
            b.face.scale.setScalar(1 - b.press * 0.12);
            if (!on || !hands) continue;
            b.group.getWorldPosition(this.v);
            let near = false;
            for (const hand of hands.list) {
                if (!hand.tracked) continue;
                const tip = hand.index;
                const dxz = Math.hypot(tip.x - this.v.x, tip.z - this.v.z);
                const dy = tip.y - this.v.y;
                if (dxz < r * 1.15 && dy < PAGE_CFG.PRESS_H && dy > -0.03) {
                    near = true;
                    // hay que bajar el dedo sobre el sello: un dedo quieto encima no lo presiona
                    if (b.armed && hand.indexVel.y < -0.03) this.press(c, b);
                } else if (hand.index.distanceTo(this.v) < PAGE_CFG.REARM + r) near = true;
            }
            if (!near) b.armed = true;
        }
    }

    update(delta) {
        const c = this.world.globals.cuento;
        if (!c || !this.world.globals.interact) return;
        if (this.book !== c.book) this.build(c);
        const immersive = this.world.visibilityState.peek() !== VisibilityState.NonImmersive;
        const dt = Math.min(Math.max(delta, 0), 0.05);
        if (!immersive || this.world.globals.placing) {
            for (const b of this.buttons) b.group.visible = false;
            return;
        }
        // si la historia cambió de modo con la hoja tomada, se suelta
        if (this.hold && c.story.mode !== 'reading') this.release(c);
        this.buttonsUpdate(c, this.world.globals.hands, dt);
    }
}

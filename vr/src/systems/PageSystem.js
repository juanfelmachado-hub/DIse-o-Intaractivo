/**
 * PageSystem — pasar las páginas del libro con la mano, como en un libro real.
 *
 * Usa el mismo PageTurner de la web (resorte, curvatura del papel según la
 * velocidad, torsión según la altura del agarre, umbral, regreso con rebote,
 * resistencia si la página todavía no se puede pasar). Solo cambia de dónde
 * sale el ángulo: en la web, del cursor en pantalla; aquí, de la mano en 3D.
 *
 * MÉTODO A — Botón «Continuar» en la página: un botón ancho impreso en el
 * margen de abajo de la hoja derecha (no flota delante del texto). Hace lo
 * mismo que «Siguiente» del panel: avanza el cuento y, con la página lista,
 * la pasa. Aparece cuando se puede avanzar (no durante un juego ni con una
 * tarea pendiente). Se presiona con el índice (hay que bajar el dedo sobre él;
 * se rearma al alejarlo) o con el rayo del control + gatillo. Se hunde, brilla
 * y la hoja pasa con la animación de siempre. En la hoja izquierda, «Volver»
 * para regresar a la página anterior.
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
import { CanvasTexture, createSystem, Plane, PlaneGeometry, Group, Mesh, MeshBasicMaterial, Object3D, SRGBColorSpace, Vector3, VisibilityState, Box3 } from '@iwsdk/core';
import { BOOK } from '../../../src/book/Book.js';

export const PAGE_CFG = {
    /** Ancho de la franja del borde exterior que se puede agarrar (unidades del cuento). */
    PAGE_EDGE: 0.75,
    /** Movimiento de la mano antes de empezar a girar (unidades del cuento): evita giros accidentales. */
    START: 0.18,
    /** Cuánto cede la hoja cuando todavía no se puede pasar (rad), como en la web. */
    LOCK_MAX: 0.16,
    /** Botones: ancho y alto (unidades del cuento), altura del dedo para presionarlo y distancia para rearmarlo (m). */
    BUTTON_W: { 1: 1.9, '-1': 1.2 },
    BUTTON_H: 0.34,
    PRESS_H: 0.012,
    REARM: 0.035,
};

function buttonTexture(text, dir, w, h) {
    const c = document.createElement('canvas');
    const H = 160;
    const W = Math.round((H * w) / h);
    c.width = W;
    c.height = H;
    const g = c.getContext('2d');
    const r = H / 2 - 8;
    g.fillStyle = dir > 0 ? '#ffb347' : '#fff3d6';
    g.beginPath();
    g.roundRect(8, 8, W - 16, H - 16, r);
    g.fill();
    g.lineWidth = 8;
    g.strokeStyle = dir > 0 ? '#e0892b' : '#f2a541';
    g.stroke();
    g.fillStyle = '#2a2238';
    g.font = `800 ${Math.round(H * 0.56)}px "Baloo 2", "Nunito", system-ui, sans-serif`;
    g.textBaseline = 'middle';
    g.textAlign = 'center';
    // flecha + texto
    const tw = g.measureText(text).width;
    const aw = H * 0.4;
    const gap = H * 0.14;
    const x0 = W / 2 - (tw + aw + gap) / 2;
    const ax = dir > 0 ? x0 + tw + gap : x0;
    g.fillText(text, dir > 0 ? x0 + tw / 2 : x0 + aw + gap + tw / 2, H / 2 + 4);
    g.save();
    g.translate(ax + aw / 2, H / 2);
    if (dir < 0) g.scale(-1, 1);
    g.beginPath();
    g.moveTo(-aw / 2, -aw * 0.18);
    g.lineTo(0, -aw * 0.18);
    g.lineTo(0, -aw * 0.45);
    g.lineTo(aw / 2, 0);
    g.lineTo(0, aw * 0.45);
    g.lineTo(0, aw * 0.18);
    g.lineTo(-aw / 2, aw * 0.18);
    g.closePath();
    g.fill();
    g.restore();
    const t = new CanvasTexture(c);
    t.colorSpace = SRGBColorSpace;
    t.anisotropy = 4;
    return t;
}

export class PageSystem extends createSystem({}) {
    init() {
        this.v = new Vector3();
        this.w = new Vector3();
        this.up = new Vector3(0, 1, 0);
        this.plane = new Plane();
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

            // botón impreso en el margen de abajo de la hoja, del lado del lector
            const bw = PAGE_CFG.BUTTON_W[dir];
            const bh = PAGE_CFG.BUTTON_H;
            const btn = new Group();
            const face = new Mesh(new PlaneGeometry(bw, bh), new MeshBasicMaterial({ map: buttonTexture(dir > 0 ? 'Continuar' : 'Volver', dir, bw, bh), transparent: true, depthWrite: false }));
            face.rotation.x = -Math.PI / 2;
            face.renderOrder = 3;
            const glow = new Mesh(new PlaneGeometry(bw + 0.14, bh + 0.14), new MeshBasicMaterial({ color: '#ffd84d', transparent: true, opacity: 0, depthWrite: false }));
            glow.rotation.x = -Math.PI / 2;
            glow.position.y = -0.002;
            btn.add(glow, face);
            btn.position.set(dir * (PW / 2 + (dir > 0 ? 0.05 : 0.3)), 0.012, PD / 2 - 0.2);
            btn.userData.size = { w: bw, h: bh };
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

    /**
     * «Continuar» aparece cuando «Siguiente» del panel avanza (otro momento o pasar
     * la página); «Volver», cuando la historia deja volver a la página anterior.
     */
    canPress(c, dir) {
        if (c.story.mode !== 'reading' || c.turner.busy || this.hold || c.story.activity) return false;
        if (dir > 0) return c.ui.el.next.dataset.role === 'next' || (!!c.ui.ready && c.ui.el.next.dataset.role === 'turn');
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
        if (b.dir > 0) c.ui.el.next.click(); // lo mismo que «Siguiente»
        else c.turner.auto('page', -1);
    }

    rayClick(ray) {
        const c = this.world.globals.cuento;
        if (!c) return false;
        for (const b of this.buttons) {
            if (!b.group.visible) continue;
            // dónde corta el rayo el plano del botón, en el sistema del botón
            b.group.getWorldPosition(this.v);
            this.plane.set(this.up, -this.v.y);
            if (!ray.intersectPlane(this.plane, this.w)) continue;
            if (this.inside(b, b.group.worldToLocal(this.w), 1.15)) {
                this.press(c, b);
                return true;
            }
        }
        return false;
    }

    /** ¿El punto (sistema del botón) cae sobre el botón? `pad` agranda un poco la zona. */
    inside(b, p, pad = 1) {
        const { w, h } = b.group.userData.size;
        return Math.abs(p.x) < (w / 2) * pad && Math.abs(p.z) < (h / 2) * pad + 0.05;
    }

    buttonsUpdate(c, hands, dt) {
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
                const dy = tip.y - this.v.y;
                const local = b.group.worldToLocal(this.w.copy(tip));
                if (this.inside(b, local, 1.1) && dy < PAGE_CFG.PRESS_H && dy > -0.03) {
                    near = true;
                    // hay que bajar el dedo sobre el botón: un dedo quieto encima no lo presiona
                    if (b.armed && hand.indexVel.y < -0.03) this.press(c, b);
                } else if (dy < PAGE_CFG.REARM && this.inside(b, local, 1.4)) near = true;
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

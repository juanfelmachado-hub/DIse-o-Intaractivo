/**
 * HeartSystem — el juego del ritmo con un corazón 3D (reemplaza al tambor sobre Nico).
 *
 * En la web el niño toca un círculo sobre el caparazón de Nico. En el visor
 * aparece un CORAZÓN que flota frente a la mesa, late («pum-pum») con el mismo
 * audio del juego, y se golpea con la mano al ritmo. Nico ya no es la
 * superficie de golpeo.
 *
 * La lógica del juego es la misma de la web (DrumActivity): el corazón solo
 * cambia de dónde sale el golpe.
 *  - El juego decide si el golpe va a tiempo (ventana ±38 % del intervalo).
 *  - Si no va, el ritmo espera y repite el pum (sin castigo).
 *  - Cada 3 golpes Nico y el Guardián hacen una postura.
 *  - A los 12 el temblor se calma y la historia sigue.
 *
 * Secuencia:
 *  1. MIRA: los primeros DEMO_BEATS latidos solo se escuchan y se ven («Escucha
 *     su ritmo…»); los golpes no cuentan todavía.
 *  2. TU TURNO: «¡Ahora tú! Golpéalo al ritmo».
 *  3. Cada golpe se compara con el latido: acierto → el corazón se hincha,
 *     brilla y se enciende un punto del anillo de progreso; fallo → se encoge
 *     apenas y se apaga un instante (retroalimentación discreta).
 *
 * Detección de golpes reales:
 *  - contacto: la punta del índice o la palma entra en la esfera del corazón;
 *  - movimiento: al entrar, la mano debe ir HACIA el corazón a más de HIT_SPEED;
 *  - rearme: no vuelve a contar hasta que la mano sale REARM más allá (una mano
 *    quieta sobre el corazón no cuenta golpes repetidos);
 *  - enfriamiento MIN_GAP entre golpes de cualquiera de las dos manos.
 * Con el control también vale apuntarle y apretar el gatillo (StoryInputSystem).
 * «Reiniciar» en el panel vuelve a empezar la cuenta sin reiniciar la historia.
 */
import {
    CanvasTexture, createSystem, ExtrudeGeometry, Group, Mesh, MeshBasicMaterial, MeshStandardMaterial, PlaneGeometry,
    Shape, SphereGeometry, SRGBColorSpace, Vector3, VisibilityState, Color,
} from '@iwsdk/core';
import gsap from 'gsap';
import { DrumActivity } from '../../../src/activities/DrumActivity.js';
import { sparkle } from '../../../src/animations/motions.js';

export const HEART_CFG = {
    /** Latidos que solo se muestran antes de que cuenten los golpes. */
    DEMO_BEATS: 3,
    /** Velocidad mínima de la mano hacia el corazón para que sea golpe (m/s). */
    HIT_SPEED: 0.25,
    /** Distancia extra para rearmar el golpe (m). */
    REARM: 0.03,
    /** Tiempo mínimo entre dos golpes (s). */
    MIN_GAP: 0.18,
    /** «¡Perfecto!»: a menos de esta fracción del intervalo del latido (más allá de 0,38 es fuera de ritmo). */
    PERFECT: 0.12,
    /** Tamaño del corazón (unidades del cuento) y altura sobre la página. */
    SIZE: 0.5,
    HEIGHT: 0.75,
    /** Distancia delante de Nico, hacia el lector (unidades del cuento). */
    FRONT: 1.0,
};

function heartGeometry() {
    const s = new Shape();
    // corazón clásico (unidades de 1), con la punta hacia abajo
    s.moveTo(0, -0.5);
    s.bezierCurveTo(-0.15, -0.36, -0.5, -0.12, -0.5, 0.12);
    s.bezierCurveTo(-0.5, 0.36, -0.28, 0.5, -0.13, 0.5);
    s.bezierCurveTo(-0.04, 0.5, 0, 0.42, 0, 0.36);
    s.bezierCurveTo(0, 0.42, 0.04, 0.5, 0.13, 0.5);
    s.bezierCurveTo(0.28, 0.5, 0.5, 0.36, 0.5, 0.12);
    s.bezierCurveTo(0.5, -0.12, 0.15, -0.36, 0, -0.5);
    const g = new ExtrudeGeometry(s, { depth: 0.16, bevelEnabled: true, bevelThickness: 0.12, bevelSize: 0.08, bevelSegments: 5, curveSegments: 18 });
    g.center();
    return g;
}

function labelTexture() {
    const c = document.createElement('canvas');
    c.width = 1024;
    c.height = 200;
    const t = new CanvasTexture(c);
    t.colorSpace = SRGBColorSpace;
    return { canvas: c, tex: t };
}

export class HeartSystem extends createSystem({}) {
    init() {
        this.v = new Vector3();
        this.w = new Vector3();
        this.n = new Vector3();
        this.act = null;
        this.heart = null;
        this.armed = { left: true, right: true };
        this.lastHit = 0;
        this.pulse = 0;
        this.second = 0;
        this.ok = 0;
        this.bad = 0;
        this.base = new Color('#ff5f7f');
        this.dim = new Color('#8f7f9f');
        const sys = this;
        this.world.globals.heart = {
            get active() { return !!sys.act; },
            get phase() { return sys.phase; },
            get taps() { return sys.act?.taps ?? 0; },
            get object() { return sys.heart; },
            /** Contadores del intento actual (pruebas y ajuste de umbrales). */
            get stats() { return sys.stats; },
            retry: () => this.retry(),
        };
        this.stats = { contacts: 0, soft: 0, ok: 0, perfect: 0, offbeat: 0 };
        // en el visor el juego 2 usa el corazón: se engancha a DrumActivity
        const begin = DrumActivity.prototype.begin;
        const cleanup = DrumActivity.prototype.cleanup;
        const beat = DrumActivity.prototype.beat;
        DrumActivity.prototype.begin = function beginVR() {
            begin.call(this);
            sys.start(this);
        };
        DrumActivity.prototype.cleanup = function cleanupVR() {
            sys.stop(this);
            cleanup.call(this);
        };
        DrumActivity.prototype.beat = function beatVR() {
            beat.call(this);
            if (sys.act === this) sys.onBeat();
        };
        this.cleanupFuncs.push(() => {
            DrumActivity.prototype.begin = begin;
            DrumActivity.prototype.cleanup = cleanup;
            DrumActivity.prototype.beat = beat;
        });
    }

    immersive() { return this.world.visibilityState.peek() !== VisibilityState.NonImmersive; }

    // ------------------------------------------------------------ montaje
    start(act) {
        if (!this.immersive()) return;
        const c = this.world.globals.cuento;
        const scene = act.scene;
        this.act = act;
        this.stats = { contacts: 0, soft: 0, ok: 0, perfect: 0, offbeat: 0 };
        this.phase = 'demo';
        this.beats = 0;
        this.armed.left = this.armed.right = true;
        const group = new Group();
        const mat = new MeshStandardMaterial({ color: '#ff5f7f', emissive: '#ff2f5f', emissiveIntensity: 0.25, roughness: 0.45, metalness: 0 });
        this.mesh = new Mesh(heartGeometry(), mat);
        this.mesh.castShadow = true;
        group.add(this.mesh);
        // anillo de progreso: un punto por golpe
        this.dots = [];
        const n = act.data.taps;
        const dotGeo = new SphereGeometry(0.05, 10, 8);
        for (let i = 0; i < n; i++) {
            const a = Math.PI / 2 - (i / n) * Math.PI * 2;
            const d = new Mesh(dotGeo, new MeshBasicMaterial({ color: '#5b5068', transparent: true, opacity: 0.85 }));
            d.position.set(Math.cos(a) * 0.82, Math.sin(a) * 0.82, -0.05); // alrededor del corazón
            group.add(d);
            this.dots.push(d);
        }
        // letrero sobre el corazón
        const { canvas, tex } = labelTexture();
        this.label = { canvas, tex, text: '' };
        const sign = new Mesh(new PlaneGeometry(1.4, 0.27), new MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false }));
        sign.position.set(0, 1.12, 0);
        sign.renderOrder = 25;
        group.add(sign);
        group.scale.setScalar(HEART_CFG.SIZE);
        // frente a Nico, hacia el lector, flotando sobre la página
        const nico = scene.nico;
        const head = this.world.camera.getWorldPosition(this.v);
        scene.group.worldToLocal(head);
        const np = nico.position;
        this.n.set(head.x - np.x, 0, head.z - np.z);
        if (this.n.lengthSq() < 1e-4) this.n.set(0, 0, 1);
        this.n.normalize();
        group.position.set(np.x + this.n.x * HEART_CFG.FRONT, HEART_CFG.HEIGHT, np.z + this.n.z * HEART_CFG.FRONT);
        group.rotation.y = Math.atan2(this.n.x, this.n.z);
        group.scale.multiplyScalar(0.01);
        scene.group.add(group);
        gsap.to(group.scale, { x: HEART_CFG.SIZE, y: HEART_CFG.SIZE, z: HEART_CFG.SIZE, duration: 0.6, ease: 'back.out(2)' });
        this.heart = group;
        c.ui.drumTarget = group; // el rayo del control apunta aquí
        this.say('Escucha su ritmo…');
    }

    stop(act) {
        if (this.act !== act) return;
        this.act = null;
        const h = this.heart;
        this.heart = null;
        if (h) gsap.to(h.scale, { x: 0.001, y: 0.001, z: 0.001, duration: 0.35, ease: 'power2.in', onComplete: () => h.parent?.remove(h) });
    }

    /** «Reiniciar» durante el juego: vuelve a empezar la cuenta (la historia sigue igual). */
    retry() {
        const act = this.act;
        if (!act || act.done) return false;
        act.taps = 0;
        act.missed = 0;
        act.report?.(0);
        this.stats = { contacts: 0, soft: 0, ok: 0, perfect: 0, offbeat: 0 };
        this.phase = 'demo';
        this.beats = 0;
        for (const d of this.dots) d.material.color.set('#5b5068');
        this.say('Escucha su ritmo…');
        return true;
    }

    say(text) {
        const L = this.label;
        if (!L || L.text === text) return;
        L.text = text;
        const g = L.canvas.getContext('2d');
        g.clearRect(0, 0, 1024, 200);
        if (!text) { L.tex.needsUpdate = true; return; }
        g.fillStyle = 'rgba(20, 16, 32, 0.82)';
        g.beginPath();
        g.roundRect(12, 30, 1000, 140, 70);
        g.fill();
        g.fillStyle = '#fff8e8';
        g.textAlign = 'center';
        g.textBaseline = 'middle';
        g.font = '600 64px "Fredoka", system-ui, sans-serif';
        g.fillText(text, 512, 102);
        L.tex.needsUpdate = true;
    }

    // ------------------------------------------------------------ latidos y golpes
    onBeat() {
        this.pulse = 1;
        this.second = 0.32; // «pum-pum»: un segundo latido más chico
        this.beats++;
        if (this.phase === 'demo' && this.beats > HEART_CFG.DEMO_BEATS) {
            this.phase = 'play';
            this.say('¡Ahora tú! Golpéalo al ritmo');
        }
    }

    hit(c) {
        const act = this.act;
        const before = act.taps;
        // qué tan cerca del latido fue (misma medida que el juego: fracción del intervalo)
        const since = performance.now() / 1000 - act.lastBeat;
        const off = Math.min(since, Math.abs(act.interval - since)) / act.interval;
        act.tap();
        const scene = act.scene;
        if (act.taps > before) {
            this.stats.ok++;
            // acierto: se hincha, brilla y se enciende un punto
            this.ok = 1;
            const d = this.dots[act.taps - 1];
            if (d) d.material.color.setHSL(((act.taps * 32) % 360) / 360, 0.85, 0.62);
            const perfect = off < HEART_CFG.PERFECT;
            if (perfect) this.stats.perfect++;
            sparkle(scene.group, this.heart.position.clone(), { color: perfect ? '#fff3a0' : '#ffd1dc', count: perfect ? 10 : 6, radius: perfect ? 0.45 : 0.35 });
            this.say(perfect ? '¡Perfecto!' : 'Correcto');
        } else {
            // fuera de ritmo: se encoge apenas y se apaga un instante
            this.stats.offbeat++;
            this.bad = 1;
            this.say('Fuera de ritmo: espera el pum… ¡y golpea!');
        }
    }

    update(delta) {
        const act = this.act;
        if (!act || !this.heart) return;
        const c = this.world.globals.cuento;
        const dt = Math.min(Math.max(delta, 0), 0.05);
        // animación del latido (contraer y expandir)
        this.pulse = Math.max(0, this.pulse - dt * 5);
        if (this.second > 0) {
            this.second -= dt;
            if (this.second <= 0) this.pulse = Math.max(this.pulse, 0.55);
        }
        this.ok = Math.max(0, this.ok - dt * 2.5);
        this.bad = Math.max(0, this.bad - dt * 3);
        const p = this.pulse * this.pulse;
        const s = 1 + p * 0.16 + this.ok * 0.22 - this.bad * 0.08;
        this.mesh.scale.set(s * (1 + p * 0.04), s, s);
        const m = this.mesh.material;
        m.emissiveIntensity = 0.2 + p * 0.9 + this.ok * 1.5;
        m.color.copy(this.base).lerp(this.dim, this.bad * 0.8);
        this.heart.position.y = HEART_CFG.HEIGHT + Math.sin(performance.now() / 700) * 0.03;

        // golpes con la mano
        if (this.phase !== 'play' || act.done || act.disposed) return;
        const hands = this.world.globals.hands;
        if (!hands) return;
        this.heart.getWorldPosition(this.w);
        const r = 0.5 * HEART_CFG.SIZE * c.diorama.scale.x * 1.15; // radio del corazón en metros (con margen)
        const now = performance.now() / 1000;
        for (const hand of hands.list) {
            if (!hand.tracked) { this.armed[hand.side] = true; continue; }
            // la parte de la mano más cercana: punta del índice o palma
            const di = hand.index.distanceTo(this.w);
            const dp = hand.palm.distanceTo(this.w);
            const usePalm = dp < di;
            const d = usePalm ? dp : di;
            const vel = usePalm ? hand.palmVel : hand.indexVel;
            if (d > r + HEART_CFG.REARM) { this.armed[hand.side] = true; continue; }
            if (d > r || !this.armed[hand.side]) continue;
            // entra en contacto: ¿viene hacia el corazón con fuerza?
            this.n.copy(this.w).sub(usePalm ? hand.palm : hand.index).normalize();
            const toward = vel.dot(this.n);
            this.armed[hand.side] = false;
            this.stats.contacts++;
            if (toward < HEART_CFG.HIT_SPEED || now - this.lastHit < HEART_CFG.MIN_GAP) { this.stats.soft++; continue; } // roce o mano quieta
            this.lastHit = now;
            this.hit(c);
        }
    }
}

/**
 * HeartSystem — el juego del ritmo con un corazón 3D (reemplaza al tambor sobre Nico).
 *
 * En la web el niño toca un círculo sobre el caparazón de Nico. En el visor
 * aparece un CORAZÓN ACOSTADO sobre la página, como un tambor puesto delante
 * del lector: se golpea desde arriba con la mano abierta o con los dedos, con
 * cualquiera de las dos manos, sin pinza ni botones.
 *
 * La lógica del juego es la misma de la web (DrumActivity): el corazón solo
 * cambia de dónde sale el golpe y cómo se ve el ritmo.
 *  - El juego decide si el golpe va a tiempo (ventana ±38 % del intervalo:
 *    ±0,34 s con el latido de 0,9 s, holgada para niños).
 *  - Si no va, el ritmo espera y repite el pum (sin castigo).
 *  - Cada 3 golpes Nico y el Guardián hacen una postura.
 *  - A los 12 el temblor se calma y la historia sigue.
 *
 * SEÑALES DEL RITMO (para entenderlo sin depender del audio ni del letrero):
 *  1. ANTICIPACIÓN: un anillo dorado suave rodea el corazón y se va cerrando
 *     hacia él; cuanto más cerca, más se ve.
 *  2. LATIDO: cuando el anillo llega al borde, el corazón late (se hincha y
 *     brilla, «pum-pum») y sale una onda rosada hacia afuera. Ese es el momento.
 *  3. GOLPE A TIEMPO: destello verde, onda verde, chispas suaves, el tambor y
 *     un acorde corto; se enciende un punto del anillo de avance.
 *  4. FUERA DE RITMO: el corazón se apaga apenas y se mece un poco; el
 *     letrero dice «Espera a que el anillo llegue…». Sin sonido de error.
 *
 * UNA SOLA REFERENCIA DE TIEMPO: el reloj de GSAP que mueve el cuento
 * (StorySystem → gsap.updateRoot). Con él se programa cada latido (el mismo
 * cuadro dispara su sonido y su animación), el anillo lee el avance de esa
 * misma cuenta (cuánto falta para que dispare el `delayedCall` del próximo
 * latido, `nextBeatIn`), y al juzgar un golpe se mide contra
 * ella (`syncClock`), también si el golpe viene del gatillo del control.
 *
 * GOLPES CON LA MANO:
 *  - zona de contacto: un disco sobre la cara de arriba del corazón (radio
 *    HIT_R, alto CONTACT_H); vale la punta del índice o la palma;
 *  - movimiento: la mano tiene que ir HACIA ABAJO a más de HIT_SPEED;
 *  - un golpe por contacto: no se rearma hasta que la mano sube REARM (o se
 *    aleja); una mano apoyada no cuenta golpes repetidos;
 *  - MIN_GAP entre golpes: un golpe con las dos manos a la vez cuenta uno;
 *  - si el seguimiento de la mano se pierde, esa mano queda desarmada hasta que
 *    vuelve a verse fuera de la zona (no aparecen golpes fantasma).
 * Todo contacto aplasta un poco el corazón y lo deja recuperarse (como un
 * cojín); solo los golpes a tiempo cuentan.
 * Con el control también vale apuntarle y apretar el gatillo (StoryInputSystem).
 * «Reiniciar» en el panel vuelve a empezar la cuenta sin reiniciar la historia.
 */
import {
    CanvasTexture, Color, createSystem, ExtrudeGeometry, Group, Mesh, MeshBasicMaterial, MeshStandardMaterial,
    PlaneGeometry, RingGeometry, Shape, SphereGeometry, SRGBColorSpace, Vector3, VisibilityState,
} from '@iwsdk/core';
import gsap from 'gsap';
import { DrumActivity } from '../../../src/activities/DrumActivity.js';
import { sparkle } from '../../../src/animations/motions.js';
import { tone } from '../interaction/tones.js';

export const HEART_CFG = {
    /** Latidos que solo se muestran antes de que cuenten los golpes. */
    DEMO_BEATS: 3,
    /** Velocidad mínima de la mano hacia abajo para que sea golpe (m/s): un toque natural basta. */
    HIT_SPEED: 0.15,
    /** Radio de la zona de golpe, en unidades del corazón (el corazón mide 1 de ancho). */
    HIT_R: 0.72,
    /** Alto de la zona de contacto sobre la cara de arriba (m). */
    CONTACT_H: 0.025,
    /** Cuánto debe subir la mano para rearmar el golpe (m). */
    REARM: 0.035,
    /** Tiempo mínimo entre dos golpes (s). */
    MIN_GAP: 0.18,
    /** «¡Perfecto!»: a menos de esta fracción del intervalo del latido (más allá de 0,38 es fuera de ritmo). */
    PERFECT: 0.12,
    /** Tamaño del corazón (unidades del cuento). */
    SIZE: 0.7,
    /**
     * Dónde está, en el sistema de la maqueta: delante de la mesa, del lado del
     * lector, sobre la hoja derecha. Queda libre de la mesa (Nico debajo), del
     * sofá, de los objetos que caen junto a la mesa, del Guardián y del botón
     * «Continuar» (la zona de golpe no lo alcanza).
     */
    POS: { x: 0.2, z: 0.9 },
    /** Altura del centro del corazón sobre la página (unidades del cuento). */
    HEIGHT: 0.16,
    /** Anillo de anticipación: radio inicial y final (unidades del corazón). */
    RING_FROM: 1.9,
    RING_TO: 0.62,
};

/** Grosor del corazón (unidades del corazón): la cara de arriba queda a TOP del centro. */
const TOP = 0.2;

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

/** Anillo plano (acostado) para la anticipación y las ondas. */
function flatRing(color, inner = 0.9) {
    const m = new Mesh(new RingGeometry(inner, 1, 64), new MeshBasicMaterial({ color, transparent: true, opacity: 0, depthWrite: false }));
    m.rotation.x = -Math.PI / 2;
    m.renderOrder = 6;
    m.visible = false;
    return m;
}

const GREEN = new Color('#4fd27a');
const PINK = new Color('#ff2f5f');

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
        this.squash = { v: 0 };
        this.beatG = 0;
        this.base = new Color('#ff5f7f');
        this.dim = new Color('#8f7f9f');
        const sys = this;
        this.world.globals.heart = {
            get active() { return !!sys.act; },
            get phase() { return sys.phase; },
            get taps() { return sys.act?.taps ?? 0; },
            get object() { return sys.heart; },
            /** Punto de golpe (centro de la cara de arriba) en el mundo, y radio de la zona (m). */
            get target() { return sys.heart ? { pos: sys.topCenter(new Vector3()), r: sys.hitRadius() } : null; },
            /** Avance del anillo hacia el próximo latido (0…1) y segundos que faltan, con el reloj del cuento. */
            get ring() { return sys.anticipation(); },
            get nextIn() { return sys.act ? sys.nextBeatIn(sys.act) : null; },
            /** Contadores del intento actual (pruebas y ajuste de umbrales). */
            get stats() { return sys.stats; },
            retry: () => this.retry(),
        };
        this.stats = { contacts: 0, soft: 0, ok: 0, perfect: 0, offbeat: 0, beats: 0 };
        // en el visor el juego 2 usa el corazón: se engancha a DrumActivity
        const P = DrumActivity.prototype;
        const orig = { begin: P.begin, cleanup: P.cleanup, beat: P.beat, tap: P.tap };
        P.begin = function beginVR() {
            orig.begin.call(this);
            sys.start(this);
        };
        P.cleanup = function cleanupVR() {
            sys.stop(this);
            orig.cleanup.call(this);
        };
        P.beat = function beatVR() {
            orig.beat.call(this);
            if (sys.act === this && !this.done && !this.disposed) sys.onBeat();
        };
        P.tap = function tapVR() {
            // golpe con la mano o con el gatillo: se juzga con el reloj del cuento
            if (sys.act !== this || this.done || this.disposed) return orig.tap.call(this);
            const before = this.taps;
            const off = sys.syncClock(this);
            orig.tap.call(this);
            sys.feedback(this.taps > before, off);
        };
        this.cleanupFuncs.push(() => Object.assign(P, orig));
    }

    immersive() { return this.world.visibilityState.peek() !== VisibilityState.NonImmersive; }

    /** Tiempo del cuento (el mismo reloj que programa los latidos). */
    clock() { return gsap.globalTimeline.time(); }

    // ------------------------------------------------------------ montaje
    start(act) {
        if (!this.immersive()) return;
        const c = this.world.globals.cuento;
        const scene = act.scene;
        this.act = act;
        this.stats = { contacts: 0, soft: 0, ok: 0, perfect: 0, offbeat: 0, beats: 0 };
        this.phase = 'demo';
        this.beats = 0;
        this.beatG = this.clock();
        this.armed.left = this.armed.right = false; // una mano que ya estaba encima no golpea al aparecer
        const group = new Group();
        // cuerpo: se aplasta en vertical al golpearlo (la malla va acostada dentro)
        this.body = new Group();
        const mat = new MeshStandardMaterial({ color: '#ff5f7f', emissive: '#ff2f5f', emissiveIntensity: 0.25, roughness: 0.45, metalness: 0 });
        this.mesh = new Mesh(heartGeometry(), mat);
        this.mesh.rotation.x = -Math.PI / 2; // acostado: la cara grande mira hacia arriba, los lóbulos lejos del lector
        this.mesh.castShadow = true;
        this.body.add(this.mesh);
        group.add(this.body);
        // anillo de avance: un punto por golpe, acostado alrededor del corazón
        this.dots = [];
        const n = act.data.taps;
        const dotGeo = new SphereGeometry(0.05, 10, 8);
        for (let i = 0; i < n; i++) {
            const a = Math.PI / 2 + (i / n) * Math.PI * 2;
            const d = new Mesh(dotGeo, new MeshBasicMaterial({ color: '#5b5068', transparent: true, opacity: 0.85 }));
            d.position.set(Math.cos(a) * 1.08, -TOP + 0.05, -Math.sin(a) * 1.08);
            group.add(d);
            this.dots.push(d);
        }
        // señales del ritmo
        this.ring = flatRing('#ffd36e', 0.88);
        this.ring.position.y = -TOP + 0.03;
        this.wave = flatRing('#ffc2d1', 0.84);
        this.wave.position.y = -TOP + 0.04;
        this.hitWave = flatRing('#7fe0a0', 0.8);
        this.hitWave.position.y = -TOP + 0.05;
        group.add(this.ring, this.wave, this.hitWave);
        // letrero arriba y un poco detrás del corazón, inclinado hacia el lector (no tapa el corazón)
        const { canvas, tex } = labelTexture();
        this.label = { canvas, tex, text: '' };
        const sign = new Mesh(new PlaneGeometry(2.3, 0.45), new MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false }));
        sign.position.set(0, 1.25, -0.45);
        sign.rotation.x = -0.3;
        sign.renderOrder = 25;
        group.add(sign);
        // delante de la mesa, del lado del lector, mirando al lector
        group.position.set(HEART_CFG.POS.x, HEART_CFG.HEIGHT, HEART_CFG.POS.z);
        const head = this.world.camera.getWorldPosition(this.v);
        scene.group.worldToLocal(head);
        group.rotation.y = Math.atan2(head.x - group.position.x, head.z - group.position.z);
        group.scale.setScalar(0.01);
        scene.group.add(group);
        gsap.to(group.scale, { x: HEART_CFG.SIZE, y: HEART_CFG.SIZE, z: HEART_CFG.SIZE, duration: 0.6, ease: 'back.out(2)' });
        this.heart = group;
        c.ui.drumTarget = group; // el rayo del control apunta aquí
        this.say('Mira: cuando el anillo llegue al corazón… ¡pum!');
    }

    stop(act) {
        if (this.act !== act) return;
        this.act = null;
        const h = this.heart;
        this.heart = null;
        gsap.killTweensOf(this.squash);
        if (h) gsap.to(h.scale, { x: 0.001, y: 0.001, z: 0.001, duration: 0.35, ease: 'power2.in', onComplete: () => h.parent?.remove(h) });
    }

    /** «Reiniciar» durante el juego: vuelve a empezar la cuenta (la historia sigue igual). */
    retry() {
        const act = this.act;
        if (!act || act.done) return false;
        act.taps = 0;
        act.missed = 0;
        act.report?.(0);
        this.stats = { contacts: 0, soft: 0, ok: 0, perfect: 0, offbeat: 0, beats: 0 };
        this.phase = 'demo';
        this.beats = 0;
        for (const d of this.dots) d.material.color.set('#5b5068');
        this.say('Mira: cuando el anillo llegue al corazón… ¡pum!');
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
        let size = 64;
        do { g.font = `600 ${size}px "Fredoka", system-ui, sans-serif`; size -= 4; } while (g.measureText(text).width > 940 && size > 30);
        g.fillText(text, 512, 102);
        L.tex.needsUpdate = true;
    }

    // ------------------------------------------------------------ reloj del ritmo
    /**
     * Segundos que faltan para el próximo latido, leídos del mismo `delayedCall`
     * que lo va a disparar (un delayedCall de GSAP dura 0: empieza justo al
     * latir; su `delay()` es la espera total). null si no hay latido programado.
     */
    nextBeatIn(act) {
        const bc = act.beatCall;
        if (!bc || !bc.parent || act.done || act.disposed) return null;
        return Math.max(0, bc.startTime() - bc.parent.time());
    }

    /** Avance hacia el próximo latido (0 = acaba de latir, 1 = late ahora). */
    anticipation() {
        const act = this.act;
        const left = act && this.nextBeatIn(act);
        if (left == null) return 0;
        const total = Math.max(0.05, act.beatCall.delay());
        return Math.min(1, Math.max(0, 1 - left / total));
    }

    /**
     * Pone `act.lastBeat` en la escala que usa DrumActivity.tap() (performance.now),
     * pero medido con el reloj del cuento: el juicio del golpe usa el mismo
     * tiempo que el sonido y la animación. Devuelve la distancia al latido más
     * cercano como fracción del intervalo.
     */
    syncClock(act) {
        const since = Math.max(0, this.clock() - this.beatG);
        const nextIn = this.nextBeatIn(act) ?? Math.max(0, act.interval - since);
        // el latido más cercano puede ser el que pasó o el que viene (también tras una espera más corta)
        const eff = since <= nextIn ? since : act.interval - nextIn;
        act.lastBeat = performance.now() / 1000 - eff;
        return Math.min(since, nextIn) / act.interval;
    }

    // ------------------------------------------------------------ latidos y golpes
    onBeat() {
        this.beatG = this.clock();
        this.pulse = 1;
        this.second = 0.32; // «pum-pum»: un segundo latido más chico
        this.beats++;
        this.stats.beats++;
        this.wave.userData.t = 0; // onda del latido
        if (this.phase === 'demo' && this.beats > HEART_CFG.DEMO_BEATS) {
            this.phase = 'play';
            this.say('¡Ahora tú! Golpéalo cuando llegue el anillo');
        }
    }

    /** Respuesta al golpe (con la mano o con el gatillo), ya juzgado por el juego. */
    feedback(good, off) {
        const act = this.act;
        if (!act || !this.heart) return;
        if (good) {
            this.stats.ok++;
            this.ok = 1;
            this.hitWave.userData.t = 0;
            const d = this.dots[act.taps - 1];
            if (d) d.material.color.setHSL(((act.taps * 32) % 360) / 360, 0.85, 0.62);
            const perfect = off < HEART_CFG.PERFECT;
            if (perfect) this.stats.perfect++;
            tone(perfect ? 'perfect' : 'ok');
            const p = this.heart.position.clone();
            p.y += TOP * HEART_CFG.SIZE;
            sparkle(act.scene.group, p, { color: perfect ? '#d9ffd0' : '#b8f5c8', count: perfect ? 8 : 5, radius: 0.35, size: 0.16 });
            this.say(perfect ? '¡Perfecto!' : '¡Bien!');
        } else {
            // fuera de ritmo: se apaga apenas y se mece; sin sonido de error
            this.stats.offbeat++;
            this.bad = 1;
            this.say('Espera a que el anillo llegue… ¡y golpea!');
        }
    }

    /** Centro de la cara de arriba del corazón, en el mundo. */
    topCenter(out) {
        out.set(0, TOP, 0);
        return this.heart.localToWorld(out);
    }

    /** Metros por unidad del corazón. */
    unit() {
        const c = this.world.globals.cuento;
        return HEART_CFG.SIZE * c.diorama.scale.x;
    }

    hitRadius() { return HEART_CFG.HIT_R * this.unit(); }

    /** Aplastar y recuperarse, como un cojín. */
    squeeze(amount) {
        gsap.killTweensOf(this.squash);
        this.squash.v = amount;
        gsap.to(this.squash, { v: 0, duration: 0.55, ease: 'elastic.out(1, 0.45)' });
    }

    update(delta) {
        const act = this.act;
        if (!act || !this.heart) return;
        const dt = Math.min(Math.max(delta, 0), 0.05);
        // latido (contraer y expandir)
        this.pulse = Math.max(0, this.pulse - dt * 5);
        if (this.second > 0) {
            this.second -= dt;
            if (this.second <= 0) this.pulse = Math.max(this.pulse, 0.55);
        }
        this.ok = Math.max(0, this.ok - dt * 1.6); // destello verde: ~0,6 s, suave
        this.bad = Math.max(0, this.bad - dt * 2.5);
        const p = this.pulse * this.pulse;
        const s = 1 + p * 0.12 + this.ok * 0.1 - this.bad * 0.06;
        const sq = this.squash.v;
        this.body.scale.set(s * (1 + sq * 0.12), s * (1 - sq * 0.35), s * (1 + sq * 0.12));
        this.body.rotation.z = Math.sin(this.bad * 18) * this.bad * 0.08; // fuera de ritmo: se mece apenas
        const m = this.mesh.material;
        m.emissive.copy(PINK).lerp(GREEN, this.ok);
        m.emissiveIntensity = 0.2 + p * 0.75 + this.ok * 0.9;
        m.color.copy(this.base).lerp(this.dim, this.bad * 0.6).lerp(GREEN, this.ok * 0.55);

        // anticipación: el anillo se cierra hacia el corazón al acercarse el latido
        const a = this.anticipation();
        const showRing = !act.done && a > 0;
        this.ring.visible = showRing;
        if (showRing) {
            const e = a * a * (3 - 2 * a); // suave al empezar y al llegar
            this.ring.scale.setScalar(HEART_CFG.RING_FROM + (HEART_CFG.RING_TO - HEART_CFG.RING_FROM) * e);
            this.ring.material.opacity = 0.12 + 0.5 * e;
        }
        this.waveStep(this.wave, dt, 0.6, 0.45);
        this.waveStep(this.hitWave, dt, 0.5, 0.55);

        // golpes con la mano
        const hands = this.world.globals.hands;
        if (!hands || act.done || act.disposed) return;
        const top = this.topCenter(this.w);
        const R = this.hitRadius();
        const now = this.clock();
        for (const hand of hands.list) {
            const side = hand.side;
            if (!hand.tracked || hand.lostFor > 0) { this.armed[side] = false; continue; } // sin golpes fantasma
            // punta del índice y palma: la que toque primero la cara de arriba
            let hitVel = null;
            let away = true;
            for (let k = 0; k < 2; k++) {
                const pt = k === 0 ? hand.index : hand.palm;
                const dx = pt.x - top.x;
                const dz = pt.z - top.z;
                const horiz = Math.sqrt(dx * dx + dz * dz);
                const h = pt.y - top.y;
                if (horiz < R * 1.15 && h < HEART_CFG.CONTACT_H + HEART_CFG.REARM) away = false;
                if (!hitVel && horiz < R && h < HEART_CFG.CONTACT_H && h > -0.08) hitVel = k === 0 ? hand.indexVel : hand.palmVel;
            }
            // rearme: la mano (dedo y palma) subió o se alejó del corazón
            if (away) this.armed[side] = true;
            if (!hitVel || !this.armed[side]) continue;
            // contacto: un golpe por contacto
            this.armed[side] = false;
            this.stats.contacts++;
            const down = -hitVel.y;
            this.squeeze(Math.min(1, 0.35 + down * 0.8));
            if (this.phase !== 'play') continue; // mientras mira el ritmo, los golpes no cuentan
            if (down < HEART_CFG.HIT_SPEED || now - this.lastHit < HEART_CFG.MIN_GAP) { this.stats.soft++; continue; } // mano apoyada o golpe doble
            this.lastHit = now;
            act.tap();
        }
    }

    /** Onda que sale del borde del corazón y se desvanece. */
    waveStep(ring, dt, dur, alpha) {
        const t = ring.userData.t;
        if (t === undefined) { ring.visible = false; return; }
        const k = Math.min(1, t / dur);
        ring.visible = k < 1;
        ring.scale.setScalar(HEART_CFG.RING_TO + k * 1.4);
        ring.material.opacity = alpha * (1 - k) * (1 - k);
        ring.userData.t = k < 1 ? t + dt : undefined;
    }
}

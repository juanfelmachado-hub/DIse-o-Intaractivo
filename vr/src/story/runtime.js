/**
 * Arranque del cuento ORIGINAL dentro del mundo de IWSDK.
 *
 * Reutiliza sin copiar el código de la versión web (../../../src): historia,
 * StoryController, libro, escenarios, Nico, el Guardián, los 5 juegos, la UI
 * (como modelo de estado) y el audio. IWSDK es dueño del renderer, la cámara,
 * el jugador y el bucle; aquí solo se adaptan las piezas que en la web
 * dependían de la pantalla:
 *
 *  - viewCam: cámara de referencia sin padre que copia cada cuadro la pose
 *    real de la cabeza (en el mundo). El cuento la usa donde antes usaba la
 *    cámara de la web (proyecciones, el Guardián que mira al lector, el cielo).
 *  - rig: la cámara cinematográfica de la web NO se usa en VR (comodidad: nada
 *    mueve la cabeza del lector); este reemplazo acepta las mismas llamadas.
 *  - VRPointer: el mismo Pointer de la web, alimentado por el rayo del control
 *    o de la mano en lugar del mouse/dedo.
 *  - VRHotspots: los marcadores tocables pasan de botones HTML a anillos 3D.
 *  - Los sonidos escritos (onomatopeyas) se dibujan en 3D junto al objeto.
 */
import { Group, Mesh, MeshBasicMaterial, PerspectiveCamera, RingGeometry, Vector3, DoubleSide, NeutralToneMapping, PCFShadowMap, PointLight, TextureLoader } from '@iwsdk/core';
import gsap from 'gsap';
import { Quake } from '../../../src/core/Quake.js';
import { Environment } from '../../../src/world/Environment.js';
import { Book } from '../../../src/book/Book.js';
import { PageTurner } from '../../../src/book/PageTurner.js';
import { setAnisotropy } from '../../../src/book/PageArt.js';
import { Guardian } from '../../../src/models/characters/Guardian.js';
import { UI } from '../../../src/ui/UI.js';
import { Pointer } from '../../../src/utils/Pointer.js';
import { StoryController } from '../../../src/story/StoryController.js';
import { loadAssets } from '../../../src/models/assets.js';
import { popWord } from '../../../src/animations/motions.js';
import { stopEffects, stopMusic, resetOnce } from '../../../src/audio/sfx.js';
import { StoryMarker } from '../story-components.js';

/** Lienzo virtual de 1000×1000 "px": las coordenadas de pantalla del cuento salen de proyectar la mira del rayo. */
export const VIRTUAL = 1000;
function virtualCanvas() {
    const el = document.createElement('div');
    el.getBoundingClientRect = () => ({ left: 0, top: 0, right: VIRTUAL, bottom: VIRTUAL, width: VIRTUAL, height: VIRTUAL, x: 0, y: 0 });
    el.setPointerCapture = () => {};
    el.releasePointerCapture = () => {};
    el.hasPointerCapture = () => false;
    return el;
}

/** El Pointer original, pero con el rayo real del control (no uno reconstruido desde la pantalla). */
class VRPointer extends Pointer {
    setNdc(e) {
        if (!e.ray) return super.setNdc(e);
        this.ndc.set(e.ndcX, e.ndcY);
        this.raycaster.ray.copy(e.ray);
        this.raycaster.camera = this.camera;
    }
}

/** Los marcadores tocables de los juegos como anillos 3D (las versiones "fantasma" siguen invisibles). */
class VRHotspots {
    constructor(world) {
        this.world = world;
        this.items = new Map();
    }

    add(id, object, { ghost = false } = {}) {
        this.remove(id);
        let entity = null;
        if (!ghost) {
            const ring = new Mesh(
                new RingGeometry(0.075, 0.105, 40),
                new MeshBasicMaterial({ color: '#ffd84d', transparent: true, opacity: 0.9, depthTest: false, depthWrite: false, side: DoubleSide, fog: false }),
            );
            ring.renderOrder = 20;
            ring.userData.target = object;
            ring.userData.raycast = false;
            ring.raycast = () => {};
            entity = this.world.createTransformEntity(ring, { persistent: true });
            entity.addComponent(StoryMarker, { id });
        }
        this.items.set(id, { object, entity });
    }

    setClass() {}

    remove(id) {
        const it = this.items.get(id);
        if (!it) return;
        it.entity?.dispose();
        this.items.delete(id);
    }

    clear() {
        for (const id of [...this.items.keys()]) this.remove(id);
    }

    update() {}
}

/** La cámara de la web no se usa en VR: este reemplazo acepta sus llamadas sin mover nada. */
function rigStub() {
    return {
        focus: [],
        ease: 5,
        parallax: null,
        layout: null,
        set() {},
        to() { return null; },
        update() {},
        setViewport() {},
        bookRect() { return null; },
    };
}

function loadTextures() {
    // mismo código que src/main.js (cielos de noche y atardecer)
    const loader = new TextureLoader();
    const load = (url) => new Promise((resolve, reject) => loader.load(url, resolve, undefined, reject));
    const base = import.meta.env.BASE_URL;
    return Promise.all([load(base + 'textures/sky/night.jpg'), load(base + 'textures/sky/dusk.jpg')]).then(([night, dusk]) => ({ night, dusk }));
}

/**
 * Crea el cuento dentro de `world`. Devuelve el contexto compartido por los
 * sistemas (se guarda en world.globals.cuento).
 */
export async function createStory(world) {
    const [textures] = await Promise.all([loadTextures(), loadAssets(import.meta.env.BASE_URL)]);
    const renderer = world.renderer;
    renderer.toneMapping = NeutralToneMapping;
    renderer.localClippingEnabled = true; // ranura del lomo (popupClip), igual que la web
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFShadowMap; // más barato que PCFSoft en Quest
    setAnisotropy(Math.min(4, renderer.capabilities.getMaxAnisotropy()));

    const scene = world.scene;
    const viewCam = new PerspectiveCamera(90, 1, 0.05, 400);
    viewCam.name = 'cuento-vista';

    // raíz del cuento: el libro, el escenario y las onomatopeyas
    const root = new Group();
    root.name = 'cuento';
    const rootEntity = world.createTransformEntity(root, { persistent: true });
    const fx = new Group();
    fx.name = 'cuento-sonidos-escritos';
    root.add(fx);

    const quake = new Quake();
    const rig = rigStub();
    const env = new Environment({ scene, renderer, textures });
    // una sola sombra, más pequeña para mantener 72 fps en Quest
    env.sun.shadow.mapSize.set(1024, 1024);

    Guardian.light = new PointLight('#bff5a0', 0, 2.4, 2);
    root.add(Guardian.light);

    const book = new Book();
    root.add(book.root, book.shadow);

    const canvas = virtualCanvas();
    const ui = new UI();
    ui.el.canvas = canvas;
    ui.setProgressEnds(book.progressEnds);
    const hotspots = new VRHotspots(world);
    const pointer = new VRPointer(canvas, viewCam);

    const ctx = {
        book, env, rig, quake, ui, hotspots, pointer,
        camera: viewCam,
        // el Guardián se acerca al lector a una distancia cómoda en VR (en metros reales × escala)
        viewerReach: 1.2,
        viewerSide: 0.28,
    };
    const story = new StoryController(ctx);
    const turner = new PageTurner({ canvas, camera: viewCam, book, pointer }, story);
    story.ctx.turner = turner;
    // en VR la hoja no se arrastra con el rayo: se pasa con el botón del panel
    pointer.fallback = null;

    // onomatopeyas en 3D (en la web eran texto HTML sobre la escena)
    const tmp = new Vector3();
    ui.sfxAt = (text, w) => {
        popWord(fx, text, tmp.copy(w));
    };
    ui.sfx = (text, x, y) => {
        const s = world.globals.cuentoScale ?? 1;
        tmp.set(x / 50 - 1, 1 - y / 50, 0.5).unproject(viewCam).sub(viewCam.position).normalize();
        tmp.multiplyScalar(1.3 * s).add(viewCam.position);
        popWord(fx, text, tmp, { size: 0.5 * s, rise: 0.3 * s });
    };
    // «Ponerse a salvo»: se guarda la vista para el panel (la web la dibuja en HTML)
    const safeSteps = ui.safeSteps.bind(ui);
    ui.safeSteps = (view) => {
        ui.vrSteps = view;
        safeSteps(view);
    };

    // GSAP se actualiza dentro del bucle de IWSDK (StorySystem), como en la web
    gsap.ticker.remove(gsap.updateRoot);

    story.showCover();
    ui.hideLoader();
    try { renderer.compile(scene, world.camera); } catch { /* el primer cuadro compila igual */ }

    return { world, ctx, story, ui, book, env, quake, turner, pointer, hotspots, viewCam, root, rootEntity, fx };
}

/** «Reiniciar»: vuelve a la portada como al terminar el cuento (sin recargar la página ni salir de VR). */
export function restartStory(c) {
    const { story, ctx, turner, book, quake } = c;
    gsap.globalTimeline.clear();
    story.stopActivity();
    story.scene?.dispose();
    story.incoming?.dispose();
    story.scene = null;
    story.incoming = null;
    story.done.clear();
    story.visited.clear();
    story.maxBeat.clear();
    story.gameProgress.clear();
    story.stars = 0;
    story.closing = false;
    story.blocked = false;
    story.beat = -1;
    ctx.hotspots.clear();
    ctx.pointer.clear();
    if (book.turn) book.cancelTurn();
    turner.reset();
    stopEffects();
    stopMusic(1);
    resetOnce();
    quake.set(0);
    ctx.ui.vrSteps = null;
    story.showCover();
}

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
 *
 * Realidad mixta: el cuento es una MAQUETA sobre el piso real. Todo el mundo
 * del cuento (libro, escenarios, personajes y sus luces) cuelga de `diorama`,
 * un grupo que se coloca sobre el piso y se escala (≈0,17: Nico mide ~16 cm y
 * el libro abierto ~1 × 0,7 m). El cielo, la niebla y el paisaje lejano de la
 * web no se dibujan: en su lugar se ve la habitación (passthrough).
 */

/** Escala inicial de la maqueta y las que se pueden elegir (Nico ≈ 0,95 × escala). */
export const DIORAMA_SCALES = [0.12, 0.17, 0.22];
export const DIORAMA_SCALE = 0.17;
/** Altura (en unidades del cuento) de la base del libro abierto sobre el pasto de la web. */
const BOOK_FLOOR = 0.4;
import { CircleGeometry, Color, Fog, Group, Mesh, MeshBasicMaterial, PerspectiveCamera, RingGeometry, ShadowMaterial, Vector3, DoubleSide, NeutralToneMapping, PCFShadowMap, PointLight, TextureLoader } from '@iwsdk/core';
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
import { Layers } from '../interaction/layers.js';

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
 * Del mundo de la web a una maqueta en la habitación real:
 *  - sin cielo, niebla, pasto infinito, colinas ni polvo (se ve la habitación);
 *  - las luces del cuento pasan a la maqueta (giran y se escalan con ella) y la
 *    cámara de la sombra se ajusta a su tamaño;
 *  - las luciérnagas quedan dentro de la maqueta, también en miniatura.
 */
function toMiniature(env, scene, root) {
    env.sky.mesh.visible = false;
    env.nature.group.visible = false;
    scene.remove(env.sky.mesh, env.nature.group, env.dust, env.motes);
    // Environment sigue animando su niebla, pero sobre un objeto que no se dibuja
    env.scene = { fog: new Fog(new Color(), 1e4, 1e5) };
    scene.fog = null;
    root.add(env.hemi, env.sun, env.sun.target, env.rim, env.fireflies);
    env.sun.shadow.mapSize.set(1024, 1024); // una sola sombra, pequeña: 72 fps en Quest
    env.baseShadow = { ...env.sun.shadow.camera, normalBias: env.sun.shadow.normalBias };
    env.baseFirefly = env.fireflies.material.uniforms.uSize.value;
}

/** La cámara de la sombra y las luciérnagas usan metros reales: se ajustan al tamaño de la maqueta. */
export function fitShadow(env, k) {
    if (Guardian.light) Guardian.light.distance = 2.4 * k;
    const sc = env.sun.shadow.camera;
    const b = env.baseShadow;
    sc.left = b.left * k; sc.right = b.right * k; sc.top = b.top * k; sc.bottom = b.bottom * k;
    sc.near = b.near * k; sc.far = b.far * k;
    sc.updateProjectionMatrix();
    env.sun.shadow.normalBias = b.normalBias * k;
    // el tamaño de las luciérnagas se calcula con la distancia real: también a escala
    env.fireflies.material.uniforms.uSize.value = env.baseFirefly * k;
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

    // la maqueta: se apoya en el piso real (PlacementSystem la coloca y la escala)
    const diorama = new Group();
    diorama.name = 'maqueta';
    diorama.scale.setScalar(DIORAMA_SCALE);
    const dioramaEntity = world.createTransformEntity(diorama, { persistent: true });
    // raíz del cuento: el libro, el escenario y las onomatopeyas. Se baja para
    // que la base del libro abierto toque el piso (en la web flotaba sobre el pasto).
    const root = new Group();
    root.name = 'cuento';
    root.position.y = -BOOK_FLOOR;
    diorama.add(root);
    const fx = new Group();
    fx.name = 'cuento-sonidos-escritos';
    root.add(fx);

    const quake = new Quake();
    const rig = rigStub();
    const env = new Environment({ scene, renderer, textures });
    toMiniature(env, scene, root);

    // sombras sobre el piso real: un plano invisible que solo recibe sombra
    const floorShadow = new Mesh(new CircleGeometry(4.2, 40), new ShadowMaterial({ color: '#1d1430', opacity: 0.38, depthWrite: false }));
    floorShadow.rotation.x = -Math.PI / 2;
    floorShadow.position.y = BOOK_FLOOR + 0.004;
    floorShadow.receiveShadow = true;
    floorShadow.renderOrder = -2;
    floorShadow.name = 'sombra-en-el-piso';
    root.add(floorShadow);

    // en la maqueta las distancias reales son ~6 veces menores: sin caída física
    // (decay 0) y con el alcance a escala, la luz del Guardián ilumina lo mismo que en la web
    // (el Guardián le pone su posición en el MUNDO: la luz va en la escena, no en la maqueta)
    Guardian.light = new PointLight('#bff5a0', 0, 2.4 * DIORAMA_SCALE, 0);
    scene.add(Guardian.light);

    const book = new Book();
    root.add(book.root, book.shadow);
    book.shadow.position.y = BOOK_FLOOR + 0.006; // la mancha oscura queda sobre el piso

    const canvas = virtualCanvas();
    const ui = new UI();
    ui.el.canvas = canvas;
    ui.setProgressEnds(book.progressEnds);
    const hotspots = new VRHotspots(world);
    const pointer = new VRPointer(canvas, viewCam);

    const ctx = {
        book, env, rig, quake, ui, hotspots, pointer,
        camera: viewCam,
        // el Guardián sale de la maqueta hacia el lector, pero se queda a medio camino (metros reales)
        viewerReach: 0.55,
        viewerSide: 0.12,
    };
    const story = new StoryController(ctx);
    const turner = new PageTurner({ canvas, camera: viewCam, book, pointer }, story);
    story.ctx.turner = turner;
    // en VR la hoja no se arrastra con el rayo: se pasa con el botón del panel
    pointer.fallback = null;

    // onomatopeyas en 3D (en la web eran texto HTML sobre la escena)
    const tmp = new Vector3();
    // (el texto vive dentro de la maqueta: su tamaño en unidades del cuento ya sale a escala)
    ui.sfxAt = (text, w) => {
        popWord(fx, text, fx.worldToLocal(tmp.copy(w)));
    };
    ui.sfx = (text, x, y) => {
        tmp.set(x / 50 - 1, 1 - y / 50, 0.5).unproject(viewCam).sub(viewCam.position).normalize();
        tmp.multiplyScalar(0.9).add(viewCam.position);
        const k = diorama.scale.x;
        popWord(fx, text, fx.worldToLocal(tmp), { size: 0.18 / k, rise: 0.1 / k });
    };
    // «Ponerse a salvo»: se guarda la vista para el panel (la web la dibuja en HTML)
    const safeSteps = ui.safeSteps.bind(ui);
    ui.safeSteps = (view) => {
        ui.vrSteps = view;
        safeSteps(view);
    };

    // GSAP se actualiza dentro del bucle de IWSDK (StorySystem), como en la web
    gsap.ticker.remove(gsap.updateRoot);

    fitShadow(env, DIORAMA_SCALE);
    story.showCover();
    ui.hideLoader();
    try { renderer.compile(scene, world.camera); } catch { /* el primer cuadro compila igual */ }

    return { world, ctx, story, ui, book, env, quake, turner, pointer, hotspots, viewCam, root, diorama, dioramaEntity, fx, layers: new Layers() };
}

/** «Reiniciar»: vuelve a la portada como al terminar el cuento (sin recargar la página ni salir de VR). */
export function restartStory(c) {
    const { story, ctx, turner, book, quake } = c;
    gsap.globalTimeline.clear();
    c.layers.undo();
    c.layers.items.clear();
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

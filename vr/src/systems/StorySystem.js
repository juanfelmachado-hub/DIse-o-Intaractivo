/**
 * StorySystem — el bucle del cuento dentro de IWSDK.
 *
 * Hace cada cuadro lo mismo que Experience.tick() en la web (GSAP, temblor,
 * mundo, libro, hoja, escenarios), en el mismo orden, pero sin cámara
 * cinematográfica ni render propio: IWSDK dibuja. Publica el estado narrativo
 * en el componente StoryState y se detiene en pausa o cuando el visor muestra
 * su menú del sistema (VisibleBlurred).
 */
import { createSystem, Vector3, VisibilityState } from '@iwsdk/core';
import gsap from 'gsap';
import { setQuake } from '../../../src/audio/sfx.js';
import { story as storyData } from '../../../src/data/story.js';
import { StoryState } from '../story-components.js';

export class StorySystem extends createSystem({
    state: { required: [StoryState] },
}) {
    init() {
        this.clock = 0;
        this.scaleTmp = new Vector3();
        this.calm = { shake: new Vector3(), intensity: 0 };
        this.stateEntity = this.world.createEntity();
        this.stateEntity.addComponent(StoryState, { pages: storyData.pages.length });
        this.world.globals.cuentoState = this.stateEntity;
    }

    get paused() {
        return !!this.world.globals.cuentoPaused || this.world.visibilityState.peek() === VisibilityState.VisibleBlurred;
    }

    /** Copia la pose real de la cabeza (en el mundo) a la cámara de referencia del cuento. */
    syncView(c) {
        const cam = this.world.camera;
        const v = c.viewCam;
        cam.updateWorldMatrix(true, false);
        cam.matrixWorld.decompose(v.position, v.quaternion, this.scaleTmp);
        const immersive = this.world.visibilityState.peek() !== VisibilityState.NonImmersive;
        const fov = immersive ? 90 : cam.fov;
        const aspect = immersive ? 1 : cam.aspect;
        if (v.fov !== fov || v.aspect !== aspect) {
            v.fov = fov;
            v.aspect = aspect;
            v.updateProjectionMatrix();
        }
        v.updateMatrixWorld(true);
    }

    update(delta) {
        const c = this.world.globals.cuento;
        if (!c) return;
        this.syncView(c);
        const paused = this.paused;
        this.stateEntity.setValue(StoryState, 'paused', paused);
        if (paused) return;

        const dt = Math.min(Math.max(delta, 0), 1 / 20);
        this.clock += dt;
        const t = this.clock;
        const { quake, env, book, turner, story } = c;

        gsap.updateRoot(t);
        quake.update(dt);
        setQuake(quake.intensity); // el colchón del temblor sigue a la escena
        env.update(dt, t, quake, c.viewCam);
        // Comodidad: en VR el libro no flota y su sacudida es un cuarto de la web
        // (el lector está de pie sobre él); el resto del temblor no cambia.
        book.float.amp = 0;
        book.float.tilt = 0;
        this.calm.shake.copy(quake.shake).multiplyScalar(0.25);
        this.calm.intensity = quake.intensity;
        book.update(dt, t, this.calm, null);
        turner.update(dt);
        story.update(dt, t, quake);

        const e = this.stateEntity;
        const page = story.page;
        e.setValue(StoryState, 'mode', story.mode);
        e.setValue(StoryState, 'page', story.index);
        e.setValue(StoryState, 'beat', story.beat);
        e.setValue(StoryState, 'chapter', story.mode === 'reading' ? page.title : '');
        e.setValue(StoryState, 'turning', turner.busy || c.ui.turning);
        e.setValue(StoryState, 'activity', story.activity ? story.page.beats[story.beat]?.instruction?.taskId ?? '' : '');
    }
}

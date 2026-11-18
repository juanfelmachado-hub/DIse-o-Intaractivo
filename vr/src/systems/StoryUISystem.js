/**
 * StoryUISystem — la interfaz del cuento en paneles UIKitML.
 *
 * La UI original (src/ui/UI.js) sigue decidiendo QUÉ se muestra: el narrador,
 * quién habla, la actividad, el botón Siguiente/Pasar la página, la tortuga y
 * «Ponerse a salvo». Este sistema solo lo copia a los paneles cuando cambia
 * (sin trabajo por cuadro si nada cambió) y convierte los clics del rayo en
 * los mismos clics de la web.
 *
 * Menú: inicio (texto de la portada web), instrucciones de uso en VR, pausa,
 * reinicio, tamaño del texto y entrar o salir de VR.
 */
import { createSystem, VisibilityState } from '@iwsdk/core';
import { story as storyData } from '../../../src/data/story.js';
import { stopMusic, startMusic, unlockAudio } from '../../../src/audio/sfx.js';
import { restartStory } from '../story/runtime.js';
import { StoryPanel, StoryState } from '../story-components.js';

/**
 * Fredoka, la tipografía del cuento (Guía visual §3.1), como fuente MSDF con
 * todos los caracteres del español (la fuente incluida en UIKit no trae
 * tildes, ñ ni ¡¿). Generada desde src/fonts/Fredoka-Variable.woff2 (OFL).
 */
const font = (w) => `${import.meta.env.BASE_URL}fonts/fredoka-${w}.json`;
const FONT = { fontFamily: 'fredoka', fontFamilies: { fredoka: { normal: font(400), medium: font(500), 'semi-bold': font(500), bold: font(700) } } };
const TALK_COLORS = { guardian: '#2f5a3a', nico: '#2d4f7a' };
const TEXT_SIZES = [[1, 'Texto: normal'], [1.2, 'Texto: grande'], [1.4, 'Texto: muy grande']];
/** Solo cambian palabras del gesto (el dedo de la pantalla táctil pasa a ser el rayo). */
const vrWords = (t) => t.replace(/\bel dedo\b/gi, 'el rayo').replace(/\bdedo\b/gi, 'rayo');

export class StoryUISystem extends createSystem({
    panels: { required: [StoryPanel] },
    state: { required: [StoryState] },
}) {
    init() {
        this.cache = new Map();
        this.props = {};
        this.wait = 0; // la UI se sincroniza a 10 Hz: el texto no necesita más
        this.ready = false;
        this.menuOpen = true; // portada: el menú de inicio
        this.textSize = 0;
    }

    /** setProperties solo si el valor cambió (sin trabajo ni asignaciones si nada cambió). */
    set(el, key, prop, value) {
        if (!el || this.cache.get(key) === value) return;
        this.cache.set(key, value);
        this.props[prop] = value;
        el.setProperties(this.props);
        delete this.props[prop];
    }

    show(el, key, on) {
        this.set(el, key + ':display', 'display', on ? 'flex' : 'none');
    }

    wire(c) {
        const sp = this.world.getSceneObject('story-panel');
        const mp = this.world.getSceneObject('menu-panel');
        if (!sp?.getElementById || !mp?.getElementById) return false;
        const $s = (id) => sp.getElementById(id);
        const $m = (id) => mp.getElementById(id);
        this.sp = sp;
        this.mp = mp;
        $s('root')?.setProperties(FONT);
        $m('root')?.setProperties(FONT);
        this.el = {
            chapter: $s('chapter'), missionBox: $s('mission-box'), missionText: $s('mission-text'),
            talkBox: $s('talk-box'), speaker: $s('speaker'), dialog: $s('dialog'), narration: $s('narration'),
            next: $s('btn-next'), nextLabel: $s('btn-next-label'), turtle: $s('btn-turtle'),
            steps: $s('btn-steps'), stepsLabel: $s('btn-steps-label'),
            near: $s('btn-near'), recenter: $s('btn-recenter'), menu: $s('btn-menu'), hide: $s('btn-hide'), reset: $s('btn-reset'),
            title: $m('title'), intro: $m('intro'), start: $m('btn-start'), startLabel: $m('btn-start-label'),
            xr: $m('btn-xr'), exit: $m('btn-exit'), text: $m('btn-text'), textLabel: $m('btn-text-label'),
            restart: $m('btn-restart'), panel: $m('btn-panel'),
        };
        const { ui } = c;
        const on = (el, fn) => {
            if (!el) return;
            const h = () => { unlockAudio(); fn(); };
            el.addEventListener('click', h);
            this.cleanupFuncs.push(() => el.removeEventListener('click', h));
        };
        const placement = () => this.world.globals.placement;
        // panel del cuento: los mismos botones de la web
        on(this.el.next, () => {
            // la torre (TowerSystem): tras un rato, «Siguiente» ofrece que la termine Nico
            const tower = this.world.globals.tower;
            if (tower?.active) return tower.canSkip ? tower.skip() : ui.nudgeMission?.();
            ui.el.next.click();
        });
        on(this.el.hide, () => this.world.globals.panel?.hide());
        // «Reiniciar»: los objetos y personajes manipulables vuelven a su lugar (no la historia)
        on(this.el.reset, () => this.world.globals.resetObjects?.());
        on(this.el.panel, () => { this.world.globals.panel?.reset(); this.setPaused(false); });
        on(this.el.turtle, () => ui.el.turtle.onclick?.());
        on(this.el.steps, () => ui.onStepsGo?.());
        on(this.el.near, () => placement()?.nearNico());
        on(this.el.recenter, () => placement()?.recenter());
        on(this.el.menu, () => this.setPaused(true));
        // menú
        on(this.el.start, () => {
            const mode = this.world.globals.cuentoState.getValue(StoryState, 'mode');
            if (this.world.globals.cuentoPaused) return this.setPaused(false);
            this.menuOpen = false;
            if (mode === 'cover') ui.el.introGo.click(); // «Abre el libro», como en la portada web
        });
        on(this.el.xr, () => this.world.launchXR());
        on(this.el.exit, () => this.world.exitXR());
        on(this.el.text, () => {
            this.textSize = (this.textSize + 1) % TEXT_SIZES.length;
            placement()?.setTextScale(TEXT_SIZES[this.textSize][0]);
        });
        on(this.el.restart, () => {
            this.world.globals.cuentoPaused = false;
            restartStory(c);
            this.menuOpen = true;
        });

        // textos fijos del menú: los de la portada de la web
        this.goText = ui.el.introGo.textContent.trim() || 'Abre el libro';
        this.set(this.el.title, 'title', 'text', storyData.title);
        const intro = document.querySelector('#cuento-dom .intro__text')?.textContent?.trim() ?? storyData.subtitle;
        this.set(this.el.intro, 'intro', 'text', intro);
        return true;
    }

    setPaused(p) {
        this.world.globals.cuentoPaused = p;
        this.menuOpen = p;
        if (p) stopMusic(0.6);
        else if (this.world.globals.cuentoState.getValue(StoryState, 'mode') !== 'cover') startMusic(1);
    }

    update(delta) {
        const c = this.world.globals.cuento;
        const state = this.world.globals.cuentoState;
        if (!c || !state) return;
        this.wait -= delta;
        if (this.wait > 0) return;
        this.wait = 0.1;
        if (!this.ready) {
            this.ready = this.wire(c);
            if (!this.ready) return;
        }
        const { ui } = c;
        const el = this.el;
        const mode = state.getValue(StoryState, 'mode');
        const paused = !!this.world.globals.cuentoPaused;
        const immersive = this.world.visibilityState.peek() !== VisibilityState.NonImmersive;

        // --- visibilidad de los paneles
        // colocando la maqueta en el piso: sin paneles (la vista previa tiene su indicación)
        if (this.world.globals.placing) {
            this.sp.visible = this.mp.visible = false;
            return;
        }
        const menu = this.menuOpen && (mode === 'cover' || paused);
        if (mode !== 'cover' && !paused) this.menuOpen = false;
        this.sp.visible = !menu && mode !== 'cover' && !this.world.globals.panel?.hidden;
        this.mp.visible = menu || mode === 'cover';

        // --- menú
        this.set(el.startLabel, 'startLabel', 'text', paused ? 'Continuar' : this.goText);
        this.show(el.xr, 'xr', !immersive && this.world.xrEnabled);
        this.show(el.exit, 'exit', immersive);
        this.show(el.near, 'near', immersive);
        this.show(el.recenter, 'recenter', immersive);
        this.show(el.hide, 'hide', immersive);
        this.show(el.reset, 'reset', immersive);
        this.set(el.textLabel, 'textLabel', 'text', TEXT_SIZES[this.textSize][1]);
        if (!this.sp.visible) return;

        // --- panel del cuento: capítulo
        const page = c.story.page;
        const chapter = mode === 'reading'
            ? `Página ${page.number} de ${storyData.pages.length} · ${page.title}`
            : storyData.title;
        this.set(el.chapter, 'chapter', 'text', chapter);

        // --- nivel 1: actividad (o «¡Lo lograste!»)
        const m = ui.mission;
        const tab = ui.success ? ui.success : m ? (m.short ?? m.text) : '';
        const talk = ui.talk ?? (m ? { speaker: 'guardian', text: m.text } : null);
        this.show(el.missionBox, 'missionBox', !!(tab && talk));
        if (tab) {
            this.set(el.missionText, 'missionText', 'text', vrWords(tab));
            this.set(el.missionBox, 'missionColor', 'backgroundColor', ui.success ? '#3f9a54' : '#f08a45');
        }

        // --- nivel 2: indicación o diálogo
        this.show(el.talkBox, 'talkBox', !!talk);
        let stepsGo = '';
        if (talk) {
            let text = talk.text;
            if (talk.kind === 'steps' && ui.vrSteps) {
                const v = ui.vrSteps;
                const cur = v.phase === 'step' ? v.steps[v.index] : v.phase === 'end' ? v.end : v.intro;
                const label = v.phase === 'step' ? `Paso ${v.index + 1} de ${v.steps.length}: ` : '';
                text = `${label}${cur.name}. ${cur.text}`;
                stepsGo = v.phase === 'step' ? v.next : cur.go;
            } else if (text.startsWith('howto|')) {
                const [, title, ...steps] = text.split('|');
                text = `${title}: ${steps.map((s, i) => `${i + 1}. ${s}`).join('  ')}`;
            }
            const name = storyData.characters[talk.speaker]?.name ?? talk.speaker;
            this.set(el.speaker, 'speaker', 'text', name);
            this.set(el.dialog, 'dialog', 'text', vrWords(text));
            this.set(el.talkBox, 'talkColor', 'backgroundColor', TALK_COLORS[talk.speaker] ?? TALK_COLORS.guardian);
        }

        // --- nivel 3: narrador y botón siguiente (mismo texto y etiqueta que la web)
        const narration = ui.el.storyText.dataset.text || '';
        this.set(el.narration, 'narration', 'text', narration);
        const role = ui.el.next.dataset.role;
        const tower = this.world.globals.tower;
        const skip = tower?.active && tower.canSkip;
        this.set(el.nextLabel, 'nextLabel', 'text', skip ? 'Que la termine Nico' : ui.el.next.getAttribute('aria-label') || 'Siguiente');
        this.set(el.next, 'nextDim', 'opacity', role === 'off' && !skip ? 0.45 : 1);
        this.show(el.turtle, 'turtle', !ui.el.turtle.hidden);
        this.show(el.steps, 'steps', !!stepsGo && !!ui.onStepsGo);
        if (stepsGo) this.set(el.stepsLabel, 'stepsLabel', 'text', stepsGo);
    }
}

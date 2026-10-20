/**
 * Interfaz HTML: texto del cuento, pista de arrastre de la hoja, globo del
 * Guardián cuando le habla al lector y los elementos de las actividades.
 *
 * Texto según el "Instructivo de texto y diálogos":
 *  - narrador: recuadro crema (u oscuro en el temblor) en la zona libre de
 *    cada escena; la zona cambia entre escenas (data/story.js → layout.at);
 *  - Nico y el Guardián: globo con colita que apunta al personaje, siempre
 *    al lado y por encima de él (nunca sobre su cara) y sin tapar al narrador;
 *  - instrucciones de juego: recuadro corto con ícono que desaparece en
 *    cuanto el niño empieza a jugar;
 *  - palabras clave (agáchate, cúbrete, sujétate, despacito) en negrita y color.
 *
 * No hay botones de navegación: las páginas se pasan arrastrándolas.
 * La UI no conoce la historia: el StoryController le dice qué mostrar.
 */
import * as THREE from 'three'
import { story } from '../data/story.js'
import { avatars, stepIcons } from './icons.js'

const $ = (sel) => document.querySelector(sel)
const v = new THREE.Vector3()

const HINTS = {
    cover: { label: 'Arrastra la tapa para abrir el cuento', anchor: 'cover', dir: 'left' },
    next: { label: 'Arrastra la hoja para pasar la página', anchor: 'right', dir: 'left' },
    close: { label: 'Arrastra la hoja para cerrar el libro', anchor: 'left', dir: 'right' },
}

const KEYWORDS = new Set(['agáchate', 'cúbrete', 'sujétate', 'despacito'])
const bare = (w) => w.toLowerCase().replace(/[^a-záéíóúüñ]/g, '')

function wordsHTML(text) {
    return text
        .split(' ')
        .map((w, i) => {
            const kw = KEYWORDS.has(bare(w)) ? ' kw' : ''
            return `<span class="w${kw}" style="--i:${i}">${escapeHTML(w)}${' '}</span>`
        })
        .join('')
}

/** Zona del narrador según el tamaño de la pantalla (en celular, siempre arriba). */
function resolveZone(at = 'top-left') {
    const w = window.innerWidth
    const h = window.innerHeight
    if (w < 760) return h > w * 1.2 ? 'top' : at.replace('side-', 'top-')
    if (at.startsWith('side-') && w / h < 1.45) return at.replace('side-', 'top-')
    return at
}

function escapeHTML(s) {
    return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
}

export class UI {
    constructor() {
        this.el = {
            loader: $('[data-loader]'),
            narration: $('[data-narration]'),
            dialogue: $('[data-dialogue]'),
            speaker: $('[data-speaker]'),
            dots: $('[data-dots]'),
            activity: $('[data-activity]'),
            activityTitle: $('[data-activity-title]'),
            activityStops: $('[data-activity-stops]'),
            tray: $('[data-tray]'),
            hotspots: $('[data-hotspots]'),
            hint: $('[data-hint]'),
            hintLabel: $('[data-hint-label]'),
            toast: $('[data-toast]'),
            gBubble: $('[data-guardian-bubble]'),
            gSpeaker: $('[data-g-speaker]'),
            veil: $('[data-veil]'),
            instruction: $('[data-instruction]'),
        }
        this.el.narrationText = this.el.narration.querySelector('.bubble__text')
        this.el.dialogueText = this.el.dialogue.querySelector('.bubble__text')
        this.el.gBubbleText = this.el.gBubble.querySelector('.g-bubble__text')
        this.el.instructionText = this.el.instruction.querySelector('.instruction__text')
        this.el.gSpeaker.innerHTML = `${avatars.guardian ?? ''}<span>${escapeHTML(story.characters.guardian.name)}</span>`
        this.hint = null
        this.gTarget = null
        this.gDismiss = null
        this.el.gBubble.addEventListener('click', () => this.gDismiss?.())
        // a quién apunta la colita de cada globo (lo fija el StoryController)
        this.speakers = {}
        this.speech = { who: null, x: 0, y: 0, init: false }
        this.lastTime = performance.now()
        // la instrucción de juego se va cuando el niño empieza a jugar
        const played = () => {
            if (!this.el.instruction.hidden) this.instructTimer = setTimeout(() => this.hideInstruction(), 250)
        }
        for (const type of ['pointerdown', 'click', 'keydown']) window.addEventListener(type, played, true)
        window.addEventListener('resize', () => { this.speech.init = false; this.placeNarrator() })
    }

    /** Personajes de la doble página actual (para anclar sus globos). */
    setSpeakers(scene) {
        this.speakers = {
            nico: scene?.nico?.speechAnchor ?? null,
            guardian: scene?.guardian ?? null,
        }
        this.speech.init = false
    }

    // ------------------------------------------------------------ carga
    hideLoader() {
        this.el.loader.classList.add('is-done')
        setTimeout(() => this.el.loader.remove(), 1200)
    }

    // ------------------------------------------------------------ pista de arrastre
    showDragHint(kind, delay = 0) {
        clearTimeout(this.hintTimer)
        this.hintTimer = setTimeout(() => {
            const h = HINTS[kind]
            this.hint = h
            const el = this.el.hint
            this.el.hintLabel.textContent = h.label
            el.dataset.dir = h.dir
            el.hidden = false
            el.classList.remove('is-leaving')
        }, delay * 1000)
    }

    hideDragHint() {
        clearTimeout(this.hintTimer)
        if (this.el.hint.hidden) return
        this.el.hint.classList.add('is-leaving')
        this.hint = null
        setTimeout(() => { if (!this.hint) this.el.hint.hidden = true }, 300)
    }

    toast(text) {
        const t = this.el.toast
        t.textContent = text
        t.hidden = false
        t.classList.remove('is-in')
        void t.offsetWidth
        t.classList.add('is-in')
        clearTimeout(this.toastTimer)
        this.toastTimer = setTimeout(() => { t.hidden = true }, 2400)
    }

    // ------------------------------------------------------------ el Guardián habla al lector
    showGuardianBubble(text, target, onDismiss) {
        const b = this.el.gBubble
        this.gTarget = target
        this.gDismiss = onDismiss
        this.el.gBubbleText.innerHTML = wordsHTML(text)
        b.hidden = false
        b.classList.remove('is-leaving')
        b.style.animation = 'none'
        void b.offsetWidth
        b.style.animation = ''
    }

    hideGuardianBubble() {
        const b = this.el.gBubble
        this.gDismiss = null
        if (b.hidden) return
        b.classList.add('is-leaving')
        setTimeout(() => { if (b.classList.contains('is-leaving')) { b.hidden = true; this.gTarget = null } }, 320)
    }

    showVeil(on) {
        this.el.veil.classList.toggle('is-on', on)
    }

    /** Proyecta los elementos que siguen a objetos 3D. */
    update(camera, book) {
        const now = performance.now()
        const dt = Math.min(0.1, (now - this.lastTime) / 1000)
        this.lastTime = now
        const w = window.innerWidth
        const h = window.innerHeight
        this.placeSpeech(camera, dt, w, h)
        if (this.hint && !this.el.hint.hidden && book) {
            book.anchors[this.hint.anchor].getWorldPosition(v)
            v.project(camera)
            const x = Math.min(w - 120, Math.max(120, ((v.x + 1) / 2) * w))
            const y = Math.min(h - 60, Math.max(60, ((1 - v.y) / 2) * h))
            this.el.hint.style.translate = `${x}px ${y}px`
        }
        if (this.gTarget && !this.el.gBubble.hidden) {
            this.gTarget.getWorldPosition(v)
            v.project(camera)
            const x = ((v.x + 1) / 2) * w
            const y = ((1 - v.y) / 2) * h
            const left = x > w * 0.5
            const b = this.el.gBubble
            b.dataset.side = left ? 'left' : 'right'
            const off = Math.min(150, w * 0.11)
            const bx = left ? x - off : x + off
            b.style.translate = `calc(${bx}px - ${left ? '100%' : '0px'}) calc(${y}px - 50%)`
        }
    }

    /**
     * Globo de diálogo: al lado del personaje y por encima de su cabeza, con la
     * colita apuntándole. Se queda quieto mientras se lee (solo se corrige si el
     * personaje se mueve de verdad) y esquiva el recuadro del narrador.
     */
    placeSpeech(camera, dt, w, h) {
        const el = this.el.dialogue
        const sp = this.speech
        if (el.hidden || !sp.who) return
        const g = w < 760 ? 12 : 20
        const bw = el.offsetWidth
        const bh = el.offsetHeight
        const target = this.speakers[sp.who]
        let ax
        let ay
        if (target && target.parent) {
            target.getWorldPosition(v)
            v.project(camera)
            ax = ((v.x + 1) / 2) * w
            ay = ((1 - v.y) / 2) * h
        } else {
            ax = w * 0.5
            ay = h * 0.55
        }
        let side = ax > w * 0.56 ? 'left' : 'right'
        const place = (sd) => (sd === 'right' ? ax + 10 : ax - 10 - bw)
        let x = place(side)
        if (x < g || x + bw > w - g) {
            const other = side === 'right' ? 'left' : 'right'
            const ox = place(other)
            if (ox >= g && ox + bw <= w - g) { side = other; x = ox }
        }
        x = Math.min(w - g - bw, Math.max(g, x))
        let y = ay - bh - 18
        // celular vertical: el globo sube a la zona libre de arriba (el cielo)
        // y la colita sigue apuntando hacia el personaje
        if (w < 760 && h > w * 1.2) y = Math.min(y, h * 0.4 - bh)
        let below = false
        if (y < g) { y = ay + 34; below = true }
        y = Math.min(h - g - bh, Math.max(g, y))
        // no tapar al narrador
        const n = this.el.narration
        if (!n.hidden && !n.classList.contains('is-leaving')) {
            const r = n.getBoundingClientRect()
            const hit = (xx, yy) => xx < r.right + 10 && xx + bw > r.left - 10 && yy < r.bottom + 10 && yy + bh > r.top - 10
            if (hit(x, y)) {
                const right = r.right + 14
                const left = r.left - 14 - bw
                if (right + bw <= w - g && Math.abs(right - x) < w * 0.5) x = right
                else if (left >= g) x = left
                if (hit(x, y)) y = Math.min(h - g - bh, r.bottom + 14)
            }
        }
        if (!sp.init) {
            sp.x = x
            sp.y = y
            sp.init = true
        } else if (Math.hypot(x - sp.x, y - sp.y) > 24 || sp.moving) {
            // solo se reacomoda si el personaje se movió bastante
            sp.moving = Math.hypot(x - sp.x, y - sp.y) > 1
            const k = 1 - Math.pow(0.002, dt)
            sp.x += (x - sp.x) * k
            sp.y += (y - sp.y) * k
        }
        el.dataset.side = side
        el.dataset.below = below ? 'true' : 'false'
        el.style.setProperty('--tail-x', `${Math.min(bw - 26, Math.max(26, ax - sp.x))}px`)
        el.style.translate = `${Math.round(sp.x)}px ${Math.round(sp.y)}px`
    }

    // ------------------------------------------------------------ texto
    /**
     * Muestra la narración y/o el diálogo de un momento del cuento.
     * @param at   zona del narrador ('top', 'top-left', 'top-right', 'side-left', 'side-right')
     * @param tone 'light' | 'dark'
     */
    showText({ text, dialogue, at, tone } = {}, progress = null) {
        const n = this.el.narration
        if (text) {
            this.zone = at ?? this.zone ?? 'top-left'
            n.dataset.at = this.zone
            n.dataset.tone = tone === 'dark' ? 'dark' : 'light'
        }
        this.setBubble(n, this.el.narrationText, text)
        if (text) this.placeNarrator()
        if (dialogue) this.say(dialogue.who, dialogue.text)
        else this.hideBubble(this.el.dialogue)
        this.setDots(text ? progress : null)
    }

    placeNarrator() {
        const n = this.el.narration
        if (this.zone) n.dataset.zone = resolveZone(this.zone)
    }

    /** Instrucción de un juego: recuadro corto con ícono (crema, borde naranja). */
    instruct(text) {
        clearTimeout(this.instructTimer)
        const el = this.el.instruction
        this.el.instructionText.innerHTML = wordsHTML(text)
        el.hidden = false
        el.classList.remove('is-leaving')
        el.style.animation = 'none'
        void el.offsetWidth
        el.style.animation = ''
    }

    hideInstruction() {
        const el = this.el.instruction
        if (el.hidden) return
        el.classList.add('is-leaving')
        clearTimeout(this.instructTimer)
        this.instructTimer = setTimeout(() => { if (el.classList.contains('is-leaving')) { el.hidden = true; el.classList.remove('is-leaving') } }, 300)
    }

    setDots(progress) {
        const d = this.el.dots
        if (!progress || progress.steps < 2) { d.innerHTML = ''; return }
        d.innerHTML = Array.from({ length: progress.steps }, (_, i) => `<i class="${i <= progress.step ? 'on' : ''}"></i>`).join('')
    }

    /** Diálogo de un personaje (también se usa para la retroalimentación de las actividades). */
    say(who, text, tone = null) {
        const d = this.el.dialogue
        const ch = story.characters[who] ?? { name: who, color: '#5b4d6e' }
        this.el.speaker.innerHTML = `${avatars[who] ?? ''}<span>${escapeHTML(ch.name)}</span>`
        d.dataset.who = who
        if (this.speech.who !== who || d.hidden) this.speech.init = false
        this.speech.who = who
        d.classList.remove('is-ok', 'is-oops', 'is-leaving')
        this.setBubble(d, this.el.dialogueText, text, true)
        if (tone) d.classList.add(tone === 'ok' ? 'is-ok' : 'is-oops')
    }

    setBubble(bubble, textEl, text, force = false) {
        if (!text) return this.hideBubble(bubble)
        if (!force && !bubble.hidden && textEl.dataset.text === text) return
        textEl.dataset.text = text
        textEl.innerHTML = wordsHTML(text)
        bubble.classList.remove('is-leaving')
        bubble.hidden = false
        bubble.style.animation = 'none'
        void bubble.offsetWidth
        bubble.style.animation = ''
    }

    hideBubble(bubble) {
        if (bubble.hidden) return
        bubble.classList.add('is-leaving')
        clearTimeout(bubble._t)
        bubble._t = setTimeout(() => {
            if (bubble.classList.contains('is-leaving')) {
                bubble.hidden = true
                bubble.classList.remove('is-leaving')
                const t = bubble.querySelector('.bubble__text')
                if (t) t.dataset.text = ''
            }
        }, 340)
    }

    clearText() {
        this.hideBubble(this.el.narration)
        this.hideBubble(this.el.dialogue)
        this.hideInstruction()
    }

    // ------------------------------------------------------------ actividades
    showActivity(title, stops = []) {
        const a = this.el.activity
        this.el.activityTitle.textContent = title
        this.el.activityStops.innerHTML = stops.map((s, i) => `<li data-i="${i}">${i + 1}. ${escapeHTML(s)}</li>`).join('')
        a.classList.remove('is-complete')
        a.querySelector('.activity-chip__label').textContent = 'Actividad'
        a.hidden = false
    }

    setStop(index) {
        this.el.activityStops.querySelectorAll('li').forEach((li, i) => {
            li.classList.toggle('is-done', i < index)
            li.classList.toggle('is-current', i === index)
        })
    }

    completeActivity() {
        const a = this.el.activity
        a.classList.add('is-complete')
        a.querySelector('.activity-chip__label').textContent = '¡Actividad lograda!'
        this.el.activityStops.querySelectorAll('li').forEach((li) => { li.classList.remove('is-current'); li.classList.add('is-done') })
    }

    shakeActivity() {
        const a = this.el.activity
        if (a.hidden) return
        a.classList.remove('shake')
        void a.offsetWidth
        a.classList.add('shake')
    }

    hideActivity() {
        this.el.activity.hidden = true
    }

    /** Botones grandes de la actividad 2. */
    showSteps(steps, onPick) {
        const tray = this.el.tray
        tray.innerHTML = ''
        tray.classList.add('glass')
        steps.forEach((s, i) => {
            const b = document.createElement('button')
            b.type = 'button'
            b.className = 'step-btn glass'
            b.style.setProperty('--i', i)
            b.innerHTML = `<span class="step-btn__num">${i + 1}</span>${stepIcons[s.icon] ?? ''}<span>${escapeHTML(s.label)}</span>`
            b.addEventListener('click', () => onPick(i))
            tray.append(b)
        })
        tray.hidden = false
    }

    markStep(i, state) {
        const b = this.el.tray.children[i]
        if (!b) return
        if (state === 'wrong') {
            b.classList.remove('is-wrong')
            void b.offsetWidth
            b.classList.add('is-wrong')
            return
        }
        b.classList.toggle('is-done', state === 'done')
    }

    setNextStep(i) {
        ;[...this.el.tray.children].forEach((b, k) => b.classList.toggle('is-next', k === i))
    }

    hideSteps() {
        this.el.tray.hidden = true
        this.el.tray.innerHTML = ''
    }
}

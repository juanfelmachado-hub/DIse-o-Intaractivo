/**
 * Interfaz HTML (Liquid Glass): burbujas de narración y diálogo, pista de
 * arrastre de la hoja, globo del Guardián cuando le habla al lector y los
 * elementos de las actividades.
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

function wordsHTML(text) {
    return text
        .split(' ')
        .map((w, i) => `<span class="w" style="--i:${i}">${escapeHTML(w)}${' '}</span>`)
        .join('')
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
            veil: $('[data-veil]'),
        }
        this.el.narrationText = this.el.narration.querySelector('.bubble__text')
        this.el.dialogueText = this.el.dialogue.querySelector('.bubble__text')
        this.el.gBubbleText = this.el.gBubble.querySelector('.g-bubble__text')
        this.hint = null
        this.gTarget = null
        this.gDismiss = null
        this.el.gBubble.addEventListener('click', () => this.gDismiss?.())
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
        const w = window.innerWidth
        const h = window.innerHeight
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

    // ------------------------------------------------------------ texto
    /** Muestra la narración y/o el diálogo de un momento del cuento. */
    showText({ text, dialogue } = {}, progress = null) {
        this.setBubble(this.el.narration, this.el.narrationText, text)
        if (dialogue) this.say(dialogue.who, dialogue.text)
        else this.hideBubble(this.el.dialogue)
        this.setDots(text ? progress : null)
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
        this.el.speaker.style.setProperty('--speaker-color', ch.color)
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

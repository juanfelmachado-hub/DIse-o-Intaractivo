/**
 * Interfaz HTML según la "Guía visual" (§3, §7 y §8).
 *
 *  - Banda narrativa (abajo): el texto de la historia y el botón "siguiente",
 *    que solo avanza momentos (nunca cambia de página).
 *  - Tarjeta de diálogo (izquierda): Nico o el Guardián, con avatar y nombre.
 *    Un diálogo a la vez; las pistas de los juegos también van aquí.
 *  - Tarjeta de misión (derecha): lo que el niño debe hacer. Se compacta al
 *    jugar y pasa a verde con "¡Lo lograste!" al terminar.
 *  - Sonidos escritos: en la escena, junto a lo que suena.
 *  - Barra de página (debajo del libro): un segmento por tarea; dorada y con
 *    pulso cuando la página está lista.
 *
 * Nunca más de dos contenedores con texto completo a la vez: la banda cuenta
 * como uno, así que si hay diálogo y misión, la misión va compacta.
 * La UI no conoce la historia: el StoryController le dice qué mostrar.
 */
import * as THREE from 'three'
import { story } from '../data/story.js'
import { avatars, missionIcons } from './icons.js'
import { playSfx } from '../audio/sfx.js'

const $ = (sel) => document.querySelector(sel)
const v = new THREE.Vector3()

const KEYWORDS = new Set(['agáchate', 'cúbrete', 'sujétate', 'despacito', 'temblar', 'réplica'])
const bare = (w) => w.toLowerCase().replace(/[^a-záéíóúüñ]/g, '')

function escapeHTML(s) {
    return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
}

/** Texto con las palabras clave en negrita (y en naranja oscuro dentro de la banda). */
function richText(text) {
    return text.split(' ').map((w) => (KEYWORDS.has(bare(w)) ? `<strong class="kw">${escapeHTML(w)}</strong>` : escapeHTML(w))).join(' ')
}

function enter(el, delay = 0) {
    el.hidden = false
    el.classList.remove('is-leaving')
    el.style.setProperty('--delay', `${delay}ms`)
    el.classList.remove('is-entering')
    void el.offsetWidth
    el.classList.add('is-entering')
}

export class UI {
    constructor() {
        this.el = {
            loader: $('[data-loader]'),
            scene: $('[data-scene]'),
            canvas: $('canvas.webgl'),
            storyText: $('[data-story-text]'),
            next: $('[data-story-next]'),
            dialog: $('[data-dialog]'),
            dialogName: $('[data-dialog-name]'),
            dialogText: $('[data-dialog-text]'),
            avatar: $('[data-avatar]'),
            mission: $('[data-mission]'),
            missionIcon: $('[data-mission-icon]'),
            missionText: $('[data-mission-text]'),
            turtle: $('[data-turtle]'),
            strip: $('[data-strip]'),
            stripLabel: $('[data-strip-label]'),
            stripSteps: $('[data-strip-steps]'),
            go: $('[data-strip-go]'),
            sfx: $('[data-sfx]'),
            hotspots: $('[data-hotspots]'),
            veil: $('[data-veil]'),
            radar: $('[data-radar]'),
            drum: $('[data-drum]'),
        }
        this.avatarImages = {}
        this.mission = null // { icon, text, short }
        this.missionPlaying = false
        this.missionExpanded = false
        this.pageTasks = []
        this.done = new Set()
        this.stripMode = 'page'
        this.onNext = null
        this.onGo = null
        this.el.turtle.innerHTML = missionIcons.turtle

        this.el.next.addEventListener('click', () => {
            if (this.el.next.getAttribute('aria-disabled') === 'true') return this.nudgeMission()
            playSfx('siguiente')
            this.onNext?.()
        })
        this.el.go.addEventListener('click', () => this.onGo?.())
        // la misión compacta vuelve a crecer si el niño la toca
        this.el.mission.addEventListener('click', () => this.expandMission())
        // Teclado (§12): Enter o flecha derecha avanzan el texto
        window.addEventListener('keydown', (e) => {
            if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return
            const tag = document.activeElement?.tagName
            if (e.key === 'Enter' && (tag === 'BUTTON' || tag === 'A')) return
            if (e.key === 'Enter' || e.key === 'ArrowRight') {
                e.preventDefault()
                this.onKeyNext?.()
            }
        })
    }

    hideLoader() {
        this.el.loader.classList.add('is-done')
        setTimeout(() => this.el.loader.remove(), 1200)
    }

    /** Rostros de Nico y del Guardián (pintados con los modelos 3D). */
    setAvatars(images) {
        this.avatarImages = images ?? {}
    }

    // ------------------------------------------------------------ banda narrativa
    /** Si `text` es undefined, la banda conserva el último texto del narrador. */
    setNarration(text) {
        if (text === undefined) return
        const t = this.el.storyText
        if (t.dataset.text === text) return
        t.dataset.text = text
        t.innerHTML = richText(text)
        t.classList.remove('is-entering')
        void t.offsetWidth
        t.classList.add('is-entering')
    }

    clearNarration() {
        this.el.storyText.dataset.text = ''
        this.el.storyText.innerHTML = ''
    }

    setNext(enabled) {
        this.el.next.setAttribute('aria-disabled', String(!enabled))
    }

    // ------------------------------------------------------------ diálogo (izquierda)
    say(speaker, text, { delay = 250, hint = false } = {}) {
        const d = this.el.dialog
        const show = () => {
            d.dataset.speaker = speaker
            this.el.dialogName.textContent = story.characters[speaker]?.name ?? speaker
            this.el.dialogText.innerHTML = richText(text)
            const img = this.avatarImages[speaker]
            this.el.avatar.style.backgroundImage = img ? `url(${img})` : `url("data:image/svg+xml,${encodeURIComponent(avatars[speaker] ?? '')}")`
            enter(d, hint ? 0 : delay)
            this.layoutMission()
        }
        clearTimeout(this.dialogTimer)
        // un diálogo a la vez: si cambia quien habla, la tarjeta anterior sale primero
        if (!d.hidden && d.dataset.speaker !== speaker) {
            d.classList.add('is-leaving')
            this.dialogTimer = setTimeout(show, 150)
        } else show()
        if (hint) playSfx('pista')
    }

    hideDialog() {
        const d = this.el.dialog
        clearTimeout(this.dialogTimer)
        if (d.hidden) return
        d.classList.remove('is-entering')
        d.classList.add('is-leaving')
        this.dialogTimer = setTimeout(() => {
            d.hidden = true
            d.classList.remove('is-leaving')
            this.layoutMission()
        }, 150)
    }

    get dialogVisible() { return !this.el.dialog.hidden && !this.el.dialog.classList.contains('is-leaving') }

    // ------------------------------------------------------------ misión (derecha)
    setMission(m, { delay = 500 } = {}) {
        this.mission = m
        this.missionPlaying = false
        this.missionExpanded = false
        const el = this.el.mission
        el.dataset.state = 'idle'
        this.el.missionIcon.innerHTML = missionIcons[m.icon] ?? missionIcons.estrella
        this.layoutMission()
        enter(el, delay)
    }

    /** Al empezar a jugar la misión se compacta (ícono y 2 o 3 palabras). */
    playing(on = true) {
        this.missionPlaying = on
        this.missionExpanded = false
        this.layoutMission()
    }

    expandMission() {
        if (!this.mission || this.el.mission.dataset.state === 'success') return
        this.missionExpanded = true
        // dos contenedores como máximo: el diálogo se retira mientras la misión crece
        if (this.dialogVisible) this.hideDialog()
        this.layoutMission()
        clearTimeout(this.expandTimer)
        this.expandTimer = setTimeout(() => { this.missionExpanded = false; this.layoutMission() }, 4000)
    }

    layoutMission() {
        const m = this.mission
        const el = this.el.mission
        if (!m || el.dataset.state === 'success') return
        const compact = !this.missionExpanded && (this.missionPlaying || this.dialogVisible)
        el.dataset.state = compact ? 'compact' : 'idle'
        this.el.missionText.textContent = compact ? m.short : m.text
    }

    nudgeMission() {
        const el = this.el.mission
        if (el.hidden) return
        el.classList.remove('is-nudged')
        void el.offsetWidth
        el.classList.add('is-nudged')
    }

    /** Éxito: la misión pasa a verde con una estrella. */
    missionSuccess(text = '¡Lo lograste!') {
        const el = this.el.mission
        this.mission = null
        el.hidden = false
        el.dataset.state = 'success'
        this.el.missionIcon.innerHTML = missionIcons.estrella
        this.el.missionText.textContent = text
        enter(el, 0)
        playSfx('acierto')
    }

    hideMission() {
        this.mission = null
        this.el.mission.hidden = true
        this.el.turtle.hidden = true
    }

    showTurtle(on, onTap) {
        const b = this.el.turtle
        b.hidden = !on
        b.onclick = on ? () => onTap?.() : null
    }

    // ------------------------------------------------------------ sonidos escritos
    /** Onomatopeya en x, y (% de la escena). */
    sfx(text, x, y) {
        const el = document.createElement('span')
        el.className = 'sfx'
        el.textContent = text
        el.style.left = `${x}%`
        el.style.top = `${y}%`
        this.el.sfx.appendChild(el)
        playSfx('sonido-escrito')
        setTimeout(() => el.remove(), 1200)
    }

    /** Onomatopeya junto a un punto 3D (en el mundo). */
    sfxAt(text, world, camera) {
        v.copy(world).project(camera)
        const x = Math.min(92, Math.max(8, ((v.x + 1) / 2) * 100))
        const y = Math.min(88, Math.max(10, ((1 - v.y) / 2) * 100))
        this.sfx(text, x, y)
    }

    // ------------------------------------------------------------ barra de página
    /**
     * @param tasks  ids de las tareas de la página ('leer', 'juego-…')
     * @param mode   'page' | 'last' (en la última página la barra lista dice "¡Fin del cuento!")
     */
    startPage(tasks, done = [], mode = 'page') {
        this.pageTasks = tasks
        this.done = new Set(done)
        this.stripMode = mode
        this.el.stripSteps.innerHTML = tasks.map(() => '<li class="step"></li>').join('')
        this.el.go.setAttribute('aria-label', mode === 'last' ? 'Volver al inicio del libro' : 'Pasar la página')
        this.renderStrip()
    }

    /** Portada: la barra invita a abrir el libro. */
    coverStrip() {
        this.pageTasks = []
        this.done = new Set()
        this.stripMode = 'cover'
        this.el.stripSteps.innerHTML = ''
        this.el.strip.dataset.state = 'ready'
        this.el.stripLabel.textContent = '¡Abre el cuento!'
        this.el.go.setAttribute('aria-disabled', 'false')
        this.el.go.setAttribute('aria-label', 'Abrir el libro')
    }

    completeTask(id) {
        if (!this.pageTasks.includes(id) || this.done.has(id)) return false
        this.done.add(id)
        return this.renderStrip()
    }

    get ready() { return this.pageTasks.length > 0 && this.done.size === this.pageTasks.length }

    /** Devuelve true si la página acaba de quedar lista. */
    renderStrip() {
        ;[...this.el.stripSteps.children].forEach((el, i) => el.classList.toggle('is-done', this.done.has(this.pageTasks[i])))
        const ready = this.ready
        const wasReady = this.el.strip.dataset.state === 'ready'
        this.el.strip.dataset.state = ready ? 'ready' : 'pending'
        this.el.stripLabel.textContent = ready ? (this.stripMode === 'last' ? '¡Fin del cuento!' : '¡Página lista! Pásala') : 'Sigue explorando'
        this.el.go.setAttribute('aria-disabled', String(!ready))
        if (ready && !wasReady) playSfx('pagina-lista')
        return ready && !wasReady
    }

    /** Intento de pasar la página antes de tiempo: la barra se sacude. */
    denyTurn() {
        const s = this.el.strip
        s.classList.remove('is-denied')
        void s.offsetWidth
        s.classList.add('is-denied')
        this.el.stripLabel.textContent = 'Aún hay algo por hacer'
        clearTimeout(this.denyTimer)
        this.denyTimer = setTimeout(() => this.renderStrip(), 1500)
        playSfx('pagina-bloqueada')
    }

    /** Mientras gira la hoja, la barra se desvanece (250 ms). */
    setTurning(on) {
        this.el.strip.classList.toggle('is-turning', on)
    }

    // ------------------------------------------------------------ El Guardián le habla al lector
    showVeil(on) {
        this.el.veil.classList.toggle('is-on', on)
    }

    // ------------------------------------------------------------ elementos de los juegos
    /** Coordenadas de un punto 3D dentro de la escena (px). */
    toScene(world, camera, out = { x: 0, y: 0, visible: true }) {
        const r = this.el.canvas.getBoundingClientRect()
        v.copy(world).project(camera)
        out.x = ((v.x + 1) / 2) * r.width
        out.y = ((1 - v.y) / 2) * r.height
        out.visible = v.z < 1
        return out
    }

    update(camera) {
        const d = this.drumTarget
        if (d && !this.el.drum.hidden) {
            d.getWorldPosition(v)
            const p = this.toScene(v, camera)
            this.el.drum.style.translate = `${p.x}px ${p.y}px`
        }
    }

    clearAll() {
        this.hideDialog()
        this.hideMission()
        this.el.drum.hidden = true
        this.el.radar.hidden = true
    }
}

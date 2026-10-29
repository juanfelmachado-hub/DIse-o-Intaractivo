/**
 * Interfaz HTML según la "Guía visual" v2 (§6 y §7).
 *
 * Tres niveles, en una pila centrada que nunca toca el libro:
 *  1. Actividad (arriba, pestaña): ícono + nombre corto. Pasa a verde con
 *     "¡Lo lograste!" al terminar. Nunca aparece sola: siempre la acompaña el
 *     cuadro de indicaciones.
 *  2. Indicaciones o diálogo (debajo): lo que dice el Guardián (qué hacer y las
 *     pistas) o lo que dice Nico. Un solo diálogo a la vez; al cambiar quien
 *     habla, el cuadro cambia de color sin moverse.
 *  3. Historia (abajo, debajo del libro): el narrador y el botón siguiente.
 *     El mismo botón pasa la página cuando la página está lista.
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
    clearTimeout(el._leaveTimer)
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
            stack: $('[data-stack]'),
            intro: $('[data-intro]'),
            introLogo: $('[data-intro-logo]'),
            introBottom: $('[data-intro-bottom]'),
            introGo: $('[data-intro-go]'),
            progress: $('[data-progress]'),
            progressFill: $('[data-progress-fill]'),
            progressSeps: [...document.querySelectorAll('[data-progress-sep]')],
            progressHead: $('[data-progress-head]'),
            storyBox: $('[data-story-bar]'),
            sfx: $('[data-sfx]'),
            hotspots: $('[data-hotspots]'),
            veil: $('[data-veil]'),
            radar: $('[data-radar]'),
            drum: $('[data-drum]'),
        }
        this.avatarImages = {}
        this.introOn = true
        this.onIntroGo = null
        // barra de avance: valor real (0…1) y valor mostrado (se acerca con suavidad)
        this.progress = { target: 0, shown: 0, phases: 3, on: false, ends: null }
        this.mission = null // { icon, text, short }
        this.talk = null    // { speaker, text } diálogo o pista explícitos
        this.success = false
        this.canAdvance = false
        this.turning = false
        this.pageTasks = []
        this.done = new Set()
        this.stripMode = 'page'
        this.onNext = null
        this.onGo = null
        this.el.turtle.innerHTML = missionIcons.turtle
        // espacio libre para el libro: se mide solo cuando cambian los cuadros
        this.space = null
        if (window.ResizeObserver) {
            const ro = new ResizeObserver(() => { this.space = null })
            ro.observe(this.el.stack)
            ro.observe(this.el.storyBox)
            ro.observe(this.el.scene)
            ro.observe(this.el.intro)
            ro.observe(this.el.introLogo)
            ro.observe(this.el.introBottom)
        }
        window.addEventListener('resize', () => { this.space = null })

        this.el.next.addEventListener('click', () => {
            const role = this.el.next.dataset.role
            if (role === 'next') { playSfx('siguiente'); return this.onNext?.() }
            if (role === 'turn') return this.onGo?.()
            // aún no se puede avanzar: se señala lo que falta
            if (this.mission) this.nudgeMission()
            else this.onGo?.()
        })
        // portada: «Abre el libro» inicia la transición (una sola vez a la vez)
        this.el.introGo.addEventListener('click', () => this.onIntroGo?.())
        this.el.introLogo.addEventListener('load', () => { this.space = null })
        // tocar la actividad recuerda qué hay que hacer
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
        if (this.avatarImages.nicoHead) this.el.progressHead.src = this.avatarImages.nicoHead
    }

    // ------------------------------------------------------------ barra de avance
    /** Extremos de la barra en el libro (objetos 3D sobre el pie de las hojas). */
    setProgressEnds(ends) { this.progress.ends = ends }

    /**
     * Avance real del cuento (0…1): cada página es un tercio. Solo informa: la
     * navegación sigue dependiendo de las tareas de cada página.
     */
    setProgress(value, phase) {
        const p = this.progress
        p.target = THREE.MathUtils.clamp(value, 0, 1)
        const el = this.el.progress
        el.setAttribute('aria-valuenow', String(Math.round(p.target * 100)))
        if (phase) el.setAttribute('aria-valuetext', `Actividad ${phase} de ${p.phases}`)
    }

    /** Visible con el libro abierto; se oculta mientras gira la hoja o cerrado. */
    showProgress(on) {
        this.progress.on = on
        if (on) this.el.progress.hidden = false
        this.el.progress.classList.toggle('is-off', !on)
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
        this.canAdvance = enabled
        this.refreshNext()
    }

    /** El botón siguiente avanza un momento o, con la página lista, la pasa. */
    refreshNext() {
        const b = this.el.next
        const turn = !this.turning && (this.stripMode === 'cover' || this.ready)
        const role = this.canAdvance ? 'next' : turn ? 'turn' : 'off'
        b.dataset.role = role
        b.setAttribute('aria-disabled', String(role === 'off'))
        b.setAttribute('aria-label', role !== 'turn' ? 'Siguiente'
            : this.stripMode === 'cover' ? 'Abrir el libro'
            : this.stripMode === 'last' ? 'Cerrar el libro y volver al inicio' : 'Pasar la página')
    }

    // ------------------------------------------------------------ pila de arriba (§7)
    /** Diálogo o pista: va en el cuadro de indicaciones (nivel 2). */
    say(speaker, text, { delay = 250, hint = false } = {}) {
        this.talk = { speaker, text }
        clearTimeout(this.talkTimer)
        // una pista dura un momento; después vuelve la indicación de la actividad
        if (hint && this.mission) this.talkTimer = setTimeout(() => { this.talk = null; this.renderStack() }, 4500)
        this.renderStack(hint ? 0 : delay)
        if (hint) playSfx('pista')
    }

    hideDialog() {
        clearTimeout(this.talkTimer)
        this.talk = null
        this.renderStack()
    }

    get dialogVisible() { return !this.el.dialog.hidden }

    setMission(m, { delay = 500 } = {}) {
        clearTimeout(this.successTimer)
        this.success = false
        this.mission = m
        // la indicación de la actividad reemplaza al diálogo anterior
        this.talk = null
        this.renderStack(250, delay)
    }

    /** Compatibilidad: con la pestaña la actividad ya es siempre corta. */
    playing() {}

    /** Tocar la actividad vuelve a mostrar qué hay que hacer. */
    expandMission() {
        if (!this.mission || this.success) return
        this.talk = null
        this.renderStack(0)
    }

    nudgeMission() {
        const el = this.el.mission.hidden ? this.el.storyBox : this.el.mission
        el.classList.remove('is-nudged', 'is-denied')
        void el.offsetWidth
        el.classList.add(el === this.el.storyBox ? 'is-denied' : 'is-nudged')
    }

    /** Éxito: la actividad pasa a verde con la estrella; la felicitación del Guardián se va a los 3 s. */
    missionSuccess(text = '¡Lo lograste!', cheer = '¡Muy bien! Ya sabes cómo cuidarte.') {
        this.mission = null
        this.success = text
        this.talk = { speaker: 'guardian', text: cheer }
        clearTimeout(this.talkTimer)
        this.renderStack(0, 0)
        playSfx('acierto')
        clearTimeout(this.successTimer)
        this.successTimer = setTimeout(() => {
            this.success = false
            if (this.talk?.text === cheer) this.talk = null
            this.renderStack()
        }, 3000)
    }

    hideMission() {
        clearTimeout(this.successTimer)
        this.mission = null
        this.success = false
        this.el.turtle.hidden = true
        this.renderStack()
    }

    /**
     * Dibuja la pila: el cuadro de indicaciones muestra el diálogo (si lo hay) o
     * la indicación de la actividad; la pestaña de actividad solo aparece si hay
     * indicaciones debajo.
     */
    renderStack(dialogDelay = 250, tabDelay = 500) {
        const d = this.el.dialog
        const tab = this.el.mission
        const m = this.mission
        const talk = this.talk ?? (m ? { speaker: 'guardian', text: m.text } : null)
        if (!talk) {
            this.leave(d)
            this.leave(tab)
            return
        }
        // --- nivel 2
        const key = `${talk.speaker}|${talk.text}`
        if (d.dataset.key !== key) {
            const wasShown = !d.hidden && !d.classList.contains('is-leaving')
            const fill = () => {
                d.dataset.key = key
                d.dataset.speaker = talk.speaker
                this.el.dialogName.textContent = story.characters[talk.speaker]?.name ?? talk.speaker
                this.el.dialogText.innerHTML = richText(talk.text)
                const img = this.avatarImages[talk.speaker]
                this.el.avatar.style.backgroundImage = img ? `url(${img})` : `url("data:image/svg+xml,${encodeURIComponent(avatars[talk.speaker] ?? '')}")`
            }
            clearTimeout(this.swapTimer)
            if (wasShown) {
                // mismo lugar: cambia el color y el texto con un desvanecimiento de 200 ms
                d.classList.add('is-swapping')
                this.swapTimer = setTimeout(() => { fill(); d.classList.remove('is-swapping') }, 200)
            } else {
                fill()
                enter(d, dialogDelay)
            }
        } else if (d.hidden || d.classList.contains('is-leaving')) enter(d, dialogDelay)

        // --- nivel 1
        const tabContent = this.success ? { icon: 'estrella', text: this.success } : m ? { icon: m.icon, text: m.short ?? m.text } : null
        if (!tabContent) return this.leave(tab)
        const tkey = `${this.success ? 's' : 'm'}|${tabContent.text}`
        tab.dataset.state = this.success ? 'success' : 'idle'
        if (tab.dataset.key !== tkey) {
            tab.dataset.key = tkey
            this.el.missionIcon.innerHTML = missionIcons[tabContent.icon] ?? missionIcons.estrella
            this.el.missionText.textContent = tabContent.text
            if (tab.hidden || tab.classList.contains('is-leaving')) enter(tab, tabDelay)
        } else if (tab.hidden || tab.classList.contains('is-leaving')) enter(tab, tabDelay)
    }

    leave(el) {
        if (el.hidden || el.classList.contains('is-leaving')) return
        el.classList.remove('is-entering')
        el.classList.add('is-leaving')
        clearTimeout(el._leaveTimer)
        el._leaveTimer = setTimeout(() => {
            if (!el.classList.contains('is-leaving')) return
            el.hidden = true
            el.classList.remove('is-leaving')
            el.dataset.key = ''
        }, 200)
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

    // ------------------------------------------------------------ avance de página
    /**
     * Tareas de la página ('leer', 'juego-…'). Cuando todas están hechas, el
     * botón siguiente del cuadro de la historia pasa la página.
     * @param mode 'page' | 'last' (en la última página cierra el libro)
     */
    startPage(tasks, done = [], mode = 'page') {
        this.pageTasks = tasks
        this.done = new Set(done)
        this.stripMode = mode
        this.wasReady = this.ready
        this.renderStrip()
    }

    /** Portada: el botón siguiente abre el libro. */
    coverStrip() {
        this.pageTasks = []
        this.done = new Set()
        this.stripMode = 'cover'
        this.refreshNext()
    }

    completeTask(id) {
        if (!this.pageTasks.includes(id) || this.done.has(id)) return false
        this.done.add(id)
        return this.renderStrip()
    }

    get ready() { return this.pageTasks.length > 0 && this.done.size === this.pageTasks.length }

    /** Devuelve true si la página acaba de quedar lista. */
    renderStrip() {
        const ready = this.ready
        const just = ready && !this.wasReady
        this.wasReady = ready
        this.refreshNext()
        if (just) playSfx('pagina-lista')
        return just
    }

    /** Intento de pasar la página antes de tiempo: el cuadro se sacude. */
    denyTurn() {
        this.nudgeMission()
        playSfx('pagina-bloqueada')
    }

    /** Mientras gira la hoja, el botón espera. */
    setTurning(on) {
        this.turning = on
        this.refreshNext()
        this.showProgress(!on && !!this.progressAllowed)
    }

    // ------------------------------------------------------------ portada
    /** Muestra u oculta la pantalla de inicio (con fundido). */
    setIntro(on) {
        this.introOn = on
        const el = this.el.intro
        el.classList.toggle('is-off', !on)
        el.inert = !on
        this.el.introGo.disabled = !on
        if (on) this.showStory(false)
        this.space = null
    }

    /** El cuadro de la historia se oculta en la portada y vuelve al abrir el libro. */
    showStory(on) {
        this.el.storyBox.classList.toggle('is-hidden', !on)
        this.el.storyBox.inert = !on
    }

    /**
     * Rectángulo libre para el libro (px de la escena, Guía visual v2 §4.2):
     * de la pila de arriba al cuadro de la historia, con 16 px de aire.
     * La pila reserva siempre el alto de una indicación de 2 líneas, para que el
     * libro no cambie de tamaño cada vez que aparece o se va un diálogo.
     */
    bookSpace() {
        if (this.space) return this.space
        const GAP = 16
        // portada: el libro ocupa el lado derecho (o el centro, en vertical)
        if (this.introOn) {
            const scene = this.el.scene
            const W = scene.clientWidth
            const H = scene.clientHeight
            const intro = this.el.intro.getBoundingClientRect()
            const sr = scene.getBoundingClientRect()
            const vertical = W / H <= 1 || W < 768
            if (!vertical) {
                this.space = { top: GAP * 1.5, bottom: H - GAP * 1.5, left: intro.right - sr.left + GAP * 2, right: W - GAP * 2 }
            } else {
                const logo = this.el.introLogo.getBoundingClientRect()
                const bottom = this.el.introBottom.getBoundingClientRect()
                this.space = { top: logo.bottom - sr.top + GAP, bottom: bottom.top - sr.top - GAP, left: GAP, right: W - GAP }
            }
            // mientras el logotipo no ha cargado su alto aún no es real: no se guarda
            const space = this.space
            if (!this.el.introLogo.complete || !this.el.introLogo.naturalHeight) this.space = null
            return space
        }
        const stack = this.el.stack
        const fs = parseFloat(getComputedStyle(this.el.dialogText).fontSize) || 22
        const tab = 44 - 14
        const reserved = stack.offsetTop + tab + Math.max(63, 2 * fs * 1.4 + 22 + 14 + 4)
        const actual = stack.offsetTop + stack.offsetHeight
        const story = this.el.storyBox.offsetTop
        this.space = { top: Math.max(reserved, actual) + GAP, bottom: story - GAP }
        return this.space
    }

    /** Desarrollo (§7.1): ningún cuadro de texto puede invadir el libro. */
    assertNoOverlap(book, quiet = false) {
        const GAP = 15 // 16 px con 1 px de tolerancia de redondeo
        const boxes = [...document.querySelectorAll('.box, .story-box')].filter((el) => !el.hidden).map((el) => el.getBoundingClientRect())
        const bad = boxes.filter((r) => r.left < book.r + GAP && r.right > book.l - GAP && r.top < book.b + GAP && r.bottom > book.t - GAP)
        if (bad.length && !quiet) console.warn('Un cuadro de texto invade el libro', bad, book)
        return bad.length === 0
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

    update(camera, dt = 1 / 60) {
        this.updateProgress(camera, dt)
        const d = this.drumTarget
        if (d && !this.el.drum.hidden) {
            d.getWorldPosition(v)
            const p = this.toScene(v, camera)
            this.el.drum.style.translate = `${p.x}px ${p.y}px`
        }
    }

    updateProgress(camera, dt) {
        const p = this.progress
        const el = this.el.progress
        if (!p.ends || el.hidden) return
        // posición sobre el libro (sigue su flotación y la cámara)
        const a = this.toScene(p.ends[0].getWorldPosition(v), camera, { x: 0, y: 0 })
        const b = this.toScene(p.ends[1].getWorldPosition(v), camera, { x: 0, y: 0 })
        const len = Math.hypot(b.x - a.x, b.y - a.y)
        const angle = Math.atan2(b.y - a.y, b.x - a.x)
        el.style.width = `${len}px`
        el.style.transform = `translate(${a.x}px, ${a.y}px) rotate(${angle}rad)`
        // tamaño de la cabeza proporcional a la barra (legible, sin dominar)
        const head = THREE.MathUtils.clamp(len * 0.07, 28, 52)
        el.style.setProperty('--head', `${head}px`)
        // la cabeza recorre la barra sin salirse: su centro va de r a len - r
        p.shown += (p.target - p.shown) * Math.min(1, dt * 4)
        if (Math.abs(p.target - p.shown) < 0.0005) p.shown = p.target
        const r = head * 0.5
        const x = (t) => r + t * (len - 2 * r)
        this.el.progressSeps.forEach((s, i) => { s.style.left = `${x((i + 1) / p.phases)}px` })
        this.el.progressFill.style.width = `${x(p.shown)}px`
        // la cabeza no gira con la barra: se mantiene derecha
        this.el.progressHead.style.transform = `translateX(${x(p.shown)}px) rotate(${-angle}rad)`
    }

    clearAll() {
        clearTimeout(this.talkTimer)
        clearTimeout(this.successTimer)
        this.talk = null
        this.hideMission()
        this.el.drum.hidden = true
        this.el.radar.hidden = true
    }
}

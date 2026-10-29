/**
 * Controlador central del cuento (Guía visual §3, §8 y §11).
 *
 *   portada ─(abrir)─▶ página 1 la sala ─▶ página 2 el pasillo ─▶ página 3 el patio ─▶ portada
 *
 *  - Una página del libro por escenario. La página cambia SOLO cuando el niño
 *    la pasa (arrastrando la hoja, con el botón de la barra o con el teclado)
 *    y únicamente si la barra de página está lista (todas sus tareas hechas).
 *    Nunca hay cambio automático ni por tiempo.
 *  - Dentro de una página, el botón "siguiente" de la banda avanza los
 *    momentos. Un momento con un juego (instruction.taskId) bloquea el botón
 *    hasta que el juego termina.
 *  - Al abrirse una página, sus objetos aparecen por unidades (reveal.js); la
 *    banda entra cuando empieza la última unidad. Al pasarla, todo sale junto
 *    (300 ms) antes de que gire la hoja.
 *
 * También es el "delegate" de PageTurner: decide qué se puede girar.
 */
import gsap from 'gsap'
import { story } from '../data/story.js'
import { createScene } from '../scenes/index.js'
import { createActivity } from '../activities/index.js'
import { makePageTexture } from '../book/PageArt.js'
import { playSfx, startMusic, stopMusic, strongQuake, stopEffects, resetOnce } from '../audio/sfx.js'

export class StoryController {
    constructor(ctx) {
        this.ctx = ctx
        ctx.story = this
        this.pages = story.pages
        this.index = 0
        this.scene = null
        this.incoming = null
        this.activity = null
        this.mode = 'cover' // cover | opening | reading | closing
        this.beat = -1
        this.blocked = false
        this.visited = new Set()
        this.done = new Map() // id de página → Set de tareas hechas
        this.maxBeat = new Map() // id de página → último momento leído (barra de avance)
        this.gameProgress = new Map() // id del juego → avance 0…1 mientras se juega
        this.stars = 0
        this.closing = false

        const { ui } = ctx
        ui.onNext = () => this.next()
        ui.onGo = () => this.tryTurnPage()
        ui.onKeyNext = () => this.keyNext()
        ui.onIntroGo = () => this.startFromIntro()
        // si el niño toca la pantalla mientras aparecen los objetos, todo termina de aparecer
        ctx.pointer.canvas.addEventListener('pointerdown', () => this.scene?.skipReveal())
    }

    get page() { return this.pages[this.index] }
    get isLast() { return this.index === this.pages.length - 1 }
    get isEnd() { return false } // el libro se cierra con el botón de la barra (última página)
    /**
     * Barra de avance: cada página es un tercio del recorrido. Dentro de la
     * página cuentan lo leído y cada juego (lo jugado hasta ahora, o completo).
     * Solo informa: pasar la página sigue dependiendo de las tareas (canTurn).
     */
    syncProgress() {
        const { ui } = this.ctx
        const page = this.page
        const done = this.tasksDone(page)
        const games = page.tasks.filter((t) => t !== 'leer')
        const read = done.has('leer') ? 1 : Math.min(1, ((this.maxBeat.get(page.id) ?? -1) + 1) / page.beats.length)
        let sum = read
        for (const g of games) sum += done.has(g) ? 1 : (this.gameProgress.get(g) ?? 0)
        const p = sum / (1 + games.length)
        ui.setProgress((this.index + p) / this.pages.length, this.index + 1)
    }

    tasksDone(page = this.page) {
        if (!this.done.has(page.id)) this.done.set(page.id, new Set())
        return this.done.get(page.id)
    }

    texturesFor(page) {
        return [makePageTexture(page, 'left'), makePageTexture(page, 'right')]
    }

    // ================================================================ portada
    showCover() {
        const { book, env, rig, quake, ui } = this.ctx
        this.mode = 'cover'
        this.index = 0
        quake.set(0)
        book.setClosed()
        book.setCornerGlow(false)
        const [l, r] = this.texturesFor(this.pages[0])
        book.setPages(l, r)
        env.setMoodInstant(story.cover.mood)
        rig.set(story.cover.camera)
        rig.focus = []
        ui.clearAll()
        ui.progressAllowed = false
        ui.showProgress(false)
        ui.setProgress(0, 1)
        this.intro = 'cover' // PORTADA
        ui.setIntro(true)
        ui.setNarration(`${story.title}. ${story.subtitle}.`)
        ui.setNext(false)
        ui.coverStrip()
    }

    afterOpen() {
        const { book, env, rig, ui } = this.ctx
        this.mode = 'opening'
        ui.setTurning(true)
        const page = this.pages[0]
        this.index = 0
        this.scene = createScene(page.scene, this.ctx, page.setup ?? {})
        book.stage.add(this.scene.group)
        const tl = gsap.timeline()
        tl.add(book.finishOpen(), 0)
        tl.add(rig.to(page.camera ?? 'wide', 3) ?? gsap.timeline(), 0)
        tl.add(env.setMood(page.mood ?? 'afternoon', 3.4) ?? gsap.timeline(), 0)
        // los objetos aparecen cuando el libro termina de abrirse (nunca durante el giro)
        tl.call(() => {
            this.intro = 'active' // EXPERIENCIA ACTIVA
            ui.showStory(true)
            this.mode = 'reading'
            this.enterPage()
        }, null, 2.2)
    }

    afterClose() {
        const { book, env, rig, quake, ui } = this.ctx
        this.mode = 'closing'
        ui.clearAll()
        ui.progressAllowed = false
        ui.setTurning(true)
        this.ctx.rig.focus = []
        quake.to(0, 1)
        const tl = gsap.timeline()
        tl.add(book.finishClose(), 0)
        tl.add(rig.to(story.ending.camera, 3.2) ?? gsap.timeline(), 0)
        tl.add(env.setMood(story.ending.mood, 3.5) ?? gsap.timeline(), 0)
        tl.call(() => {
            // listo para volver a leer
            this.scene?.dispose()
            this.scene = null
            this.done.clear()
            this.visited.clear()
            this.maxBeat.clear()
            this.gameProgress.clear()
            // nueva lectura: el temblor fuerte vuelve a estar disponible
            resetOnce()
            this.intro = 'cover' // PORTADA
            ui.setIntro(true)
            ui.setProgress(0, 1)
            this.stars = 0
            this.closing = false
            const [l, r] = this.texturesFor(this.pages[0])
            book.setPages(l, r)
            this.index = 0
            this.mode = 'cover'
            ui.setTurning(false)
            ui.setNarration(`${story.title}. ${story.subtitle}.`)
            ui.setNext(false)
            ui.coverStrip()
        })
    }

    // ================================================================ delegate de PageTurner
    canTurn(kind, dir) {
        if (this.mode === 'cover') return kind === 'cover' ? 'ok' : 'none'
        if (this.mode !== 'reading') return 'none'
        if (kind === 'close') return this.closing ? 'ok' : 'none'
        if (kind !== 'page') return 'none'
        // durante un juego el dedo juega: no se agarra la hoja
        if (this.activity) return 'none'
        if (dir > 0) {
            if (this.isLast) return this.ctx.ui.ready ? 'none' : 'locked'
            return this.ctx.ui.ready ? 'ok' : 'locked'
        }
        return this.index > 0 ? 'ok' : 'none'
    }

    peek() {}
    endPeek() {}
    progress() {}

    /** El lector empezó a girar la hoja: los objetos salen juntos y se prepara la página siguiente. */
    prepare(dir) {
        const target = this.pages[this.index + dir]
        if (!target) return false
        const { book, ui } = this.ctx
        const [l, r] = this.texturesFor(target)
        book.beginTurn(dir, l, r)
        this.incoming = createScene(target.scene, this.ctx, target.setup ?? {})
        book.stage.add(this.incoming.group)
        this.scene?.hide()
        this.stopActivity()
        stopEffects() // nada de la escena anterior sigue sonando
        ui.hideDialog()
        ui.hideMission()
        ui.setTurning(true)
        book.setCornerGlow(false)
        return true
    }

    dragStart() {}

    commit(kind, dir) {
        const { ui, env, rig, quake } = this.ctx
        // la música entra con la apertura del libro y se va al cerrarlo
        if (kind === 'cover') {
            this.mode = 'opening'
            if (this.ctx.ui.introOn) this.ctx.ui.setIntro(false)
            playSfx('pasar-pagina')
            startMusic()
            return
        }
        if (kind === 'close') { this.mode = 'closing'; playSfx('pasar-pagina'); stopEffects(); stopMusic(4); return }
        playSfx('pasar-pagina')
        this.beatTl?.progress(1)
        ui.clearAll()
        const target = this.pages[this.index + dir]
        env.setMood(target.mood ?? 'afternoon', 2.6)
        rig.to(target.camera ?? 'wide', 2.6)
        quake.to(target.quake ?? 0, 1.2)
    }

    finish(kind, dir) {
        if (kind === 'cover') return this.afterOpen()
        if (kind === 'close') return this.afterClose()
        this.ctx.book.commitTurn()
        this.scene?.dispose()
        this.scene = this.incoming
        this.incoming = null
        this.index += dir
        this.enterPage()
    }

    cancel(kind) {
        if (kind !== 'page') return
        const { book, ui } = this.ctx
        book.cancelTurn()
        this.incoming?.dispose()
        this.incoming = null
        this.scene?.unhide()
        ui.setTurning(false)
        if (ui.ready) book.setCornerGlow(true)
        // vuelven las tarjetas del momento actual
        const b = this.page.beats[this.beat]
        if (b?.dialog) ui.say(b.dialog.speaker, b.dialog.text)
        if (this.blocked && b?.instruction) {
            ui.setMission(b.instruction)
            this.startActivity(b.instruction)
        }
    }

    onLockedAttempt() {
        this.ctx.ui.denyTurn()
    }

    // ================================================================ dentro de una página
    enterPage() {
        const { ui, book } = this.ctx
        const page = this.page
        const first = !this.visited.has(page.id)
        this.visited.add(page.id)
        ui.progressAllowed = true
        this.syncProgress()
        ui.setTurning(false)
        // los objetos que se tocan en esta página nunca quedan detrás de los cuadros
        this.ctx.rig.focus = Object.values(this.scene.markers)
        ui.startPage(page.tasks, [...this.tasksDone(page)], this.isLast ? 'last' : 'page')
        if (ui.ready) book.setCornerGlow(true)
        this.beat = -1
        this.blocked = false
        ui.setNext(false)
        // la banda entra cuando empieza la última unidad (Guía visual §11.5)
        this.scene.reveal(first, () => this.showBeat(0))
    }

    showBeat(i) {
        const { ui, quake, env } = this.ctx
        const page = this.page
        const b = page.beats[i]
        if (!b) return
        this.beat = i
        const last = i === page.beats.length - 1
        if (i > (this.maxBeat.get(page.id) ?? -1)) {
            this.maxBeat.set(page.id, i)
            this.syncProgress()
        }

        ui.setNarration(b.narrator)
        if (b.dialog) {
            ui.say(b.dialog.speaker, b.dialog.text)
            this.scene?.onDialogue(b.dialog.speaker)
        } else ui.hideDialog()
        if (b.instruction) ui.setMission(b.instruction)
        else if (!this.activity) ui.hideMission()

        if (b.sfx) this.popSfx(b.sfx)
        if (b.quake !== undefined) {
            const [value, duration] = Array.isArray(b.quake) ? b.quake : [b.quake, 1.2]
            quake.to(value, duration)
            // el colchón "temblor INICIANDO" sigue solo a la intensidad (Experience);
            // "¡La casa empezó a temblar!" es el único momento del temblor fuerte
            if (value >= 0.7) strongQuake()
        }
        if (b.mood) env.setMood(b.mood, 2.5)
        this.beatTl = this.scene ? this.scene.runSequence(b.do ?? []) : null

        const task = b.instruction?.taskId
        this.blocked = !!task
        ui.setNext(!this.blocked && !last)
        if (last) this.complete('leer')
        if (task) gsap.delayedCall(0.8, () => { if (this.beat === i && this.page === page) this.startActivity(b.instruction) })
    }

    /** Botón "siguiente": avanza un momento (nunca cambia de página). */
    next() {
        if (this.mode !== 'reading' || this.scene?.hidden) return
        if (this.blocked) return this.ctx.ui.nudgeMission()
        if (this.beat < this.page.beats.length - 1) {
            if (this.beatTl?.isActive()) this.beatTl.progress(1)
            this.showBeat(this.beat + 1)
        }
    }

    /** Teclado: Enter o → avanzan el texto; al final, intentan pasar la página. */
    keyNext() {
        if (this.mode === 'cover') return this.startFromIntro()
        if (this.mode !== 'reading') return
        if (this.blocked) return this.ctx.ui.nudgeMission()
        if (this.beat < this.page.beats.length - 1) return this.next()
        this.tryTurnPage()
    }

    /**
     * «Abre el libro»: transición PORTADA → TRANSICIÓN → EXPERIENCIA ACTIVA.
     *  1. la pantalla de inicio se retira (fundido) y el espacio del libro pasa
     *     a ser el del cuento: el mismo libro 3D se desliza al centro y cambia de
     *     tamaño con la cámara (CameraRig sigue su meta con suavidad);
     *  2. ya cerca del centro, la tapa se abre con el sistema de siempre
     *     (PageTurner) y la cámara viaja al encuadre del cuento (afterOpen).
     * Un segundo toque no inicia otra transición; si la apertura no puede
     * empezar, vuelve la portada (nunca queda en un estado intermedio).
     */
    startFromIntro() {
        const { ui, rig, turner } = this.ctx
        if (this.mode !== 'cover' || this.intro === 'transition' || turner.busy) return
        this.intro = 'transition' // TRANSICIÓN
        ui.setIntro(false)
        rig.ease = 1.7 // desplazamiento pausado y continuo
        this.introTl?.kill()
        this.introTl = gsap.timeline()
            .call(() => {
                if (this.mode === 'cover' && !turner.auto('cover', 1)) {
                    // no se pudo abrir: de vuelta a la portada, sin bloquear nada
                    this.intro = 'cover'
                    rig.ease = 5
                    ui.setIntro(true)
                }
            }, null, 0.95)
            .call(() => { rig.ease = 5 }, null, 2.4)
    }

    /** Botón de la barra de página (o teclado). Antes de estar lista: la hoja rebota y la barra se sacude. */
    tryTurnPage() {
        const { ui, turner } = this.ctx
        if (this.mode === 'cover') return this.startFromIntro()
        if (this.mode !== 'reading' || turner.busy) return
        if (!ui.ready) {
            ui.denyTurn()
            turner.nudge(1)
            return
        }
        if (this.isLast) {
            // "¡Fin del cuento!": el libro se cierra y vuelve a la portada
            this.closing = true
            this.stopActivity()
            ui.clearAll()
            this.ctx.book.setCornerGlow(false)
            this.scene?.hide()
            gsap.delayedCall(0.32, () => { if (!turner.auto('close', -1)) this.closing = false })
            return
        }
        this.scene?.hide()
        gsap.delayedCall(0.32, () => turner.auto('page', 1))
    }

    complete(taskId) {
        const page = this.page
        this.tasksDone(page).add(taskId)
        if (this.ctx.ui.completeTask(taskId)) this.ctx.book.setCornerGlow(true)
        this.syncProgress()
    }

    // ================================================================ juegos
    async startActivity(instruction) {
        if (!this.scene || this.activity) return
        const { ui } = this.ctx
        const act = createActivity(instruction.taskId, this.ctx, this.scene)
        this.activity = act
        // lo jugado hasta ahora mueve la barra de avance
        act.onProgress = (f) => {
            const prev = this.gameProgress.get(instruction.taskId) ?? 0
            if (f <= prev) return
            this.gameProgress.set(instruction.taskId, f)
            this.syncProgress()
        }
        await act.start()
        if (this.activity !== act || act.disposed) return
        this.activity = null
        if (act.awardsStar) this.stars++
        this.complete(instruction.taskId)
        ui.missionSuccess()
        this.blocked = false
        ui.setNext(this.beat < this.page.beats.length - 1)
    }

    stopActivity() {
        this.activity?.dispose()
        this.activity = null
    }

    /** Sonido escrito de un momento: junto a un objeto del escenario o en x, y (%). */
    popSfx(s) {
        const { ui, camera } = this.ctx
        const target = s.at && (this.scene?.anchors[s.at] ?? this.scene?.markers[s.at])
        if (target) {
            const w = target.isObject3D ? target.getWorldPosition(target.position.clone()) : this.scene.group.localToWorld(target.clone())
            ui.sfxAt(s.text, w, camera)
        } else ui.sfx(s.text, s.x ?? 50, s.y ?? 30)
    }

    // ================================================================ loop
    update(dt, t, quake) {
        this.scene?.update(dt, t, quake)
        this.incoming?.update(dt, t, quake)
        this.activity?.update?.(dt, t)
    }

    /** Atajo de desarrollo: ?pagina=sala | pasillo | patio (o 1, 2, 3). */
    jumpTo(ref) {
        const n = Number(ref)
        const i = this.pages.findIndex((p) => p.id === ref || p.number === n)
        if (i < 0) return this.showCover()
        const page = this.pages[i]
        const { book, env, rig, quake, ui } = this.ctx
        this.mode = 'reading'
        this.index = i
        book.setOpen()
        const [l, r] = this.texturesFor(page)
        book.setPages(l, r)
        env.setMoodInstant(page.mood ?? 'afternoon')
        rig.set(page.camera ?? 'wide')
        quake.set(page.quake ?? 0)
        ui.clearAll()
        // atajo de desarrollo: sin portada, directo a la experiencia activa
        this.intro = 'active'
        ui.setIntro(false)
        ui.showStory(true)
        this.scene = createScene(page.scene, this.ctx, page.setup ?? {})
        book.stage.add(this.scene.group)
        this.enterPage()
    }
}

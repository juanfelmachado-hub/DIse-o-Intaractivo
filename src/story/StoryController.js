/**
 * Controlador central del cuento: sabe en qué doble página está el lector y
 * coordina libro, escenarios, atmósfera, cámara, temblor, texto y actividades.
 *
 *   portada ─(arrastrar tapa)─▶ doble página de título ─(arrastrar hoja)─▶ página 1 … ─▶ fin ─(cerrar)─▶ portada
 *
 * No hay botones de navegación: el lector pasa las hojas arrastrándolas
 * (book/PageTurner.js). Este controlador es su "delegate": decide qué se puede
 * girar y sincroniza los escenarios pop-up con el porcentaje de giro.
 *
 * Dentro de cada página, los momentos (beats) avanzan solos con un tiempo de
 * lectura generoso. Si la página tiene una actividad, la hoja no se deja pasar
 * hasta completarla.
 */
import gsap from 'gsap'
import { story } from '../data/story.js'
import { createScene } from '../scenes/index.js'
import { createActivity } from '../activities/index.js'
import { makePageTexture, makeTitleTexture, makeEndTexture } from '../book/PageArt.js'

const words = (s) => (s ? s.trim().split(/\s+/).length : 0)

/** Agrupa story.pages en dobles páginas físicas del libro. */
function buildSpreads(pages) {
    const out = [{ kind: 'title', id: 'title', mood: 'afternoon', camera: 'open', quake: 0 }]
    for (const p of pages) {
        if (p.type === 'activity' && p.samePage) {
            out[out.length - 1].activity = p
            continue
        }
        out.push({
            kind: p.type === 'activity' ? 'activity' : 'page',
            id: p.id, page: p, scene: p.scene, setup: p.setup,
            mood: p.mood, camera: p.camera, quake: p.quake ?? 0,
        })
    }
    out.push({ kind: 'end', id: 'end', mood: 'golden', camera: 'open', quake: 0 })
    return out
}

export class StoryController {
    constructor(ctx) {
        this.ctx = ctx
        this.spreads = buildSpreads(story.pages)
        this.index = 0
        this.scene = null
        this.incoming = null
        this.activity = null
        this.mode = 'cover' // cover | opening | reading | closing
        this.phase = 'idle' // idle | beats | intro | activity | done
        this.completed = new Set()
        this.beat = 0
        this.beatTimer = null
        this.beatTl = null
    }

    get spread() { return this.spreads[this.index] }
    get isEnd() { return this.spread?.kind === 'end' }

    texturesFor(s) {
        if (s.kind === 'title') return [makeTitleTexture('left', story.titleSpread.left), makeTitleTexture('right', story.titleSpread.right)]
        if (s.kind === 'end') return [makeEndTexture('left'), makeEndTexture('right')]
        return [makePageTexture(s.page, 'left'), makePageTexture(s.page, 'right')]
    }

    pendingActivity(s = this.spread) {
        if (s.kind === 'activity') return !this.completed.has(s.id)
        return !!s.activity && !this.completed.has(s.activity.id)
    }

    // ================================================================ portada
    showCover() {
        const { book, env, rig, quake, ui } = this.ctx
        this.mode = 'cover'
        this.index = 0
        quake.set(0)
        book.setClosed()
        const [l, r] = this.texturesFor(this.spreads[0])
        book.setPages(l, r)
        env.setMoodInstant(story.cover.mood)
        rig.set(story.cover.camera)
        ui.showDragHint('cover')
    }

    afterOpen() {
        const { book, env, rig, ui } = this.ctx
        this.mode = 'opening'
        ui.hideDragHint()
        book.setCoverLabel(null)
        const tl = gsap.timeline()
        tl.add(book.finishOpen(), 0)
        tl.add(rig.to('open', 3) ?? gsap.timeline(), 0)
        tl.add(env.setMood('afternoon', 3.4) ?? gsap.timeline(), 0)
        tl.call(() => {
            this.mode = 'reading'
            this.index = 0
            this.enterSpread()
        })
    }

    afterClose() {
        const { book, env, rig, quake, ui } = this.ctx
        this.mode = 'closing'
        ui.clearText()
        quake.to(0, 1)
        const tl = gsap.timeline()
        tl.add(book.finishClose(), 0)
        tl.add(rig.to(story.ending.camera, 3.2) ?? gsap.timeline(), 0)
        tl.add(env.setMood(story.ending.mood, 3.5) ?? gsap.timeline(), 0)
        tl.call(() => {
            // listo para volver a leer: la portada se puede abrir otra vez
            const [l, r] = this.texturesFor(this.spreads[0])
            book.setPages(l, r)
            this.completed.clear()
            this.index = 0
            this.mode = 'cover'
            ui.showDragHint('cover')
        })
    }

    // ================================================================ delegate de PageTurner
    canTurn(kind, dir) {
        if (this.mode === 'cover') return kind === 'cover' ? 'ok' : 'none'
        if (this.mode !== 'reading') return 'none'
        if (kind === 'close') return 'ok'
        if (kind !== 'page') return 'none'
        if (this.phase === 'intro' || this.phase === 'activity') return 'locked'
        if (dir > 0) {
            if (this.index >= this.spreads.length - 1) return 'none'
            return this.pendingActivity() ? 'locked' : 'ok'
        }
        return this.index > 0 ? 'ok' : 'none'
    }

    peek(dir) {
        this.scene?.beginCarry(dir > 0 ? 'R' : 'L', dir > 0 ? 'front' : 'back')
    }

    endPeek() {
        this.scene?.endCarry()
    }

    /** El lector empezó a arrastrar: se prepara la doble página siguiente/anterior. */
    prepare(dir) {
        const target = this.spreads[this.index + dir]
        if (!target) return false
        const [l, r] = this.texturesFor(target)
        this.ctx.book.beginTurn(dir, l, r)
        if (target.scene) {
            this.incoming = createScene(target.scene, this.ctx, target.setup ?? {})
            this.ctx.book.stage.add(this.incoming.group)
            this.incoming.beginCarry(dir > 0 ? 'L' : 'R', dir > 0 ? 'back' : 'front')
        }
        return true
    }

    dragStart(kind) {
        const { ui, book } = this.ctx
        ui.hideDragHint()
        if (kind === 'close') book.setCoverLabel(story.ending.label)
    }

    /**
     * Sincroniza los pop-ups con el porcentaje de giro de la hoja:
     *   0 – 50 %  la página que se va se pliega y se guarda en el lomo
     *  50 – 100 % la página nueva hace salir sus pop-ups desde el lomo
     * Así nunca hay piezas de dos páginas ocupando el mismo espacio.
     */
    progress(p, vel) {
        const wind = Math.min(2.5, Math.abs(vel) * 0.5)
        const out = Math.max(0, 1 - p * 2)
        const inn = Math.max(0, p * 2 - 1)
        if (this.scene) {
            this.scene.setOpenness(out)
            this.scene.wind = Math.max(this.scene.wind, wind)
            this.scene.onWind?.(wind)
        }
        if (this.incoming) {
            this.incoming.setOpenness(inn)
            this.incoming.wind = Math.max(this.incoming.wind, wind * 0.6)
        }
    }

    /** Se soltó la hoja más allá del umbral: la página va a cambiar. */
    commit(kind, dir) {
        const { ui, env, rig, quake } = this.ctx
        if (kind === 'cover') { this.mode = 'opening'; return }
        if (kind === 'close') { this.mode = 'closing'; ui.clearText(); return }
        this.stopBeats()
        ui.clearText()
        ui.hideDragHint()
        this.activity?.dispose()
        this.activity = null
        const target = this.spreads[this.index + dir]
        env.setMood(target.mood ?? 'afternoon', 2.6)
        rig.to(target.camera ?? 'open', 2.6)
        quake.to(target.quake ?? 0, 1.6)
    }

    finish(kind, dir) {
        if (kind === 'cover') return this.afterOpen()
        if (kind === 'close') return this.afterClose()
        this.ctx.book.commitTurn()
        this.scene?.dispose()
        this.scene = this.incoming
        this.incoming = null
        this.scene?.endCarry()
        this.scene?.setOpenness(1)
        this.index += dir
        this.enterSpread()
    }

    cancel(kind) {
        if (kind !== 'page') {
            if (this.mode === 'cover') this.ctx.ui.showDragHint('cover', 1.2)
            else if (this.isEnd) this.ctx.ui.showDragHint('close', 1.2)
            return
        }
        this.ctx.book.cancelTurn()
        this.incoming?.dispose()
        this.incoming = null
        this.scene?.endCarry()
        this.scene?.setOpenness(1)
        if (this.phase === 'done') this.ctx.ui.showDragHint(this.isEnd ? 'close' : 'next', 1.5)
    }

    onLockedAttempt() {
        const { ui } = this.ctx
        const msg = this.phase === 'intro' ? 'Escucha al Guardián…'
            : this.phase === 'beats' ? 'Espera un poquito: Nico va a necesitar tu ayuda aquí'
                : 'Primero ayuda a Nico con la actividad'
        ui.toast(msg)
        ui.shakeActivity()
    }

    // ================================================================ dentro de una doble página
    enterSpread() {
        const s = this.spread
        const { ui } = this.ctx
        this.phase = 'idle'
        ui.hideActivity()
        if (s.kind === 'page') {
            this.phase = 'beats'
            this.beatTimer = gsap.delayedCall(0.6, () => this.playBeat(0))
        } else if (s.kind === 'activity') {
            if (this.completed.has(s.id)) this.done()
            else this.beatTimer = gsap.delayedCall(0.8, () => this.startActivity(s.page))
        } else {
            this.done()
        }
    }

    playBeat(i) {
        const s = this.spread
        const beat = s.page.beats[i]
        const { ui, quake, env } = this.ctx
        this.beat = i
        ui.showText({ text: beat.text, dialogue: beat.dialogue }, { step: i, steps: s.page.beats.length })
        if (beat.dialogue) this.scene?.onDialogue(beat.dialogue.who)
        if (beat.quake !== undefined) {
            const [value, duration] = Array.isArray(beat.quake) ? beat.quake : [beat.quake, 1.2]
            quake.to(value, duration)
        }
        if (beat.mood) env.setMood(beat.mood, 2.5)

        this.beatTl = this.scene ? this.scene.runSequence(beat.do ?? []) : null
        // tiempo de lectura pensado para niños de 7 a 11 años
        const read = 2 + (words(beat.text) + words(beat.dialogue?.text)) * 0.4
        const wait = Math.max(read, (this.beatTl?.duration() ?? 0) + 0.8)
        const last = i === s.page.beats.length - 1
        this.beatTimer = gsap.delayedCall(wait, () => (last ? this.afterBeats() : this.playBeat(i + 1)))
    }

    afterBeats() {
        const s = this.spread
        if (s.activity && !this.completed.has(s.activity.id)) return this.startActivity(s.activity)
        this.done()
    }

    stopBeats() {
        this.beatTimer?.kill()
        this.beatTimer = null
        if (this.beatTl?.isActive()) this.beatTl.progress(1)
        this.beatTl = null
    }

    async startActivity(entry) {
        if (!this.scene) return
        const act = createActivity(entry.activity, this.ctx, this.scene)
        this.activity = act
        this.phase = 'intro'
        act.onBegin = () => { if (this.activity === act) this.phase = 'activity' }
        await act.start()
        if (this.activity !== act) return // se cambió de página
        this.completed.add(entry.id)
        this.done()
    }

    done() {
        this.phase = 'done'
        this.ctx.ui.showDragHint(this.isEnd ? 'close' : 'next', this.spread.kind === 'title' ? 0.6 : 1.4)
    }

    // ================================================================ loop
    update(dt, t, quake) {
        this.scene?.update(dt, t, quake)
        this.incoming?.update(dt, t, quake)
    }

    /** Atajo de desarrollo: ?pagina=p6 / ?pagina=6 / ?pagina=a1 abre esa doble página. */
    jumpTo(ref) {
        const n = Number(ref)
        let i = this.spreads.findIndex((s) => s.id === ref || (Number.isInteger(n) && s.page?.number === n) || s.activity?.id === ref)
        if (i < 0) return this.showCover()
        const s = this.spreads[i]
        const { book, env, rig, quake, ui } = this.ctx
        this.mode = 'reading'
        this.index = i
        book.setOpen()
        const [l, r] = this.texturesFor(s)
        book.setPages(l, r)
        env.setMoodInstant(s.mood ?? 'afternoon')
        rig.set(s.camera ?? 'open')
        quake.set(s.quake ?? 0)
        ui.hideDragHint()
        if (s.scene) {
            this.scene = createScene(s.scene, this.ctx, s.setup ?? {})
            book.stage.add(this.scene.group)
            gsap.to(this.scene, { openness: 1, duration: 1.8, ease: 'power1.inOut' })
        }
        if (s.activity?.id === ref) {
            this.phase = 'beats'
            this.beatTimer = gsap.delayedCall(1.6, () => this.startActivity(s.activity))
            return
        }
        this.enterSpread()
    }
}

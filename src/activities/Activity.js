/**
 * Base de los juegos ("Juegos_interactivos_Nico" + Guía visual §3.6).
 *
 * Al empezar, el Guardián sale del libro, se acerca al lector, saluda y dice
 * su frase del juego en su tarjeta de diálogo (izquierda). Luego vuelve y el
 * juego comienza. La misión (derecha) se compacta en cuanto el niño empieza a
 * jugar; las pistas las dice el Guardián, nunca como error; el éxito se
 * celebra en la misión (verde) y con una estrella del Guardián.
 * Un solo gesto, sin puntajes ni tiempo límite: los errores nunca castigan.
 */
import gsap from 'gsap'
import { playSfx } from '../audio/sfx.js'

const wait = (s) => new Promise((r) => gsap.delayedCall(s, r))

export class Activity {
    constructor(ctx, data, scene) {
        this.ctx = ctx
        this.data = data
        this.scene = scene
        this.done = false
        this.disposed = false
        this.calls = []
        this.started = false
        this.awardsStar = true
    }

    /** Devuelve una promesa que se resuelve al completar el juego. */
    async start() {
        this.promise = new Promise((resolve) => { this.resolve = resolve })
        await this.intro()
        if (this.disposed || this.finished) return this.promise
        this.begin()
        return this.promise
    }

    /** El Guardián le habla directamente a quien lee el cuento. */
    async intro() {
        const g = this.scene.guardian
        const { ui } = this.ctx
        if (!g || !g.visible) {
            if (this.data.guide) ui.say('guardian', this.data.guide)
            return
        }
        ui.showVeil(true)
        // el Guardián sale del libro hacia el lector: "¡Hey, escucha!" (una vez)
        playSfx('guardian-llama')
        await this.scene.guardianToViewer(true)
        if (this.disposed) return
        await g.greet()
        if (this.disposed) return
        if (this.data.guide) {
            ui.say('guardian', this.data.guide, { delay: 0 })
            g.speak()
            await wait(1.6 + this.data.guide.split(/\s+/).length * 0.3)
        }
        ui.showVeil(false)
        if (this.disposed) return
        await this.scene.guardianToViewer(false)
    }

    begin() {}
    update() {}

    /** El niño empezó a jugar: la misión se compacta. */
    played() {
        if (this.started) return
        this.started = true
        this.ctx.ui.playing(true)
    }

    /** Avance del juego (0…1) para la barra de avance del cuento. */
    report(fraction) {
        this.onProgress?.(Math.max(0, Math.min(1, fraction)))
    }

    /** Pista del Guardián (izquierda). */
    hint(text) {
        this.ctx.ui.say('guardian', text, { hint: true })
        this.scene.onDialogue('guardian')
    }

    /** Cambia la misión (otra etapa del mismo juego). */
    mission(m) {
        this.started = false
        this.ctx.ui.setMission(m, { delay: 0 })
    }

    after(seconds, fn) {
        const c = gsap.delayedCall(seconds, () => { if (!this.disposed) fn() })
        this.calls.push(c)
        return c
    }

    finish() {
        if (this.finished || this.disposed) return
        this.finished = true
        this.cleanup()
        // cada juego da una estrella (el juego 3 la da al terminar su parte B, en el patio)
        if (this.awardsStar) {
            this.scene.awardStar()
            playSfx('estrella')
        }
        this.resolve?.()
    }

    cleanup() {
        const { hotspots, pointer, ui } = this.ctx
        hotspots.clear()
        pointer.clear()
        ui.playing(false)
        ui.showTurtle(false)
    }

    dispose() {
        this.disposed = true
        this.calls.forEach((c) => c.kill())
        this.cleanup()
        const { ui } = this.ctx
        ui.showVeil(false)
        this.scene.guardianToViewer?.(false)
        this.resolve?.()
    }
}

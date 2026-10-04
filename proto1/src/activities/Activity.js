/**
 * Base de las actividades lúdicas.
 *
 * Al empezar, el Guardián sale del libro, se acerca al lector, hace una pausa
 * (saluda) y le explica en un globo qué hacer. Luego vuelve a la escena y la
 * actividad comienza. Mientras dure, la hoja no se deja pasar (instructivo:
 * "el niño no puede avanzar de página hasta completar la actividad").
 * No hay puntajes ni penalizaciones: solo ánimo y nuevos intentos.
 */
import gsap from 'gsap'

const wait = (s) => new Promise((r) => gsap.delayedCall(s, r))

export class Activity {
    constructor(ctx, data, scene) {
        this.ctx = ctx
        this.data = data
        this.scene = scene
        this.done = false
        this.timers = []
        this.disposed = false
        this.onBegin = null
    }

    /** Devuelve una promesa que se resuelve al completar la actividad. */
    async start() {
        this.promise = new Promise((resolve) => { this.resolve = resolve })
        this.ctx.ui.showText({})
        await this.intro()
        if (this.disposed) return this.promise
        this.onBegin?.()
        this.begin()
        return this.promise
    }

    /** El Guardián le habla directamente a quien lee el cuento. */
    async intro() {
        const g = this.scene.guardian
        const guide = this.data.guide
        if (!g || !guide) return
        const { ui } = this.ctx
        ui.showVeil(true)
        await this.scene.guardianToViewer(true)
        if (this.disposed) return
        // pausa: llama la atención antes de hablar
        await g.greet()
        await wait(0.25)
        if (this.disposed) return
        const read = 2.6 + guide.split(/\s+/).length * 0.34
        await new Promise((resolve) => {
            const call = gsap.delayedCall(read, resolve)
            ui.showGuardianBubble(guide, g, () => { call.kill(); resolve() })
            this.skipIntro = () => { call.kill(); resolve() }
        })
        ui.hideGuardianBubble()
        ui.showVeil(false)
        if (this.disposed) return
        g.speak()
        await this.scene.guardianToViewer(false)
    }

    begin() {}

    say(text, tone) {
        this.ctx.ui.say('guardian', text, tone)
        this.scene.onDialogue('guardian')
    }

    later(fn, ms) {
        this.timers.push(setTimeout(fn, ms))
    }

    finish(message) {
        if (this.finished) return
        this.finished = true
        if (message) this.say(message, 'ok')
        this.ctx.ui.completeActivity()
        this.cleanup()
        this.resolve?.()
    }

    cleanup() {
        this.ctx.hotspots.clear()
        this.ctx.pointer.clear()
    }

    dispose() {
        this.disposed = true
        this.skipIntro?.()
        this.timers.forEach(clearTimeout)
        this.cleanup()
        const { ui } = this.ctx
        ui.hideGuardianBubble()
        ui.showVeil(false)
        ui.hideSteps()
        ui.hideActivity()
        this.resolve?.()
    }
}

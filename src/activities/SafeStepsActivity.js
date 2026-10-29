/**
 * «Ponerse a salvo» — los tres pasos mágicos (debajo de la mesa).
 *
 * En vez de leer una lista, el niño los descubre uno a uno en la tarjeta del
 * Guardián: presentación → paso 1 → paso 2 → paso 3 → cierre. Cada paso trae
 * su ilustración animada, la frase corta y una explicación sencilla; en el
 * libro, Nico y el Guardián hacen la misma postura (se aprende mirando).
 * Al avanzar, el paso anterior queda marcado como descubierto (verde).
 * Sin puntajes ni tiempo: el niño avanza a su ritmo con «Siguiente».
 */
import { Activity } from './Activity.js'
import { playSfx } from '../audio/sfx.js'

export class SafeStepsActivity extends Activity {
    constructor(...args) {
        super(...args)
        this.awardsStar = false // es un aprendizaje, no un juego con premio
    }

    begin() {
        const { ui } = this.ctx
        this.phase = 'intro'
        this.index = -1
        this.busy = false
        ui.onStepsGo = () => this.go()
        this.render()
    }

    /** Teclado (Enter o →) avanza igual que el botón de la tarjeta. */
    onKey() {
        this.go()
        return true
    }

    view() {
        const d = this.data
        return { phase: this.phase, index: this.index, steps: d.steps, intro: d.intro, end: d.end, next: d.next }
    }

    render() {
        this.ctx.ui.safeSteps(this.view())
    }

    go() {
        if (this.busy || this.finished || this.disposed) return
        const { ui } = this.ctx
        this.played()
        if (this.phase === 'end') return this.finish()
        if (this.phase === 'intro') return this.show(0)
        // el paso actual queda descubierto; luego entra el siguiente
        this.busy = true
        ui.safeStepDone(this.index)
        playSfx('acierto', { level: 0.55 })
        this.after(0.55, () => {
            this.busy = false
            if (this.index < this.data.steps.length - 1) this.show(this.index + 1)
            else this.closing()
        })
    }

    show(i) {
        const { ui, quake } = this.ctx
        const s = this.data.steps[i]
        this.phase = 'step'
        this.index = i
        this.render()
        ui.setNarration(s.narrator)
        if (s.quake) quake.to(...s.quake)
        // Nico hace la postura y el Guardián la imita
        this.scene.nico?.pose(s.pose, 0.8)
        this.scene.guardian?.mimic(s.pose)
        this.report(i / (this.data.steps.length + 1))
    }

    closing() {
        this.phase = 'end'
        this.render()
        this.scene.runSequence?.(['guardian.glow'])
        this.after(1.2, () => this.scene.guardian?.mimic(null))
        this.report(this.data.steps.length / (this.data.steps.length + 1))
    }

    cleanup() {
        super.cleanup()
        this.ctx.ui.onStepsGo = null
    }
}

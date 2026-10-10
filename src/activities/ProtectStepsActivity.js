/**
 * Juego 2 — "Agáchate, cúbrete y sujétate"
 * Tres botones grandes con dibujos (tortuga, brazos sobre la cabeza, mano en la
 * pata de la mesa). Se tocan en orden; cada paso cambia la pose de Nico.
 * Al terminar, el temblor se va calmando.
 */
import { Activity } from './Activity.js'
import { sparkle } from '../animations/motions.js'

export class ProtectStepsActivity extends Activity {
    begin() {
        const { ui, quake } = this.ctx
        const d = this.data
        ui.showActivity(d.title)
        this.say(d.intro)
        quake.to(0.3, 1.2)
        this.scene.nico.pose('kneel', 0.8)
        this.expected = 0
        ui.showSteps(d.steps, (i) => this.pick(i))
        ui.setNextStep(0)
    }

    pick(i) {
        if (this.done || i < this.expected) return
        const { ui, quake } = this.ctx
        const d = this.data
        if (i !== this.expected) {
            ui.markStep(i, 'wrong')
            this.say(d.wrongOrder, 'oops')
            return
        }
        const step = d.steps[i]
        ui.markStep(i, 'done')
        this.scene.nico.pose(step.pose, 0.7)
        sparkle(this.scene.group, this.scene.nico.position.clone().setY(0.6), { color: '#fff6c2', count: 6, radius: 0.35 })
        this.expected++
        ui.setNextStep(this.expected)
        if (this.expected === d.steps.length) {
            this.done = true
            quake.to(0.06, 3)
            this.scene.run('guardian.glow')
            this.finish(d.success)
            this.later(() => ui.hideSteps(), 1600)
        }
    }

    cleanup() {
        super.cleanup()
    }
}

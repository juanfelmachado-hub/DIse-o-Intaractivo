/**
 * Juego 1 — "¿Dónde me protejo?"
 * El niño toca el lugar donde Nico debe protegerse. Los lugares peligrosos se
 * mueven un poquito y el Guardián explica por qué; la mesa es la respuesta.
 */
import { Activity } from './Activity.js'

export class SafePlaceActivity extends Activity {
    begin() {
        const { ui, hotspots, pointer } = this.ctx
        const d = this.data
        ui.showActivity(d.title)
        this.say(d.intro)
        Object.entries(d.targets).forEach(([id, t], i) => {
            const marker = this.scene.markers[id]
            const obj = this.scene.hotspots[id]
            if (!marker || !obj) return
            hotspots.add(id, marker, { label: t.label, onClick: () => this.choose(id), index: i })
            pointer.addClickable(obj, () => this.choose(id))
        })
    }

    choose(id) {
        if (this.done) return
        const d = this.data
        const t = d.targets[id]
        const { hotspots, pointer } = this.ctx
        if (!t.safe) {
            this.scene.wobble(id)
            this.say(d.wrongBy?.[id] ?? d.wrong, 'oops')
            hotspots.setClass(id, 'is-wrong')
            return
        }
        this.done = true
        hotspots.clear()
        pointer.clear()
        this.say(d.success, 'ok')
        this.scene.wobble('mesa')
        this.scene.run('nico.hideUnderTable').then(() => this.finish())
    }
}

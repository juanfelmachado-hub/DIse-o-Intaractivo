/**
 * Juego 3, parte B — el patio.
 *
 * Aparecen tres zonas: bajo un poste con cables, junto a una pared alta y el
 * centro del patio, abierto. El niño arrastra a Nico hacia donde cree que está
 * más seguro. Cada zona peligrosa hace una pequeña animación de "cuidado" (los
 * cables se balancean, la pared se asoma) y el Guardián dice "¡Aquí no!".
 * Al llegar al centro caen confeti y estrellas, y el Guardián baila un poquito.
 */
import gsap from 'gsap'
import { Activity } from './Activity.js'
import { playSfx } from '../audio/sfx.js'

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

export class PatioActivity extends Activity {
    begin() {
        const { pointer, hotspots } = this.ctx
        const scene = this.scene
        const nico = scene.nico
        this.start = nico.position.clone()

        Object.entries(scene.zoneRings).forEach(([id, ring], i) => {
            ring.visible = true
            gsap.fromTo(ring.scale, { x: 0.01, y: 0.01, z: 0.01 }, { x: 1, y: 1, z: 1, duration: 0.5, delay: i * 0.1, ease: 'power2.out' })
            // alternativa con teclado: cada zona es un botón (sin texto visible)
            hotspots.add(`zona-${id}`, scene.markers[id], { label: id, ghost: true, index: i, onClick: () => this.choose(id, true) })
        })

        pointer.addDraggable(nico, {
            space: scene.group,
            onStart: () => {
                this.played()
                this.report(0.3)
                nico.pose('dangle', 0.3)
                gsap.to(nico.p, { lift: 0.22, duration: 0.25 })
            },
            onMove: (p) => {
                nico.position.x = clamp(p.x, -2.8, 2.9)
                nico.position.z = clamp(p.z, -1.5, 1.6)
            },
            onDrop: () => {
                gsap.to(nico.p, { lift: 0, duration: 0.4, ease: 'bounce.out' })
                nico.pose('idle', 0.5)
                let best = null
                let bestD = 0.6
                for (const [id, z] of Object.entries(scene.zones)) {
                    const d = Math.hypot(z.x - nico.position.x, z.z - nico.position.z)
                    if (d < bestD) { best = id; bestD = d }
                }
                if (best) return this.choose(best)
                gsap.to(nico.position, { x: this.start.x, z: this.start.z, duration: 0.7, ease: 'power2.inOut' })
            },
        })
    }

    choose(id, walk = false) {
        if (this.done) return
        this.played()
        const scene = this.scene
        const nico = scene.nico
        const zone = this.data.zones[id]
        const target = scene.zones[id]
        if (!zone?.safe) {
            // "cuidado": los cables se balancean / la pared se asoma
            scene.wobble(id)
            this.hint(this.data.notHere)
            playSfx('pista')
            const back = () => gsap.to(nico.position, { x: this.start.x, z: this.start.z, duration: 0.8, ease: 'power2.inOut' })
            if (walk) nico.walkTo(target.x, target.z + 0.3, { speed: 0.9 }).then(() => nico.walkTo(this.start.x, this.start.z, { speed: 0.9 }))
            else back()
            return
        }
        this.done = true
        this.ctx.pointer.clear()
        this.ctx.hotspots.clear()
        const go = walk ? nico.walkTo(target.x, target.z, { speed: 0.6 }) : gsap.to(nico.position, { x: target.x, z: target.z, duration: 0.5, ease: 'power2.out' })
        go.then(() => {
            gsap.to(nico.rotation, { y: 0, duration: 0.4 })
            nico.face('smile')
            scene.confetti()
            scene.zoneRings.poste.visible = scene.zoneRings.pared.visible = false
            this.after(1.6, () => this.finish())
        })
    }
}

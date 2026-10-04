/**
 * Juego 3 — "Camino al lugar seguro"
 *  Parada 1: arrastrar los zapatos hasta los pies de Nico.
 *  Parada 2: tocar los pasos uno por uno (si toca muy rápido: "Despacito, sin correr").
 *  Parada 3: arrastrar a Nico al lugar abierto del patio (el centro).
 * Cada marcador también se puede tocar (alternativa accesible al arrastre).
 */
import gsap from 'gsap'
import { Activity } from './Activity.js'
import { sparkle, glint } from '../animations/motions.js'

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

export class SafeRouteActivity extends Activity {
    async begin() {
        const { ui } = this.ctx
        const d = this.data
        ui.showActivity(d.title, d.stops.map((s) => s.short))
        await this.stopShoes(d.stops[0])
        await this.wait(700)
        await this.stopWalk(d.stops[1])
        await this.wait(400)
        await this.stopOpen(d.stops[2])
        this.finish(d.success)
    }

    wait(ms) { return new Promise((r) => this.later(r, ms)) }

    // ------------------------------------------------------------ parada 1
    stopShoes(stop) {
        const { ui, hotspots, pointer } = this.ctx
        const scene = this.scene
        const shoes = scene.shoes
        const nico = scene.nico
        const origin = shoes.position.clone()
        ui.setStop(0)
        this.say(stop.prompt)

        return new Promise((resolve) => {
            let placed = false
            const hint = () => hotspots.add('shoes', shoes, { label: 'Zapatos', showLabel: true, passive: true, onClick: () => success() })
            const success = () => {
                if (placed) return
                placed = true
                pointer.remove(shoes)
                hotspots.remove('shoes')
                const tl = gsap.timeline()
                tl.to(shoes.position, { x: nico.position.x, z: nico.position.z + 0.05, y: 0.2, duration: 0.45, ease: 'power2.out' })
                tl.to(shoes.scale, { x: 0.01, y: 0.01, z: 0.01, duration: 0.3, ease: 'back.in(2)' }, '-=0.15')
                tl.call(() => {
                    shoes.visible = false
                    nico.setShoes(true)
                    sparkle(scene.group, nico.position.clone().setY(0.1), { color: '#ffd0c8', count: 8, radius: 0.3 })
                })
                tl.add(nico.hop())
                tl.call(resolve)
            }
            hint()
            pointer.addDraggable(shoes, {
                space: scene.group,
                onStart: () => {
                    hotspots.remove('shoes')
                    gsap.to(shoes.position, { y: 0.18, duration: 0.2 })
                },
                onMove: (p) => {
                    shoes.position.x = clamp(p.x, -2.9, 2.9)
                    shoes.position.z = clamp(p.z, -1.9, 1.9)
                },
                onDrop: () => {
                    const dist = Math.hypot(shoes.position.x - nico.position.x, shoes.position.z - nico.position.z)
                    if (dist < 0.6) return success()
                    gsap.to(shoes.position, { x: origin.x, y: 0, z: origin.z, duration: 0.6, ease: 'back.out(1.5)', onComplete: hint })
                },
            })
        })
    }

    // ------------------------------------------------------------ parada 2
    stopWalk(stop) {
        const { ui, hotspots } = this.ctx
        const scene = this.scene
        const nico = scene.nico
        const steps = scene.footprints
        ui.setStop(1)
        this.say(stop.prompt)

        return new Promise((resolve) => {
            let next = 0
            let walking = false
            let lastArrive = 0
            const refresh = () => {
                steps.forEach((_, i) => {
                    hotspots.setClass(`step${i}`, 'is-dim', i !== next)
                })
            }
            const tooFast = () => {
                this.say(stop.tooFast, 'oops')
                gsap.fromTo(nico.p, { lean: -0.25 }, { lean: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
            }
            const tap = (i) => {
                if (i < next) return
                if (walking || i !== next || performance.now() - lastArrive < 200) return tooFast()
                walking = true
                hotspots.remove(`step${i}`)
                const f = steps[i]
                nico.walkTo(f.position.x, f.position.z, { speed: 0.55 }).then(() => {
                    walking = false
                    lastArrive = performance.now()
                    glint(scene.group, f.position.clone().setY(0.05), { color: '#fff6c2', size: 0.4 })
                    next++
                    if (next < steps.length) return refresh()
                    // última huella: sale al patio
                    nico.walkTo(scene.patioStart.x, scene.patioStart.z, { speed: 0.55 }).then(() => {
                        gsap.to(nico.rotation, { y: 0, duration: 0.4 })
                        steps.forEach((s) => gsap.to(s.scale, { x: 0.01, y: 0.01, z: 0.01, duration: 0.4, onComplete: () => { s.visible = false } }))
                        resolve()
                    })
                })
            }
            steps.forEach((f, i) => {
                f.visible = true
                gsap.fromTo(f.scale, { x: 0.01, y: 0.01, z: 0.01 }, { x: 1, y: 1, z: 1, duration: 0.5, delay: i * 0.12, ease: 'back.out(2)' })
                hotspots.add(`step${i}`, f, { label: `Paso ${i + 1}`, className: 'is-step', index: i, onClick: () => tap(i) })
            })
            refresh()
        })
    }

    // ------------------------------------------------------------ parada 3
    stopOpen(stop) {
        const { ui, hotspots, pointer } = this.ctx
        const scene = this.scene
        const nico = scene.nico
        ui.setStop(2)
        this.say(stop.prompt)

        return new Promise((resolve) => {
            let solved = false
            const start = scene.patioStart
            Object.entries(stop.zones).forEach(([id, z], i) => {
                const ring = scene.zoneRings[id]
                ring.visible = true
                gsap.fromTo(ring.scale, { x: 0.01, y: 0.01, z: 0.01 }, { x: 1, y: 1, z: 1, duration: 0.5, delay: i * 0.1, ease: 'back.out(2)' })
                hotspots.add(`zone-${id}`, scene.markers[id], { label: z.label, showLabel: true, index: i, onClick: () => choose(id, true) })
            })

            const choose = (id, walk = false) => {
                if (solved) return
                const zone = stop.zones[id]
                const target = scene.zones[id]
                if (!zone.safe) {
                    scene.wobble(id)
                    this.say(stop.wrongBy?.[id] ?? 'Uy, ¡busca otro!', 'oops')
                    hotspots.setClass(`zone-${id}`, 'is-wrong')
                    const back = () => gsap.to(nico.position, { x: start.x, z: start.z, duration: 0.8, ease: 'power2.inOut' })
                    if (walk) nico.walkTo(target.x, target.z + 0.25, { speed: 0.9 }).then(() => nico.walkTo(start.x, start.z, { speed: 0.9 }))
                    else back()
                    return
                }
                solved = true
                pointer.clear()
                hotspots.clear()
                const go = walk
                    ? nico.walkTo(target.x, target.z, { speed: 0.6 })
                    : gsap.to(nico.position, { x: target.x, z: target.z, duration: 0.5, ease: 'power2.out' })
                go.then(() => {
                    gsap.to(nico.rotation, { y: 0, duration: 0.4 })
                    nico.pose('sit', 0.8)
                    nico.face('smile')
                    sparkle(scene.group, target.clone().setY(0.2), { color: '#fffbe0', count: 12, radius: 0.5 })
                    scene.zoneRings.poste.visible = scene.zoneRings.pared.visible = false
                    this.later(resolve, 700)
                })
            }

            hotspots.add('nico', nico.hit, { label: 'Nico', index: 3, passive: true })
            pointer.addDraggable(nico, {
                space: scene.group,
                onStart: () => {
                    hotspots.remove('nico')
                    nico.pose('dangle', 0.3)
                    gsap.to(nico.p, { lift: 0.22, duration: 0.25 })
                },
                onMove: (p) => {
                    nico.position.x = clamp(p.x, 0.2, 2.9)
                    nico.position.z = clamp(p.z, -1.5, 1.6)
                },
                onDrop: () => {
                    gsap.to(nico.p, { lift: 0, duration: 0.4, ease: 'bounce.out' })
                    nico.pose('idle', 0.5)
                    let best = null
                    let bestD = 0.6
                    for (const [id, z] of Object.entries(scene.zones)) {
                        const dd = Math.hypot(z.x - nico.position.x, z.z - nico.position.z)
                        if (dd < bestD) { best = id; bestD = dd }
                    }
                    if (best) return choose(best)
                    gsap.to(nico.position, { x: start.x, z: start.z, duration: 0.7, ease: 'power2.inOut' })
                    hotspots.add('nico', nico.hit, { label: 'Nico', index: 3, passive: true })
                },
            })
        })
    }
}

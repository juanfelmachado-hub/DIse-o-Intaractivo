/**
 * Juego 3, parte A — "Congelados en el pasillo".
 *
 * 1. Nico sale de debajo de la mesa. El niño arrastra los zapatos hasta Nico
 *    ("¡Clac!" al ponérselos).
 * 2. El niño arrastra a Nico por un camino lleno de destellos de vidrio hasta
 *    la puerta. Nico camina más rápido o más lento según la velocidad del dedo;
 *    si va muy rápido, Nico se tropieza (de forma graciosa) y el Guardián dice
 *    "¡Despacito!".
 * 3. Sorpresa a mitad de camino: una réplica. Las antenas del Guardián
 *    parpadean y el niño toca el botón de la tortuga para que Nico se agache y
 *    se cubra. Si tarda, el Guardián ayuda: "¡Tortuga, ahora!".
 */
import * as THREE from 'three'
import gsap from 'gsap'
import { Activity } from './Activity.js'
import { sparkle, glint } from '../animations/motions.js'
import { playSfx } from '../audio/sfx.js'

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const w = new THREE.Vector3()
const TOO_FAST = 1.9 // unidades del escenario por segundo

export class HallwayActivity extends Activity {
    constructor(...args) {
        super(...args)
        this.awardsStar = false // la estrella del juego 3 llega al terminar la parte B
    }

    begin() {
        this.scene.run('nico.crawlOut').then(() => { if (!this.disposed) this.stageShoes() })
    }

    // ------------------------------------------------------------ 1. zapatos
    stageShoes() {
        const { pointer, hotspots, ui, camera } = this.ctx
        const scene = this.scene
        const shoes = scene.shoes
        const nico = scene.nico
        const origin = shoes.position.clone()
        scene.run('shoes.glint')
        let placed = false
        const success = () => {
            if (placed) return
            placed = true
            pointer.remove(shoes)
            hotspots.remove('zapatos')
            const tl = gsap.timeline()
            tl.to(shoes.position, { x: nico.position.x, z: nico.position.z + 0.05, y: 0.15, duration: 0.4, ease: 'power2.out' })
            tl.to(shoes.scale, { x: 0.01, y: 0.01, z: 0.01, duration: 0.25, ease: 'back.in(2)' }, '-=0.1')
            tl.call(() => {
                shoes.visible = false
                nico.setShoes(true)
                scene.group.localToWorld(w.copy(nico.position).setY(0.25))
                ui.sfxAt(this.data.clac, w, camera)
                playSfx('clac')
                playSfx('acierto') // zapatos puestos
                sparkle(scene.group, nico.position.clone().setY(0.1), { color: '#ffd0c8', count: 8, radius: 0.3 })
            })
            tl.add(nico.hop())
            tl.call(() => {
                this.report(0.2)
                this.hint(this.data.shoesDone)
                this.after(0.6, () => this.stageWalk())
            })
        }
        hotspots.add('zapatos', shoes, { label: 'Zapatos', passive: true, onClick: success })
        pointer.addDraggable(shoes, {
            space: scene.group,
            onStart: () => {
                this.played()
                hotspots.remove('zapatos')
                gsap.to(shoes.position, { y: 0.18, duration: 0.2 })
            },
            onMove: (p) => {
                shoes.position.x = clamp(p.x, -2.9, 2.9)
                shoes.position.z = clamp(p.z, -1.9, 1.9)
            },
            onDrop: () => {
                const dist = Math.hypot(shoes.position.x - nico.position.x, shoes.position.z - nico.position.z)
                if (dist < 0.6) return success()
                gsap.to(shoes.position, { x: origin.x, y: 0, z: origin.z, duration: 0.6, ease: 'back.out(1.5)' })
                hotspots.add('zapatos', shoes, { label: 'Zapatos', passive: true, onClick: success })
            },
        })
    }

    // ------------------------------------------------------------ 2. camino con destellos
    stageWalk() {
        const scene = this.scene
        const nico = scene.nico
        this.mission(this.data.walk)
        scene.pathGlints.visible = true
        this.u = scene.nearestOnPath(nico.position)
        this.lastMove = 0
        this.enableWalk()
    }

    enableWalk() {
        const { pointer, hotspots } = this.ctx
        const scene = this.scene
        const nico = scene.nico
        let last = null
        // alternativa con teclado / toque: cada toque da un pasito
        hotspots.add('nico', nico.hit, {
            label: 'Nico: un paso', passive: true,
            onClick: () => this.stepTo(Math.min(1, this.u + 0.12), 0.45),
        })
        pointer.addDraggable(nico, {
            space: scene.group,
            onStart: () => {
                this.played()
                last = null
            },
            onMove: (p) => {
                const now = performance.now() / 1000
                if (last) {
                    const dt = Math.max(1 / 120, now - last.t)
                    const speed = Math.hypot(p.x - last.x, p.z - last.z) / dt
                    // dedo muy rápido: Nico se tropieza
                    const ahead = this.goal ? Math.hypot(p.x - this.goal.x, p.z - this.goal.y) : 0
                    if (speed > TOO_FAST && ahead > 0.25) return this.trip()
                }
                last = { x: p.x, z: p.z, t: now }
                const u = scene.nearestOnPath(p)
                this.stepTo(clamp(u, this.u - 0.08, this.u + 0.06), null)
            },
            onDrop: () => {},
        })
    }

    /**
     * Fija la meta de Nico en el camino (fracción u). El movimiento real lo hace
     * update(): sigue la meta con suavidad, sin saltos aunque el dedo dé tirones.
     */
    stepTo(u, duration) {
        const scene = this.scene
        const p = scene.pointOnPath(u)
        this.goal = this.goal ?? new THREE.Vector2()
        this.goal.set(p.x, p.z)
        this.lastMove = performance.now() / 1000
        // con toque/teclado (duration) el paso puede ser un poco más largo
        this.maxSpeed = duration ? 0.75 : 0.95
        this.u = u
        this.report(0.2 + 0.75 * u)
        if (!this.replicaDone && this.u >= 0.5) this.replica()
        else if (this.u >= 0.985) this.arrive()
    }

    /** Nico se detiene donde está (con suavidad). */
    stop() {
        const n = this.scene.nico
        this.goal = new THREE.Vector2(n.position.x, n.position.z)
    }

    update(dt) {
        const nico = this.scene.nico
        if (!this.goal || !dt) return
        // avanza hacia la meta con velocidad limitada y frenado suave
        const dx = this.goal.x - nico.position.x
        const dz = this.goal.y - nico.position.z
        const dist = Math.hypot(dx, dz)
        const step = Math.min(dist, (this.maxSpeed ?? 0.9) * dt, dist * Math.min(1, dt * 6))
        if (dist > 1e-4) {
            nico.position.x += (dx / dist) * step
            nico.position.z += (dz / dist) * step
            // mira hacia donde camina (giro suave por el lado más corto)
            if (dist > 0.01) {
                const yaw = Math.atan2(dx, dz)
                const d = Math.atan2(Math.sin(yaw - nico.rotation.y), Math.cos(yaw - nico.rotation.y))
                nico.rotation.y += d * Math.min(1, dt * 7)
            }
        }
        // camina mientras se desplaza, al ritmo real (se detiene con suavidad)
        const speed = step / dt
        this.speed = (this.speed ?? 0) + (speed - (this.speed ?? 0)) * Math.min(1, dt * 8)
        nico.walkSpeed = Math.max(0.3, this.speed)
        nico.walking = this.speed > 0.06 ? 1 : 0
    }

    /** Nico se tropieza de forma graciosa; el Guardián: "¡Despacito!". */
    trip() {
        const { pointer } = this.ctx
        const nico = this.scene.nico
        if (this.tripping) return
        this.tripping = true
        pointer.cancelDrag()
        this.stop()
        nico.face('o')
        const tl = gsap.timeline()
        tl.to(nico.p, { lean: 0.55, armRx: -1.4, armLx: -1.4, duration: 0.18, ease: 'power2.out' })
        tl.add(nico.hop(), 0.05)
        tl.to(nico.p, { lean: 0, armRx: 0.06, armLx: 0.06, duration: 0.6, ease: 'elastic.out(1, 0.45)' })
        tl.call(() => { nico.face('smile'); this.tripping = false })
        this.hint(this.data.tooFast)
        playSfx('pista')
    }

    // ------------------------------------------------------------ 3. réplica sorpresa
    replica() {
        const { pointer, hotspots, quake, ui } = this.ctx
        const scene = this.scene
        this.replicaDone = true
        pointer.cancelDrag()
        pointer.clear()
        hotspots.clear()
        this.stop()
        quake.to(0.28, 0.4)
        playSfx('temblor')
        // las antenas del Guardián parpadean
        scene.guardian?.pulse(3)
        this.mission(this.data.turtle)
        ui.showTurtle(true, () => this.turtle())
        this.turtleHint = this.after(3, () => this.hint(this.data.turtleHint))
    }

    turtle() {
        const { ui, quake } = this.ctx
        const nico = this.scene.nico
        if (this.turtled) return
        this.turtled = true
        this.played()
        this.turtleHint?.kill()
        ui.showTurtle(false)
        playSfx('acierto') // la tortuga a tiempo
        nico.pose('cover', 0.7)
        quake.to(0, 1.6)
        this.after(2, () => {
            nico.pose('idle', 0.9)
            this.mission(this.data.walk)
            this.after(0.9, () => this.enableWalk())
        })
    }

    // ------------------------------------------------------------ llegada
    arrive() {
        if (this.arrived) return
        this.arrived = true
        const { pointer, hotspots } = this.ctx
        const scene = this.scene
        pointer.cancelDrag()
        pointer.clear()
        hotspots.clear()
        scene.pathGlints.visible = false
        glint(scene.group, scene.pointOnPath(1).setY(0.1), { color: '#fff4c9', size: 1.2 })
        // termina de caminar hasta la puerta (update lo lleva) y luego se gira
        const end = scene.pointOnPath(1)
        this.goal = new THREE.Vector2(end.x, end.z)
        this.maxSpeed = 0.7
        const wait = Math.hypot(end.x - scene.nico.position.x, end.z - scene.nico.position.z) / 0.6 + 0.2
        this.after(wait, () => {
            this.stop()
            gsap.to(scene.nico.rotation, { y: Math.PI * 0.75, duration: 0.5 })
        })
        this.after(wait + 0.6, () => this.finish())
    }

    cleanup() {
        super.cleanup()
        if (this.scene.pathGlints) this.scene.pathGlints.visible = false
        if (this.scene.nico) this.scene.nico.walking = 0
    }
}

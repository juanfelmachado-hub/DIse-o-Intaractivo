/**
 * Juego 1 — "El radar del Guardián" (la sala).
 *
 * La sala se pone un poco oscura. El niño mueve el dedo (o el mouse) por la
 * escena y el radar late: mientras más cerca de un peligro, más rápido late y
 * más brillan las antenas del Guardián (frío y caliente).
 * Al tocar un peligro (lámpara, cuadro, estante o ventana) el objeto se
 * bambolea, dice "¡UY!", sale una estrella roja y queda un sticker en el pecho
 * del Guardián. Lo seguro (sofá, planta) responde con un "boing" o una risita.
 * Con los 4 peligros, la sala se enciende, la mesa brilla con un "¡TA-DÁ!" y
 * el niño arrastra a Nico debajo de la mesa.
 */
import * as THREE from 'three'
import gsap from 'gsap'
import { Activity } from './Activity.js'
import { sparkle, glint } from '../animations/motions.js'
import { starSprite } from '../models/kit.js'
import { playSfx } from '../audio/sfx.js'

const STICKERS = ['#ea5b4f', '#f08a45', '#5eaff2', '#cf94f2']
const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const w = new THREE.Vector3()

export class RadarActivity extends Activity {
    begin() {
        const { ui, pointer, hotspots, env } = this.ctx
        const scene = this.scene
        const d = this.data
        this.found = new Set()
        this.ptr = null
        this.ping = 0.6
        this.prox = 0
        // la sala se pone un poco oscura
        env.setMood('radar', 1.4)

        pointer.tracker = (ndc, e) => this.track(e)
        d.hazards.forEach((id, i) => {
            const obj = scene.hotspots[id]
            if (!obj) return
            pointer.addClickable(obj, () => this.tap(id))
            hotspots.add(id, scene.markers[id], { label: id, ghost: true, index: i, onClick: () => this.tap(id) })
        })
        const safe = { sofa: scene.hotspots.sofa, planta: scene.plant }
        for (const [id, obj] of Object.entries(safe)) {
            if (obj) pointer.addClickable(obj, () => this.safeTap(id, obj))
        }
        ui.el.radar.hidden = false
    }

    /** El radar sigue al dedo. */
    track(e) {
        const r = this.ctx.ui.el.canvas.getBoundingClientRect()
        this.ptr = { x: e.clientX - r.left, y: e.clientY - r.top }
        this.ctx.ui.el.radar.style.translate = `${this.ptr.x}px ${this.ptr.y}px`
        this.played()
    }

    update(dt) {
        if (!this.ptr || this.allFound || this.disposed) return
        const { ui, camera } = this.ctx
        const r = ui.el.canvas.getBoundingClientRect()
        const reach = Math.min(r.width, r.height) * 0.42
        let best = Infinity
        for (const id of this.data.hazards) {
            if (this.found.has(id)) continue
            const m = this.scene.markers[id]
            if (!m) continue
            const p = ui.toScene(m.getWorldPosition(w), camera)
            best = Math.min(best, Math.hypot(p.x - this.ptr.x, p.y - this.ptr.y))
        }
        const target = clamp(1 - best / reach, 0, 1)
        this.prox += (target - this.prox) * Math.min(1, dt * 6)
        // las antenas del Guardián brillan más cerca del peligro
        const g = this.scene.guardian
        if (g) g.glow = 0.6 + this.prox * 1.8
        this.ping -= dt
        if (this.ping <= 0) {
            const interval = 1.1 - this.prox * 0.92 // bip… bip… → bip-bip-bip-bip
            this.ping = interval
            const el = ui.el.radar
            el.style.setProperty('--ping', `${Math.max(0.25, interval * 0.9)}s`)
            el.classList.remove('is-ping')
            void el.offsetWidth
            el.classList.add('is-ping')
            playSfx('radar')
        }
    }

    tap(id) {
        if (this.found.has(id) || this.allFound) return
        this.played()
        const { ui, camera } = this.ctx
        const scene = this.scene
        this.found.add(id)
        scene.wobble(id)
        const m = scene.markers[id]
        m.getWorldPosition(w)
        ui.sfxAt(this.data.found, w, camera)
        playSfx('toque-objeto')
        // estrella roja
        const local = scene.localPos(m)
        const star = starSprite('#ea5b4f', 0.01)
        star.position.copy(local)
        scene.group.add(star)
        gsap.timeline()
            .to(star.scale, { x: 0.32, y: 0.32, duration: 0.35, ease: 'back.out(2)' })
            .to(star.position, { y: local.y + 0.45, duration: 0.9, ease: 'power2.out' }, 0)
            .to(star.material, { opacity: 0, duration: 0.4 }, 0.6)
            .call(() => { scene.group.remove(star); star.material.dispose() })
        sparkle(scene.group, local, { color: '#ffb3a8', count: 6, radius: 0.3 })
        // sticker en el pecho del Guardián
        scene.guardian?.addSticker(STICKERS[(this.found.size - 1) % STICKERS.length])
        this.ctx.hotspots.remove(id)
        this.ctx.pointer.remove(scene.hotspots[id])
        // los peligros son casi todo el juego; falta llevar a Nico a la mesa
        this.report(this.found.size / (this.data.hazards.length + 1))
        if (this.found.size === this.data.hazards.length) this.after(0.9, () => this.lightsOn())
    }

    /** Lo seguro responde con un "boing" o una risita y no pasa nada. */
    safeTap(id, obj) {
        this.played()
        const { ui, camera } = this.ctx
        obj.getWorldPosition(w)
        w.y += 0.6
        ui.sfxAt(this.data.safe[id], w, camera)
        playSfx('boing')
        const holder = obj.parent ?? obj
        gsap.timeline()
            .to(holder.scale, { y: 0.88, duration: 0.12, ease: 'power2.out' })
            .to(holder.scale, { y: 1, duration: 0.5, ease: 'elastic.out(1, 0.35)' })
    }

    /** Con los 4 peligros: la sala se enciende y la mesa brilla. */
    lightsOn() {
        const { ui, env, camera, pointer, hotspots } = this.ctx
        const scene = this.scene
        this.allFound = true
        pointer.tracker = null
        ui.el.radar.hidden = true
        env.setMood('rumble', 1.2)
        if (scene.guardian) gsap.to(scene.guardian, { glow: 0.8, duration: 0.8 })
        scene.run('table.glow')
        scene.markers.mesa.getWorldPosition(w)
        ui.sfxAt(this.data.tada, w, camera)
        pointer.clear()
        hotspots.clear()
        this.mission(this.data.refuge)
        this.after(0.6, () => this.dragNico())
    }

    /** El niño arrastra a Nico debajo de la mesa. */
    dragNico() {
        const { pointer, hotspots } = this.ctx
        const scene = this.scene
        const nico = scene.nico
        const start = nico.position.clone()
        const target = scene.anchors.tableFront
        const success = () => {
            if (this.done) return
            this.done = true
            pointer.clear()
            hotspots.clear()
            gsap.to(nico.p, { lift: 0, duration: 0.3, ease: 'power2.out' })
            nico.pose('idle', 0.3)
            scene.run('nico.hideUnderTable').then(() => {
                const p = scene.localPos(nico.heart)
                p.y += 0.5
                scene.group.localToWorld(w.copy(p))
                this.ctx.ui.sfxAt(this.data.win, w, this.ctx.camera)
                this.finish()
            })
        }
        hotspots.add('nico', nico.hit, { label: 'Nico', passive: true, onClick: success })
        pointer.addDraggable(nico, {
            space: scene.group,
            onStart: () => {
                this.played()
                hotspots.remove('nico')
                nico.pose('dangle', 0.3)
                gsap.to(nico.p, { lift: 0.2, duration: 0.25 })
            },
            onMove: (p) => {
                nico.position.x = clamp(p.x, -2.8, 2.8)
                nico.position.z = clamp(p.z, -1.0, 1.7)
            },
            onDrop: () => {
                const dd = Math.hypot(nico.position.x - target.x, nico.position.z - (target.z - 0.4))
                if (dd < 0.95) return success()
                gsap.to(nico.p, { lift: 0, duration: 0.4, ease: 'power2.out' })
                nico.pose('idle', 0.5)
                gsap.to(nico.position, { x: start.x, z: start.z, duration: 0.7, ease: 'power2.inOut' })
                this.hint(this.data.refugeHint)
                hotspots.add('nico', nico.hit, { label: 'Nico', passive: true, onClick: success })
            },
        })
    }

    cleanup() {
        super.cleanup()
        this.ctx.ui.el.radar.hidden = true
    }

    dispose() {
        super.dispose()
        if (!this.allFound) this.ctx.env.setMood('quake', 1)
    }
}

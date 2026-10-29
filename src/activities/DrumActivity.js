/**
 * Juego 2 — "El tambor de la tortuga" (debajo de la mesa, con el temblor fuerte).
 *
 * Sobre el caparazón de Nico late un círculo dorado: pum… pum… pum. El niño
 * lo toca al ritmo. Cada toque a tiempo cambia el color del escudo (arcoíris),
 * suena el tambor y los objetos suaves que caen rebotan lejos con "¡boing!".
 * Cada tres toques aparece una postura, en orden: ¡Agáchate!, ¡Cúbrete!,
 * ¡Sujétate! Después de 12 toques el temblor se calma, el ritmo se hace lento
 * y el Guardián dice "Ya pasó". Si un toque no va al ritmo, el ritmo lo espera
 * y el Guardián repite el pum para que lo siga (sin castigo).
 */
import * as THREE from 'three'
import gsap from 'gsap'
import { Activity } from './Activity.js'
import { sparkle, popWord } from '../animations/motions.js'
import { geo, mat, add } from '../models/kit.js'
import { palette } from '../data/theme.js'
import { playSfx } from '../audio/sfx.js'

const SOFT = [palette.pink, palette.lilac, palette.blue, palette.yellow, palette.mint, palette.orange]
const w = new THREE.Vector3()

/** Objetos suaves que caen: almohada, pelota o peluche. */
function softThing(i) {
    const g = new THREE.Group()
    const m = mat.clay(SOFT[i % SOFT.length], 0.9)
    const kind = i % 3
    if (kind === 0) add(g, geo.rbox(0.26, 0.09, 0.18, 0.04), m, [0, 0.045, 0])
    else if (kind === 1) add(g, geo.sphere(0.08, 16, 12), m, [0, 0.08, 0])
    else {
        add(g, geo.sphere(0.075, 14, 10), m, [0, 0.075, 0])
        for (const s of [-1, 1]) add(g, geo.sphere(0.03, 10, 8), m, [s * 0.05, 0.14, 0])
    }
    return g
}

export class DrumActivity extends Activity {
    begin() {
        const { ui, quake } = this.ctx
        const scene = this.scene
        const nico = scene.nico
        this.taps = 0
        this.interval = 0.9
        this.lastBeat = performance.now() / 1000
        this.falling = []
        this.spawned = 0
        this.missed = 0
        quake.to(0.45, 1)

        // punto sobre el caparazón (la espalda de Nico agachado)
        this.shell = new THREE.Object3D()
        nico.attach('chest', this.shell, [0, 0.5, -0.04])
        ui.drumTarget = this.shell
        const drum = ui.el.drum
        drum.style.setProperty('--shield', palette.yellow)
        drum.hidden = false
        drum.onclick = () => this.tap()
        this.beat()
    }

    beat() {
        if (this.disposed || this.done) return
        const drum = this.ctx.ui.el.drum
        this.lastBeat = performance.now() / 1000
        drum.classList.remove('is-beat')
        void drum.offsetWidth
        drum.classList.add('is-beat')
        playSfx('latido')
        if (this.spawned % 2 === 0 && this.falling.length < 3) this.drop()
        this.spawned++
        this.beatCall = this.after(this.interval, () => this.beat())
    }

    /** Cae un objeto suave cerca de la mesa. */
    drop() {
        const scene = this.scene
        const n = scene.nico.position
        const i = this.spawned / 2
        const obj = softThing(i)
        const side = i % 2 ? 1 : -1
        const x = n.x + side * (0.55 + (i % 3) * 0.15)
        const z = n.z + 0.55 + (i % 2) * 0.2
        obj.position.set(x, 1.6, z)
        obj.rotation.set(i, i * 0.7, 0)
        scene.group.add(obj)
        gsap.to(obj.position, { y: 0, duration: 0.7, ease: 'bounce.out' })
        gsap.to(obj.rotation, { x: 0, z: 0, duration: 0.7 })
        playSfx('objeto-cae')
        this.falling.push(obj)
    }

    /** Toque al círculo. */
    tap() {
        if (this.done || this.disposed) return
        this.played()
        const now = performance.now() / 1000
        const since = now - this.lastBeat
        const off = Math.min(since, Math.abs(this.interval - since))
        if (off > this.interval * 0.38) return this.miss()
        this.missed = 0
        this.taps++
        this.report(this.taps / this.data.taps)
        const { ui, camera } = this.ctx
        const scene = this.scene
        // el escudo cambia de color como un arcoíris
        const hue = (this.taps * 32) % 360
        ui.el.drum.style.setProperty('--shield', `hsl(${hue} 85% 62%)`)
        this.shell.getWorldPosition(w)
        w.y += 0.25
        ui.sfxAt('¡Pum!', w, camera)
        playSfx('tambor')
        // un objeto rebota lejos del escudo
        const obj = this.falling.shift()
        if (obj) {
            const dir = obj.position.x < scene.nico.position.x ? -1 : 1
            gsap.timeline()
                .to(obj.position, { x: obj.position.x + dir * 1.2, y: 0.9, z: obj.position.z + 0.6, duration: 0.45, ease: 'power2.out' })
                .to(obj.scale, { x: 0.01, y: 0.01, z: 0.01, duration: 0.3, ease: 'power2.in' }, 0.2)
                .call(() => scene.group.remove(obj))
            obj.getWorldPosition(w)
            w.y += 0.3
            ui.sfxAt('¡Boing!', w, camera)
            playSfx('boing')
        }
        // cada tres toques, una postura
        const posture = this.data.postures.find((p) => p.every === this.taps)
        if (posture) {
            playSfx('acierto') // logró la postura
            scene.nico.pose(posture.pose, 0.8)
            scene.guardian?.mimic(posture.pose) // el Guardián hace la misma postura
            ui.setMission({ icon: posture.icon, text: posture.text, short: posture.text }, { delay: 0 })
            ui.playing(true)
            sparkle(scene.group, scene.nico.position.clone().setY(0.7), { color: '#fff6c2', count: 8, radius: 0.4 })
        }
        if (this.taps >= this.data.taps) this.calm()
    }

    /** El ritmo espera y el Guardián repite el pum para que lo siga. */
    miss() {
        this.missed++
        this.beatCall?.kill()
        this.beatCall = this.after(this.interval * 0.6, () => this.beat())
        if (this.missed === 1 || this.missed % 3 === 0) {
            this.hint(this.data.guide)
            const p = this.scene.localPos(this.shell)
            p.y += 0.35
            popWord(this.scene.group, 'pum', p)
        }
    }

    /** Después de 12 toques: el temblor se calma poco a poco. */
    calm() {
        const { quake } = this.ctx
        this.done = true
        this.beatCall?.kill()
        quake.to(0.15, 3)
        this.hint(this.data.calm)
        this.after(2, () => this.scene.guardian?.mimic(null))
        // el ritmo se hace cada vez más lento
        const slow = [1.2, 1.6, 2.1]
        let t = 0
        slow.forEach((s) => {
            t += s
            this.after(t, () => {
                const drum = this.ctx.ui.el.drum
                drum.classList.remove('is-beat')
                void drum.offsetWidth
                drum.classList.add('is-beat')
            })
        })
        sparkle(this.scene.group, this.scene.nico.position.clone().setY(0.8), { color: '#fff6c2', count: 14, radius: 0.7 })
        this.after(t + 0.4, () => this.finish())
    }

    cleanup() {
        super.cleanup()
        const { ui } = this.ctx
        ui.el.drum.hidden = true
        ui.el.drum.onclick = null
        ui.drumTarget = null
        for (const o of this.falling ?? []) this.scene.group.remove(o)
        this.scene.guardian?.mimic(null)
        this.falling = []
    }
}

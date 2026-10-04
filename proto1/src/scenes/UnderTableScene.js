/**
 * Escenario 2 — Debajo de la mesa (páginas 6 a 9 y actividad
 * "Agáchate, cúbrete y sujétate"). Composición cercana: la mesa grande ocupa
 * el centro como un refugio y Nico queda protegido debajo.
 */
import * as THREE from 'three'
import gsap from 'gsap'
import { BaseScene } from './BaseScene.js'
import { geo, mat, add } from '../models/kit.js'
import { palette } from '../data/theme.js'
import {
    createTable, createSofa, createShelf, createWindow, createFrame, createLamp,
    createCounter, createBlock, createShards, towerColors,
} from '../models/objects/furniture.js'
import { sparkle, glint, popWord } from '../animations/motions.js'

export class UnderTableScene extends BaseScene {
    build() {
        const s = this.setup

        const wall = this.backdrop(5.75, 1.85, -1.75, '#ffe3c8')

        const win = createWindow()
        win.rotation.z = 0.06
        this.windowHolder = wall.attach(this.holder(win), 1.75, 1.08, 0.06)
        this.windowBaseX = this.windowHolder.position.x
        this.hotspot('ventana', win, new THREE.Vector3(0, 0, 0.1))

        const frame = createFrame()
        frame.rotation.z = -0.22
        this.frameHolder = wall.attach(this.holder(frame), -1.05, 1.2, 0.05)
        this.hotspot('cuadro', frame, new THREE.Vector3(0, 0, 0.1))

        const lamp = createLamp({ cord: 0.32 })
        const lampRig = new THREE.Group()
        add(lampRig, geo.rbox(0.12, 0.06, 1.25, 0.02), mat.clay(palette.woodDark), [0, 0, 0.62])
        this.lampHolder = this.holder(lamp, 0, -0.03, 1.15)
        lampRig.add(this.lampHolder)
        wall.attach(lampRig, 0.08, 1.83, 0.03)
        this.piece(lampRig, 'front', 0.05, { parent: wall.pieceOf(0.08), pivot: lampRig.position.clone() })
        this.hotspot('lampara', lamp, new THREE.Vector3(0, -0.45, 0))
        this.lampAmp = 0.3

        const shelf = createShelf()
        shelf.rotation.z = 0.05
        this.shelfHolder = this.holder(shelf, -2.45, 0, -1.4)
        this.piece(this.shelfHolder, 'grow', 0.2)
        this.hotspot('estante', shelf, new THREE.Vector3(0, 1.0, 0.2))

        this.counter = createCounter()
        this.counter.position.set(-1.55, 0, -1.45)
        this.piece(this.counter, 'grow', 0.25)

        const sofa = createSofa()
        sofa.position.set(2.25, 0, 0.15)
        sofa.rotation.y = -0.55
        this.piece(sofa, 'grow', 0.3)

        // la mesa-refugio
        this.table = createTable({ w: 2.0, d: 1.25, h: 1.06 })
        this.tableHolder = this.holder(this.table, 0, 0, -0.3)
        this.piece(this.tableHolder, 'grow', 0.35)

        // bloques regados
        const spots = [[-1.9, 0.75, 0.4], [-1.45, 1.2, 1.1], [-2.35, 0.25, 2.0], [1.35, 1.15, 0.7], [1.95, 1.05, 2.4], [-0.95, 1.45, 0.2]]
        towerColors(6).forEach((c, i) => {
            const b = createBlock(c, 0.17)
            const [x, z, r] = spots[i]
            b.position.set(x, 0.085, z)
            b.rotation.set(i % 2 ? Math.PI / 2 : 0, r, 0)
            this.piece(b, 'pop', 0.4)
        })

        if (s.shards) {
            this.shards = createShards(9, 5)
            this.shards.position.set(1.55, 0, -0.95)
            this.piece(this.shards, 'pop', 0.5)
        }

        // personajes
        const nico = this.addNico(-0.6, -0.05, { face: 0.12, pose: s.nicoPose ?? 'crouch' })
        nico.face(s.face ?? 'smile')
        this.guardianOffset.set(0.55, 0.62, 0.1)
        this.addGuardian(true)

        this.soundSpots = {
            clin: new THREE.Vector3(-1.55, 1.05, -1.3),
            clan: new THREE.Vector3(0.1, 1.55, -0.55),
            crac: new THREE.Vector3(1.8, 1.45, -1.55),
        }

        this.actions = {
            sounds: () => this.sounds(),
            heartbeat: () => this.heartbeat(),
            'guardian.hug': () => this.hug(),
            silence: () => this.silence(),
            'nico.peek': () => this.peek(),
            'shards.glint': () => this.shardsGlint(),
        }
    }

    sounds() {
        const tl = gsap.timeline()
        const words = [['clin', 'clin', palette.blue], ['clan', 'clan', palette.orange], ['crac', 'crac', palette.red]]
        words.forEach(([w, spot, color], i) => {
            tl.add(popWord(this.group, w, this.soundSpots[spot], { color, size: 0.75 }), i * 0.65)
        })
        tl.call(() => { this.lampAmp = 1 }, null, 0.65)
        tl.add(this.wobble('cuadro'), 1.3)
        tl.add(this.wobble('ventana'), 1.3)
        return tl
    }

    heartbeat() {
        const tl = gsap.timeline()
        tl.add(this.nico.heartbeat(3), 0)
        for (let i = 0; i < 3; i++) {
            tl.call(() => {
                const p = this.localPos(this.nico.heart)
                p.x += -0.35 + i * 0.35
                p.y += 0.55 + i * 0.05
                popWord(this.group, 'pum', p, { color: palette.red, size: 0.5, rise: 0.3, hold: 0.5 })
            }, null, i * 0.64)
        }
        tl.to({}, { duration: 0.6 })
        return tl
    }

    hug() {
        const g = this.guardian
        const tl = gsap.timeline()
        this.guardianPinned = true
        tl.add(g.moveTo(new THREE.Vector3(this.nico.position.x + 0.32, 0.55, this.nico.position.z + 0.3), 0.8), 0)
        tl.add(g.pulse(2), 0.5)
        tl.to(this.nico, { heartGlow: 0.6, duration: 0.6, yoyo: true, repeat: 1 }, 0.6)
        tl.call(() => { this.guardianPinned = false }, null, 2.4)
        return tl
    }

    silence() {
        const tl = gsap.timeline()
        tl.to(this, { lampAmp: 0, duration: 2.2, ease: 'power2.out' }, 0)
        tl.add(this.nico.pose('kneel', 1.2, 'sine.inOut'), 0.6)
        tl.add(this.guardian.pulse(1), 1.0)
        return tl
    }

    peek() {
        const tl = gsap.timeline()
        tl.add(this.nico.pose('peek', 0.9, 'power2.out'))
        tl.add(this.nico.hop(), 0.2)
        return tl
    }

    shardsGlint() {
        if (!this.shards) return
        const tl = gsap.timeline()
        const p = this.shards.position.clone().setY(0.1)
        tl.add(glint(this.group, p, { color: '#dff4ff', size: 1.1 }), 0)
        tl.add(sparkle(this.group, p, { color: '#dff4ff', count: 8, radius: 0.4 }), 0.1)
        tl.add(this.guardian.moveTo(new THREE.Vector3(p.x - 0.3, 0.7, p.z + 0.4), 0.9), 0)
        tl.call(() => { this.guardianPinned = true }, null, 0)
        tl.add(this.guardian.moveTo(new THREE.Vector3(this.nico.position.x + 0.55, 0.62, this.nico.position.z + 0.1), 1), 2.2)
        tl.call(() => { this.guardianPinned = false }, null, 3.2)
        return tl
    }

    /** El aire que mueve la hoja al pasar hace balancear la lámpara. */
    onWind(w) {
        this.lampAmp = Math.max(this.lampAmp, Math.min(0.6, w * 0.35))
    }

    tick(dt, t, quake) {
        const q = quake.intensity
        const target = q * 0.9
        this.lampAmp += (target - this.lampAmp) * Math.min(1, dt * (target > this.lampAmp ? 3 : 0.5))
        this.lampHolder.rotation.z = Math.sin(t * 2.7) * this.lampAmp * 0.4
        this.lampHolder.rotation.x = Math.cos(t * 2.1) * this.lampAmp * 0.12
        this.shelfHolder.rotation.z = quake.shake.x * 0.035
        this.frameHolder.rotation.z = quake.shake.z * 0.1
        this.windowHolder.position.x = this.windowBaseX + quake.shake.x * 0.012
        this.tableHolder.rotation.y = quake.shake.z * 0.01
        if (q > 0.05) {
            this.counter.userData.glasses.forEach((g, i) => {
                g.position.y = 0.675 + Math.max(0, Math.sin(t * 34 + i * 1.7)) * 0.012 * q
            })
        }
    }
}

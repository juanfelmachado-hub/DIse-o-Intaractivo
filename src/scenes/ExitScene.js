/**
 * Página 2 — El pasillo (Guía visual §11.2: desde "¿Ya puedo salir?" hasta que
 * Nico llega a la puerta de la casa). La sala quedó desordenada: bloques
 * regados, vidrios en el piso y los zapatos de Nico.
 * Juego 3, parte A: "Congelados en el pasillo" (camino con destellos de vidrio).
 */
import * as THREE from 'three'
import gsap from 'gsap'
import { BaseScene } from './BaseScene.js'
import { geo, mat, add } from '../models/kit.js'
import { palette } from '../data/theme.js'
import {
    createTable, createShelf, createWindow, createFrame, createLamp, createDoor,
    createBlock, createShards, createShoes, towerColors,
} from '../models/objects/furniture.js'
import { sparkle, glint, bounce } from '../animations/motions.js'
import { glowSprite } from '../models/kit.js'

export class ExitScene extends BaseScene {
    build() {
        const wall = this.backdrop(5.75, 1.85, -1.75, '#ffe3c8')

        const win = createWindow()
        win.userData.glass.material = mat.glass('#cfeaff', 0.35)
        win.rotation.z = 0.05
        wall.attach(win, 1.15, 1.08, 0.06)

        const frame = createFrame()
        frame.rotation.z = -0.25
        wall.attach(frame, 0.15, 1.2, 0.05)

        this.door = wall.attach(createDoor(), 2.35, 0, 0.05)

        const lamp = createLamp({ cord: 0.4 })
        const lampRig = new THREE.Group()
        add(lampRig, geo.rbox(0.12, 0.06, 1.3, 0.02), mat.clay(palette.woodDark), [0, 0, 0.65])
        lamp.position.set(0, -0.03, 1.22)
        lampRig.add(lamp)
        this.lamp = lamp
        wall.attach(lampRig, -0.9, 1.83, 0.03)
        this.piece(lampRig, 'front', 0.05, { parent: wall.pieceOf(-0.9), pivot: lampRig.position.clone() })

        const shelf = createShelf()
        shelf.rotation.z = 0.07
        shelf.position.set(-2.45, 0, -1.4)
        this.piece(shelf, 'grow', 0.2)

        // la misma mesa de la sala (un poco más alta): Nico cabe debajo agachado
        this.table = createTable({ h: 0.92 })
        this.table.position.set(-0.9, 0, -0.6)
        this.piece(this.table, 'grow', 0.3)

        const spots = [[-2.1, 0.6], [-1.7, 1.25], [0.4, 1.15], [0.95, 0.85], [-2.4, 0.15], [1.5, 1.3]]
        this.blocks = towerColors(6).map((c, i) => {
            const b = createBlock(c, 0.17)
            b.position.set(spots[i][0], 0.085, spots[i][1])
            b.rotation.set(i % 2 ? Math.PI / 2 : 0, i, 0)
            this.piece(b, 'pop', 0.4)
            return b
        })

        this.shards = createShards(10, 9)
        this.shards.position.set(1.2, 0, -0.95)
        this.piece(this.shards, 'pop', 0.45)

        this.shoes = createShoes()
        this.shoes.position.set(0.15, 0, 0.6)
        this.shoes.rotation.y = -0.3
        this.piece(this.shoes, 'pop', 0.5)

        // Nico sigue agachado debajo de la mesa (o ya salió: setup.nico = 'out')
        if (this.setup.nico === 'out') this.addNico(-0.75, 0.45, { face: 0, pose: 'idle' })
        else this.addNico(-0.9, -0.55, { face: 0, pose: 'kneel' })
        this.guardianOffset.set(0.45, 0.75, 0.25)
        this.addGuardian(true)

        this.anchors = {
            out: new THREE.Vector3(-0.75, 0, 0.45),
            shoes: new THREE.Vector3(0.15, 0, 0.32),
            door: new THREE.Vector3(2.35, 0, -1.2),
        }

        // juego 3A: camino con destellos de vidrio desde la mesa hasta la puerta
        this.path = [[-0.75, 0.45], [-0.1, 0.5], [0.55, 0.3], [1.15, -0.05], [1.7, -0.4], [2.25, -0.65]].map(([x, z]) => new THREE.Vector3(x, 0, z))
        this.pathGlints = new THREE.Group()
        this.pathGlints.visible = false
        for (let i = 0; i < 16; i++) {
            const s = glowSprite('#dff4ff', 0.12, 0.9)
            const p = this.pointOnPath((i + 0.5) / 16)
            s.position.set(p.x + Math.sin(i * 2.3) * 0.22, 0.03, p.z + Math.cos(i * 1.7) * 0.2)
            s.userData.phase = i * 1.3
            this.pathGlints.add(s)
        }
        this.group.add(this.pathGlints)

        // aparición por unidades, de atrás hacia adelante (Guía visual §11)
        this.revealOrder = [
            [wall.L, wall.R],             // paredes con ventana, cuadro, puerta y lámpara
            [shelf],                      // estante
            [this.table],                 // la mesa
            [...this.blocks, this.shards], // bloques regados y vidrios
            [this.shoes],                 // los zapatos
            [this.nico],                  // Nico (y el Guardián) al final
        ]

        this.actions = {
            'nico.crawlOut': () => this.crawlOut(),
            'shoes.glint': () => this.shoesGlint(),
            'shards.glint': () => this.shardsGlint(),
            'nico.shoesOn': () => this.shoesOn(),
            'door.open': () => this.openDoor(),
            'nico.peek': () => this.peek(),
        }
    }

    /** Longitud del camino y punto a una fracción u (0…1). */
    get pathLength() {
        let L = 0
        for (let i = 1; i < this.path.length; i++) L += this.path[i].distanceTo(this.path[i - 1])
        return L
    }

    pointOnPath(u, out = new THREE.Vector3()) {
        let d = Math.max(0, Math.min(1, u)) * this.pathLength
        for (let i = 1; i < this.path.length; i++) {
            const seg = this.path[i].distanceTo(this.path[i - 1])
            if (d <= seg || i === this.path.length - 1) return out.lerpVectors(this.path[i - 1], this.path[i], Math.min(1, d / seg))
            d -= seg
        }
        return out.copy(this.path[this.path.length - 1])
    }

    /** Fracción del camino más cercana a un punto (x, z). */
    nearestOnPath(p) {
        const L = this.pathLength
        let best = 0
        let bestD = Infinity
        let acc = 0
        const tmp = new THREE.Vector3()
        for (let i = 1; i < this.path.length; i++) {
            const a = this.path[i - 1]
            const b = this.path[i]
            const seg = a.distanceTo(b)
            const t = Math.max(0, Math.min(1, ((p.x - a.x) * (b.x - a.x) + (p.z - a.z) * (b.z - a.z)) / (seg * seg)))
            tmp.lerpVectors(a, b, t)
            const d = Math.hypot(p.x - tmp.x, p.z - tmp.z)
            if (d < bestD) { bestD = d; best = (acc + t * seg) / L }
            acc += seg
        }
        return best
    }

    /** "¿Ya puedo salir?": Nico se asoma desde debajo de la mesa. */
    peek() {
        const tl = gsap.timeline()
        // sin saltito: está debajo de la mesa (la cabeza tocaría el tablero)
        tl.add(this.nico.pose('peek', 0.9, 'power2.out'))
        return tl
    }

    crawlOut() {
        const n = this.nico
        const a = this.anchors.out
        const tl = gsap.timeline()
        tl.add(n.pose('crouch', 0.5))
        tl.add(n.walkTo(a.x, a.z, { speed: 0.32 }))
        tl.add(gsap.to(n.rotation, { y: 0, duration: 0.4 }))
        tl.add(n.pose('idle', 0.9, 'back.out(1.2)'))
        tl.add(n.hop())
        return tl
    }

    shoesGlint() {
        const p = this.shoes.position.clone().setY(0.15)
        return gsap.timeline()
            .add(glint(this.group, p, { color: '#ffe0d8', size: 0.8 }), 0)
            .add(bounce(this.shoes, 0.1), 0.1)
    }

    shardsGlint() {
        const p = this.shards.position.clone().setY(0.1)
        return gsap.timeline()
            .add(glint(this.group, p, { color: '#dff4ff', size: 1.0 }), 0.3)
            .add(sparkle(this.group, p, { color: '#dff4ff', count: 7, radius: 0.4 }), 0.4)
    }

    shoesOn() {
        const n = this.nico
        const s = this.shoes
        const a = this.anchors.shoes
        const tl = gsap.timeline()
        tl.add(n.walkTo(a.x, a.z, { speed: 0.45 }))
        tl.add(gsap.to(n.rotation, { y: 0, duration: 0.3 }))
        tl.to(s.position, { x: n.position.x, z: a.z, y: 0.25, duration: 0.45, ease: 'power2.out' })
        tl.to(s.scale, { x: 0.01, y: 0.01, z: 0.01, duration: 0.3, ease: 'back.in(2)' }, '-=0.15')
        tl.call(() => { n.setShoes(true); s.visible = false })
        tl.call(() => sparkle(this.group, new THREE.Vector3(a.x, 0.1, a.z + 0.05), { color: '#ffd0c8', count: 6, radius: 0.25 }))
        tl.add(n.hop())
        return tl
    }

    openDoor() {
        const n = this.nico
        const a = this.anchors.door
        const tl = gsap.timeline()
        tl.add(n.walkTo(a.x - 0.1, a.z + 0.55, { speed: 0.45 }))
        tl.to(this.door.userData.hinge.rotation, { y: -1.7, duration: 1.0, ease: 'power2.inOut' })
        tl.add(glint(this.group, new THREE.Vector3(a.x, 0.6, -1.65), { color: '#fff4c9', size: 1.8 }), '-=0.4')
        tl.add(gsap.to(n.rotation, { y: Math.PI, duration: 0.5 }), '-=0.5')
        return tl
    }

    /** Los destellos de vidrio del camino titilan suavemente. */
    tick(dt, t) {
        if (!this.pathGlints.visible) return
        for (const g of this.pathGlints.children) {
            const k = 0.5 + 0.5 * Math.sin(t * 2.4 + g.userData.phase)
            g.material.opacity = 0.35 + k * 0.6
            g.scale.setScalar(0.08 + k * 0.1)
        }
    }
}

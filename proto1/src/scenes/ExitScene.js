/**
 * Escenario 3 — Después del temblor (página 10). La sala quedó desordenada:
 * bloques regados, vidrios en el piso junto a la ventana y los zapatos de Nico.
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

        this.table = createTable()
        this.table.position.set(-0.9, 0, -0.6)
        this.piece(this.table, 'grow', 0.3)

        const spots = [[-2.1, 0.6], [-1.7, 1.25], [0.4, 1.15], [0.95, 0.4], [-2.4, 0.15], [1.5, 1.3]]
        towerColors(6).forEach((c, i) => {
            const b = createBlock(c, 0.17)
            b.position.set(spots[i][0], 0.085, spots[i][1])
            b.rotation.set(i % 2 ? Math.PI / 2 : 0, i, 0)
            this.piece(b, 'pop', 0.4)
        })

        this.shards = createShards(10, 9)
        this.shards.position.set(1.2, 0, -0.95)
        this.piece(this.shards, 'pop', 0.45)

        this.shoes = createShoes()
        this.shoes.position.set(0.15, 0, 0.6)
        this.shoes.rotation.y = -0.3
        this.piece(this.shoes, 'pop', 0.5)

        // Nico sigue agachado debajo de la mesa
        this.addNico(-0.9, -0.55, { face: 0, pose: 'kneel' })
        this.guardianOffset.set(0.45, 0.75, 0.25)
        this.addGuardian(true)

        this.anchors = {
            out: new THREE.Vector3(-0.75, 0, 0.45),
            shoes: new THREE.Vector3(0.15, 0, 0.32),
            door: new THREE.Vector3(2.35, 0, -1.2),
        }

        this.actions = {
            'nico.crawlOut': () => this.crawlOut(),
            'shoes.glint': () => this.shoesGlint(),
            'shards.glint': () => this.shardsGlint(),
            'nico.shoesOn': () => this.shoesOn(),
            'door.open': () => this.openDoor(),
        }
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
}

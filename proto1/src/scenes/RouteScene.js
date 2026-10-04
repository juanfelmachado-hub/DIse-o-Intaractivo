/**
 * Escenario de la actividad 3 — "Camino al lugar seguro".
 * Hoja izquierda: el interior de la casa (mesa, zapatos, pasillo con huellas).
 * Hoja derecha: el patio con tres opciones (poste con cables, pared alta y el
 * centro abierto). La lógica de la actividad está en activities/SafeRouteActivity.js.
 */
import * as THREE from 'three'
import { BaseScene } from './BaseScene.js'
import { geo, mat, add } from '../models/kit.js'
import { palette } from '../data/theme.js'
import { createTable, createWindow, createWall, createShoes, createDoor, createBlock } from '../models/objects/furniture.js'
import { createPole, createCable, createTallWall, createPaperTree, createBush, createFlower, createRing, createFootprint } from '../models/objects/outdoor.js'

export class RouteScene extends BaseScene {
    build() {
        // ---- interior (hoja izquierda)
        const wall = createWall(2.75, 1.6, '#ffe3c8')
        wall.position.set(-1.6, 0, -1.72)
        this.piece(wall, 'front', 0)
        const win = createWindow({ w: 0.75, h: 0.6 })
        win.position.set(-0.55, 0.95, 0.06)
        wall.add(win)

        const table = createTable({ w: 1.2, d: 0.75, h: 0.72 })
        table.position.set(-2.2, 0, -0.85)
        this.piece(table, 'grow', 0.2)

        const b1 = createBlock(palette.yellow)
        b1.position.set(-2.55, 0.085, 0.95)
        b1.rotation.y = 0.6
        this.piece(b1, 'pop', 0.3)

        // puerta abierta hacia el patio (en el lomo)
        const door = createDoor({ w: 0.6, h: 1.1 })
        door.position.set(-0.05, 0, -1.25)
        door.userData.hinge.rotation.y = -1.5
        this.piece(door, 'front', 0.15)
        const doormat = add(this.group, geo.rbox(0.62, 0.02, 0.4, 0.01), mat.clay(palette.lilac, 0.9), [-0.05, 0.01, 0.25], { cast: false })
        this.piece(doormat, 'none')

        this.shoes = createShoes()
        this.shoes.position.set(-1.25, 0, 1.15)
        this.shoes.rotation.y = 0.4
        this.piece(this.shoes, 'pop', 0.5)

        // huellas del pasillo (se muestran en la parada 2)
        this.footprints = [[-1.55, 0.2], [-1.15, 0.38], [-0.75, 0.22], [-0.35, 0.36], [0.05, 0.25]].map(([x, z], i) => {
            const f = createFootprint()
            f.position.set(x, 0, z)
            f.rotation.y = -Math.PI / 2 + (i % 2 ? 0.15 : -0.15)
            f.visible = false
            this.piece(f, 'none')
            return f
        })

        // ---- patio (hoja derecha)
        this.wall = createTallWall({ w: 1.7, h: 1.4 })
        this.wallHolder = this.holder(this.wall, 1.5, 0, -1.62)
        this.piece(this.wallHolder, 'front', 0.1)

        this.pole = createPole({ h: 1.9 })
        this.poleHolder = this.holder(this.pole, 2.62, 0, 1.05)
        this.piece(this.poleHolder, 'back', 0.05)
        const top = this.pole.userData.top.clone().add(this.poleHolder.position)
        // los cables viajan con el poste (mismo pivote y mismo ángulo)
        const polePiece = this.poleHolder.userData.piece
        const c1 = createCable(top.clone().add(new THREE.Vector3(-0.22, 0, 0)), new THREE.Vector3(2.3, 1.42, -1.62), 0.3)
        const c2 = createCable(top.clone().add(new THREE.Vector3(0.22, 0, 0)), new THREE.Vector3(3.0, 1.6, -1.9), 0.25)
        this.piece(c1, 'back', 0, { follow: polePiece, pivot: this.poleHolder.position.clone() })
        this.piece(c2, 'back', 0, { follow: polePiece, pivot: this.poleHolder.position.clone() })

        const tree = createPaperTree({ s: 1.0 })
        tree.position.set(2.55, 0, -0.55)
        this.piece(tree, 'front', 0.35)
        for (const [x, z, c] of [[0.55, -1.25, palette.green], [2.85, 0.15, '#7cc96b']]) {
            const b = createBush(c)
            b.position.set(x, 0, z)
            this.piece(b, 'pop', 0.5)
        }
        for (const [x, z, c] of [[0.6, 1.4, palette.red], [0.8, 1.6, palette.yellow], [2.0, 1.55, palette.lilac], [1.0, -0.65, palette.orange]]) {
            const f = createFlower(c)
            f.position.set(x, 0, z)
            this.piece(f, 'pop', 0.6)
        }

        // zonas para elegir (parada 3)
        this.zones = {
            centro: new THREE.Vector3(1.5, 0, 0.3),
            poste: new THREE.Vector3(2.38, 0, 0.85),
            pared: new THREE.Vector3(1.5, 0, -1.08),
        }
        this.zoneRings = {}
        for (const [id, p] of Object.entries(this.zones)) {
            const ring = createRing(0.34, '#ffffff', 0.9)
            ring.position.x = p.x
            ring.position.z = p.z
            ring.visible = false
            this.piece(ring, 'none')
            this.zoneRings[id] = ring
            const m = new THREE.Object3D()
            m.position.set(p.x, 0.15, p.z)
            this.group.add(m)
            this.markers[id] = m
        }
        this.hotspots.poste = this.pole
        this.hotspots.pared = this.wall
        this.wobbleCfg = {
            poste: { axis: 'z', amount: 0.08, times: 4 },
            pared: { axis: 'x', amount: 0.05, times: 4 },
        }

        this.patioStart = new THREE.Vector3(0.55, 0, 0.28)

        // Nico sin zapatos, junto a la mesa
        const nico = this.addNico(-2.05, 0.3, { face: 0.3, pose: 'idle' })
        nico.setShoes(false)
        this.guardianOffset.set(0.4, 0.9, 0.15)
        this.addGuardian(true)
    }

    tick(dt, t, quake) {
        // anillos de zona respiran suavemente
        const s = 1 + Math.sin(t * 3) * 0.05
        for (const r of Object.values(this.zoneRings)) if (r.visible) r.scale.setScalar(s)
    }
}

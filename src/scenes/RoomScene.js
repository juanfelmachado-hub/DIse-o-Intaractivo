/**
 * Escenario 1 — La sala de Nico (páginas 1 a 5 y actividad "¿Dónde me protejo?").
 * Contiene todos los objetos que pide el instructivo: mesa fuerte, ventana
 * grande, lámpara colgante, estante con libros, cuadro y sofá.
 */
import * as THREE from 'three'
import gsap from 'gsap'
import { BaseScene } from './BaseScene.js'
import { geo, mat, add } from '../models/kit.js'
import { palette } from '../data/theme.js'
import {
    createTable, createSofa, createShelf, createWindow, createFrame, createLamp,
    createCounter, createDoor, createBlock, towerColors,
} from '../models/objects/furniture.js'
import { sparkle, glint, bounce } from '../animations/motions.js'

const BLOCK = 0.17
// posiciones de los bloques caídos (relativas a la torre)
const SCATTER = [[-0.55, 0.15], [-0.3, -0.5], [0.45, 0.6], [-0.75, -0.2], [0.2, -0.55], [-0.35, 0.65]]

export class RoomScene extends BaseScene {
    build() {
        const s = this.setup

        // ---- telón del fondo: dos paneles en V con ventana, cuadro, puerta y lámpara
        const wall = this.backdrop(5.75, 1.85, -1.72, '#ffe3c8')

        const win = createWindow()
        this.windowHolder = wall.attach(this.holder(win), 1.42, 1.08, 0.06)
        this.windowBaseX = this.windowHolder.position.x
        this.hotspot('ventana', win, new THREE.Vector3(0, 0, 0.1))

        const frame = createFrame()
        this.frameHolder = wall.attach(this.holder(frame), -0.55, 1.22, 0.05)
        this.hotspot('cuadro', frame, new THREE.Vector3(0, 0, 0.1))

        this.door = wall.attach(createDoor(), 2.45, 0, 0.05)

        // brazo de la lámpara: pieza secundaria que se despliega desde la pared
        const lamp = createLamp({ cord: 0.45 })
        const lampRig = new THREE.Group()
        add(lampRig, geo.rbox(0.12, 0.06, 1.4, 0.02), mat.clay(palette.woodDark), [0, 0, 0.7])
        this.lampHolder = this.holder(lamp, 0, -0.03, 1.29)
        lampRig.add(this.lampHolder)
        wall.attach(lampRig, 0.3, 1.83, 0.03)
        this.piece(lampRig, 'front', 0.05, { parent: wall.pieceOf(0.3), pivot: lampRig.position.clone() })
        this.hotspot('lampara', lamp, new THREE.Vector3(0, -0.6, 0))
        this.lampAmp = 0

        // ---- muebles
        const shelf = createShelf()
        this.shelfHolder = this.holder(shelf, -2.4, 0, -1.38)
        this.piece(this.shelfHolder, 'grow', 0.25)
        this.hotspot('estante', shelf, new THREE.Vector3(0, 1.0, 0.2))

        this.counter = createCounter()
        this.counter.position.set(-1.45, 0, -1.42)
        this.piece(this.counter, 'grow', 0.3)

        const table = createTable()
        this.tableHolder = this.holder(table, 0.3, 0, -0.5)
        this.piece(this.tableHolder, 'grow', 0.4)
        this.hotspot('mesa', table, new THREE.Vector3(0.25, 0.45, 0.5))
        this.table = table

        const sofa = createSofa()
        this.sofaHolder = this.holder(sofa, 1.9, 0, 0.42)
        sofa.rotation.y = -0.35
        this.piece(this.sofaHolder, 'grow', 0.45)
        this.hotspot('sofa', sofa, new THREE.Vector3(0, 0.62, 0))

        const plant = new THREE.Group()
        add(plant, geo.cyl(0.13, 0.1, 0.22, 14), mat.clay(palette.blue), [0, 0.11, 0])
        for (const [x, y, z] of [[0, 0.38, 0], [-0.08, 0.3, 0.04], [0.08, 0.32, -0.03]]) add(plant, geo.sphere(0.12, 12, 8), mat.clay(palette.green), [x, y, z])
        plant.position.set(1.05, 0, -1.35)
        this.piece(plant, 'grow', 0.5)

        // ---- torre de bloques
        this.towerPos = new THREE.Vector3(-1.95, 0, 0.75)
        this.tower = new THREE.Group()
        this.tower.position.copy(this.towerPos)
        this.piece(this.tower, 'pop', 0.5)
        this.blocks = towerColors(6).map((c, i) => {
            const b = createBlock(c, BLOCK)
            b.userData.stack = new THREE.Vector3((i % 2 ? 0.012 : -0.01), BLOCK / 2 + i * BLOCK, 0)
            b.userData.stackRot = (i % 3 - 1) * 0.08
            this.tower.add(b)
            return b
        })
        this.placeTower(s.tower ?? 'built')

        // ---- personajes
        const spots = {
            tower: { x: -1.25, z: 0.4 },
            center: { x: -0.55, z: 0.7 },
        }
        const at = spots[s.nico] ?? spots.tower
        const nico = this.addNico(at.x, at.z, { face: s.nico === 'tower' ? -1.05 : 0.2 })
        if (s.face) nico.face(s.face)
        if (s.heart) nico.heartGlow = 0.3
        if (s.nico === 'tower') {
            this.blueBlock = createBlock(palette.blue, 0.15)
            this.blueBlock.position.y = -0.04
            nico.hold(this.blueBlock)
        }
        this.addGuardian(!!s.guardian)

        this.anchors = {
            tableFront: new THREE.Vector3(0.3, 0, 0.35),
            under: new THREE.Vector3(0.3, 0, -0.42),
            door: new THREE.Vector3(1.0, 0, 0.55),
        }

        this.hazards = ['ventana', 'lampara', 'estante', 'cuadro']
        this.wobbleCfg = {
            lampara: { custom: () => this.kickLamp() },
            ventana: { axis: 'z', amount: 0.06, times: 6, duration: 0.8 },
            estante: { axis: 'z', amount: 0.09, times: 4, duration: 1.0 },
            cuadro: { axis: 'z', amount: 0.3, times: 4, duration: 1.0 },
            sofa: { custom: () => bounce(sofa, 0.08) },
            mesa: { custom: () => bounce(table, 0.04) },
        }

        this.actions = {
            'tower.build': () => this.buildTower(),
            'tower.fall': () => this.fallTower(),
            'nico.showBlock': () => this.showBlock(),
            'nico.reach': () => this.reach(),
            'glasses.clink': () => this.clink(),
            rumble: () => this.dustPuffs(),
            'nico.runToDoor': () => this.runToDoor(),
            'guardian.stop': () => this.guardianStop(),
            'table.glow': () => this.tableGlow(),
            'nico.hideUnderTable': () => this.hideUnderTable(),
        }
    }

    // ------------------------------------------------------------ torre
    placeTower(state) {
        this.blocks.forEach((b, i) => {
            if (state === 'fallen') {
                const [dx, dz] = SCATTER[i]
                b.position.set(dx, BLOCK / 2, dz)
                b.rotation.set(0, i * 0.9, 0)
            } else {
                b.position.copy(b.userData.stack)
                b.rotation.set(0, b.userData.stackRot, 0)
                b.visible = state !== 'empty'
            }
        })
        this.towerState = state
    }

    buildTower() {
        const tl = gsap.timeline()
        this.blocks.forEach((b, i) => {
            const target = b.userData.stack
            tl.call(() => { b.visible = true }, null, i * 0.28)
            tl.fromTo(b.position, { y: target.y + 1.4 }, { y: target.y, duration: 0.6, ease: 'bounce.out' }, i * 0.28)
            tl.fromTo(b.rotation, { y: b.userData.stackRot + 1.5 }, { y: b.userData.stackRot, duration: 0.6, ease: 'power2.out' }, i * 0.28)
        })
        tl.call(() => { this.towerState = 'built' })
        tl.add(sparkle(this.group, this.towerPos.clone().setY(1.15), { color: '#fff3b0' }))
        tl.add(this.nico.pose('show'), 0.4)
        tl.add(this.nico.pose('idle'), 1.4)
        return tl
    }

    fallTower() {
        const tl = gsap.timeline()
        this.towerState = 'falling'
        ;[...this.blocks].reverse().forEach((b, k) => {
            const i = this.blocks.indexOf(b)
            const [dx, dz] = SCATTER[i]
            const d = k * 0.07
            tl.to(b.position, { x: dx, z: dz, duration: 0.9, ease: 'power2.out' }, d)
            tl.to(b.position, { keyframes: [{ y: b.position.y + 0.18, duration: 0.2, ease: 'power2.out' }, { y: BLOCK / 2, duration: 0.7, ease: 'bounce.out' }] }, d)
            tl.to(b.rotation, { x: (i % 2 ? 1 : -1) * Math.PI / 2, y: i * 0.9, duration: 0.9, ease: 'power2.out' }, d)
        })
        tl.call(() => { this.towerState = 'fallen' })
        tl.add(this.nico.pose('worried'), 0.1)
        return tl
    }

    // ------------------------------------------------------------ Nico
    showBlock() {
        const tl = gsap.timeline()
        tl.add(this.nico.pose('show'))
        tl.call(() => {
            const p = this.localPos(this.blueBlock ?? this.nico.hand)
            sparkle(this.group, p, { color: '#bfe2ff', count: 8 })
            glint(this.group, p, { color: '#bfe2ff', size: 0.7 })
        }, null, 0.6)
        tl.to({}, { duration: 1 })
        return tl
    }

    reach() {
        const tl = gsap.timeline()
        tl.add(this.nico.walkTo(-1.55, 0.55, { speed: 0.5 }))
        tl.add(this.nico.pose('reach', 1.1, 'power2.inOut'))
        return tl
    }

    clink() {
        const tl = gsap.timeline()
        this.counter.userData.glasses.forEach((g, i) => {
            tl.to(g.position, { keyframes: [{ y: 0.705, duration: 0.08 }, { y: 0.675, duration: 0.1 }, { y: 0.695, duration: 0.07 }, { y: 0.675, duration: 0.1 }] }, i * 0.12)
            tl.to(g.rotation, { keyframes: [{ z: 0.12, duration: 0.09 }, { z: -0.1, duration: 0.09 }, { z: 0, duration: 0.1 }] }, i * 0.12)
        })
        tl.add(sparkle(this.group, new THREE.Vector3(-1.45, 0.8, -1.4), { color: '#e6f6ff', count: 6, radius: 0.3 }), 0)
        return tl
    }

    runToDoor() {
        const n = this.nico
        const tl = gsap.timeline()
        tl.add(n.pose('run', 0.4))
        tl.add(n.walkTo(this.anchors.door.x, this.anchors.door.z, { speed: 1.4, run: true }))
        return tl
    }

    guardianStop() {
        const g = this.guardian
        const n = this.nico
        const tl = gsap.timeline()
        this.guardianPinned = true
        tl.add(g.moveTo(new THREE.Vector3(n.position.x + 0.45, 0.75, n.position.z + 0.15), 0.6), 0)
        tl.add(g.pulse(1), 0.3)
        tl.add(n.pose('stop', 0.5), 0.35)
        tl.add(n.turnTo(n.position.x, n.position.z + 2, 0.6), 0.6)
        tl.add(n.pose('idle', 0.8), 1.2)
        tl.call(() => { this.guardianPinned = false }, null, 1.6)
        return tl
    }

    tableGlow() {
        const tl = gsap.timeline()
        const top = this.localPos(this.markers.mesa)
        tl.add(glint(this.group, top, { color: '#fff3c4', size: 1.4 }), 0)
        tl.add(sparkle(this.group, top, { color: '#fff3c4', count: 10, radius: 0.6 }), 0.1)
        tl.add(bounce(this.table, 0.04), 0.1)
        tl.add(this.nico.turnTo(this.table.parent.position.x, this.table.parent.position.z, 0.6), 0)
        return tl
    }

    /** Éxito de la actividad 1: Nico va despacito y se mete debajo de la mesa. */
    hideUnderTable() {
        const n = this.nico
        const tl = gsap.timeline()
        tl.to(this.guardianOffset, { x: 0.62, y: 0.42, z: 0.55, duration: 1.5 }, 0)
        if (n.p.crouch > 0.3) tl.add(n.pose('idle', 0.4))
        tl.add(n.walkTo(this.anchors.tableFront.x, this.anchors.tableFront.z, { speed: 0.55 }))
        tl.add(n.pose('kneel', 0.5))
        tl.add(n.walkTo(this.anchors.under.x, this.anchors.under.z, { speed: 0.35 }))
        tl.add(gsap.to(n.rotation, { y: 0, duration: 0.5 }))
        tl.add(n.pose('crouch', 0.6))
        return tl
    }

    /** Polvito que salta del piso con el gruñido de la tierra. */
    dustPuffs() {
        const tl = gsap.timeline()
        ;[[-0.8, 0.9], [0.9, 0.7], [-0.2, -0.1], [1.6, -0.6], [-2.3, -0.4]].forEach(([x, z], i) => {
            tl.add(sparkle(this.group, new THREE.Vector3(x, 0.05, z), { color: '#efe0c8', count: 5, radius: 0.25, size: 0.18 }), i * 0.18)
        })
        return tl
    }

    kickLamp() {
        this.lampAmp = Math.max(this.lampAmp, 1)
        return glint(this.group, this.localPos(this.markers.lampara), { color: '#fff1b0', size: 0.7 })
    }

    // ------------------------------------------------------------ loop
    /** El aire que mueve la hoja al pasar hace balancear la lámpara. */
    onWind(w) {
        this.lampAmp = Math.max(this.lampAmp, Math.min(0.6, w * 0.35))
    }

    tick(dt, t, quake) {
        const q = quake.intensity
        // la lámpara se balancea con el temblor y se calma poco a poco
        const target = q * 0.9
        this.lampAmp += (target - this.lampAmp) * Math.min(1, dt * (target > this.lampAmp ? 3 : 0.6))
        this.lampHolder.rotation.z = Math.sin(t * 2.7) * this.lampAmp * 0.42
        this.lampHolder.rotation.x = Math.cos(t * 2.1) * this.lampAmp * 0.12

        this.shelfHolder.rotation.z = quake.shake.x * 0.03
        this.frameHolder.rotation.z = quake.shake.z * 0.08
        this.windowHolder.position.x = this.windowBaseX + quake.shake.x * 0.01
        this.tableHolder.position.x = 0.3 + quake.shake.z * 0.012

        if (q > 0.05) {
            this.counter.userData.glasses.forEach((g, i) => {
                g.position.y = 0.675 + Math.max(0, Math.sin(t * 34 + i * 1.7)) * 0.012 * q
            })
            if (this.towerState === 'built') {
                this.blocks.forEach((b, i) => {
                    b.rotation.z = Math.sin(t * 20 + i) * 0.025 * q * (i / 5)
                    b.position.x = b.userData.stack.x + Math.sin(t * 18 + i * 0.6) * 0.012 * q * i
                })
            }
        }
    }
}

/**
 * Escenario 4 — El patio (páginas 13 a 16). Lugar abierto en el centro, lejos
 * de la pared alta, del poste y de los cables. Al final aparece un arcoíris
 * pop-up (referencia del moodboard).
 */
import * as THREE from 'three'
import gsap from 'gsap'
import { BaseScene } from './BaseScene.js'
import { palette } from '../data/theme.js'
import { createDoor } from '../models/objects/furniture.js'
import {
    createPole, createCable, createTallWall, createFacade, createTree,
    createBush, createFlower, createRing, createRainbow,
} from '../models/objects/outdoor.js'
import { sparkle, glint } from '../animations/motions.js'

export class PatioScene extends BaseScene {
    build() {
        const s = this.setup

        const facade = createFacade({ w: 2.3, h: 1.45 })
        facade.position.set(-1.65, 0, -1.6)
        this.piece(facade, 'front', 0)
        const door = createDoor({ w: 0.55, h: 1.0 })
        door.position.set(-0.45, 0, 0.07)
        door.userData.hinge.rotation.y = -1.4
        facade.add(door)

        this.wall = createTallWall({ w: 1.6, h: 1.35 })
        this.wallHolder = this.holder(this.wall, 1.75, 0, -1.65)
        this.piece(this.wallHolder, 'front', 0.1)

        this.pole = createPole({ h: 1.95 })
        this.poleHolder = this.holder(this.pole, 2.6, 0, 0.95)
        this.piece(this.poleHolder, 'back', 0.05)
        const polePiece = this.poleHolder.userData.piece
        const top = this.pole.userData.top.clone().add(this.poleHolder.position)
        const pv = this.poleHolder.position.clone()
        this.cables = [
            this.piece(createCable(top.clone().add(new THREE.Vector3(-0.22, 0, 0)), new THREE.Vector3(-0.55, 1.5, -1.55), 0.35), 'back', 0, { follow: polePiece, pivot: pv }),
            this.piece(createCable(top.clone().add(new THREE.Vector3(0.22, 0, 0)), new THREE.Vector3(2.5, 1.4, -1.65), 0.25), 'back', 0, { follow: polePiece, pivot: pv }),
        ]

        const t1 = createTree({ h: 1.7, variant: 2 })
        t1.position.set(-2.7, 0, 1.05)
        this.piece(t1, 'front', 0.3)
        const t2 = createTree({ h: 1.35 })
        t2.position.set(0.75, 0, -1.55)
        this.piece(t2, 'front', 0.32)

        const small = []
        for (const [x, z, c] of [[-2.25, 1.55, palette.green], [2.85, -0.3, '#7cc96b'], [-0.25, -1.3, '#6dbb63']]) {
            const b = createBush(c)
            b.position.set(x, 0, z)
            this.piece(b, 'pop', 0.45)
            small.push(b)
        }
        const flowers = [[-1.6, 1.45, palette.red], [-1.35, 1.6, palette.yellow], [1.3, 1.5, palette.lilac], [1.6, 1.35, palette.red], [-0.6, 1.5, palette.orange], [2.0, -0.6, palette.yellow]]
        for (const [x, z, c] of flowers) {
            const f = createFlower(c)
            f.position.set(x, 0, z)
            this.piece(f, 'pop', 0.55)
            small.push(f)
        }

        this.center = new THREE.Vector3(0.3, 0, 0.3)
        this.ring = createRing(0.48, '#ffffff', 0.75)
        this.ring.position.x = this.center.x
        this.ring.position.z = this.center.z
        this.piece(this.ring, 'none')

        this.rainbow = createRainbow({ r: 1.1 })
        this.rainbow.position.set(0.3, 0, -0.95)
        this.rainbow.scale.setScalar(1.25)
        // el arcoíris es una solapa que se levanta cuando el guion lo pide (gate)
        this.piece(this.rainbow, 'back', 0.1, { gate: s.rainbow ? 1 : 0, stiffness: 0.7 })

        // juego 3B: tres lugares para elegir (aparecen al empezar el juego)
        this.zones = {
            centro: this.center,
            poste: new THREE.Vector3(2.3, 0, 0.72),
            pared: new THREE.Vector3(1.6, 0, -1.05),
        }
        this.zoneRings = {}
        for (const [id, p] of Object.entries(this.zones)) {
            if (id === 'centro') { this.zoneRings[id] = this.ring; continue }
            const ring = createRing(0.36, '#ffffff', 0.9)
            ring.position.x = p.x
            ring.position.z = p.z
            ring.visible = false
            this.piece(ring, 'none')
            this.zoneRings[id] = ring
        }
        for (const [id, p] of Object.entries(this.zones)) {
            const m = new THREE.Object3D()
            m.position.set(p.x, 0.15, p.z)
            this.group.add(m)
            this.markers[id] = m
        }

        const spots = { door: new THREE.Vector3(-2.1, 0, -1.05), center: this.center }
        const at = spots[s.nico] ?? spots.door
        const nico = this.addNico(at.x, at.z, { face: 0, pose: s.nicoPose ?? 'idle' })
        nico.setShoes(true)
        this.addGuardian(true)

        this.anchors = { center: this.center, door: spots.door }
        this.patioStart = spots.door

        // aparición por unidades, de atrás hacia adelante (Guía visual §11)
        this.revealOrder = [
            [facade],                                         // la casa con su puerta
            [this.wallHolder, this.poleHolder, ...this.cables], // pared alta, poste y cables
            [t1, t2],                                         // los pinos
            small,                                            // arbustos y flores
            [this.ring, this.rainbow, this.zoneRings.poste, this.zoneRings.pared], // marcas del piso
            [nico],                                           // Nico (y el Guardián) al final
        ]
        this.hotspots.pared = this.wall
        this.hotspots.poste = this.pole
        this.markers.pared = this.wallHolder
        this.markers.poste = this.poleHolder
        this.hazards = ['pared', 'poste']
        this.wobbleCfg = {
            pared: { axis: 'x', amount: 0.05 },
            poste: { axis: 'z', amount: 0.08 },
        }

        this.actions = {
            'guardian.point': () => this.point(),
            'rainbow.show': () => this.showRainbow(),
            celebrate: () => this.celebrate(),
        }
    }

    point() {
        const g = this.guardian
        const c = this.center
        const tl = gsap.timeline()
        this.guardianPinned = true
        tl.add(g.moveTo(new THREE.Vector3(c.x, 0.9, c.z), 1.1), 0)
        tl.add(g.pulse(1), 0.8)
        tl.add(glint(this.group, c.clone().setY(0.05), { color: '#fffbe0', size: 1.6 }), 0.9)
        tl.add(sparkle(this.group, c.clone().setY(0.1), { color: '#fffbe0', count: 10, radius: 0.5 }), 1.0)
        tl.to(this.ring.material, { opacity: 1, duration: 0.4, yoyo: true, repeat: 3 }, 0.9)
        tl.call(() => { this.guardianPinned = false }, null, 2.6)
        return tl
    }

    showRainbow() {
        const r = this.rainbow
        return gsap.timeline()
            .to(r.userData.piece, { gate: 1, duration: 1.4, ease: 'power2.out' }, 0)
            .add(sparkle(this.group, r.position.clone().setY(1.2), { color: '#fff6c2', count: 12, radius: 0.9 }), 0.3)
    }

    /** Juego 3B: confeti y estrellas en el centro, y el Guardián baila un poquito. */
    confetti(at = this.center) {
        const tl = gsap.timeline()
        const colors = [palette.red, palette.orange, palette.yellow, palette.green, palette.blue, palette.lilac]
        colors.forEach((c, i) => tl.add(sparkle(this.group, at.clone().setY(0.5 + (i % 3) * 0.2), { color: c, count: 6, radius: 0.7 }), i * 0.08))
        tl.add(this.dance(), 0.1)
        return tl
    }

    dance() {
        const g = this.guardian
        const tl = gsap.timeline()
        this.guardianPinned = true
        tl.to(g.inner.rotation, { y: '+=' + Math.PI * 2, duration: 0.9, ease: 'power2.inOut' }, 0)
        tl.to(g.home, { y: '+=0.18', duration: 0.25, ease: 'power2.out', yoyo: true, repeat: 3 }, 0)
        tl.add(g.pulse(2), 0)
        tl.call(() => { this.guardianPinned = false }, null, 1.2)
        return tl
    }

    celebrate() {
        const tl = gsap.timeline()
        // las tres estrellas del Guardián se juntan y él se ilumina
        tl.add(this.guardian.gatherStars(), 0)
        tl.add(this.nico.pose('cheer', 0.6), 0)
        tl.add(this.nico.hop(), 0.2)
        tl.add(this.guardian.pulse(2), 0)
        tl.add(sparkle(this.group, this.nico.position.clone().setY(1.1), { color: '#fff6c2', count: 12, radius: 0.6 }), 0.3)
        tl.add(this.nico.pose('idle', 0.8), 1.6)
        return tl
    }

    tick(dt, t, quake) {
        this.poleHolder.rotation.z = quake.shake.x * 0.04
        this.wallHolder.rotation.x = quake.shake.z * 0.015
    }
}

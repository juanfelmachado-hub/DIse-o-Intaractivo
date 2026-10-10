/**
 * Nico — personaje principal, estilo "arcilla" del moodboard (cabeza grande,
 * formas redondas, colores pastel).
 *
 * Animación por capas:
 *   1. Pose: valores (this.p) que gsap interpola entre poses predefinidas.
 *   2. Procedural: respirar, parpadear, caminar, temblar (en update()).
 * Para agregar una pose nueva basta con sumar una entrada en POSES.
 */
import * as THREE from 'three'
import gsap from 'gsap'
import { geo, mat, add, glowSprite } from '../kit.js'
import { palette } from '../../data/theme.js'

const C = {
    skin: '#f7d2b6',
    hair: '#7b4a2d',
    sweater: '#f6b94a',
    sweaterDark: '#ec9f35',
    pants: '#5eaff2',
    sock: '#ffffff',
    shoe: palette.red,
    cheek: '#f59a9a',
    eye: '#2b2233',
}

const HIP = 0.24

/** Ángulos en radianes. armX < 0 = brazo hacia adelante/arriba. */
export const POSES = {
    idle:    { armLx: 0.08, armLz: 0.12, armRx: 0.08, armRz: -0.12, legLx: 0, legRx: 0, crouch: 0, lean: 0, headX: 0, headY: 0, headZ: 0 },
    show:    { armLx: 0.1, armLz: 0.15, armRx: -1.35, armRz: -0.25, legLx: 0, legRx: 0, crouch: 0, lean: 0, headX: 0.12, headY: -0.25, headZ: 0.05 },
    reach:   { armLx: 0.2, armLz: 0.25, armRx: -2.75, armRz: -0.15, legLx: 0.12, legRx: -0.1, crouch: 0, lean: -0.08, headX: -0.25, headY: 0, headZ: 0 },
    worried: { armLx: -0.5, armLz: 0.55, armRx: -1.2, armRz: -0.5, legLx: 0.05, legRx: -0.05, crouch: 0.05, lean: 0.05, headX: 0, headY: 0, headZ: 0.08 },
    run:     { armLx: -0.6, armLz: 0.2, armRx: 0.5, armRz: -0.2, legLx: 0, legRx: 0, crouch: 0, lean: 0.18, headX: 0, headY: 0, headZ: 0 },
    stop:    { armLx: 0.35, armLz: 0.5, armRx: 0.35, armRz: -0.5, legLx: 0.25, legRx: -0.15, crouch: 0, lean: -0.15, headX: -0.1, headY: 0.15, headZ: 0 },
    kneel:   { armLx: -0.35, armLz: 0.2, armRx: -0.35, armRz: -0.2, legLx: -1.45, legRx: -1.45, crouch: 0.85, lean: 0.12, headX: 0.05, headY: 0, headZ: 0 },
    crouch:  { armLx: -0.9, armLz: 0.1, armRx: -0.9, armRz: -0.1, legLx: -1.55, legRx: -1.55, crouch: 1, lean: 0.55, headX: 0.25, headY: 0, headZ: 0 },
    cover:   { armLx: -2.85, armLz: 0.42, armRx: -2.85, armRz: -0.42, legLx: -1.55, legRx: -1.55, crouch: 1, lean: 0.55, headX: 0.35, headY: 0, headZ: 0 },
    hold:    { armLx: -2.85, armLz: 0.42, armRx: -1.15, armRz: -0.85, legLx: -1.55, legRx: -1.55, crouch: 1, lean: 0.5, headX: 0.3, headY: -0.2, headZ: 0 },
    peek:    { armLx: -0.5, armLz: 0.3, armRx: -1.1, armRz: -0.8, legLx: -1.5, legRx: -1.5, crouch: 0.9, lean: 0.2, headX: -0.15, headY: 0.35, headZ: 0.1 },
    sit:     { armLx: -0.2, armLz: 0.35, armRx: -0.2, armRz: -0.35, legLx: -1.5, legRx: -1.5, crouch: 0.95, lean: -0.05, headX: -0.05, headY: 0, headZ: 0 },
    cheer:   { armLx: -2.7, armLz: 0.45, armRx: -2.7, armRz: -0.45, legLx: 0, legRx: 0, crouch: 0, lean: -0.05, headX: -0.2, headY: 0, headZ: 0 },
    dangle:  { armLx: -2.4, armLz: 0.6, armRx: -2.4, armRz: -0.6, legLx: 0.3, legRx: -0.3, crouch: 0, lean: 0, headX: -0.15, headY: 0, headZ: 0 },
}

export class Nico extends THREE.Group {
    constructor() {
        super()
        this.name = 'nico'
        this.p = { ...POSES.idle, lift: 0 }
        this.walking = 0
        this.walkPhase = 0
        this.blink = 0
        this.nextBlink = 2
        this.heartGlow = 0
        this.build()
    }

    build() {
        const skin = mat.clay(C.skin, 0.7)
        const sweater = mat.clay(C.sweater)
        const pants = mat.clay(C.pants)

        // ---- caderas + piernas
        this.hips = new THREE.Group()
        this.hips.position.y = HIP
        this.add(this.hips)
        this.legs = [-1, 1].map((side) => {
            const leg = new THREE.Group()
            leg.position.set(side * 0.07, 0, 0)
            add(leg, geo.capsule(0.058, 0.12), pants, [0, -0.11, 0])
            const sock = add(leg, geo.sphere(0.062, 16, 12), mat.clay(C.sock), [0, -0.205, 0.025])
            sock.scale.set(1, 0.62, 1.4)
            const shoe = add(leg, geo.rbox(0.13, 0.08, 0.2, 0.035), mat.clay(C.shoe, 0.6), [0, -0.205, 0.03])
            shoe.visible = false
            leg.userData.shoe = shoe
            leg.userData.sock = sock
            this.hips.add(leg)
            return leg
        })

        // ---- cuerpo (se inclina desde la cadera)
        this.body = new THREE.Group()
        this.hips.add(this.body)
        const torso = add(this.body, geo.capsule(0.145, 0.1, 8, 16), sweater, [0, 0.15, 0])
        torso.scale.set(1, 1, 0.9)
        add(this.body, geo.torus(0.1, 0.025, 8, 20), mat.clay(C.sweaterDark), [0, 0.3, 0]).rotation.x = Math.PI / 2

        // corazón (brilla cuando despierta el Guardián)
        this.heart = glowSprite('#ffb36b', 0.0, 0.95)
        this.heart.position.set(0, 0.17, 0.16)
        this.body.add(this.heart)

        // ---- brazos
        this.arms = [-1, 1].map((side) => {
            const arm = new THREE.Group()
            arm.position.set(side * 0.155, 0.26, 0)
            add(arm, geo.capsule(0.046, 0.12), sweater, [0, -0.1, 0])
            add(arm, geo.sphere(0.052, 14, 10), skin, [0, -0.2, 0])
            this.body.add(arm)
            return arm
        })
        // arms[0] = lado -x (derecho de Nico), arms[1] = lado +x (izquierdo)
        this.armR = this.arms[0]
        this.armL = this.arms[1]
        this.hand = new THREE.Group()
        this.hand.position.set(0, -0.24, 0.02)
        this.armR.add(this.hand)

        // ---- cabeza
        this.head = new THREE.Group()
        this.head.position.y = 0.5
        this.body.add(this.head)
        add(this.head, geo.sphere(0.185, 28, 20), skin, [0, 0, 0])
        const hair = add(this.head, geo.hemi(0.195, 28, 12, 0.55), mat.clay(C.hair, 0.85), [0, 0.012, -0.012])
        hair.rotation.x = -0.32
        for (const [x, y, z, s] of [[-0.08, 0.125, 0.115, 0.065], [0, 0.14, 0.125, 0.07], [0.08, 0.125, 0.115, 0.065], [0.15, 0.06, 0.07, 0.055], [-0.15, 0.06, 0.07, 0.055]]) {
            add(this.head, geo.sphere(s, 14, 10), mat.clay(C.hair, 0.85), [x, y, z])
        }
        add(this.head, geo.sphere(0.04, 12, 8), skin, [0.183, -0.01, 0])
        add(this.head, geo.sphere(0.04, 12, 8), skin, [-0.183, -0.01, 0])

        this.eyes = [-1, 1].map((side) => {
            const eye = new THREE.Group()
            eye.position.set(side * 0.066, 0.005, 0.165)
            add(eye, geo.sphere(0.026, 14, 10), mat.clay(C.eye, 0.3), [0, 0, 0], { cast: false })
            add(eye, geo.sphere(0.009, 8, 6), mat.basic('#ffffff'), [0.008, 0.01, 0.022], { cast: false })
            this.head.add(eye)
            return eye
        })
        for (const side of [-1, 1]) {
            const cheek = add(this.head, geo.sphere(0.036, 12, 8), mat.clay(C.cheek, 0.9), [side * 0.112, -0.055, 0.138], { cast: false })
            cheek.scale.set(1, 0.6, 0.45)
        }
        this.mouths = {
            smile: add(this.head, geo.torus(0.032, 0.009, 6, 16, Math.PI), mat.clay('#7a2e3a', 0.6), [0, -0.055, 0.172], { cast: false }),
            o: add(this.head, geo.sphere(0.024, 12, 10), mat.clay('#7a2e3a', 0.6), [0, -0.068, 0.168], { cast: false }),
            worried: add(this.head, geo.torus(0.026, 0.008, 6, 16, Math.PI), mat.clay('#7a2e3a', 0.6), [0, -0.085, 0.17], { cast: false }),
        }
        this.mouths.smile.rotation.z = Math.PI
        this.mouths.o.scale.set(0.9, 1.2, 0.5)
        this.face('smile')

        // zona de toque generosa (actividades)
        this.hit = new THREE.Mesh(geo.box(0.5, 0.95, 0.5), mat.hit())
        this.hit.position.y = 0.47
        this.add(this.hit)
    }

    // ------------------------------------------------------------ API
    face(name) {
        for (const [k, m] of Object.entries(this.mouths)) m.visible = k === name
        this.currentFace = name
    }

    pose(name, duration = 0.7, ease = 'back.out(1.4)') {
        const target = POSES[name]
        if (!target) return gsap.timeline()
        this.currentPose = name
        return gsap.to(this.p, { ...target, duration, ease, overwrite: 'auto' })
    }

    poseInstant(name) {
        Object.assign(this.p, POSES[name])
        this.currentPose = name
    }

    setShoes(on) {
        for (const leg of this.legs) {
            leg.userData.shoe.visible = on
            leg.userData.sock.visible = !on
        }
    }

    /** Sostener un objeto en la mano derecha (ej. el bloque azul). */
    hold(object) {
        this.hand.clear()
        if (object) this.hand.add(object)
    }

    turnTo(x, z, duration = 0.5) {
        const angle = Math.atan2(x - this.position.x, z - this.position.z)
        let delta = angle - this.rotation.y
        delta = Math.atan2(Math.sin(delta), Math.cos(delta))
        return gsap.to(this.rotation, { y: this.rotation.y + delta, duration, ease: 'power2.out' })
    }

    /** Caminar hasta (x, z) del escenario. speed en unidades/segundo. */
    walkTo(x, z, { speed = 0.75, face = true, run = false } = {}) {
        const dist = Math.hypot(x - this.position.x, z - this.position.z)
        const duration = Math.max(0.35, dist / speed)
        const tl = gsap.timeline()
        if (face) tl.add(this.turnTo(x, z, 0.35), 0)
        tl.call(() => { this.walking = run ? 1.6 : 1 }, null, 0.1)
        tl.to(this.position, { x, z, duration, ease: 'sine.inOut' }, 0.1)
        tl.call(() => { this.walking = 0 })
        return tl
    }

    heartbeat(times = 3) {
        const tl = gsap.timeline()
        for (let i = 0; i < times; i++) {
            tl.to(this, { heartGlow: 1, duration: 0.14, ease: 'power2.out' })
            tl.to(this, { heartGlow: 0.35, duration: 0.5, ease: 'power2.in' })
        }
        return tl
    }

    /** Pequeño salto de reacción. */
    hop() {
        return gsap.timeline()
            .to(this.p, { lift: 0.12, duration: 0.18, ease: 'power2.out' })
            .to(this.p, { lift: 0, duration: 0.35, ease: 'bounce.out' })
    }

    // ------------------------------------------------------------ loop
    update(dt, t, quake) {
        const p = this.p
        // caminar
        let swing = 0
        let bob = 0
        if (this.walking > 0) {
            this.walkPhase += dt * 10 * this.walking
            swing = Math.sin(this.walkPhase) * 0.55
            bob = Math.abs(Math.cos(this.walkPhase)) * 0.025
        } else {
            this.walkPhase = 0
        }
        // respirar
        const breath = Math.sin(t * 2.2) * 0.012

        this.hips.position.y = HIP - p.crouch * 0.19 + p.lift + bob
        this.legs[0].rotation.x = p.legRx + swing
        this.legs[1].rotation.x = p.legLx - swing
        this.body.rotation.x = p.lean + breath * 0.5
        this.body.scale.y = 1 + breath * 0.4
        this.armR.rotation.x = p.armRx - swing * 0.7
        this.armR.rotation.z = p.armRz
        this.armL.rotation.x = p.armLx + swing * 0.7
        this.armL.rotation.z = p.armLz
        this.head.rotation.set(p.headX + breath, p.headY, p.headZ)

        // temblor: Nico se tambalea un poco
        if (quake.intensity > 0.01) {
            this.body.rotation.z = quake.shake.x * 0.08
            this.head.rotation.z += quake.shake.z * 0.06
        } else {
            this.body.rotation.z *= 0.9
        }

        // parpadeo
        this.nextBlink -= dt
        if (this.nextBlink < 0) {
            this.blink = 0.14
            this.nextBlink = 2 + Math.random() * 3
        }
        this.blink = Math.max(0, this.blink - dt)
        const ey = this.blink > 0 ? 0.15 : 1
        this.eyes[0].scale.y = this.eyes[1].scale.y = ey

        // corazón
        const hg = this.heartGlow
        this.heart.visible = hg > 0.01
        this.heart.scale.setScalar(0.08 + hg * 0.38)
        this.heart.material.opacity = hg
    }
}

/**
 * El Guardián — una vocecita valiente que despierta en el pecho de Nico.
 * Inspirado en el personaje verde del moodboard: gota de arcilla menta,
 * luminosa, con un brote de hojita (es "el susurro de la Tierra").
 *
 * Siempre flota (suspensión del .blend): bob + leve giro + squash al hablar.
 * Sigue un punto `home` con suavizado, por eso sus traslados se ven orgánicos.
 *
 * Antes de cada actividad sale del libro hacia la cámara (`viewerBlend`), mira
 * al lector (`faceViewer`) y lo saluda (`wave`): rompe la cuarta pared.
 */
import * as THREE from 'three'
import gsap from 'gsap'
import { geo, mat, add, glowSprite } from '../kit.js'

export class Guardian extends THREE.Group {
    /** PointLight global asignada por Experience. */
    static light = null

    constructor() {
        super()
        this.name = 'guardian'
        this.home = new THREE.Vector3()
        this.glow = 0.6
        this.squash = 0
        this.appearT = 1
        this.worldPos = new THREE.Vector3()
        this.viewerPoint = new THREE.Vector3()
        this.viewerBlend = 0
        this.faceViewer = false
        this.wave = 0
        this.presence = 1
        this.presenceTarget = 1
        this.presenceVel = 0
        this.baseScale = 1.4
        this.target = new THREE.Vector3()
        this.qLook = new THREE.Quaternion()
        this.qRest = new THREE.Quaternion()
        this.scale.setScalar(this.baseScale)
        this.build()
    }

    build() {
        this.inner = new THREE.Group()
        this.add(this.inner)

        this.bodyMat = new THREE.MeshStandardMaterial({
            color: '#9ff0a6', emissive: '#5db65a', emissiveIntensity: 0.45, roughness: 0.35,
        })
        const body = new THREE.Mesh(geo.sphere(0.12, 28, 20), this.bodyMat)
        body.scale.set(1, 1.08, 0.95)
        body.castShadow = true
        body.userData.ownMaterial = true
        this.inner.add(body)

        const eye = mat.clay('#1f2a22', 0.3)
        this.arms = []
        for (const side of [-1, 1]) {
            const e = add(this.inner, geo.sphere(0.019, 12, 8), eye, [side * 0.042, 0.022, 0.107], { cast: false })
            e.scale.set(1, 1.25, 0.6)
            add(this.inner, geo.sphere(0.006, 6, 4), mat.basic('#ffffff'), [side * 0.042 + 0.006, 0.032, 0.118], { cast: false })
            const cheek = add(this.inner, geo.sphere(0.02, 10, 6), mat.clay('#ff9aa6', 0.9), [side * 0.07, -0.012, 0.095], { cast: false })
            cheek.scale.set(1, 0.55, 0.4)
            // bracitos
            const arm = add(this.inner, geo.sphere(0.032, 12, 8), this.bodyMat, [side * 0.115, -0.03, 0.01])
            arm.scale.set(0.7, 1, 0.7)
            this.arms.push(arm)
        }
        const smile = add(this.inner, geo.torus(0.022, 0.006, 6, 14, Math.PI), mat.clay('#1f2a22', 0.4), [0, -0.012, 0.112], { cast: false })
        smile.rotation.z = Math.PI

        // brote
        add(this.inner, geo.cyl(0.007, 0.009, 0.07, 6), mat.clay('#3e8f4a'), [0, 0.155, 0])
        for (const side of [-1, 1]) {
            const leaf = add(this.inner, geo.sphere(0.04, 12, 8), mat.clay('#4fae5b', 0.6), [side * 0.035, 0.19, 0])
            leaf.scale.set(1, 0.3, 0.55)
            leaf.rotation.z = side * 0.55
        }

        this.halo = glowSprite('#c9f7a6', 0.7, 0.75)
        this.add(this.halo)

    }

    /** Aparece desde el pecho de Nico con un giro en espiral. */
    appear(from, to) {
        this.position.copy(from)
        this.home.copy(to)
        this.appearT = 0
        this.visible = true
        const tl = gsap.timeline()
        tl.fromTo(this.inner.scale, { x: 0.01, y: 0.01, z: 0.01 }, { x: 1, y: 1, z: 1, duration: 1.1, ease: 'elastic.out(1, 0.55)' }, 0.1)
        tl.fromTo(this, { glow: 2.5 }, { glow: 0.7, duration: 1.6, ease: 'power2.out' }, 0)
        tl.to(this, { appearT: 1, duration: 1.4, ease: 'power2.out' }, 0)
        tl.add(this.speak(), 0.9)
        return tl
    }

    moveTo(v, duration = 1.0) {
        return gsap.to(this.home, { x: v.x, y: v.y, z: v.z, duration, ease: 'power2.inOut' })
    }

    speak() {
        return gsap.timeline()
            .to(this, { squash: 1, duration: 0.12, ease: 'power2.out' })
            .to(this, { squash: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    }

    pulse(times = 2) {
        const tl = gsap.timeline()
        for (let i = 0; i < times; i++) {
            tl.to(this, { glow: 2.2, duration: 0.3, ease: 'power2.out' })
            tl.to(this, { glow: 0.7, duration: 0.6, ease: 'power2.in' })
        }
        return tl
    }

    /** Saluda con el bracito (al hablarle al lector). */
    greet() {
        return gsap.timeline()
            .to(this, { wave: 1, duration: 0.3, ease: 'power2.out' })
            .add(this.speak(), 0.1)
            .add(this.pulse(1), 0.1)
            .to(this, { wave: 0, duration: 0.5, ease: 'power2.in' }, 1.6)
    }

    update(dt, t, camera) {
        // presencia: aparece/desaparece con un resorte elástico (es mágico)
        const k = 120
        const acc = k * (this.presenceTarget - this.presence) - 2 * 0.38 * Math.sqrt(k) * this.presenceVel
        this.presenceVel += acc * Math.min(dt, 1 / 30)
        this.presence = Math.max(0, this.presence + this.presenceVel * Math.min(dt, 1 / 30))
        this.scale.setScalar(this.baseScale * Math.max(0.0001, this.presence) * (1 + this.viewerBlend * 0.12))

        // seguimiento suave del punto "home" o del punto frente al lector
        this.target.copy(this.home).lerp(this.viewerPoint, this.viewerBlend)
        const follow = 1 - Math.pow(0.02, dt * (0.6 + this.appearT * 1.4 + this.viewerBlend * 2))
        this.position.lerp(this.target, follow)

        // mirar al lector
        this.qRest.identity()
        if (camera && (this.faceViewer || this.viewerBlend > 0.01)) {
            const saved = this.quaternion.clone()
            this.lookAt(camera.position)
            this.qLook.copy(this.quaternion)
            this.quaternion.copy(saved)
            this.quaternion.slerp(this.faceViewer ? this.qLook : this.qRest, Math.min(1, dt * 5))
        } else {
            this.quaternion.slerp(this.qRest, Math.min(1, dt * 4))
        }
        // saludo
        const w = this.wave
        if (this.arms) {
            this.arms[1].position.set(0.115 + w * 0.03, -0.03 + w * (0.12 + Math.sin(t * 14) * 0.035), 0.01 + w * 0.03)
        }
        this.inner.position.y = Math.sin(t * 2.1) * 0.035
        this.inner.rotation.y = Math.sin(t * 0.9) * 0.35 * (1 - this.viewerBlend * 0.8)
        this.inner.rotation.z = Math.sin(t * 1.3) * 0.08
        const s = this.squash
        this.inner.scale.x = this.inner.scale.z = this.appearT < 1 ? this.inner.scale.x : 1 + s * 0.14
        if (this.appearT >= 1) this.inner.scale.y = 1 - s * 0.12

        const g = this.glow
        this.bodyMat.emissiveIntensity = 0.3 + g * 0.35
        this.halo.material.opacity = 0.35 + g * 0.35
        this.halo.scale.setScalar(0.55 + g * 0.18 + Math.sin(t * 3) * 0.03)
        // Luz compartida (una sola en toda la experiencia: agregar/quitar luces
        // recompila shaders, así que el Guardián solo la mueve y la enciende).
        const light = Guardian.light
        if (light && this.visible && this.presence > 0.05) {
            this.getWorldPosition(this.worldPos)
            light.position.copy(this.worldPos)
            light.intensity = (0.25 + g * 0.45) * Math.min(1, this.inner.scale.x) * Math.min(1, this.presence)
        }
    }
}

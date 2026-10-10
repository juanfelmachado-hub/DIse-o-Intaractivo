/**
 * Cámara cinematográfica: viaja entre encuadres (data/theme.js → cameraShots),
 * respira suavemente, sigue un poco al puntero (parallax) y tiembla con el sismo.
 * Se aleja automáticamente en pantallas angostas para que el libro quepa.
 */
import * as THREE from 'three'
import gsap from 'gsap'
import { cameraShots } from '../data/theme.js'

const HALF_BOOK = 4.3

export class CameraRig {
    constructor(camera) {
        this.camera = camera
        this.pos = new THREE.Vector3()
        this.target = new THREE.Vector3()
        this.pointer = new THREE.Vector2()
        this.parallax = new THREE.Vector2()
        this.parallaxAmount = 1
        this.tmp = new THREE.Vector3()
        this.look = new THREE.Vector3()
        this.current = null

        window.addEventListener('pointermove', (e) => {
            if (e.pointerType !== 'mouse') return
            this.pointer.set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1)
        })
    }

    set(name) {
        const s = cameraShots[name]
        this.current = name
        this.pos.fromArray(s.pos)
        this.target.fromArray(s.target)
    }

    to(name, duration = 2.4) {
        const s = cameraShots[name]
        if (!s || name === this.current) return null
        this.current = name
        const tl = gsap.timeline()
        tl.to(this.pos, { x: s.pos[0], y: s.pos[1], z: s.pos[2], duration, ease: 'power2.inOut' }, 0)
        tl.to(this.target, { x: s.target[0], y: s.target[1], z: s.target[2], duration, ease: 'power2.inOut' }, 0)
        return tl
    }

    update(dt, t, quake) {
        const aspect = this.camera.aspect
        // Se aleja lo necesario para que el libro (≈6.9 de ancho) siempre quepa:
        // en 16:9 no cambia nada; en tablet vertical se aleja.
        const dist = this.pos.distanceTo(this.target)
        const halfW = dist * Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2)) * aspect
        const k = Math.max(1, HALF_BOOK / halfW)

        const ease = Math.min(1, dt * 1.8)
        this.parallax.x += (this.pointer.x * this.parallaxAmount - this.parallax.x) * ease
        this.parallax.y += (this.pointer.y * this.parallaxAmount - this.parallax.y) * ease

        this.tmp.subVectors(this.pos, this.target).multiplyScalar(k).add(this.target)
        this.tmp.x += this.parallax.x * 0.35 + Math.sin(t * 0.21) * 0.09
        this.tmp.y += -this.parallax.y * 0.18 + Math.sin(t * 0.17) * 0.05
        this.tmp.addScaledVector(quake.shake, 0.05)

        this.look.copy(this.target)
        // en pantallas angostas, bajar un poco el encuadre deja espacio al texto
        if (k > 1 && aspect < 1) this.look.y += (k - 1) * 0.9
        this.look.addScaledVector(quake.shake, 0.025)

        this.camera.position.copy(this.tmp)
        this.camera.lookAt(this.look)
    }
}

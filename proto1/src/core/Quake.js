/**
 * Controlador del temblor. Una sola intensidad (0–1) que todos leen:
 * cámara, libro, árboles, muebles, lámpara… Así el sismo se siente coherente
 * en toda la escena y se puede subir/bajar desde el guion (data/story.js).
 */
import * as THREE from 'three'
import gsap from 'gsap'

export class Quake {
    constructor() {
        this.intensity = 0
        this.time = 0
        this.shake = new THREE.Vector3()
        this.sway = 0
        this.reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
        this.tween = null
    }

    to(value, duration = 1.2) {
        this.tween?.kill()
        this.tween = gsap.to(this, { intensity: value, duration, ease: 'sine.inOut' })
        return this.tween
    }

    set(value) {
        this.tween?.kill()
        this.intensity = value
    }

    update(dt) {
        this.time += dt
        const t = this.time
        const i = this.intensity * (this.reduced ? 0.3 : 1)
        this.shake.set(
            (Math.sin(t * 23.1) * 0.6 + Math.sin(t * 37.7 + 1.3) * 0.4) * i,
            (Math.sin(t * 29.3 + 0.7) * 0.5 + Math.sin(t * 17.9) * 0.5) * i * 0.6,
            (Math.sin(t * 19.7 + 2.1) * 0.7 + Math.sin(t * 31.1) * 0.3) * i,
        )
        this.sway = Math.sin(t * 3.4) * i
    }
}

/**
 * Cámara cinematográfica: viaja entre encuadres (data/theme.js → cameraShots),
 * respira suavemente, sigue un poco al puntero (parallax) y tiembla con el sismo.
 * Encuadre: el libro abierto es el protagonista y ocupa hasta el 80 % del ancho
 * de la escena (o todo el alto disponible, lo que limite primero), centrado; en
 * móvil y pantallas verticales se encuadra en la mitad superior, y la mitad
 * inferior queda libre para las tarjetas.
 */
import * as THREE from 'three'
import gsap from 'gsap'
import { cameraShots } from '../data/theme.js'

const HALF_BOOK = 4.5   // medio ancho aparente del libro abierto (su borde cercano se ve más grande)
const HALF_TALL = 2.1   // media altura aparente del libro abierto con sus paredes
const COVER_HALF = 2.7  // media altura del libro cerrado (portada), con margen

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
        this.vw = window.innerWidth
        this.vh = window.innerHeight

        window.addEventListener('pointermove', (e) => {
            if (e.pointerType !== 'mouse') return
            this.pointer.set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1)
        })
    }

    setViewport(w, h) {
        this.vw = w
        this.vh = h
    }

    get portrait() { return this.vw < 768 || (this.vw < 1024 && this.vh > this.vw) }

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
        const dist = this.pos.distanceTo(this.target)
        const halfH = dist * Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2))
        const halfW = halfH * aspect
        const portrait = this.portrait
        // el libro abierto es el protagonista: ocupa la mayor parte de la escena
        const frac = portrait ? 0.96 : this.vw < 1024 ? 0.82 : 0.8
        const cover = this.current === 'cover'
        // lo que más limite: el ancho disponible o el alto de la escena (nunca se recorta)
        const kW = (cover ? COVER_HALF * 0.75 : HALF_BOOK) / (frac * halfW)
        const kV = (cover ? COVER_HALF : HALF_TALL) / ((portrait ? 0.5 : 0.94) * halfH)
        const k = Math.max(0.6, kW, kV)

        const ease = Math.min(1, dt * 1.8)
        this.parallax.x += (this.pointer.x * this.parallaxAmount - this.parallax.x) * ease
        this.parallax.y += (this.pointer.y * this.parallaxAmount - this.parallax.y) * ease

        this.tmp.subVectors(this.pos, this.target).multiplyScalar(k).add(this.target)
        this.tmp.x += this.parallax.x * 0.35 + Math.sin(t * 0.21) * 0.09
        this.tmp.y += -this.parallax.y * 0.18 + Math.sin(t * 0.17) * 0.05
        this.tmp.addScaledVector(quake.shake, 0.05)

        this.look.copy(this.target)
        // móvil y vertical: el libro sube un poco y deja lugar abajo para las tarjetas
        if (portrait) this.look.y -= 0.3 * halfH * k
        // escritorio: el borde del libro queda cerca de la barra de página
        else if (!cover) this.look.y += 0.02 * halfH * k
        this.look.addScaledVector(quake.shake, 0.025)

        this.camera.position.copy(this.tmp)
        this.camera.lookAt(this.look)
    }
}

/**
 * Cámara cinematográfica: viaja entre encuadres (data/theme.js → cameraShots),
 * respira suavemente, sigue un poco al puntero (parallax) y tiembla con el sismo.
 *
 * Encuadre (Guía visual v2 §4.2): "más cerca, no más ancho". Se conserva el
 * ángulo de cada encuadre y el FOV; solo cambia la distancia hasta que el libro
 * (con sus elementos 3D) llena el rectángulo libre entre la pila de arriba y el
 * cuadro de la historia, con 16 px de aire. Manda la medida que primero se agote.
 * El libro se centra en ese rectángulo con un desplazamiento de lente
 * (setViewOffset), así la perspectiva se ve igual.
 */
import * as THREE from 'three'
import gsap from 'gsap'
import { cameraShots } from '../data/theme.js'

const GAP = 16
// Cajas del libro en el mundo (medidas con el libro y sus escenarios pop-up)
const OPEN_BOX = new THREE.Box3(new THREE.Vector3(-3.2, 0.35, -2.15), new THREE.Vector3(3.2, 2.55, 2.15))
const COVER_BOX = new THREE.Box3(new THREE.Vector3(-1.75, 0.05, -0.5), new THREE.Vector3(1.75, 4.55, 0.5))

function corners(box) {
    const { min: a, max: b } = box
    return [
        [a.x, a.y, a.z], [b.x, a.y, a.z], [a.x, b.y, a.z], [b.x, b.y, a.z],
        [a.x, a.y, b.z], [b.x, a.y, b.z], [a.x, b.y, b.z], [b.x, b.y, b.z],
    ].map((p) => new THREE.Vector3(...p))
}

export class CameraRig {
    constructor(camera) {
        this.camera = camera
        this.pos = new THREE.Vector3()
        this.target = new THREE.Vector3()
        this.pointer = new THREE.Vector2()
        this.parallax = new THREE.Vector2()
        this.parallaxAmount = 1
        this.tmp = new THREE.Vector3()
        this.dir = new THREE.Vector3()
        this.p = new THREE.Vector3()
        this.look = new THREE.Vector3()
        this.current = null
        this.vw = window.innerWidth
        this.vh = window.innerHeight
        /** Devuelve el rectángulo libre { top, bottom } en px de la escena. */
        this.layout = null
        this.openCorners = corners(OPEN_BOX)
        this.coverCorners = corners(COVER_BOX)
        this.pts = this.openCorners.map(() => new THREE.Vector3())
        this.blend = 0      // 0 = libro cerrado (portada), 1 = abierto
        this.k = 1          // factor de distancia (suavizado)
        this.shift = new THREE.Vector2()
        this.fresh = true

        window.addEventListener('pointermove', (e) => {
            if (e.pointerType !== 'mouse') return
            this.pointer.set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1)
        })
    }

    setViewport(w, h) {
        this.vw = w
        this.vh = h
        this.fresh = true
    }

    get portrait() { return this.vw < 768 || (this.vw < 1024 && this.vh > this.vw) }

    set(name) {
        const s = cameraShots[name]
        this.current = name
        this.pos.fromArray(s.pos)
        this.target.fromArray(s.target)
        this.blend = name === 'cover' ? 0 : 1
        this.fresh = true
    }

    to(name, duration = 2.4) {
        const s = cameraShots[name]
        if (!s || name === this.current) return null
        this.current = name
        const tl = gsap.timeline()
        tl.to(this.pos, { x: s.pos[0], y: s.pos[1], z: s.pos[2], duration, ease: 'power2.inOut' }, 0)
        tl.to(this.target, { x: s.target[0], y: s.target[1], z: s.target[2], duration, ease: 'power2.inOut' }, 0)
        tl.to(this, { blend: name === 'cover' ? 0 : 1, duration, ease: 'power2.inOut' }, 0)
        return tl
    }

    /** Rectángulo libre para el libro, en px de la escena. */
    freeRect() {
        const W = this.vw
        const H = this.vh
        const raw = this.layout?.() ?? { top: GAP, bottom: H - GAP }
        // 4 px más por lado: la respiración y el parallax mueven un poco la cámara
        const r = { top: raw.top + 4, bottom: raw.bottom - 4 }
        const left = GAP
        const right = W - GAP
        const maxW = Math.min(right - left, W * (this.portrait ? 0.94 : 1))
        return { top: r.top, bottom: r.bottom, h: Math.max(40, r.bottom - r.top), cx: W / 2, cy: (r.top + r.bottom) / 2, maxW }
    }

    /** Proyecta la caja del libro con la cámara en `dist` (sin desplazamiento de lente). */
    project(dist) {
        const cam = this.camera
        cam.position.copy(this.target).addScaledVector(this.dir, dist)
        cam.lookAt(this.target)
        cam.updateMatrixWorld()
        let l = Infinity, r = -Infinity, t = Infinity, b = -Infinity
        for (let i = 0; i < this.pts.length; i++) {
            const p = this.p.lerpVectors(this.coverCorners[i], this.openCorners[i], this.blend).project(cam)
            const x = (p.x * 0.5 + 0.5) * this.vw
            const y = (-p.y * 0.5 + 0.5) * this.vh
            if (x < l) l = x
            if (x > r) r = x
            if (y < t) t = y
            if (y > b) b = y
        }
        return { l, r, t, b }
    }

    update(dt, t, quake) {
        const cam = this.camera
        const R = this.freeRect()
        this.dir.subVectors(this.pos, this.target)
        const base = this.dir.length()
        this.dir.normalize()

        // la distancia exacta que deja el libro dentro del rectángulo libre
        if (cam.view?.enabled) cam.clearViewOffset()
        let dist = base * this.k
        let box
        for (let i = 0; i < 6; i++) {
            box = this.project(dist)
            const s = Math.max((box.r - box.l) / R.maxW, (box.b - box.t) / R.h)
            if (!isFinite(s) || s <= 0) break
            dist = THREE.MathUtils.clamp(dist * s, base * 0.25, base * 4)
            if (Math.abs(s - 1) < 0.002) break
        }
        box = this.project(dist)
        const k = dist / base
        // centrado en el rectángulo libre (px)
        const sx = (box.l + box.r) / 2 - R.cx
        const sy = (box.t + box.b) / 2 - R.cy

        const ease = this.fresh ? 1 : Math.min(1, dt * 5)
        this.fresh = false
        this.k += (k - this.k) * ease
        this.shift.x += (sx - this.shift.x) * ease
        this.shift.y += (sy - this.shift.y) * ease

        const pe = Math.min(1, dt * 1.8)
        this.parallax.x += (this.pointer.x * this.parallaxAmount - this.parallax.x) * pe
        this.parallax.y += (this.pointer.y * this.parallaxAmount - this.parallax.y) * pe

        // un poco de vida: parallax y respiración (pequeños para no salir del rectángulo)
        this.tmp.copy(this.target).addScaledVector(this.dir, base * this.k)
        this.tmp.x += this.parallax.x * 0.2 + Math.sin(t * 0.21) * 0.05
        this.tmp.y += -this.parallax.y * 0.1 + Math.sin(t * 0.17) * 0.03
        this.tmp.addScaledVector(quake.shake, 0.05)
        this.look.copy(this.target).addScaledVector(quake.shake, 0.025)

        cam.position.copy(this.tmp)
        cam.lookAt(this.look)
        cam.setViewOffset(this.vw, this.vh, this.shift.x, this.shift.y, this.vw, this.vh)
    }

    /** Rectángulo del libro en pantalla (px), para comprobar que nada lo tape. */
    bookRect() {
        const cam = this.camera
        cam.updateMatrixWorld()
        let l = Infinity, r = -Infinity, t = Infinity, b = -Infinity
        for (let i = 0; i < this.pts.length; i++) {
            const p = this.p.lerpVectors(this.coverCorners[i], this.openCorners[i], this.blend).project(cam)
            const x = (p.x * 0.5 + 0.5) * this.vw
            const y = (-p.y * 0.5 + 0.5) * this.vh
            l = Math.min(l, x); r = Math.max(r, x); t = Math.min(t, y); b = Math.max(b, y)
        }
        return { l, r, t, b }
    }
}

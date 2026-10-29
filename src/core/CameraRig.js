/**
 * Cámara cinematográfica: viaja entre encuadres (data/theme.js → cameraShots),
 * respira suavemente, sigue un poco al puntero (parallax) y tiembla con el sismo.
 *
 * Encuadre: el libro es el protagonista. "Más cerca, no más ancho": se conserva
 * el ángulo de cada encuadre y el FOV; solo cambia la distancia hasta que el
 * libro llena casi toda la pantalla. Reglas:
 *  - el suelo del libro (las hojas con los objetos) queda siempre entero entre
 *    la pila de arriba y el cuadro de la historia;
 *  - las paredes del pop-up pueden subir por detrás de la pila de arriba, hasta
 *    casi el borde superior de la pantalla;
 *  - nada se recorta: ancho y alto completos, con margen.
 * El libro se coloca con un desplazamiento de lente (setViewOffset), así la
 * perspectiva se ve igual.
 */
import * as THREE from 'three'
import gsap from 'gsap'
import { cameraShots } from '../data/theme.js'

const GAP = 16
// Cajas del libro en el mundo (medidas con el libro y sus escenarios pop-up)
const OPEN_BOX = new THREE.Box3(new THREE.Vector3(-3.2, 0.35, -2.15), new THREE.Vector3(3.2, 2.75, 2.15))
// solo las hojas abiertas (el suelo de cada escenario), sin las paredes
const PAGES_BOX = new THREE.Box3(new THREE.Vector3(-3.2, 0.35, -2.15), new THREE.Vector3(3.2, 0.62, 2.15))
const TOP_MARGIN = 8 // px libres sobre las paredes del pop-up
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
        this.pagesCorners = corners(PAGES_BOX)
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

    /** Rectángulos en pantalla (px) del libro completo y de su suelo, con la cámara actual. */
    measure() {
        const cam = this.camera
        const full = { l: Infinity, r: -Infinity, t: Infinity, b: -Infinity }
        const floor = { l: Infinity, r: -Infinity, t: Infinity, b: -Infinity }
        const add = (rect, a, b) => {
            const p = this.p.lerpVectors(a, b, this.blend).project(cam)
            const x = (p.x * 0.5 + 0.5) * this.vw
            const y = (-p.y * 0.5 + 0.5) * this.vh
            if (x < rect.l) rect.l = x
            if (x > rect.r) rect.r = x
            if (y < rect.t) rect.t = y
            if (y > rect.b) rect.b = y
        }
        for (let i = 0; i < 8; i++) {
            add(full, this.coverCorners[i], this.openCorners[i])
            add(floor, this.coverCorners[i], this.pagesCorners[i])
        }
        return { full, floor }
    }

    /** Mide con la cámara en `dist` (sin desplazamiento de lente). */
    project(dist) {
        const cam = this.camera
        cam.position.copy(this.target).addScaledVector(this.dir, dist)
        cam.lookAt(this.target)
        cam.updateMatrixWorld()
        return this.measure()
    }

    update(dt, t, quake) {
        const cam = this.camera
        const R = this.freeRect()
        this.dir.subVectors(this.pos, this.target)
        const base = this.dir.length()
        this.dir.normalize()

        // límites verticales (px): T = borde superior para las paredes,
        // S = debajo de la pila (el suelo empieza aquí), B = encima de la historia.
        // En la portada no hay paredes ni pila: el libro cerrado usa todo el alto.
        const T = TOP_MARGIN + 4
        const B = R.bottom
        const S = THREE.MathUtils.lerp(T, R.top, this.blend)

        // la distancia exacta: manda la medida que primero se agote
        if (cam.view?.enabled) cam.clearViewOffset()
        let dist = base * this.k
        let m
        for (let i = 0; i < 6; i++) {
            m = this.project(dist)
            const s = Math.max(
                (m.full.r - m.full.l) / R.maxW,
                (m.floor.b - m.floor.t) / Math.max(40, B - S),
                (m.full.b - m.full.t) / Math.max(40, B - T),
            )
            if (!isFinite(s) || s <= 0) break
            dist = THREE.MathUtils.clamp(dist * s, base * 0.2, base * 4)
            if (Math.abs(s - 1) < 0.002) break
        }
        m = this.project(dist)
        const k = dist / base
        // posición: sin pasar ninguno de los tres límites
        const sx = (m.full.l + m.full.r) / 2 - R.cx
        // si sobra alto (pantallas verticales), el suelo queda centrado entre la pila y la historia
        const centered = (m.floor.t + m.floor.b) / 2 - (S + B) / 2
        const lo = m.full.b - B
        const hi = Math.min(m.full.t - T, m.floor.t - S)
        const sy = THREE.MathUtils.clamp(centered, lo, Math.max(lo, hi))

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

    /**
     * Rectángulo del suelo del libro en pantalla (px), para comprobar que ningún
     * cuadro lo tape (las paredes sí pueden quedar detrás de la pila de arriba).
     */
    bookRect() {
        this.camera.updateMatrixWorld()
        return this.measure().floor
    }
}

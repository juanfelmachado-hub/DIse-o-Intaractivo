/**
 * Kit de construcción compartido: geometrías y materiales cacheados.
 *
 * Todas las piezas del cuento se construyen con estas funciones para que las
 * geometrías y materiales se REUTILIZEN entre páginas (no se crean ni se
 * destruyen en cada cambio de escena). Lo único que se libera con dispose()
 * son las texturas de canvas propias de cada página.
 */
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

const geoCache = new Map()
const matCache = new Map()

/**
 * Plano de la hoja del libro (en el mundo). Todo lo que quede por debajo —
 * "dentro del libro" — no se dibuja: así las piezas pop-up se guardan de verdad
 * en la ranura del lomo y nunca atraviesan el papel. Lo actualiza Book.update().
 */
export const popupClip = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)

function clipMat(m) {
    m.clippingPlanes = [popupClip]
    m.clipShadows = true
    return m
}

function cached(map, key, make) {
    let value = map.get(key)
    if (!value) {
        value = make()
        map.set(key, value)
    }
    return value
}

const r3 = (n) => Math.round(n * 1000) / 1000

export const geo = {
    box: (w, h, d) => cached(geoCache, `box|${r3(w)}|${r3(h)}|${r3(d)}`, () => new THREE.BoxGeometry(w, h, d)),
    rbox: (w, h, d, r = 0.03, s = 3) =>
        cached(geoCache, `rbox|${r3(w)}|${r3(h)}|${r3(d)}|${r}|${s}`, () => new RoundedBoxGeometry(w, h, d, s, Math.min(r, w / 2, h / 2, d / 2) * 0.999)),
    sphere: (r, ws = 24, hs = 16) => cached(geoCache, `sph|${r3(r)}|${ws}|${hs}`, () => new THREE.SphereGeometry(r, ws, hs)),
    hemi: (r, ws = 24, hs = 10, part = 0.5) =>
        cached(geoCache, `hemi|${r3(r)}|${ws}|${hs}|${part}`, () => new THREE.SphereGeometry(r, ws, hs, 0, Math.PI * 2, 0, Math.PI * part)),
    cyl: (rt, rb, h, seg = 16, open = false) =>
        cached(geoCache, `cyl|${r3(rt)}|${r3(rb)}|${r3(h)}|${seg}|${open}`, () => new THREE.CylinderGeometry(rt, rb, h, seg, 1, open)),
    cone: (r, h, seg = 16, open = false) =>
        cached(geoCache, `cone|${r3(r)}|${r3(h)}|${seg}|${open}`, () => new THREE.ConeGeometry(r, h, seg, 1, open)),
    capsule: (r, len, cs = 6, rs = 14) =>
        cached(geoCache, `cap|${r3(r)}|${r3(len)}|${cs}|${rs}`, () => new THREE.CapsuleGeometry(r, len, cs, rs)),
    torus: (r, tube, rs = 8, ts = 24, arc = Math.PI * 2) =>
        cached(geoCache, `tor|${r3(r)}|${r3(tube)}|${rs}|${ts}|${r3(arc)}`, () => new THREE.TorusGeometry(r, tube, rs, ts, arc)),
    plane: (w, h) => cached(geoCache, `pl|${r3(w)}|${r3(h)}`, () => new THREE.PlaneGeometry(w, h)),
    circle: (r, seg = 32) => cached(geoCache, `cir|${r3(r)}|${seg}`, () => new THREE.CircleGeometry(r, seg)),
    ring: (ri, ro, seg = 40) => cached(geoCache, `ring|${r3(ri)}|${r3(ro)}|${seg}`, () => new THREE.RingGeometry(ri, ro, seg)),
    ico: (r, detail = 0) => cached(geoCache, `ico|${r3(r)}|${detail}`, () => new THREE.IcosahedronGeometry(r, detail)),
    tetra: (r) => cached(geoCache, `tet|${r3(r)}`, () => new THREE.TetrahedronGeometry(r)),
    /** Geometría creada a mano pero cacheada por clave. */
    custom: (key, make) => cached(geoCache, `c|${key}`, make),
}

const cachedMat = (key, make) => cached(matCache, key, () => clipMat(make()))

export const mat = {
    /** Material "arcilla" mate de los personajes y muebles (moodboard). */
    clay: (color, rough = 0.78) =>
        cachedMat(`clay|${color}|${rough}`, () => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0 })),
    /** Papel / cartulina para las piezas pop-up. */
    paper: (color) =>
        cachedMat(`paper|${color}`, () => new THREE.MeshStandardMaterial({ color, roughness: 0.95, metalness: 0, side: THREE.DoubleSide })),
    flat: (color) =>
        cachedMat(`flat|${color}`, () => new THREE.MeshStandardMaterial({ color, roughness: 0.9, flatShading: true })),
    glow: (color, intensity = 1) =>
        cachedMat(`glow|${color}|${intensity}`, () => new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: intensity, roughness: 0.5 })),
    glass: (color, opacity = 0.55) =>
        cachedMat(`glass|${color}|${opacity}`, () => new THREE.MeshStandardMaterial({ color, roughness: 0.08, metalness: 0.1, transparent: true, opacity, depthWrite: false })),
    basic: (color, opacity = 1) =>
        cachedMat(`basic|${color}|${opacity}`, () => new THREE.MeshBasicMaterial({ color, transparent: opacity < 1, opacity, depthWrite: opacity >= 1 })),
    /** Material invisible para áreas de toque más grandes (niños). */
    hit: () => cachedMat('hit', () => new THREE.MeshBasicMaterial({ visible: false })),
    custom: (key, make) => cachedMat(`c|${key}`, make),
}

/** Crea un mesh con sombras configuradas. */
export function mesh(geometry, material, { cast = true, receive = false } = {}) {
    const m = new THREE.Mesh(geometry, material)
    m.castShadow = cast
    m.receiveShadow = receive
    return m
}

/** Atajo: agrega un mesh posicionado a un padre. */
export function add(parent, geometry, material, [x = 0, y = 0, z = 0] = [], opts) {
    const m = mesh(geometry, material, opts)
    m.position.set(x, y, z)
    parent.add(m)
    return m
}

/** Textura de brillo radial (para halos, luciérnagas, chispas). */
let glowTex = null
export function glowTexture() {
    if (glowTex) return glowTex
    const c = document.createElement('canvas')
    c.width = c.height = 128
    const g = c.getContext('2d')
    const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64)
    grd.addColorStop(0, 'rgba(255,255,255,1)')
    grd.addColorStop(0.25, 'rgba(255,255,255,0.75)')
    grd.addColorStop(0.6, 'rgba(255,255,255,0.15)')
    grd.addColorStop(1, 'rgba(255,255,255,0)')
    g.fillStyle = grd
    g.fillRect(0, 0, 128, 128)
    glowTex = new THREE.CanvasTexture(c)
    glowTex.colorSpace = THREE.SRGBColorSpace
    return glowTex
}

/** Sprite de brillo aditivo. Cada sprite tiene su propio material (opacidad animable). */
export function glowSprite(color = '#ffffff', size = 0.5, opacity = 1) {
    const material = new THREE.SpriteMaterial({
        map: glowTexture(), color, transparent: true, opacity,
        depthWrite: false, blending: THREE.AdditiveBlending,
    })
    clipMat(material)
    const s = new THREE.Sprite(material)
    s.scale.setScalar(size)
    s.userData.ownMaterial = true
    return s
}

/** Libera materiales propios (no compartidos) y texturas marcadas de un árbol de objetos. */
export function disposeOwned(root) {
    root.traverse((o) => {
        if (o.userData.ownMaterial && o.material) {
            o.material.dispose()
        }
        if (o.userData.ownTexture) {
            o.userData.ownTexture.dispose()
        }
        if (o.userData.ownGeometry && o.geometry) {
            o.geometry.dispose()
        }
    })
}

/** Ruido determinista (para que las escenas sean siempre iguales). */
export function seeded(seed = 1) {
    let s = seed >>> 0
    return () => {
        s = (s * 1664525 + 1013904223) >>> 0
        return s / 4294967296
    }
}

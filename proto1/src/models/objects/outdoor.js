/**
 * Objetos del patio. Los árboles y arbustos son recortes de papel extruidos,
 * como el libro pop-up del moodboard; el arcoíris viene de la imagen del
 * libro-castillo del moodboard.
 */
import * as THREE from 'three'
import { geo, mat, add } from '../kit.js'
import { palette } from '../../data/theme.js'

/** Poste con travesaño. Origen en la base. userData.top = punto donde nacen los cables. */
export function createPole({ h = 1.9 } = {}) {
    const g = new THREE.Group()
    g.name = 'poste'
    add(g, geo.cyl(0.045, 0.06, h, 10), mat.clay('#9b8678', 0.85), [0, h / 2, 0])
    add(g, geo.rbox(0.56, 0.05, 0.06, 0.015), mat.clay('#7d6b60', 0.85), [0, h - 0.12, 0])
    for (const s of [-1, 1]) add(g, geo.cyl(0.02, 0.025, 0.06, 8), mat.clay(palette.yellow), [s * 0.22, h - 0.07, 0])
    g.userData.top = new THREE.Vector3(0, h - 0.06, 0)
    g.userData.height = h
    const hit = new THREE.Mesh(geo.box(0.5, h, 0.5), mat.hit())
    hit.position.y = h / 2
    g.add(hit)
    return g
}

/** Cable colgante (catenaria simple) entre dos puntos del escenario. */
export function createCable(a, b, sag = 0.25) {
    const mid = a.clone().lerp(b, 0.5)
    mid.y -= sag
    const curve = new THREE.QuadraticBezierCurve3(a, mid, b)
    const m = new THREE.Mesh(new THREE.TubeGeometry(curve, 20, 0.009, 5, false), mat.clay('#3b2f4a', 0.6))
    m.castShadow = true
    m.userData.ownGeometry = true
    return m
}

/** Pared alta de ladrillo. Origen en la base. */
let brickTex = null
export function createTallWall({ w = 1.7, h = 1.4 } = {}) {
    if (!brickTex) {
        const c = document.createElement('canvas')
        c.width = c.height = 128
        const x = c.getContext('2d')
        x.fillStyle = '#f2b28c'; x.fillRect(0, 0, 128, 128)
        x.strokeStyle = 'rgba(255,240,225,0.9)'; x.lineWidth = 4
        for (let r = 0; r < 4; r++) {
            const y = r * 32
            x.beginPath(); x.moveTo(0, y); x.lineTo(128, y); x.stroke()
            const off = r % 2 ? 32 : 0
            for (let k = 0; k < 3; k++) { x.beginPath(); x.moveTo(off + k * 64, y); x.lineTo(off + k * 64, y + 32); x.stroke() }
        }
        brickTex = new THREE.CanvasTexture(c)
        brickTex.colorSpace = THREE.SRGBColorSpace
        brickTex.wrapS = brickTex.wrapT = THREE.RepeatWrapping
    }
    const m = mat.custom(`brick|${w}|${h}`, () => {
        const t = brickTex.clone()
        t.repeat.set(w * 2.5, h * 2.5)
        t.needsUpdate = true
        return new THREE.MeshStandardMaterial({ map: t, roughness: 0.95 })
    })
    const g = new THREE.Group()
    g.name = 'pared'
    add(g, geo.rbox(w, h, 0.16, 0.03), m, [0, h / 2, 0], { cast: true, receive: true })
    add(g, geo.rbox(w + 0.06, 0.07, 0.2, 0.02), mat.clay('#e9876b', 0.8), [0, h + 0.03, 0])
    const hit = new THREE.Mesh(geo.box(w, h, 0.4), mat.hit())
    hit.position.y = h / 2
    g.add(hit)
    return g
}

/** Fachada de la casa de Nico (por donde sale al patio). */
export function createFacade({ w = 2.3, h = 1.5 } = {}) {
    const g = new THREE.Group()
    g.name = 'casa'
    add(g, geo.rbox(w, h, 0.12, 0.03), mat.clay('#fbe3a1', 0.85), [0, h / 2, 0], { cast: true, receive: true })
    // techo (prisma triangular)
    const roofGeo = geo.custom(`roof|${w}`, () => {
        const shape = new THREE.Shape()
        shape.moveTo(-w / 2 - 0.15, 0)
        shape.lineTo(w / 2 + 0.15, 0)
        shape.lineTo(0, 0.6)
        shape.closePath()
        return new THREE.ExtrudeGeometry(shape, { depth: 0.22, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 2 })
    })
    add(g, roofGeo, mat.clay(palette.red, 0.7), [0, h - 0.02, -0.11])
    g.userData.doorX = -0.45
    add(g, geo.rbox(0.12, 0.3, 0.12, 0.02), mat.clay('#c4533f', 0.8), [w / 2 - 0.35, h + 0.35, 0])
    // ventanita redonda
    add(g, geo.torus(0.16, 0.035, 8, 24), mat.clay('#ffffff', 0.6), [0.55, h * 0.62, 0.07])
    add(g, geo.circle(0.15, 24), mat.custom('roundGlass', () => new THREE.MeshStandardMaterial({ color: '#bfe6ff', emissive: '#9fd6ff', emissiveIntensity: 0.3 })), [0.55, h * 0.62, 0.065], { cast: false })
    return g
}

/** Árbol de papel recortado (copa en forma de nube). */
export function createPaperTree({ color = '#3f8f72', trunk = '#ef95a9', s = 1 } = {}) {
    const g = new THREE.Group()
    g.name = 'arbol'
    const canopy = geo.custom('paperCanopy', () => {
        const shape = new THREE.Shape()
        const bumps = [[0, 0.95, 0.32], [-0.3, 0.75, 0.3], [0.32, 0.78, 0.3], [-0.18, 0.5, 0.28], [0.2, 0.5, 0.28]]
        shape.absarc(0, 0.62, 0.42, 0, Math.PI * 2, false)
        const geoms = bumps.map(([x, y, r]) => {
            const sh = new THREE.Shape()
            sh.absarc(x, y, r, 0, Math.PI * 2, false)
            return sh
        })
        const all = [shape, ...geoms]
        return new THREE.ExtrudeGeometry(all, { depth: 0.05, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 2, curveSegments: 16 })
    })
    add(g, canopy, mat.clay(color, 0.9), [0, 0, -0.025])
    const trunkGeo = geo.custom('paperTrunk', () => {
        const sh = new THREE.Shape()
        sh.moveTo(-0.07, 0)
        sh.lineTo(0.07, 0)
        sh.lineTo(0.05, 0.4)
        sh.lineTo(0.14, 0.55)
        sh.lineTo(0.1, 0.58)
        sh.lineTo(0.02, 0.48)
        sh.lineTo(-0.05, 0.6)
        sh.lineTo(-0.09, 0.56)
        sh.lineTo(-0.04, 0.42)
        sh.closePath()
        return new THREE.ExtrudeGeometry(sh, { depth: 0.04, bevelEnabled: false })
    })
    add(g, trunkGeo, mat.clay(trunk, 0.9), [0, 0, -0.02])
    g.scale.setScalar(s)
    return g
}

export function createBush(color = palette.green) {
    const g = new THREE.Group()
    const m = mat.clay(color, 0.85)
    add(g, geo.sphere(0.16, 14, 10), m, [0, 0.1, 0])
    add(g, geo.sphere(0.12, 12, 8), m, [-0.15, 0.07, 0.02])
    add(g, geo.sphere(0.12, 12, 8), m, [0.15, 0.07, 0.02])
    return g
}

export function createFlower(color = palette.red) {
    const g = new THREE.Group()
    add(g, geo.cyl(0.008, 0.008, 0.16, 5), mat.clay(palette.leaf), [0, 0.08, 0], { cast: false })
    for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2
        add(g, geo.sphere(0.025, 8, 6), mat.clay(color, 0.7), [Math.cos(a) * 0.03, 0.17, Math.sin(a) * 0.03], { cast: false })
    }
    add(g, geo.sphere(0.02, 8, 6), mat.clay(palette.yellow, 0.6), [0, 0.175, 0], { cast: false })
    return g
}

/** Arcoíris pop-up (moodboard). Origen en la base. */
export function createRainbow({ r = 1.05 } = {}) {
    const g = new THREE.Group()
    g.name = 'arcoiris'
    const colors = [palette.red, palette.orange, palette.yellow, palette.green, palette.blue, palette.lilac]
    colors.forEach((c, i) => {
        const arc = add(g, geo.torus(r - i * 0.075, 0.04, 8, 40, Math.PI), mat.clay(c, 0.7), [0, 0, 0])
        arc.scale.z = 0.6
    })
    const cloud = mat.clay('#ffffff', 0.9)
    for (const s of [-1, 1]) {
        const cx = s * (r - 0.19)
        add(g, geo.sphere(0.17, 14, 10), cloud, [cx, 0.08, 0.05])
        add(g, geo.sphere(0.12, 12, 8), cloud, [cx - 0.15, 0.04, 0.06])
        add(g, geo.sphere(0.12, 12, 8), cloud, [cx + 0.15, 0.04, 0.06])
    }
    return g
}

/** Anillo marcador en el piso (zonas de la actividad 3, lugar abierto). */
export function createRing(r = 0.36, color = '#ffffff', opacity = 0.85) {
    const m = new THREE.Mesh(geo.ring(r * 0.8, r, 48), new THREE.MeshBasicMaterial({ color, transparent: true, opacity, depthWrite: false }))
    m.rotation.x = -Math.PI / 2
    m.position.y = 0.012
    m.userData.ownMaterial = true
    return m
}

/** Huellita de pie (actividad 3: caminar sin correr). */
export function createFootprint(color = '#8f6a55') {
    const g = new THREE.Group()
    const m = mat.basic(color, 0.75)
    for (const s of [-1, 1]) {
        const f = add(g, geo.circle(0.05, 20), m, [s * 0.055, 0.011, s * 0.04], { cast: false })
        f.rotation.x = -Math.PI / 2
        f.scale.set(0.75, 1.15, 1)
        const toe = add(g, geo.circle(0.018, 10), m, [s * 0.055, 0.011, s * 0.04 - 0.07], { cast: false })
        toe.rotation.x = -Math.PI / 2
    }
    return g
}

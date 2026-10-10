/**
 * Muebles y objetos de la casa de Nico. Formas redondeadas tipo arcilla con la
 * paleta del moodboard. Cada función devuelve un Group con el origen en la BASE
 * (o en el punto de giro) para que las animaciones pop-up y de bamboleo giren
 * desde el lugar correcto.
 */
import * as THREE from 'three'
import { geo, mat, add, mesh, seeded } from '../kit.js'
import { palette, blockColors } from '../../data/theme.js'

/** Mesa grande del comedor. userData.legs = patas (para "sujétate"). */
export function createTable({ w = 1.5, d = 0.92, h = 0.78 } = {}) {
    const g = new THREE.Group()
    g.name = 'mesa'
    const top = add(g, geo.rbox(w, 0.08, d, 0.03), mat.clay(palette.wood, 0.7), [0, h - 0.04, 0], { cast: true, receive: true })
    add(g, geo.rbox(w - 0.12, 0.06, d - 0.12, 0.02), mat.clay(palette.woodDark, 0.75), [0, h - 0.1, 0])
    const legH = h - 0.1
    g.userData.legs = []
    for (const sx of [-1, 1]) {
        for (const sz of [-1, 1]) {
            const leg = add(g, geo.cyl(0.042, 0.034, legH, 12), mat.clay(palette.woodDark, 0.75), [sx * (w / 2 - 0.1), legH / 2, sz * (d / 2 - 0.1)])
            g.userData.legs.push(leg)
        }
    }
    g.userData.top = top
    g.userData.height = h
    // zona de toque
    const hit = new THREE.Mesh(geo.box(w, h, d), mat.hit())
    hit.position.y = h / 2
    g.add(hit)
    return g
}

export function createSofa() {
    const g = new THREE.Group()
    g.name = 'sofa'
    const main = mat.clay('#c792ea', 0.85)
    const light = mat.clay('#dcb4f5', 0.85)
    add(g, geo.rbox(1.15, 0.24, 0.55, 0.08), main, [0, 0.17, 0])
    add(g, geo.rbox(1.15, 0.46, 0.16, 0.08), main, [0, 0.4, -0.2])
    for (const s of [-1, 1]) {
        add(g, geo.rbox(0.16, 0.34, 0.55, 0.07), main, [s * 0.56, 0.27, 0])
        add(g, geo.rbox(0.44, 0.1, 0.42, 0.05), light, [s * 0.23, 0.33, 0.03])
        add(g, geo.cyl(0.03, 0.025, 0.06, 8), mat.clay(palette.woodDark), [s * 0.5, 0.03, 0.2])
        add(g, geo.cyl(0.03, 0.025, 0.06, 8), mat.clay(palette.woodDark), [s * 0.5, 0.03, -0.2])
    }
    // cojín amarillo
    const cushion = add(g, geo.rbox(0.24, 0.22, 0.08, 0.06), mat.clay(palette.yellow), [-0.32, 0.47, -0.08])
    cushion.rotation.set(-0.2, 0.2, 0.15)
    return g
}

/** Estante con libros. Origen en la base (se bambolea desde el piso). */
export function createShelf() {
    const g = new THREE.Group()
    g.name = 'estante'
    const wood = mat.clay('#e07b53', 0.75)
    const back = mat.clay('#f6c2a4', 0.9)
    const W = 0.66
    const H = 1.3
    const D = 0.3
    add(g, geo.rbox(0.05, H, D, 0.015), wood, [-W / 2, H / 2, 0])
    add(g, geo.rbox(0.05, H, D, 0.015), wood, [W / 2, H / 2, 0])
    add(g, geo.box(W, H, 0.02), back, [0, H / 2, -D / 2 + 0.01])
    const rnd = seeded(12)
    const colors = [palette.red, palette.blue, palette.yellow, palette.green, palette.lilac, palette.orange]
    for (let i = 0; i < 4; i++) {
        const y = 0.02 + i * (H - 0.04) / 3
        add(g, geo.rbox(W + 0.05, 0.045, D, 0.015), wood, [0, y, 0])
        if (i === 3) break
        let x = -W / 2 + 0.06
        let k = 0
        while (x < W / 2 - 0.1) {
            const bw = 0.05 + rnd() * 0.04
            const bh = 0.22 + rnd() * 0.12
            const book = add(g, geo.rbox(bw, bh, 0.2, 0.012), mat.clay(colors[(i * 3 + k) % colors.length], 0.8), [x + bw / 2, y + 0.022 + bh / 2, 0.01])
            if (rnd() > 0.8) { book.rotation.z = -0.25; book.position.x += 0.03 }
            x += bw + 0.012
            k++
        }
    }
    // planta arriba
    add(g, geo.cyl(0.07, 0.055, 0.1, 12), mat.clay(palette.orange), [0.15, H + 0.07, 0])
    add(g, geo.sphere(0.09, 12, 8), mat.clay(palette.green), [0.15, H + 0.17, 0])
    const hit = new THREE.Mesh(geo.box(W + 0.1, H + 0.2, D), mat.hit())
    hit.position.y = H / 2
    g.add(hit)
    return g
}

/** Ventana grande. Origen en el centro. */
export function createWindow({ w = 0.95, h = 0.78 } = {}) {
    const g = new THREE.Group()
    g.name = 'ventana'
    const frame = mat.clay('#ffffff', 0.6)
    const t = 0.06
    add(g, geo.rbox(w, t, 0.07, 0.02), frame, [0, h / 2, 0])
    add(g, geo.rbox(w, t, 0.07, 0.02), frame, [0, -h / 2, 0])
    add(g, geo.rbox(t, h, 0.07, 0.02), frame, [-w / 2, 0, 0])
    add(g, geo.rbox(t, h, 0.07, 0.02), frame, [w / 2, 0, 0])
    add(g, geo.box(0.03, h, 0.04), frame, [0, 0, 0.01])
    add(g, geo.box(w, 0.03, 0.04), frame, [0, 0, 0.01])
    const glass = add(g, geo.plane(w - 0.04, h - 0.04), mat.custom('windowGlass', () => new THREE.MeshStandardMaterial({
        color: '#bfe6ff', emissive: '#9fd6ff', emissiveIntensity: 0.35, roughness: 0.15, transparent: true, opacity: 0.88,
    })), [0, 0, -0.005], { cast: false })
    g.userData.glass = glass
    add(g, geo.rbox(w + 0.16, 0.05, 0.14, 0.02), frame, [0, -h / 2 - 0.04, 0.04])
    // cortinas
    for (const s of [-1, 1]) {
        const c = add(g, geo.rbox(0.2, h + 0.18, 0.05, 0.05), mat.clay('#f28b82', 0.85), [s * (w / 2 + 0.1), 0.02, 0.06])
        c.rotation.z = s * 0.04
    }
    const hit = new THREE.Mesh(geo.box(w + 0.4, h + 0.25, 0.2), mat.hit())
    g.add(hit)
    return g
}

/** Cuadro con un dibujo infantil (canvas pequeño). Origen en el centro. */
let frameTex = null
export function createFrame() {
    const g = new THREE.Group()
    g.name = 'cuadro'
    add(g, geo.rbox(0.62, 0.48, 0.05, 0.02), mat.clay(palette.yellow, 0.6), [0, 0, 0])
    if (!frameTex) {
        const c = document.createElement('canvas')
        c.width = 256
        c.height = 200
        const x = c.getContext('2d')
        x.fillStyle = '#e8f4ff'; x.fillRect(0, 0, 256, 200)
        x.fillStyle = '#9bd47e'; x.beginPath(); x.ellipse(128, 210, 200, 70, 0, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#f9dc6b'; x.beginPath(); x.arc(200, 50, 26, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#ea5b4f'; x.beginPath(); x.moveTo(60, 110); x.lineTo(110, 70); x.lineTo(160, 110); x.fill()
        x.fillStyle = '#fff3dc'; x.fillRect(72, 110, 76, 56)
        x.fillStyle = '#5eaff2'; x.fillRect(100, 132, 20, 34)
        x.strokeStyle = '#5b4d6e'; x.lineWidth = 3
        x.beginPath(); x.arc(40, 150, 10, 0, Math.PI * 2); x.stroke()
        x.beginPath(); x.moveTo(40, 160); x.lineTo(40, 185); x.stroke()
        frameTex = new THREE.CanvasTexture(c)
        frameTex.colorSpace = THREE.SRGBColorSpace
    }
    add(g, geo.plane(0.52, 0.38), mat.custom('frameArt', () => new THREE.MeshStandardMaterial({ map: frameTex, roughness: 0.8 })), [0, 0, 0.027], { cast: false })
    const hit = new THREE.Mesh(geo.box(0.8, 0.65, 0.15), mat.hit())
    g.add(hit)
    return g
}

/** Lámpara colgante. Origen en el punto de cuelgue (gira como péndulo). */
export function createLamp({ cord = 0.42 } = {}) {
    const g = new THREE.Group()
    g.name = 'lampara'
    add(g, geo.sphere(0.03, 10, 8), mat.clay('#5b4d6e'), [0, 0, 0])
    add(g, geo.cyl(0.008, 0.008, cord, 6), mat.clay('#5b4d6e'), [0, -cord / 2, 0], { cast: false })
    const shade = add(g, geo.cone(0.24, 0.2, 24, true), mat.custom('lampShade', () => new THREE.MeshStandardMaterial({
        color: palette.yellow, roughness: 0.7, side: THREE.DoubleSide,
    })), [0, -cord - 0.08, 0])
    add(g, geo.sphere(0.035, 10, 8), mat.clay(palette.yellow), [0, -cord + 0.02, 0])
    add(g, geo.sphere(0.06, 14, 10), mat.glow('#fff1b0', 1.6), [0, -cord - 0.16, 0], { cast: false })
    g.userData.shade = shade
    const hit = new THREE.Mesh(geo.box(0.6, cord + 0.4, 0.6), mat.hit())
    hit.position.y = -(cord + 0.2) / 2
    g.add(hit)
    return g
}

/** Bloques de juguete (la torre). */
export function createBlock(color, size = 0.17) {
    return mesh(geo.rbox(size, size, size, 0.028), mat.clay(color, 0.6))
}
export function towerColors(n = 6) {
    return Array.from({ length: n }, (_, i) => blockColors[i % blockColors.length])
}

/** Mesón de cocina con vasos (tintinean en la página 2). */
export function createCounter() {
    const g = new THREE.Group()
    g.name = 'cocina'
    add(g, geo.rbox(0.82, 0.56, 0.42, 0.03), mat.clay('#fff1de', 0.8), [0, 0.28, 0])
    add(g, geo.rbox(0.88, 0.05, 0.46, 0.02), mat.clay('#8fd6c4', 0.6), [0, 0.585, 0])
    for (const s of [-1, 1]) add(g, geo.rbox(0.34, 0.4, 0.02, 0.02), mat.clay('#ffe2bf', 0.8), [s * 0.19, 0.28, 0.215])
    g.userData.glasses = []
    const glass = mat.custom('cupGlass', () => new THREE.MeshStandardMaterial({ color: '#d4efff', roughness: 0.1, transparent: true, opacity: 0.6 }))
    ;[-0.24, -0.08, 0.1, 0.25].forEach((x, i) => {
        const cup = add(g, geo.cyl(0.045, 0.036, 0.13, 14), glass, [x, 0.675, (i % 2) * 0.06 - 0.03])
        g.userData.glasses.push(cup)
    })
    // jarra
    add(g, geo.cyl(0.06, 0.07, 0.18, 14), mat.clay(palette.blue, 0.5), [0.33, 0.7, -0.1])
    return g
}

/** Puerta con bisagra. Origen en la base. userData.hinge gira para abrir. */
export function createDoor({ w = 0.62, h = 1.12 } = {}) {
    const g = new THREE.Group()
    g.name = 'puerta'
    const frame = mat.clay('#ffffff', 0.6)
    add(g, geo.rbox(0.07, h + 0.06, 0.08, 0.02), frame, [-w / 2 - 0.035, (h + 0.06) / 2, 0])
    add(g, geo.rbox(0.07, h + 0.06, 0.08, 0.02), frame, [w / 2 + 0.035, (h + 0.06) / 2, 0])
    add(g, geo.rbox(w + 0.14, 0.07, 0.08, 0.02), frame, [0, h + 0.035, 0])
    // luz de afuera (se ve al abrir)
    add(g, geo.plane(w, h), mat.custom('doorLight', () => new THREE.MeshStandardMaterial({
        color: '#fff4c9', emissive: '#ffe9a8', emissiveIntensity: 0.9, roughness: 1,
    })), [0, h / 2, -0.03], { cast: false })
    const hinge = new THREE.Group()
    hinge.position.set(-w / 2, 0, 0)
    g.add(hinge)
    add(hinge, geo.rbox(w, h, 0.05, 0.025), mat.clay(palette.blue, 0.6), [w / 2, h / 2, 0])
    add(hinge, geo.rbox(w - 0.16, h * 0.34, 0.02, 0.02), mat.clay('#86c3f5', 0.6), [w / 2, h * 0.7, 0.03])
    add(hinge, geo.rbox(w - 0.16, h * 0.34, 0.02, 0.02), mat.clay('#86c3f5', 0.6), [w / 2, h * 0.28, 0.03])
    add(hinge, geo.sphere(0.035, 10, 8), mat.clay(palette.yellow, 0.4), [w - 0.08, h * 0.5, 0.05])
    g.userData.hinge = hinge
    return g
}

/** Par de zapatos rojos. */
export function createShoes() {
    const g = new THREE.Group()
    g.name = 'zapatos'
    for (const s of [-1, 1]) {
        const shoe = new THREE.Group()
        shoe.position.set(s * 0.08, 0, 0)
        shoe.rotation.y = s * 0.12
        add(shoe, geo.rbox(0.12, 0.075, 0.2, 0.035), mat.clay(palette.red, 0.6), [0, 0.05, 0])
        add(shoe, geo.rbox(0.13, 0.025, 0.21, 0.01), mat.clay('#ffffff', 0.7), [0, 0.012, 0])
        add(shoe, geo.sphere(0.02, 8, 6), mat.clay('#ffffff'), [0, 0.09, 0.03])
        g.add(shoe)
    }
    const hit = new THREE.Mesh(geo.box(0.5, 0.3, 0.45), mat.hit())
    hit.position.y = 0.1
    g.add(hit)
    return g
}

/** Pedacitos de vidrio en el piso. */
export function createShards(n = 7, seed = 3) {
    const g = new THREE.Group()
    g.name = 'vidrios'
    const rnd = seeded(seed)
    const m = mat.custom('shard', () => new THREE.MeshStandardMaterial({
        color: '#d6f1ff', emissive: '#bfe8ff', emissiveIntensity: 0.2, roughness: 0.05, metalness: 0.2, transparent: true, opacity: 0.85,
    }))
    for (let i = 0; i < n; i++) {
        const s = add(g, geo.tetra(0.045 + rnd() * 0.03), m, [(rnd() - 0.5) * 0.7, 0.015, (rnd() - 0.5) * 0.45])
        s.rotation.set(rnd() * 3, rnd() * 3, rnd() * 3)
        s.scale.y = 0.4
    }
    return g
}

/** Pared de papel con textura de papel tapiz (pieza pop-up del fondo). */
let wallTex = null
export function createWall(w, h, color = '#ffe3c8') {
    if (!wallTex) {
        const c = document.createElement('canvas')
        c.width = c.height = 128
        const x = c.getContext('2d')
        x.fillStyle = '#ffffff'; x.fillRect(0, 0, 128, 128)
        x.fillStyle = 'rgba(234,91,79,0.16)'
        for (const [px, py] of [[32, 32], [96, 96]]) { x.beginPath(); x.arc(px, py, 10, 0, Math.PI * 2); x.fill() }
        x.fillStyle = 'rgba(93,182,90,0.14)'
        for (const [px, py] of [[96, 32], [32, 96]]) { x.beginPath(); x.arc(px, py, 6, 0, Math.PI * 2); x.fill() }
        wallTex = new THREE.CanvasTexture(c)
        wallTex.colorSpace = THREE.SRGBColorSpace
        wallTex.wrapS = wallTex.wrapT = THREE.RepeatWrapping
    }
    const tex = wallTex
    const m = mat.custom(`wall|${color}|${w}|${h}`, () => {
        const t = tex.clone()
        t.repeat.set(w * 2.2, h * 2.2)
        t.needsUpdate = true
        return new THREE.MeshStandardMaterial({ color, map: t, roughness: 0.95 })
    })
    const g = new THREE.Group()
    add(g, geo.rbox(w, h, 0.05, 0.02), m, [0, h / 2, 0], { cast: true, receive: true })
    add(g, geo.rbox(w, 0.09, 0.08, 0.02), mat.clay(palette.wood, 0.7), [0, 0.045, 0.03])
    return g
}

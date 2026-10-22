/**
 * Ilustración de la portada (referencias editoriales: ilustración a sangre,
 * título grande arriba, personajes al centro y árboles que enmarcan).
 *
 * Se pinta UNA vez al inicio con los mismos modelos 3D del cuento —Nico, el
 * Guardián, los pinos, rocas y arbustos de arbolito.blend— sobre un cielo
 * pintado en canvas. El resultado es un canvas 2D que PageArt usa para la tapa.
 */
import * as THREE from 'three'
import { Nico } from '../models/characters/Nico.js'
import { Guardian } from '../models/characters/Guardian.js'
import { createTree, createBush, createFlower } from '../models/objects/outdoor.js'
import { assets } from '../models/assets.js'
import { palette } from '../data/theme.js'
import { seeded, disposeOwned, mat } from '../models/kit.js'

export const COVER_W = 768
export const COVER_H = 1024

let illustration = null
export function getCoverIllustration() { return illustration }

/** Cielo de tarde clara, montañas lila y colinas pastel (la paleta del cuento). */
function paintSky() {
    const c = document.createElement('canvas')
    c.width = COVER_W
    c.height = COVER_H
    const g = c.getContext('2d')
    const sky = g.createLinearGradient(0, 0, 0, COVER_H * 0.62)
    sky.addColorStop(0, '#6fb4ee')
    sky.addColorStop(0.55, '#b9def7')
    sky.addColorStop(1, '#fde7cc')
    g.fillStyle = sky
    g.fillRect(0, 0, COVER_W, COVER_H)
    // resplandor cálido detrás de los personajes
    const sun = g.createRadialGradient(COVER_W * 0.56, COVER_H * 0.56, 10, COVER_W * 0.56, COVER_H * 0.56, COVER_W * 0.62)
    sun.addColorStop(0, 'rgba(255, 238, 200, .95)')
    sun.addColorStop(0.45, 'rgba(255, 226, 190, .35)')
    sun.addColorStop(1, 'rgba(255, 226, 190, 0)')
    g.fillStyle = sun
    g.fillRect(0, 0, COVER_W, COVER_H)
    // nubes suaves
    const rnd = seeded(5)
    g.fillStyle = 'rgba(255,255,255,.75)'
    for (const [cx, cy, s] of [[150, 360, 1], [610, 300, 0.8], [690, 470, 0.6], [80, 520, 0.55]]) {
        for (let k = 0; k < 5; k++) {
            g.beginPath()
            g.ellipse(cx + (k - 2) * 46 * s, cy + (rnd() - 0.5) * 18 * s, 62 * s, 34 * s, 0, 0, Math.PI * 2)
            g.fill()
        }
    }
    // montañas lila y colinas
    g.fillStyle = '#cdbfe8'
    g.beginPath()
    g.moveTo(0, 600)
    for (const [x, y] of [[90, 520], [190, 575], [300, 495], [430, 580], [560, 505], [680, 560], [768, 520], [768, 680], [0, 680]]) g.lineTo(x, y)
    g.closePath()
    g.fill()
    for (const [color, base, amp, ph] of [['#c4e3a4', 610, 26, 0.4], ['#a9d68c', 640, 22, 2.1]]) {
        g.fillStyle = color
        g.beginPath()
        g.moveTo(0, COVER_H)
        for (let x = 0; x <= COVER_W; x += 16) g.lineTo(x, base - Math.sin(x / 120 + ph) * amp - Math.sin(x / 47 + ph * 2) * amp * 0.25)
        g.lineTo(COVER_W, COVER_H)
        g.closePath()
        g.fill()
    }
    return c
}

/**
 * Pinta la ilustración con el renderer del cuento (mismo tono, sombras y
 * colores que el resto del libro) y la copia a un canvas 2D.
 */
export function prepareCover(renderer) {
    if (illustration || !assets.nico) return illustration
    const scene = new THREE.Scene()
    const skyTex = new THREE.CanvasTexture(paintSky())
    skyTex.colorSpace = THREE.SRGBColorSpace
    scene.background = skyTex
    scene.fog = new THREE.Fog('#f6e6d2', 7, 18)

    scene.add(new THREE.HemisphereLight('#fff3e2', '#9cc48a', 1.5))
    const sun = new THREE.DirectionalLight('#ffe6c4', 2.4)
    sun.position.set(-2.5, 5, 4)
    sun.castShadow = true
    sun.shadow.mapSize.set(1024, 1024)
    Object.assign(sun.shadow.camera, { left: -2.5, right: 2.5, top: 2.5, bottom: -2.5, near: 1, far: 14 })
    sun.shadow.bias = -0.0008
    sun.shadow.radius = 4
    scene.add(sun)
    const rim = new THREE.DirectionalLight('#d9e8ff', 0.8)
    rim.position.set(3, 4, -5)
    scene.add(rim)

    // colina de pasto
    const groundMat = new THREE.MeshStandardMaterial({ color: '#93cc78', roughness: 1 })
    const ground = new THREE.Mesh(new THREE.CircleGeometry(30, 48), groundMat)
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    scene.add(ground)

    // pinos que enmarcan (como los árboles de las referencias)
    for (const [x, z, h, v, color] of [
        [-1.42, -0.35, 2.6, 2, '#4f9a57'], [1.5, -0.55, 2.3, 1, '#5aa463'],
        [2.45, -2.4, 2.1, 2, '#6aae64'], [-2.4, -2.1, 2.3, 1, '#62a35d'], [-1.3, -4.2, 1.6, 1, '#74b46a'], [1.25, -4.6, 1.5, 2, '#74b46a'],
    ]) {
        const t = createTree({ h, variant: v, color })
        t.position.set(x, 0, z)
        t.rotation.y = x * 1.7
        t.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true } })
        scene.add(t)
    }
    const rock = (name, x, z, s, color) => {
        const r = new THREE.Mesh(assets.nature[name], mat.flat(color))
        r.position.set(x, 0, z)
        r.scale.setScalar(s)
        r.castShadow = r.receiveShadow = true
        scene.add(r)
    }
    rock('roca_1', -0.98, 0.55, 0.42, '#a59b90')
    rock('roca_3', 1.05, 0.25, 0.32, '#b3a796')
    rock('roca_2', 0.72, 0.95, 0.2, '#968c84')
    for (const [x, z, s, c] of [[-1.25, 0.25, 1.25, palette.green], [1.42, 0.6, 1.1, '#7cc96b'], [-0.45, -0.9, 0.9, '#6dbb63']]) {
        const b = createBush(c)
        b.position.set(x, 0, z)
        b.scale.setScalar(s)
        scene.add(b)
    }
    const fl = [palette.red, palette.yellow, palette.lilac, palette.orange, '#ffffff']
    const rnd = seeded(11)
    for (let i = 0; i < 16; i++) {
        const f = createFlower(fl[i % fl.length])
        const a = rnd() * Math.PI
        f.position.set(Math.cos(a) * (0.75 + rnd() * 0.75), 0, 0.55 + rnd() * 0.75)
        f.scale.setScalar(0.9 + rnd() * 0.5)
        scene.add(f)
    }

    // Nico y su Guardián
    const still = { intensity: 0, shake: new THREE.Vector3() }
    const nico = new Nico()
    nico.setShoes(true)
    nico.face('smile')
    nico.poseInstant('idle')
    Object.assign(nico.p, { armRx: -2.55, armRz: -0.45, elbowR: 0.55, headY: 0.18, headX: -0.06, headZ: -0.05 })
    Object.assign(nico.s, nico.p)
    nico.rotation.y = -0.22
    nico.position.set(-0.12, 0, 0.2)
    scene.add(nico)
    nico.applyRig(0.4, 0, still)

    const guardian = new Guardian()
    guardian.home.set(0.36, 0.86, 0.32)
    guardian.position.copy(guardian.home)
    guardian.glow = 1.1
    scene.add(guardian)
    const glow = new THREE.PointLight('#c9f7a6', 0.9, 1.6, 2)
    glow.position.copy(guardian.home)
    scene.add(glow)

    const camera = new THREE.PerspectiveCamera(31, COVER_W / COVER_H, 0.1, 60)
    camera.position.set(0.05, 1.05, 4.7)
    camera.lookAt(0.05, 1.12, 0)
    guardian.faceViewer = true
    for (let i = 0; i < 3; i++) guardian.update(1 / 30, 1.2, camera)
    nico.applyRig(0.4, 0, still)
    scene.updateMatrixWorld(true)

    // render con el renderer del cuento y copia inmediata a un canvas 2D
    const size = renderer.getSize(new THREE.Vector2())
    const ratio = renderer.getPixelRatio()
    const out = document.createElement('canvas')
    out.width = COVER_W
    out.height = COVER_H
    try {
        renderer.setPixelRatio(1)
        renderer.setSize(COVER_W, COVER_H, false)
        renderer.render(scene, camera)
        out.getContext('2d').drawImage(renderer.domElement, 0, 0, COVER_W, COVER_H)
        illustration = out
    } catch (err) {
        console.warn('[cuento] No se pudo pintar la portada 3D', err)
    } finally {
        renderer.setPixelRatio(ratio)
        renderer.setSize(size.x, size.y, false)
    }

    // limpieza (las geometrías y materiales del kit se comparten: no se liberan)
    disposeOwned(scene)
    skyTex.dispose()
    groundMat.dispose()
    ground.geometry.dispose()
    sun.shadow.map?.dispose()
    return illustration
}

/**
 * Avatares de la tarjeta de diálogo (Guía visual §7.5): el rostro de Nico sobre
 * azul y el del Guardián sobre morado, pintados con los mismos modelos 3D.
 * Devuelve { nico, guardian } como data URLs.
 */
export function renderPortraits(renderer) {
    if (!assets.nico) return {}
    const SIZE = 192
    const out = {}
    const size = renderer.getSize(new THREE.Vector2())
    const ratio = renderer.getPixelRatio()
    const still = { intensity: 0, shake: new THREE.Vector3() }
    const shot = (scene, camera) => {
        renderer.render(scene, camera)
        const c = document.createElement('canvas')
        c.width = c.height = SIZE
        c.getContext('2d').drawImage(renderer.domElement, 0, 0, SIZE, SIZE)
        return c.toDataURL('image/png')
    }
    const lights = (scene) => {
        scene.add(new THREE.HemisphereLight('#ffffff', '#c9b8e8', 1.6))
        const key = new THREE.DirectionalLight('#fff1dc', 2.2)
        key.position.set(-1, 2, 3)
        scene.add(key)
    }
    try {
        renderer.setPixelRatio(1)
        renderer.setSize(SIZE, SIZE, false)

        const s1 = new THREE.Scene()
        s1.background = new THREE.Color('#2F6FD0')
        lights(s1)
        const nico = new Nico()
        nico.face('smile')
        nico.poseInstant('idle')
        nico.applyRig(0.4, 0, still)
        s1.add(nico)
        s1.updateMatrixWorld(true)
        const c1 = new THREE.PerspectiveCamera(34, 1, 0.05, 10)
        c1.position.set(0.06, 0.78, 0.62)
        c1.lookAt(0, 0.75, 0)
        out.nico = shot(s1, c1)
        disposeOwned(s1)

        const s2 = new THREE.Scene()
        s2.background = new THREE.Color('#6B3FC4')
        lights(s2)
        const g = new Guardian()
        g.position.set(0, 0, 0)
        g.home.set(0, 0, 0)
        g.glow = 0.9
        s2.add(g)
        const c2 = new THREE.PerspectiveCamera(34, 1, 0.05, 10)
        c2.position.set(0, 0.04, 0.66)
        c2.lookAt(0, 0.04, 0)
        g.faceViewer = true
        g.update(1 / 30, 0, c2)
        g.position.set(0, 0, 0)
        g.inner.position.set(0, 0, 0)
        g.inner.rotation.set(0, 0, 0)
        s2.updateMatrixWorld(true)
        out.guardian = shot(s2, c2)
        disposeOwned(s2)
    } catch (err) {
        console.warn('[cuento] No se pudieron pintar los avatares', err)
    } finally {
        renderer.setPixelRatio(ratio)
        renderer.setSize(size.x, size.y, false)
    }
    return out
}

/**
 * Avatares de los cuadros de diálogo, pintados una vez al inicio con los
 * mismos modelos 3D del cuento. (La portada del libro es una ilustración:
 * textures/portada.jpg, ver models/assets.js.)
 */
import * as THREE from 'three'
import { Nico } from '../models/characters/Nico.js'
import { Guardian } from '../models/characters/Guardian.js'
import { assets } from '../models/assets.js'
import { disposeOwned } from '../models/kit.js'

/**
 * Cabeza de Nico con fondo transparente (marcador de la barra de avance).
 * Se pinta una vez con el mismo modelo 3D, en un lienzo pequeño propio con
 * canal alfa que se libera enseguida.
 */
function headCutout() {
    const SIZE = 160
    const canvas = document.createElement('canvas')
    const r = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: true })
    try {
        r.setPixelRatio(1)
        r.setSize(SIZE, SIZE, false)
        r.setClearColor(0x000000, 0)
        r.outputColorSpace = THREE.SRGBColorSpace
        const scene = new THREE.Scene()
        scene.add(new THREE.HemisphereLight('#ffffff', '#c9b8e8', 1.7))
        const key = new THREE.DirectionalLight('#fff1dc', 2.1)
        key.position.set(-1, 2, 3)
        scene.add(key)
        const nico = new Nico()
        nico.face('smile')
        nico.poseInstant('idle')
        nico.applyRig(0.4, 0, { intensity: 0, shake: new THREE.Vector3() })
        // sin ropa: solo la cara, el pelo y el cuello
        const HEAD = ['piel', 'ojos', 'ojos_brillo', 'cejas', 'pelo', 'nariz']
        nico.model.traverse((o) => { if (o.isSkinnedMesh && !HEAD.includes(o.userData.matName)) o.visible = false })
        scene.add(nico)
        scene.updateMatrixWorld(true)
        // solo la cabeza (con el pelo): de la barbilla a la coronilla
        const cam = new THREE.PerspectiveCamera(30, 1, 0.05, 10)
        cam.position.set(0.04, 0.71, 0.92)
        cam.lookAt(0, 0.71, 0)
        r.render(scene, cam)
        const url = canvas.toDataURL('image/png')
        disposeOwned(scene)
        return url
    } catch (err) {
        console.warn('[cuento] No se pudo pintar la cabeza de Nico', err)
        return null
    } finally {
        r.dispose()
        r.forceContextLoss()
    }
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
        c1.position.set(0.05, 0.71, 0.64)
        c1.lookAt(0, 0.68, 0)
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

        out.nicoHead = headCutout()
    } catch (err) {
        console.warn('[cuento] No se pudieron pintar los avatares', err)
    } finally {
        renderer.setPixelRatio(ratio)
        renderer.setSize(size.x, size.y, false)
    }
    return out
}

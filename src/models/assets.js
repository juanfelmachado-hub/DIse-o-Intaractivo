/**
 * Modelos 3D externos (se cargan una sola vez al inicio).
 *
 *  - models/nico.glb        el niño, con esqueleto Mixamo y sus animaciones
 *                           (Caminar, Empinarse, Agacharse, Cubrirse) — de
 *                           "animacion niño.blend"
 *  - models/guardian.glb    el Guardián (girasol), con el mismo esqueleto y las
 *                           mismas animaciones adaptadas — de "guardian animado.blend"
 *  - models/naturaleza.glb  pinos y rocas de arbolito_texturizado.blend, con sus
 *                           materiales pintados a mano (gouache, crayón y lápiz)
 *  - textures/portada.jpg   la ilustración de la portada ("El susurro de la
 *                           Tierra"), recortada a 3:4 como la tapa del libro
 *
 * Las geometrías se comparten entre todas las páginas: nunca se liberan.
 */
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export const assets = {
    nico: null,
    nicoClips: [],
    guardian: null,
    guardianClips: [],
    cover: null,
    /** nombre del nodo → geometría (pino_1_copa, pino_1_tronco, roca_1…) */
    nature: {},
    /** nombre del nodo → material pintado del mismo archivo */
    natureMats: {},
}

export async function loadAssets(base = './') {
    const loader = new GLTFLoader()
    const [nico, guardian, nature, cover] = await Promise.all([
        loader.loadAsync(base + 'models/nico.glb'),
        loader.loadAsync(base + 'models/guardian.glb'),
        loader.loadAsync(base + 'models/naturaleza.glb'),
        new THREE.TextureLoader().loadAsync(base + 'textures/portada.jpg'),
    ])
    cover.colorSpace = THREE.SRGBColorSpace
    cover.anisotropy = 8
    assets.cover = cover
    assets.nico = nico.scene
    assets.nicoClips = nico.animations
    assets.guardian = guardian.scene
    assets.guardianClips = guardian.animations
    nature.scene.traverse((o) => {
        if (!o.isMesh) return
        assets.nature[o.name] = o.geometry
        assets.natureMats[o.name] = o.material
    })
}

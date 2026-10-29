/**
 * Modelos 3D externos (se cargan una sola vez al inicio).
 *
 *  - models/nico.glb        el niño, con esqueleto Mixamo y sus animaciones
 *                           (Caminar, Empinarse, Agacharse, Cubrirse) — de
 *                           "animacion niño.blend"
 *  - models/guardian.glb    el Guardián (girasol), con el mismo esqueleto y las
 *                           mismas animaciones adaptadas — de "guardian animado.blend"
 *  - models/naturaleza.glb  pinos y rocas de arbolito.blend (sin materiales:
 *                           los colores se asignan en el código)
 *
 * Las geometrías se comparten entre todas las páginas: nunca se liberan.
 */
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export const assets = {
    nico: null,
    nicoClips: [],
    guardian: null,
    guardianClips: [],
    /** nombre del nodo → geometría (pino_1_copa, pino_1_tronco, roca_1…) */
    nature: {},
}

export async function loadAssets(base = './') {
    const loader = new GLTFLoader()
    const [nico, guardian, nature] = await Promise.all([
        loader.loadAsync(base + 'models/nico.glb'),
        loader.loadAsync(base + 'models/guardian.glb'),
        loader.loadAsync(base + 'models/naturaleza.glb'),
    ])
    assets.nico = nico.scene
    assets.nicoClips = nico.animations
    assets.guardian = guardian.scene
    assets.guardianClips = guardian.animations
    nature.scene.traverse((o) => {
        if (o.isMesh) assets.nature[o.name] = o.geometry
    })
}

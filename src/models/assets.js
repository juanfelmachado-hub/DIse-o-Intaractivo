/**
 * Modelos 3D externos (se cargan una sola vez al inicio).
 *
 *  - models/nico.glb        el niño (convertido del FBX entregado; el FBX no
 *                           traía esqueleto, así que se le agregó uno en Blender
 *                           con los nombres que usa models/characters/Nico.js)
 *  - models/naturaleza.glb  pinos y rocas de arbolito.blend (sin materiales:
 *                           los colores se asignan en el código)
 *
 * Las geometrías se comparten entre todas las páginas: nunca se liberan.
 */
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export const assets = {
    nico: null,
    /** nombre del nodo → geometría (pino_1_copa, pino_1_tronco, roca_1…) */
    nature: {},
}

export async function loadAssets(base = './') {
    const loader = new GLTFLoader()
    const [nico, nature] = await Promise.all([
        loader.loadAsync(base + 'models/nico.glb'),
        loader.loadAsync(base + 'models/naturaleza.glb'),
    ])
    assets.nico = nico.scene
    nature.scene.traverse((o) => {
        if (o.isMesh) assets.nature[o.name] = o.geometry
    })
}

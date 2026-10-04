/**
 * Registro de escenarios. Para crear uno nuevo: extender BaseScene, construir
 * en build() y registrarlo aquí con el nombre que se usará en data/story.js.
 */
import { RoomScene } from './RoomScene.js'
import { UnderTableScene } from './UnderTableScene.js'
import { ExitScene } from './ExitScene.js'
import { RouteScene } from './RouteScene.js'
import { PatioScene } from './PatioScene.js'

export const sceneRegistry = {
    room: RoomScene,
    underTable: UnderTableScene,
    exit: ExitScene,
    route: RouteScene,
    patio: PatioScene,
}

export function createScene(name, ctx, setup) {
    const SceneClass = sceneRegistry[name]
    if (!SceneClass) throw new Error(`Escenario desconocido: ${name}`)
    return new SceneClass(ctx, setup).init()
}

/** Registro de juegos: taskId (usado en data/story.js) → clase. */
import { RadarActivity } from './RadarActivity.js'
import { DrumActivity } from './DrumActivity.js'
import { HallwayActivity } from './HallwayActivity.js'
import { PatioActivity } from './PatioActivity.js'
import { activities } from '../data/activities.js'

const registry = {
    'juego-radar': RadarActivity,
    'juego-tambor': DrumActivity,
    'juego-pasillo': HallwayActivity,
    'juego-patio': PatioActivity,
}

export function createActivity(id, ctx, scene) {
    const ActivityClass = registry[id]
    if (!ActivityClass) throw new Error(`Juego desconocido: ${id}`)
    return new ActivityClass(ctx, activities[id], scene)
}

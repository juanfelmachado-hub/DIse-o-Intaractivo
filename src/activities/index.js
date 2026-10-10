/** Registro de actividades: id (usado en data/story.js) → clase. */
import { SafePlaceActivity } from './SafePlaceActivity.js'
import { ProtectStepsActivity } from './ProtectStepsActivity.js'
import { SafeRouteActivity } from './SafeRouteActivity.js'
import { activities } from '../data/activities.js'

const registry = {
    safePlace: SafePlaceActivity,
    protectSteps: ProtectStepsActivity,
    safeRoute: SafeRouteActivity,
}

export function createActivity(id, ctx, scene) {
    const ActivityClass = registry[id]
    if (!ActivityClass) throw new Error(`Actividad desconocida: ${id}`)
    return new ActivityClass(ctx, activities[id], scene)
}

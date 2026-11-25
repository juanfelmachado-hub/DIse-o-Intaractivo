/**
 * Emulador IWER: ¿Nico está derecho? Devuelve cuánto se inclina su eje vertical (Y)
 * respecto a la vertical de la maqueta, en grados (0 = de pie / sentado derecho).
 * Útil después de soltar a Nico con la mano bajo la mesa (juego 1): antes del
 * arreglo de StorySystem quedaba acostado (≈ 65°).
 */
export default async function run({ page, frame }) {
    return (frame ?? page).evaluate(() => {
        const c = window.cuento, n = c.story.scene.nico;
        const up = n.up.clone().set(0, 1, 0).applyQuaternion(n.getWorldQuaternion(n.quaternion.clone()));
        const ref = up.clone().set(0, 1, 0).applyQuaternion(c.story.scene.group.getWorldQuaternion(n.quaternion.clone()));
        const deg = (up.angleTo(ref) * 180) / Math.PI;
        return { inclinacion: +deg.toFixed(2), derecho: deg < 2, pose: n.currentPose, modo: c.world.globals.nico.mode, base: [n.rotation.x, n.rotation.y, n.rotation.z].map((v) => +v.toFixed(3)) };
    });
}

/** Emulador IWER: hacia dónde mira Nico en el sistema de la maqueta (z+ = hacia el lector). */
export default async function run({ page, frame }) {
  return (frame ?? page).evaluate(() => {
    const c = window.cuento, n = c.story.scene.nico, g = c.story.scene.group;
    const q = g.getWorldQuaternion(n.quaternion.clone()).invert().multiply(n.getWorldQuaternion(n.quaternion.clone()));
    const f = n.position.clone().set(0, 0, 1).applyQuaternion(q);
    return { frente: [f.x, f.y, f.z].map((v) => +v.toFixed(2)), haciaLector: f.z > 0.7 };
  });
}

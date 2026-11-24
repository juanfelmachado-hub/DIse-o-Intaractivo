/** Emulador IWER: ángulo (grados) entre hacia dónde mira Nico y la dirección a la puerta (en el piso). */
export default async function run({ page, frame }) {
  return (frame ?? page).evaluate(() => {
    const c = window.cuento, s = c.story.scene, n = s.nico, a = c.story.activity;
    const q = n.getWorldQuaternion(n.quaternion.clone());
    const f = n.position.clone().set(0, 0, 1).applyQuaternion(q).setY(0).normalize();
    const p = n.getWorldPosition(n.position.clone());
    const d = s.group.localToWorld(s.anchors.door.clone()).sub(p).setY(0).normalize();
    return { act: a?.constructor.name ?? null, u: +(a?.u ?? -1).toFixed(2), mode: c.world.globals.nico.mode, offDoor: Math.round((Math.acos(Math.max(-1, Math.min(1, f.dot(d)))) * 180) / Math.PI), upright: +q.clone().multiply(q.clone().set(0, 0, 0, 1)).y.toFixed(2) };
  });
}

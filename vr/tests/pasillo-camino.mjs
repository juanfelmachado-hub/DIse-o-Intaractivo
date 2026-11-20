/** Emulador IWER: progreso del camino del pasillo (u), centro de Nico y puntos del camino en mundo. */
export default async function run({ page, frame }) {
  return (frame ?? page).evaluate(() => {
    const c = window.cuento, g = c.world.globals, s = c.story.scene, a = c.story.activity;
    const r = (v) => [+v.x.toFixed(3), +v.y.toFixed(3), +v.z.toFixed(3)];
    const it = [...g.interact.items].find((x) => x.kind === 'nico');
    const ctr = it.box.getCenter(s.nico.position.clone()).applyMatrix4(s.nico.matrixWorld);
    const pts = [];
    for (let i = 0; i <= 10; i++) { const u = Math.min(1, (a?.u ?? 0) + i * 0.05); pts.push(r(s.group.localToWorld(s.pointOnPath(u).clone().setY(0)))); }
    return { act: a?.constructor.name ?? null, u: +(a?.u ?? -1).toFixed(3), nico: r(ctr), mode: g.nico.mode, hands: g.handState.right.mode, pts };
  });
}

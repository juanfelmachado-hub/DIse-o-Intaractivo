/** Emulador IWER: zonas del patio y Nico (mundo). Con window.__go = 'patio' salta al patio y espera el juego. */
export default async function run({ page, frame }) {
  return (frame ?? page).evaluate(async () => {
    const c = window.cuento, g = c.world.globals, sleep = (ms) => new Promise((ok) => setTimeout(ok, ms));
    if (window.__go === 'patio') {
      window.__go = null;
      c.story.jumpTo('patio');
      for (let i = 0; i < 300 && !c.story.activity; i++) { await sleep(150); if (c.story.mode === 'reading' && c.ui.el.next.dataset.role === 'next') c.ui.el.next.click(); }
      await sleep(2500);
    }
    const s = c.story.scene, a = c.story.activity, r = (v) => [+v.x.toFixed(3), +v.y.toFixed(3), +v.z.toFixed(3)];
    const zones = {}; for (const [id, z] of Object.entries(s.zones ?? {})) zones[id] = r(s.group.localToWorld(s.group.position.clone().set(z.x, 0, z.z)));
    const it = [...g.interact.items].find((x) => x.kind === 'nico');
    return { act: a?.constructor.name ?? null, done: !!a?.done, beat: c.story.beat, nico: it && r(it.box.getCenter(s.nico.position.clone()).applyMatrix4(s.nico.matrixWorld)), base: r(s.nico.position), mode: g.nico.mode, zones };
  });
}

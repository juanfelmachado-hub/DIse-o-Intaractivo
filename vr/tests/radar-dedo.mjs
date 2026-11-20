/**
 * Emulador IWER: avanza hasta el radar (salta la torre) y devuelve, en el mundo,
 * el centro de cada peligro y de lo seguro, el estado del radar táctil y del anillo.
 *   npx @iwsdk/cli browser run tests/radar-dedo.mjs --timeout 110000
 */
export default async function run({ page, frame }) {
  return (frame ?? page).evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const c = window.cuento, { story, ui } = c, g = c.world.globals;
    for (let i = 0; i < 400 && !(story.activity?.found); i++) {
      await sleep(150);
      if (g.tower?.active) g.tower.skip();
      if (story.mode === 'reading' && !story.activity && ui.el.next.dataset.role === 'next') ui.el.next.click();
    }
    await sleep(500);
    const a = story.activity, s = story.scene;
    const r = (v) => [+v.x.toFixed(3), +v.y.toFixed(3), +v.z.toFixed(3)];
    const center = (o) => { const b = new o.position.constructor(); o.updateWorldMatrix(true, true); return r(o.getWorldPosition(b)); };
    return {
      at: `p${story.index} b${story.beat}`, act: a?.constructor.name, found: a?.found ? [...a.found] : null, allFound: !!a?.allFound,
      prox: +(a?.prox ?? 0).toFixed(3), touch: { active: g.radarTouch.active, hasTip: g.radarTouch.hasTip, tip: r(g.radarTouch.tip) },
      hazards: Object.fromEntries((a?.data?.hazards ?? []).map((id) => [id, center(s.hotspots[id])])),
      shapes: Object.fromEntries([...(a?.data?.hazards ?? []), 'sofa', 'planta'].map((id) => { const v = g.radarTouch.centerOf(id); return [id, v && r(v)]; })),
      tracker: !!c.pointer.tracker,
    };
  });
}

/** Emulador IWER: estado del radar táctil (peligros encontrados, cercanía, punta del dedo y anillo). */
export default async function run({ page, frame }) {
  return (frame ?? page).evaluate(() => {
    const c = window.cuento, g = c.world.globals, a = c.story.activity, r = (v) => [+v.x.toFixed(3), +v.y.toFixed(3), +v.z.toFixed(3)];
    const ring = c.world.scene.getObjectsByProperty?.('isMesh', true).find((m) => m.userData?.radarRing);
    const idx = g.hands?.list?.find((h) => h.side === 'right')?.index;
    return { act: a?.constructor.name ?? null, found: a?.found ? [...a.found] : null, allFound: !!a?.allFound, prox: +(a?.prox ?? 0).toFixed(3),
      touch: g.radarTouch.active, hasTip: g.radarTouch.hasTip, tip: r(g.radarTouch.tip), index: idx && r(idx), radarHidden: c.ui.el.radar.hidden };
  });
}

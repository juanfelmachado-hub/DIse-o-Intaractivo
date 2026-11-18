/** Emulador IWER: estado de Nico, el Guardián, los bloques, el libro y las manos (posiciones en mundo). */
export default async function run({ page, frame }) {
  return (frame ?? page).evaluate(() => {
    const c = window.cuento, g = c.world.globals, s = c.story.scene;
    const r = (v) => [+v.x.toFixed(3), +v.y.toFixed(3), +v.z.toFixed(3)];
    const wp = (o) => r(o.getWorldPosition(o.position.clone()));
    const items = [...g.interact.items].map((it) => {
      const ctr = it.box.getCenter(it.object.position.clone()).applyMatrix4(it.object.matrixWorld);
      return { kind: it.kind, c: r(ctr), en: it.enabled !== false };
    });
    const inner = c.book.inner, P = (x, z) => r(inner.localToWorld(inner.position.clone().set(x, 0, z)));
    return {
      beat: [c.story.index, c.story.beat], act: c.story.activity?.constructor?.name ?? null,
      floor: c.diorama.position.y, page: +c.book.stage.getWorldPosition(c.book.stage.position.clone()).y.toFixed(3), k: c.diorama.scale.x,
      corners: [P(-3.15, -2.1), P(3.15, 2.1)],
      nico: s?.nico ? { pos: wp(s.nico), mode: g.nico?.mode, away: g.nico?.away } : null,
      guardian: s?.guardian ? { pos: wp(s.guardian), state: g.reactions?.gc?.state ?? g.reactions?.guardian?.state } : null,
      hands: g.handState ? Object.fromEntries(Object.entries(g.handState).map(([k, h]) => [k, h?.mode])) : null,
      turner: { state: c.turner.state, theta: +c.turner.theta.toFixed(3), target: +c.turner.target.toFixed(3), locked: c.turner.locked, busy: c.turner.busy, lock: g.interactLock ?? null, holding: g.pages?.holding ?? null },
      heart: g.heart?.active ? { phase: g.heart.phase, taps: g.heart.taps, pos: wp(g.heart.object), r: +(0.5 * 0.5 * c.diorama.scale.x * 1.15).toFixed(3), actTaps: c.story.activity?.taps, need: c.story.activity?.data?.taps, finished: !!c.story.activity?.finished, stats: { ...g.heart.stats } } : null,
      items,
    };
  });
}

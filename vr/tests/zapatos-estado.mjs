/** Emulador IWER: estado del juego de los zapatos (posiciones en mundo de cada zapato y cada pie). */
export default async function run({ page, frame }) {
  return (frame ?? page).evaluate(async () => {
    const c = window.cuento, g = c.world.globals, s = c.story.scene;
    const r = (v) => [+v.x.toFixed(3), +v.y.toFixed(3), +v.z.toFixed(3)];
    const V = () => s.group.position.clone();
    const Q = () => s.group.quaternion.clone();
    if (window.__go === 'pasillo' && c.story.activity?.constructor.name !== 'HallwayActivity') {
      c.story.jumpTo('pasillo');
      const sleep = (ms) => new Promise((ok) => setTimeout(ok, ms));
      for (let i = 0; i < 300 && !c.story.activity; i++) {
        await sleep(150);
        if (c.story.mode === 'reading' && c.ui.el.next.dataset.role === 'next') c.ui.el.next.click();
      }
      for (let i = 0; i < 120 && !g.shoes.active; i++) await sleep(150);
      window.__go = null;
    }
    const feet = {};
    for (const side of ['R', 'L']) { const p = V(), q = Q(); if (g.shoes.footTarget(side, p, q)) feet[side] = r(p); }
    const shoes = g.shoes.list.map((x) => ({
      side: x.side, placed: x.placed, mode: x.carry.mode, busy: !!x.item.busy, near: +(x.near ?? 0).toFixed(2), nearSide: x.nearSide, right: x.right, oriented: x.oriented,
      pos: r(x.shoe.getWorldPosition(V())), center: r(x.item.box.getCenter(V()).applyMatrix4(x.shoe.matrixWorld)),
    }));
    return {
      act: c.story.activity?.constructor.name ?? null, active: g.shoes.active, placed: g.shoes.placed, feet, shoes,
      nico: s?.nico ? { pos: r(s.nico.getWorldPosition(V())), mode: g.nico.mode, shoesOn: !!s.nico.shoes?.[0]?.visible } : null,
      hands: Object.fromEntries(Object.entries(g.handState).map(([k, h]) => [k, h.mode + (h.target ? ':' + h.target.kind : '')])),
      walk: !!c.pointer.draggables.get(s?.nico), k: c.diorama.scale.x,
    };
  });
}

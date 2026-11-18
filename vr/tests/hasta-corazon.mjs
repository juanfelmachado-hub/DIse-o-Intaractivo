/**
 * Emulador IWER: avanza hasta que aparece el corazón del juego de ritmo (no lo juega).
 *
 *   npx @iwsdk/cli browser run tests/hasta-corazon.mjs --timeout 110000
 */
export default async function run({ page, frame }) {
  return (frame ?? page).evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const c = window.cuento, { story, ui, pointer } = c, g = c.world.globals;
    const head = () => c.viewCam.position;
    const evtTo = (w) => {
      const ray = pointer.raycaster.ray.clone(); ray.origin.copy(head()); ray.direction.copy(w).sub(head()).normalize();
      const p = w.clone().project(c.viewCam);
      return { ray, ndcX: p.x, ndcY: p.y, clientX: ((p.x + 1) / 2) * 1000, clientY: ((1 - p.y) / 2) * 1000, pointerId: 7, pointerType: 'xr', button: 0 };
    };
    const wp = (o) => o.getWorldPosition(head().clone());
    const local = (v) => story.scene.group.localToWorld(v.clone());
    const drag = async (o, to) => { const f = wp(o); pointer.onDown(evtTo(f)); for (let i = 1; i <= 12; i++) { await sleep(70); pointer.onMove(evtTo(f.clone().lerp(to, i / 12))); } await sleep(70); pointer.onUp(evtTo(to)); };
    const done = new Set();
    for (let i = 0; i < 400; i++) {
      await sleep(200);
      if (g.tower?.active) g.tower.skip();
      const a = story.activity;
      if (g.heart?.active) break;
      if (a && !done.has(a)) {
        const n = a.constructor.name;
        if (n === 'RadarActivity' && a.found) {
          done.add(a);
          for (const id of a.data.hazards) { const o = story.scene.hotspots[id]; pointer.onDown(evtTo(wp(o))); await sleep(60); pointer.onUp(evtTo(wp(o))); await sleep(500); }
          for (let j = 0; j < 40 && !pointer.draggables.size; j++) await sleep(200);
          const t = story.scene.anchors.tableFront;
          await drag(story.scene.nico, local(head().clone().set(t.x, 0, t.z - 0.4)));
        } else if (ui.onStepsGo) { ui.onStepsGo(); await sleep(700); }
        continue;
      }
      if (story.mode === 'reading' && !a && ui.el.next.dataset.role === 'next') ui.el.next.click();
    }
    await sleep(800);
    const r = (v) => [+v.x.toFixed(3), +v.y.toFixed(3), +v.z.toFixed(3)];
    return { at: `p${story.index} b${story.beat}`, role: ui.el.next.dataset.role, act: story.activity?.constructor.name ?? null,
      buttons: g.pages.buttons.map((b) => ({ dir: b.dir, vis: b.group.visible, armed: b.armed, pos: r(b.group.getWorldPosition(b.group.position.clone())) })) };
  });
}

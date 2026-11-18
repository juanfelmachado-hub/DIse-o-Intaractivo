/** Emulador IWER: pulsa «Reiniciar» (la misma acción del botón del panel) y devuelve dónde quedaron Nico, el Guardián y los bloques. */
export default async function run({ page, frame }) {
  return (frame ?? page).evaluate(async () => {
    const c = window.cuento, g = c.world.globals, s = c.story.scene;
    const r = (v) => [+v.x.toFixed(3), +v.y.toFixed(3), +v.z.toFixed(3)];
    const snap = () => ({ at: `p${c.story.index} b${c.story.beat}`, nico: s.nico && r(s.nico.getWorldPosition(s.nico.position.clone())), nicoMode: g.nico?.mode,
      guardian: s.guardian && r(s.guardian.getWorldPosition(s.guardian.position.clone())), blocks: s.blocks?.map((b) => r(b.getWorldPosition(b.position.clone()))) });
    const before = snap();
    const btn = c.ui.el.reset; const btnOk = !!btn;
    if (btn?.onclick) btn.onclick(); else g.resetObjects();
    await new Promise((res) => setTimeout(res, 1800));
    return { btnOk, before, after: snap() };
  });
}

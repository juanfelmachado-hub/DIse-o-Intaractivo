/** Emulador IWER: estado de los botones de la hoja («Continuar» y «Volver») y del cuento. */
export default async function run({ page, frame }) {
  return (frame ?? page).evaluate(() => {
    const c = window.cuento, g = c.world.globals, r = (v) => [+v.x.toFixed(3), +v.y.toFixed(3), +v.z.toFixed(3)];
    const b = g.pages.buttons.map((x) => ({ dir: x.dir, visible: x.group.visible, pos: r(x.group.getWorldPosition(x.group.position.clone())) }));
    return { at: `${c.story.mode} p${c.story.index} b${c.story.beat}`, role: c.ui.el.next.dataset.role, act: c.story.activity?.constructor.name ?? null, tower: !!g.tower?.active, buttons: b };
  });
}

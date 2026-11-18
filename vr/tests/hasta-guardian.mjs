/** Emulador IWER: salta/completa juegos y pulsa «Siguiente» hasta que el Guardián se pueda tocar (está registrado para las manos). */
export default async function run({ page, frame }) {
  return (frame ?? page).evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const c = window.cuento, { story, ui } = c, g = c.world.globals;
    const has = () => [...g.interact.items].some((i) => i.kind === 'guardian');
    for (let i = 0; i < 500 && !has(); i++) {
      await sleep(150);
      if (g.tower?.active) g.tower.skip();
      const a = story.activity;
      if (a?.found && a.data?.hazards) for (const id of a.data.hazards) a.found.add?.(id);
      if (story.mode === 'reading' && !a && ui.el.next.dataset.role === 'next') ui.el.next.click();
    }
    await sleep(800);
    return { at: `p${story.index} b${story.beat}`, act: story.activity?.constructor.name ?? null, guardian: has() };
  });
}

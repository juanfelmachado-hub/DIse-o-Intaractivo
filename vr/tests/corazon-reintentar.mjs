/** Emulador IWER: «Reiniciar» durante el corazón → la cuenta vuelve a 0 y repite la demostración; la historia no cambia. */
export default async function run({ page, frame }) {
  return (frame ?? page).evaluate(async () => {
    const c = window.cuento, g = c.world.globals, at = () => `p${c.story.index} b${c.story.beat}`;
    const before = { at: at(), taps: g.heart.taps };
    g.resetObjects();
    const after = { at: at(), taps: g.heart.taps, phase: g.heart.phase };
    await new Promise((r) => setTimeout(r, 3500));
    return { before, after, later: { phase: g.heart.phase, act: c.story.activity?.constructor.name } };
  });
}

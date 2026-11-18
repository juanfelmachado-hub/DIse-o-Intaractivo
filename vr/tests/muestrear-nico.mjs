/** Emulador IWER: muestrea cada cuadro (5 s) la posición de Nico y el estado de la mano derecha; devuelve el mayor salto entre cuadros. */
export default async function run({ page, frame }) {
  return (frame ?? page).evaluate(async () => {
    const c = window.cuento, g = c.world.globals, n = c.story.scene.nico;
    const v = n.position.clone(), prev = n.getWorldPosition(n.position.clone());
    let maxJump = 0, at = 0; const marks = []; let lastKey = '';
    const t0 = performance.now();
    while (performance.now() - t0 < 5000) {
      await new Promise((r) => requestAnimationFrame(r));
      n.getWorldPosition(v);
      const d = v.distanceTo(prev); const t = (performance.now() - t0) / 1000;
      if (d > maxJump) { maxJump = d; at = t; }
      prev.copy(v);
      const h = g.hands?.list?.find((x) => x.side === 'right');
      const key = `${g.nico.mode}|${h?.tracked}|${g.handState?.right?.mode}`;
      if (key !== lastKey) { lastKey = key; marks.push(`${t.toFixed(2)}s ${key} y=${v.y.toFixed(3)} x=${v.x.toFixed(3)}`); }
    }
    return { maxJump: +maxJump.toFixed(4), at: +at.toFixed(2), marks };
  });
}

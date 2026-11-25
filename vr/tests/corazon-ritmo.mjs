/**
 * Emulador IWER: el juicio del golpe usa el mismo reloj que el anillo y el latido.
 * Golpea (act.tap, el mismo camino que la mano y el gatillo) justo cuando el
 * anillo llega (ring ≈ 1) y luego a mitad de camino (ring ≈ 0,5).
 * Esperado: a tiempo → ok sube; a mitad → offbeat sube (fuera de la ventana ±38 %).
 * Antes: tests/hasta-corazon.mjs con la fase 'play'.
 */
export default async function run({ page, frame }) {
  return (frame ?? page).evaluate(async () => {
    const c = window.cuento, g = c.world.globals, act = c.story.activity;
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const until = async (f, ms = 8000) => { const t = performance.now(); while (!f() && performance.now() - t < ms) await sleep(5); return f(); };
    await until(() => g.heart.phase === 'play', 15000);
    const s0 = { ...g.heart.stats };
    // a tiempo: cuando faltan menos de 40 ms para el latido
    const onTime = [];
    for (let i = 0; i < 3; i++) {
      await until(() => g.heart.nextIn != null && g.heart.nextIn < 0.04);
      const before = act.taps;
      act.tap();
      onTime.push(act.taps > before);
      await sleep(300);
    }
    // a mitad del intervalo (lejos de los dos latidos)
    const offBeat = [];
    for (let i = 0; i < 2; i++) {
      await until(() => g.heart.ring > 0.45 && g.heart.ring < 0.55);
      const before = act.taps;
      act.tap();
      offBeat.push(act.taps > before);
      await sleep(1200);
    }
    const s1 = g.heart.stats;
    return { onTime, offBeat, ok: s1.ok - s0.ok, offbeat: s1.offbeat - s0.offbeat, perfect: s1.perfect - s0.perfect, taps: act.taps };
  });
}

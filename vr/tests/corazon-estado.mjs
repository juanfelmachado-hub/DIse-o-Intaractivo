/** Emulador IWER: estado del corazón (punto de golpe en el mundo, radio, contadores). */
export default async function run({ page, frame }) {
  return (frame ?? page).evaluate(() => {
    const g = window.cuento.world.globals, h = g.heart, t = h.target, act = window.cuento.story.activity;
    return h.active ? { phase: h.phase, taps: h.taps, top: t && [t.pos.x, t.pos.y, t.pos.z].map((v) => +v.toFixed(3)), r: t && +t.r.toFixed(3), stats: { ...h.stats }, armed: null, need: act?.data?.taps } : { active: false };
  });
}

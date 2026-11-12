/** Emulador IWER: piso de la página, escala de la maqueta, posición (mundo) de los 6 bloques y altura de la torre. */
export default async function run({ page, frame }) {
  return (frame ?? page).evaluate(() => {
    const c = window.cuento, s = c.story.scene, r = (v) => [+v.x.toFixed(4), +v.y.toFixed(4), +v.z.toFixed(4)];
    const st = c.book.stage.getWorldPosition(s.group.position.clone());
    return { floor: +st.y.toFixed(4), k: c.diorama.scale.x, blocks: s.blocks.map((b) => r(b.getWorldPosition(b.position.clone()))), h: c.world.globals.tower.height };
  });
}

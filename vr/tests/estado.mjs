/** Emulador IWER: estado breve del cuento (modo, página, momento, juego). */
export default async function run({ page, frame }) {
    return (frame ?? page).evaluate(() => {
        const { story, ui } = window.cuento;
        const a = story.activity;
        return { at: `${story.mode} p${story.index} b${story.beat}`, juego: a?.constructor.name ?? null, encontrados: a?.found ? [...a.found] : null, mision: ui.mission?.text ?? null, exito: ui.success || null, hecho: [...story.tasksDone()] };
    });
}

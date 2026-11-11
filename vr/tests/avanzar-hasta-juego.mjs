/** Emulador IWER: pulsa «Siguiente» (misma acción del botón del panel) hasta que empiece el próximo juego. */
export default async function run({ page, frame }) {
    return (frame ?? page).evaluate(async () => {
        const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
        const { story, ui } = window.cuento;
        for (let i = 0; i < 300 && !story.activity; i++) {
            await sleep(150);
            if (story.mode === 'reading' && ui.el.next.dataset.role === 'next') ui.el.next.click();
        }
        await sleep(2500);
        return { at: `p${story.index} b${story.beat}`, juego: story.activity?.constructor.name, stepsGo: !!ui.onStepsGo };
    });
}

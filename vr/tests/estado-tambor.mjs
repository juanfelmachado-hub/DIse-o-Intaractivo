export default async function run({ page, frame }) {
    return (frame ?? page).evaluate(() => { const a = window.cuento.story.activity; return { juego: a?.constructor.name, golpes: a?.taps, fallos: a?.missed, visible: !window.cuento.ui.el.drum.hidden }; });
}

/**
 * ============================================================================
 *  EL SUSURRO DE LA TIERRA — guion del cuento
 * ============================================================================
 *
 * Este archivo es la ÚNICA fuente de la narrativa. Para editar el cuento no hace
 * falta tocar la lógica visual.
 *
 * Cada entrada de `pages` es una página del libro (type: 'page') o una
 * actividad (type: 'activity').
 *
 *  Página
 *  ------
 *  number   número impreso en la hoja
 *  title    título corto impreso al pie de la página izquierda
 *  scene    escenario pop-up que se despliega sobre el libro (ver /scenes)
 *  setup    estado inicial del escenario (posiciones, objetos, etc.)
 *  mood     atmósfera del mundo alrededor del libro (ver data/theme.js → moods)
 *  camera   encuadre (ver data/theme.js → cameraShots)
 *  quake    intensidad del temblor al llegar a la página (0 = quieto, 1 = fuerte)
 *  beats    momentos dentro de la página. Cada clic en SIGUIENTE avanza un momento;
 *           al terminar los momentos se pasa la página.
 *
 *  Momento (beat)
 *  --------------
 *  text      narración (burbuja principal)
 *  dialogue  { who: 'nico' | 'guardian', text }
 *  do        acciones del escenario. Se ejecutan en orden; un sub-arreglo
 *            ejecuta varias acciones a la vez. Ej: ['nico.pose:crouch', ['a', 'b']]
 *  quake     intensidad del temblor (número) o [intensidad, duración en segundos]
 *  mood      cambia la atmósfera durante el momento
 *
 *  Actividad
 *  ---------
 *  activity  id en data/activities.js
 *  samePage  true → la actividad ocurre sobre el escenario actual (sin pasar página)
 *  (si no es samePage, acepta number/title/scene/setup/mood/camera como una página)
 * ============================================================================
 */

export const story = {
    title: 'El susurro de la Tierra',

    characters: {
        nico: { name: 'Nico', color: '#f08a45' },
        guardian: { name: 'Guardián', color: '#4fae5b' },
    },

    /** Portada (inicio) y contraportada (final). */
    cover: { mood: 'night', camera: 'cover' },
    ending: { mood: 'day', camera: 'cover', label: 'Fin' },

    /** Doble página de título que aparece al abrir el libro. */
    titleSpread: { left: 'Un cuento sobre cómo cuidarnos cuando la tierra se mueve', right: 'El susurro de la Tierra' },

    pages: [
        // ------------------------------------------------------------------ 1
        {
            id: 'p1', type: 'page', number: 1, title: 'Un gran sueño',
            scene: 'room', setup: { tower: 'empty', nico: 'tower' },
            mood: 'afternoon', camera: 'wide', quake: 0,
            beats: [
                {
                    text: 'Nico tenía siete años y un gran sueño: construir la torre de bloques más alta del mundo.',
                    do: ['tower.build'],
                },
                {
                    text: 'Esa tarde le faltaba solo un bloque. El azul, su favorito.',
                    do: ['nico.showBlock'],
                },
            ],
        },
        // ------------------------------------------------------------------ 2
        {
            id: 'p2', type: 'page', number: 2, title: 'Un ruido extraño',
            scene: 'room', setup: { tower: 'built', nico: 'tower' },
            mood: 'afternoon', camera: 'wide', quake: 0,
            beats: [
                {
                    text: 'Estiró la mano con mucho cuidado y…',
                    do: ['nico.reach'],
                },
                {
                    text: 'El piso hizo un ruido extraño. Un ruido grave, como un gruñido que venía de muy abajo.',
                    do: [['nico.face:o', 'rumble']],
                    quake: [0.14, 1.5], mood: 'rumble',
                },
                {
                    text: 'Los vasos empezaron a tintinear en la cocina. Nico se quedó quieto, con el bloque azul en la mano.',
                    dialogue: { who: 'nico', text: '¿Qué fue eso?' },
                    do: [['glasses.clink', 'nico.pose:show']],
                    quake: [0.22, 1.2],
                },
            ],
        },
        // ------------------------------------------------------------------ 3
        {
            id: 'p3', type: 'page', number: 3, title: '¡La casa tiembla!',
            scene: 'room', setup: { tower: 'built', nico: 'tower', face: 'o' },
            mood: 'quake', camera: 'wide', quake: 0.3,
            beats: [
                {
                    text: '¡La casa empezó a temblar!',
                    do: ['nico.pose:worried'],
                    quake: [0.75, 1.2],
                },
                {
                    text: 'La lámpara se balanceó de un lado a otro. La torre se derrumbó en mil pedazos.',
                    do: [['tower.fall', 'wobble:lampara']],
                },
                {
                    text: 'La tierra se estaba moviendo. Y justo en ese instante, algo se despertó dentro del pecho de Nico.',
                    do: ['nico.heart:2'],
                    quake: [0.5, 1.5],
                },
            ],
        },
        // ------------------------------------------------------------------ 4
        {
            id: 'p4', type: 'page', number: 4, title: 'Una voz valiente',
            scene: 'room', setup: { tower: 'fallen', nico: 'center', face: 'o', heart: true },
            mood: 'quake', camera: 'wide', quake: 0.42,
            beats: [
                {
                    text: 'Era una voz pequeñita, pero muy valiente.',
                    dialogue: { who: 'guardian', text: '¡Aquí estoy! ¡Soy tu Guardián! Me desperté para cuidarte.' },
                    do: ['guardian.appear', 'nico.face:smile'],
                },
                {
                    text: 'Nico quería correr hacia la puerta.',
                    do: ['nico.runToDoor'],
                },
                {
                    dialogue: { who: 'guardian', text: '¡Espera! Mientras la tierra se mueve, no se corre. Primero, nos protegemos.' },
                    do: ['guardian.stop'],
                },
            ],
        },
        // ------------------------------------------------------------------ 5
        {
            id: 'p5', type: 'page', number: 5, title: 'Mira a tu alrededor',
            scene: 'room', setup: { tower: 'fallen', nico: 'center', guardian: true },
            mood: 'quake', camera: 'wide', quake: 0.4,
            beats: [
                {
                    dialogue: { who: 'guardian', text: 'Mira a tu alrededor. Aléjate de las ventanas y de las cosas que se pueden caer.' },
                    do: [['nico.lookAround', 'hazards.wobble']],
                },
                {
                    text: 'Nico vio la mesa grande del comedor, fuerte y firme.',
                    dialogue: { who: 'guardian', text: '¡Allá! Vamos despacito.' },
                    do: ['table.glow'],
                },
            ],
        },
        // ---------------------------------------------------- Actividad 1
        { id: 'a1', type: 'activity', activity: 'safePlace', samePage: true },

        // ------------------------------------------------------------------ 6
        {
            id: 'p6', type: 'page', number: 6, title: 'Tres pasos mágicos',
            scene: 'underTable', setup: { nicoPose: 'kneel' },
            mood: 'quake', camera: 'close', quake: 0.38,
            beats: [
                {
                    dialogue: { who: 'guardian', text: 'Ahora, tres pasos mágicos.' },
                    do: ['guardian.glow'],
                },
                {
                    text: 'Nico se agachó debajo de la mesa, bien pequeñito, como una tortuga.',
                    dialogue: { who: 'guardian', text: 'Uno: ¡agáchate!' },
                    do: ['nico.pose:crouch'],
                },
                {
                    text: 'Nico se tapó la cabeza y el cuello con los brazos.',
                    dialogue: { who: 'guardian', text: 'Dos: ¡cúbrete!' },
                    do: ['nico.pose:cover'],
                },
            ],
        },
        // ---------------------------------------------------- Actividad 2
        { id: 'a2', type: 'activity', activity: 'protectSteps', samePage: true },

        // ------------------------------------------------------------------ 7
        {
            id: 'p7', type: 'page', number: 7, title: '¡Sujétate!',
            scene: 'underTable', setup: { nicoPose: 'cover' },
            mood: 'quake', camera: 'close', quake: 0.45,
            beats: [
                {
                    text: 'Nico agarró fuerte una pata de la mesa.',
                    dialogue: { who: 'guardian', text: 'Tres: ¡sujétate!' },
                    do: ['nico.pose:hold'],
                },
                {
                    text: 'Afuera, las cosas seguían sonando: clin, clan, crac.',
                    do: ['sounds'],
                },
                {
                    dialogue: { who: 'guardian', text: 'Aquí estoy contigo. No te sueltes. Ya va a pasar.' },
                    do: ['guardian.hug'],
                },
            ],
        },
        // ------------------------------------------------------------------ 8
        {
            id: 'p8', type: 'page', number: 8, title: 'Pum, pum, pum',
            scene: 'underTable', setup: { nicoPose: 'hold' },
            mood: 'quake', camera: 'close', quake: 0.4,
            beats: [
                {
                    text: 'Nico sentía el corazón como un tambor: pum, pum, pum.',
                    do: ['heartbeat'],
                },
                {
                    dialogue: { who: 'guardian', text: 'Soy yo. Te doy energía para que estés atento.' },
                    do: ['guardian.energy'],
                },
                {
                    text: 'Nico respiró hondo y se quedó quieto, bien agarrado. Poco a poco, el temblor se hizo más suave… más suave…',
                    quake: [0.06, 6], mood: 'calming',
                },
            ],
        },
        // ------------------------------------------------------------------ 9
        {
            id: 'p9', type: 'page', number: 9, title: 'Silencio',
            scene: 'underTable', setup: { nicoPose: 'hold', shards: true },
            mood: 'still', camera: 'close', quake: 0,
            beats: [
                {
                    text: 'Hasta que la casa se quedó quieta. Silencio.',
                    do: ['silence'],
                },
                {
                    dialogue: { who: 'nico', text: '¿Ya puedo salir?' },
                    do: ['nico.peek'],
                },
                {
                    dialogue: { who: 'guardian', text: 'Espera un momentito. Mira bien antes de moverte. Puede haber cosas rotas en el piso.' },
                    do: ['shards.glint'],
                },
            ],
        },
        // ----------------------------------------------------------------- 10
        {
            id: 'p10', type: 'page', number: 10, title: 'Sin correr',
            scene: 'exit', setup: {},
            mood: 'still', camera: 'wide', quake: 0,
            beats: [
                {
                    text: 'Nico salió despacito de debajo de la mesa.',
                    do: ['nico.crawlOut'],
                },
                {
                    dialogue: { who: 'guardian', text: 'Ahora caminamos, sin correr y sin empujar. Con zapatos, por si hay vidrios.' },
                    do: [['shoes.glint', 'shards.glint']],
                },
                {
                    text: 'Nico se puso los zapatos y caminó con cuidado hacia la puerta.',
                    do: ['nico.shoesOn', 'door.open'],
                },
            ],
        },
        // ---------------------------------------------------- Actividad 3
        {
            id: 'a3', type: 'activity', activity: 'safeRoute',
            number: '★', title: 'Camino al lugar seguro',
            scene: 'route', setup: {},
            mood: 'still', camera: 'route', quake: 0,
        },

        // ----------------------------------------------------------------- 11
        {
            id: 'p11', type: 'page', number: 11, title: 'Un lugar abierto',
            scene: 'patio', setup: { nico: 'door' },
            mood: 'golden', camera: 'patio', quake: 0,
            beats: [
                {
                    text: 'Afuera, el Guardián le señaló un lugar abierto, en medio del patio.',
                    do: ['guardian.point', 'nico.walkTo:center'],
                },
                {
                    dialogue: { who: 'guardian', text: 'Lejos de paredes, postes y cables. Aquí nada se nos puede caer encima.' },
                    do: ['hazards.wobble'],
                },
                {
                    text: 'Nico se sentó allí. Esperaría a que llegara un adulto de confianza.',
                    do: ['nico.pose:sit'],
                },
            ],
        },
        // ----------------------------------------------------------------- 12
        {
            id: 'p12', type: 'page', number: 12, title: 'La réplica',
            scene: 'patio', setup: { nico: 'center', nicoPose: 'sit' },
            mood: 'golden', camera: 'patio', quake: 0,
            beats: [
                {
                    text: 'De pronto, la tierra se movió otra vez, un poquito.',
                    do: ['nico.face:o'],
                    quake: [0.22, 0.8], mood: 'rumble',
                },
                {
                    dialogue: { who: 'guardian', text: 'Eso se llama réplica. Es un temblor más pequeño. Si pasa, haz lo mismo.' },
                    do: ['guardian.glow'],
                },
                {
                    text: 'Nico se agachó, se cubrió la cabeza y esperó. Esta vez, ya sabía qué hacer.',
                    do: ['nico.pose:cover', 'calm'],
                    quake: [0, 4], mood: 'golden',
                },
            ],
        },
        // ----------------------------------------------------------------- 13
        {
            id: 'p13', type: 'page', number: 13, title: 'Gracias, Guardián',
            scene: 'patio', setup: { nico: 'center', nicoPose: 'kneel' },
            mood: 'golden', camera: 'patio', quake: 0,
            beats: [
                {
                    text: 'Cuando todo se calmó, Nico sonrió.',
                    dialogue: { who: 'nico', text: 'Gracias, Guardián. Sin ti no habría sabido cómo protegerme.' },
                    do: [['nico.pose:idle', 'nico.face:smile'], 'rainbow.show'],
                },
                {
                    dialogue: { who: 'guardian', text: 'Para eso estoy. Cuando haya peligro, yo te aviso… y tú te cuidas.' },
                    do: ['celebrate'],
                },
            ],
        },
    ],
}

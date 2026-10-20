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
 *  layout   { at, tone } dónde va el texto del narrador y su color de panel
 *           at:   'top' | 'top-left' | 'top-right' | 'side-left' | 'side-right'
 *                 (zona libre de la ilustración: pared, techo o cielo; se alterna
 *                 entre escenas. Los globos de diálogo siempre van junto a quien habla.)
 *           tone: 'light' (panel crema) | 'dark' (panel oscuro: temblor, debajo de la mesa)
 *  beats    momentos dentro de la página. Avanzan solos con un tiempo de lectura
 *           de 3 a 5 s por bloque; al terminar, el lector arrastra la hoja.
 *
 *  Momento (beat)
 *  --------------
 *  text      narración (burbuja principal)
 *  dialogue  { who: 'nico' | 'guardian', text }
 *  do        acciones del escenario. Se ejecutan en orden; un sub-arreglo
 *            ejecuta varias acciones a la vez. Ej: ['nico.pose:crouch', ['a', 'b']]
 *  quake     intensidad del temblor (número) o [intensidad, duración en segundos]
 *  mood      cambia la atmósfera durante el momento
 *  at, tone  cambian la zona o el color del panel solo en este momento
 *
 *  Texto (Instructivo de texto y diálogos): bloques de 8 a 18 palabras, una sola
 *  idea por bloque y un solo personaje por globo. Fuente: "CUENTO FINAL".
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
        // =================================================== ESCENA 1 · LA SALA
        // ------------------------------------------------------------------ 1
        {
            id: 'p1', type: 'page', number: 1, title: 'Un gran sueño',
            scene: 'room', setup: { tower: 'empty', nico: 'tower' },
            mood: 'afternoon', camera: 'wide', quake: 0, layout: { at: 'top-right' },
            beats: [
                {
                    text: 'Nico tenía siete años y un gran sueño: construir la torre de bloques más alta del mundo.',
                    do: ['tower.build'],
                },
                {
                    text: 'Esa tarde, en la sala de su casa, le faltaba solo un bloque. El azul, su favorito.',
                    do: ['nico.showBlock'],
                },
            ],
        },
        // ------------------------------------------------------------------ 2
        {
            id: 'p2', type: 'page', number: 2, title: 'Un ruido extraño',
            scene: 'room', setup: { tower: 'built', nico: 'tower' },
            mood: 'afternoon', camera: 'wide', quake: 0, layout: { at: 'side-right' },
            beats: [
                {
                    text: 'Estiró la mano con mucho cuidado y, de pronto…',
                    do: ['nico.reach'],
                },
                {
                    text: '…el piso hizo un ruido extraño, grave, como un gruñido que venía de muy abajo.',
                    do: [['nico.face:o', 'rumble']],
                    quake: [0.14, 1.5], mood: 'rumble',
                },
                {
                    text: 'Los vasos empezaron a tintinear en la cocina.',
                    do: [['glasses.clink', 'nico.pose:show']],
                    quake: [0.22, 1.2],
                },
            ],
        },
        // ------------------------------------------------------------------ 3
        {
            id: 'p3', type: 'page', number: 3, title: '¡La casa tiembla!',
            scene: 'room', setup: { tower: 'built', nico: 'tower', face: 'o' },
            mood: 'rumble', camera: 'wide', quake: 0.16, layout: { at: 'top-right' },
            beats: [
                {
                    text: 'Nico se quedó quieto, con el bloque azul en la mano.',
                    dialogue: { who: 'nico', text: '¿Qué fue eso?' },
                    do: ['nico.pose:show'],
                },
                {
                    text: '¡La casa empezó a temblar!',
                    do: ['nico.pose:worried'],
                    quake: [0.75, 1.2], mood: 'quake', tone: 'dark',
                },
                {
                    text: 'La lámpara se balanceó de un lado a otro y la torre se derrumbó en mil pedazos.',
                    do: [['tower.fall', 'wobble:lampara']],
                    tone: 'dark',
                },
            ],
        },
        // ------------------------------------------------------------------ 4
        {
            id: 'p4', type: 'page', number: 4, title: 'Una voz valiente',
            scene: 'room', setup: { tower: 'fallen', nico: 'center', face: 'o' },
            mood: 'quake', camera: 'wide', quake: 0.42, layout: { at: 'top-left', tone: 'dark' },
            beats: [
                {
                    text: 'La tierra se estaba moviendo. Y justo en ese instante, algo se despertó dentro del pecho de Nico.',
                    do: ['nico.heart:2'],
                    quake: [0.5, 1.5],
                },
                {
                    text: 'Era una voz pequeñita, pero muy valiente.',
                    dialogue: { who: 'guardian', text: '¡Aquí estoy! ¡Soy tu Guardián! Me desperté para cuidarte.' },
                    do: ['guardian.appear', 'nico.face:smile'],
                },
            ],
        },
        // ------------------------------------------------------------------ 5
        {
            id: 'p5', type: 'page', number: 5, title: '¡Espera!',
            scene: 'room', setup: { tower: 'fallen', nico: 'center', guardian: true },
            mood: 'quake', camera: 'wide', quake: 0.42, layout: { at: 'top-left', tone: 'dark' },
            beats: [
                {
                    text: 'Nico quería correr hacia la puerta.',
                    do: ['nico.runToDoor'],
                },
                {
                    dialogue: { who: 'guardian', text: '¡Espera! Mientras la tierra se mueve, no se corre.' },
                    do: ['guardian.stop'],
                },
                {
                    dialogue: { who: 'guardian', text: 'Primero, nos protegemos.' },
                    do: ['guardian.glow'],
                },
            ],
        },
        // ------------------------------------------------------------------ 6
        {
            id: 'p6', type: 'page', number: 6, title: 'Mira a tu alrededor',
            scene: 'room', setup: { tower: 'fallen', nico: 'center', guardian: true },
            mood: 'quake', camera: 'wide', quake: 0.4, layout: { at: 'side-left', tone: 'dark' },
            beats: [
                {
                    dialogue: { who: 'guardian', text: 'Mira a tu alrededor y aléjate de las ventanas y de las cosas que se pueden caer.' },
                    do: [['nico.lookAround', 'hazards.wobble']],
                },
                {
                    text: 'Nico vio la mesa grande del comedor, fuerte y firme.',
                    do: ['table.glow'],
                },
                {
                    dialogue: { who: 'guardian', text: '¡Allá! Vamos despacito.' },
                },
            ],
        },
        // ---------------------------------------------------- Juego 1
        { id: 'a1', type: 'activity', activity: 'safePlace', samePage: true },

        // ====================================== ESCENA 1 · DEBAJO DE LA MESA
        // ------------------------------------------------------------------ 7
        {
            id: 'p7', type: 'page', number: 7, title: 'Tres pasos mágicos',
            scene: 'underTable', setup: { nicoPose: 'kneel' },
            mood: 'quake', camera: 'close', quake: 0.38, layout: { at: 'top', tone: 'dark' },
            beats: [
                {
                    text: 'Nico llegó hasta la mesa y el Guardián le enseñó tres pasos mágicos.',
                    do: ['guardian.glow'],
                },
                {
                    dialogue: { who: 'guardian', text: 'Uno: ¡agáchate!' },
                    text: 'Nico se agachó debajo de la mesa, bien pequeñito, como una tortuga.',
                    do: ['nico.pose:crouch'],
                },
                {
                    dialogue: { who: 'guardian', text: 'Dos: ¡cúbrete!' },
                    text: 'Se tapó la cabeza y el cuello con los brazos.',
                    do: ['nico.pose:cover'],
                },
            ],
        },
        // ---------------------------------------------------- Juego 2
        { id: 'a2', type: 'activity', activity: 'protectSteps', samePage: true },

        // ------------------------------------------------------------------ 8
        {
            id: 'p8', type: 'page', number: 8, title: '¡Sujétate!',
            scene: 'underTable', setup: { nicoPose: 'cover' },
            mood: 'quake', camera: 'close', quake: 0.45, layout: { at: 'top-left', tone: 'dark' },
            beats: [
                {
                    dialogue: { who: 'guardian', text: 'Tres: ¡sujétate!' },
                    text: 'Agarró fuerte una pata de la mesa.',
                    do: ['nico.pose:hold'],
                },
                {
                    text: 'Afuera, las cosas seguían sonando: clin, clan, crac.',
                    do: ['sounds'],
                },
                {
                    text: 'El corazón de Nico latía como un tambor: pum, pum, pum.',
                    do: ['heartbeat'],
                },
            ],
        },
        // ------------------------------------------------------------------ 9
        {
            id: 'p9', type: 'page', number: 9, title: 'Aquí estoy contigo',
            scene: 'underTable', setup: { nicoPose: 'hold' },
            mood: 'quake', camera: 'close', quake: 0.4, layout: { at: 'top-right', tone: 'dark' },
            beats: [
                {
                    dialogue: { who: 'guardian', text: 'Soy yo. Te doy energía para que estés atento.' },
                    do: ['guardian.energy'],
                },
                {
                    dialogue: { who: 'guardian', text: 'Aquí estoy contigo. No te sueltes. Ya va a pasar.' },
                    do: ['guardian.hug'],
                },
                {
                    text: 'Nico respiró hondo y se quedó quieto, bien agarrado.',
                },
            ],
        },
        // ----------------------------------------------------------------- 10
        {
            id: 'p10', type: 'page', number: 10, title: 'Silencio',
            scene: 'underTable', setup: { nicoPose: 'hold', shards: true },
            mood: 'calming', camera: 'close', quake: 0.3, layout: { at: 'top', tone: 'dark' },
            beats: [
                {
                    text: 'Poco a poco, el temblor se hizo más suave… más suave…',
                    quake: [0.06, 5], mood: 'calming',
                },
                {
                    text: '…hasta que la casa se quedó en silencio.',
                    do: ['silence'],
                    quake: [0, 2], mood: 'still', tone: 'light',
                },
                {
                    dialogue: { who: 'nico', text: '¿Ya puedo salir?' },
                    do: ['nico.peek'],
                    tone: 'light',
                },
            ],
        },

        // ================================================= ESCENA 2 · EL PASILLO
        // ----------------------------------------------------------------- 11
        {
            id: 'p11', type: 'page', number: 11, title: 'Mira bien',
            scene: 'exit', setup: {},
            mood: 'still', camera: 'wide', quake: 0, layout: { at: 'side-left' },
            beats: [
                {
                    dialogue: { who: 'guardian', text: 'Espera un momentito. Mira bien antes de moverte. Puede haber cosas rotas en el piso.' },
                    do: ['shards.glint'],
                },
                {
                    text: 'Nico salió despacito de debajo de la mesa.',
                    do: ['nico.crawlOut'],
                },
                {
                    dialogue: { who: 'guardian', text: 'Ahora ponte los zapatos, por si hay vidrios.' },
                    do: [['shoes.glint', 'shards.glint']],
                },
            ],
        },
        // ----------------------------------------------------------------- 12
        {
            id: 'p12', type: 'page', number: 12, title: 'Sin correr',
            scene: 'exit', setup: { nico: 'out' },
            mood: 'still', camera: 'wide', quake: 0, layout: { at: 'top-left' },
            beats: [
                {
                    dialogue: { who: 'guardian', text: 'Y caminamos sin correr y sin empujar.' },
                },
                {
                    text: 'Nico se puso los zapatos y avanzó con cuidado por el pasillo,',
                    do: ['nico.shoesOn'],
                },
                {
                    text: 'mirando dónde pisaba, hasta llegar a la puerta de la casa.',
                    do: ['door.open'],
                },
            ],
        },
        // ---------------------------------------------------- Juego 3
        {
            id: 'a3', type: 'activity', activity: 'safeRoute',
            number: '★', title: 'Camino al lugar seguro',
            scene: 'route', setup: {},
            mood: 'still', camera: 'route', quake: 0,
        },

        // =================================================== ESCENA 3 · EL PATIO
        // ----------------------------------------------------------------- 13
        {
            id: 'p13', type: 'page', number: 13, title: 'Un lugar abierto',
            scene: 'patio', setup: { nico: 'door' },
            mood: 'golden', camera: 'patio', quake: 0, layout: { at: 'top' },
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
                    text: 'Nico se sentó en el suelo, con las manos sobre las rodillas.',
                    do: ['nico.pose:sit'],
                },
            ],
        },
        // ----------------------------------------------------------------- 14
        {
            id: 'p14', type: 'page', number: 14, title: 'Ya no estaba solo',
            scene: 'patio', setup: { nico: 'center', nicoPose: 'sit' },
            mood: 'golden', camera: 'patio', quake: 0, layout: { at: 'top-left' },
            beats: [
                {
                    text: 'Todavía sentía el corazón rápido, pero ya no estaba solo.',
                    do: ['nico.heart:2'],
                },
                {
                    text: 'Esperaría allí a que llegara un adulto de confianza.',
                    do: ['guardian.glow'],
                },
            ],
        },
        // ----------------------------------------------------------------- 15
        {
            id: 'p15', type: 'page', number: 15, title: 'La réplica',
            scene: 'patio', setup: { nico: 'center', nicoPose: 'sit' },
            mood: 'golden', camera: 'patio', quake: 0, layout: { at: 'top-right' },
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
                    text: 'Nico se agachó, se cubrió la cabeza con los brazos y esperó. Esta vez, ya sabía qué hacer.',
                    do: ['nico.pose:cover', 'calm'],
                    quake: [0, 4], mood: 'golden',
                },
            ],
        },
        // ----------------------------------------------------------------- 16
        {
            id: 'p16', type: 'page', number: 16, title: 'Gracias, Guardián',
            scene: 'patio', setup: { nico: 'center', nicoPose: 'kneel' },
            mood: 'golden', camera: 'patio', quake: 0, layout: { at: 'top' },
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

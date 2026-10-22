/**
 * ============================================================================
 *  NICO Y SU GUARDIÁN PERSONAL — guion del cuento
 * ============================================================================
 *
 * Única fuente de la narrativa (texto literal de "Cuento_Nico_y_su_guardian").
 * Para editar el cuento no hace falta tocar la lógica visual.
 *
 * Guía visual §11.2: UNA página del libro por escenario (la sala, el pasillo y
 * el patio). La página cambia solo cuando cambia el escenario, y solo cuando
 * el niño la pasa con la barra de página lista. El botón "siguiente" de la
 * banda narrativa avanza los momentos dentro de la página.
 *
 *  Página
 *  ------
 *  number / title  número y título de capítulo impresos en el libro
 *  scene / setup   escenario 3D (ver /scenes) y su estado inicial
 *  mood / camera   atmósfera y encuadre
 *  tasks           tareas de la barra de página ('leer' + los juegos de la página)
 *  beats           momentos
 *
 *  Momento (Guía visual §3.5) — como máximo un texto de cada tipo:
 *  narrator     texto de la historia (banda inferior, máx. 18 palabras). Si un
 *               momento no lo trae, la banda conserva el último texto.
 *  dialog       { speaker: 'nico' | 'guardian', text } (tarjeta izquierda, máx. 14 palabras)
 *  instruction  { icon, text, short, taskId } (tarjeta de misión, derecha, máx. 8
 *               palabras). taskId = juego: bloquea "siguiente" hasta completarlo.
 *  sfx          { text, at } sonido escrito junto al objeto `at` del escenario
 *               (o { text, x, y } en % de la escena)
 *  do           acciones del escenario (animación), en orden; sub-arreglo = en paralelo
 *  quake / mood temblor ([intensidad, segundos]) y atmósfera del momento
 * ============================================================================
 */

export const story = {
    title: 'Nico y su guardián personal',
    subtitle: 'Un cuento sobre cómo cuidarnos cuando la tierra se mueve',

    characters: {
        nico: { name: 'Nico' },
        guardian: { name: 'Guardián' },
    },

    /** Portada (inicio y final). */
    cover: { mood: 'night', camera: 'cover' },
    ending: { mood: 'day', camera: 'cover' },

    pages: [
        // ================================================================ 1 · LA SALA
        {
            id: 'sala', number: 1, title: 'La sala',
            scene: 'room', setup: { tower: 'empty', nico: 'tower' },
            mood: 'afternoon', camera: 'wide', quake: 0,
            tasks: ['leer', 'juego-radar', 'juego-tambor'],
            beats: [
                {
                    narrator: 'Nico tenía siete años y un gran sueño: construir la torre de bloques más alta del mundo.',
                    do: ['tower.build'],
                },
                {
                    narrator: 'Esa tarde, en la sala de su casa, le faltaba solo un bloque. El azul, su favorito.',
                    do: ['nico.showBlock'],
                },
                {
                    narrator: 'Estiró la mano con mucho cuidado y, de pronto…',
                    do: ['nico.reach'],
                },
                {
                    narrator: '…el piso hizo un ruido extraño, grave, como un gruñido que venía de muy abajo.',
                    do: [['nico.face:o', 'rumble']],
                    quake: [0.14, 1.5], mood: 'rumble',
                },
                {
                    narrator: 'Los vasos empezaron a tintinear en la cocina.',
                    sfx: { text: '¡Tin, tin!', at: 'vasos' },
                    do: [['glasses.clink', 'nico.pose:show']],
                    quake: [0.22, 1.2],
                },
                {
                    narrator: 'Nico se quedó quieto, con el bloque azul en la mano.',
                    dialog: { speaker: 'nico', text: '¿Qué fue eso?' },
                },
                {
                    narrator: '¡La casa empezó a temblar!',
                    do: ['nico.pose:worried'],
                    quake: [0.75, 1.2], mood: 'quake',
                },
                {
                    narrator: 'La lámpara se balanceó de un lado a otro y la torre se derrumbó en mil pedazos.',
                    sfx: { text: '¡Cr-r-r-ac!', at: 'torre' },
                    do: [['tower.fall', 'wobble:lampara']],
                },
                {
                    narrator: 'La tierra se estaba moviendo. Y justo en ese instante, algo se despertó dentro del pecho de Nico.',
                    do: ['nico.heart:2'],
                    quake: [0.5, 1.5],
                },
                {
                    narrator: 'Era una voz pequeñita, pero muy valiente.',
                    dialog: { speaker: 'guardian', text: '¡Aquí estoy! ¡Soy tu Guardián! Me desperté para cuidarte.' },
                    do: ['guardian.appear', 'nico.face:smile'],
                },
                {
                    narrator: 'Nico quería correr hacia la puerta.',
                    do: ['nico.runToDoor'],
                },
                {
                    dialog: { speaker: 'guardian', text: '¡Espera! Mientras la tierra se mueve, no se corre.' },
                    do: ['guardian.stop'],
                },
                {
                    dialog: { speaker: 'guardian', text: 'Primero, nos protegemos.' },
                    do: ['guardian.glow'],
                },
                // ---- Juego 1: "El radar del Guardián"
                {
                    dialog: { speaker: 'guardian', text: 'Mira a tu alrededor.' },
                    instruction: { icon: 'radar', text: 'Encuentra lo que se puede caer', short: 'Busca peligros', taskId: 'juego-radar' },
                },
                {
                    dialog: { speaker: 'guardian', text: 'Aléjate de las ventanas y de las cosas que se pueden caer.' },
                    do: ['hazards.wobble'],
                },
                {
                    narrator: 'Nico vio la mesa grande del comedor, fuerte y firme.',
                    do: ['table.glow'],
                },
                {
                    dialog: { speaker: 'guardian', text: '¡Allá! Vamos despacito.' },
                    do: ['nico.underTable'],
                },
                {
                    narrator: 'Nico llegó hasta la mesa y el Guardián le enseñó tres pasos mágicos.',
                    do: ['guardian.glow'],
                },
                {
                    narrator: 'Nico se agachó debajo de la mesa, bien pequeñito, como una tortuga.',
                    dialog: { speaker: 'guardian', text: 'Uno: ¡agáchate!' },
                    do: ['nico.pose:crouch'],
                    quake: [0.4, 1],
                },
                {
                    narrator: 'Se tapó la cabeza y el cuello con los brazos.',
                    dialog: { speaker: 'guardian', text: 'Dos: ¡cúbrete!' },
                    do: ['nico.pose:cover'],
                },
                {
                    narrator: 'Agarró fuerte una pata de la mesa.',
                    dialog: { speaker: 'guardian', text: 'Tres: ¡sujétate!' },
                    do: ['nico.pose:hold'],
                },
                {
                    narrator: 'Afuera, las cosas seguían sonando: clin, clan, crac.',
                    do: ['sounds'],
                    quake: [0.5, 1],
                },
                // ---- Juego 2: "El tambor de la tortuga" (el temblor se pone fuerte)
                {
                    narrator: 'El corazón de Nico latía como un tambor: pum, pum, pum.',
                    do: ['heartbeat'],
                    instruction: { icon: 'tambor', text: 'Toca el círculo al ritmo', short: 'Al ritmo', taskId: 'juego-tambor' },
                },
                {
                    dialog: { speaker: 'guardian', text: 'Soy yo. Te doy energía para que estés atento.' },
                    do: ['guardian.energy'],
                },
                {
                    dialog: { speaker: 'guardian', text: 'Aquí estoy contigo. No te sueltes. Ya va a pasar.' },
                    do: ['guardian.hug'],
                },
                {
                    narrator: 'Nico respiró hondo y se quedó quieto, bien agarrado.',
                    do: ['nico.pose:hold'],
                },
                {
                    narrator: 'Poco a poco, el temblor se hizo más suave… más suave…',
                    quake: [0.06, 4], mood: 'calming',
                },
                {
                    narrator: '…hasta que la casa se quedó en silencio.',
                    do: ['silence'],
                    quake: [0, 2], mood: 'still',
                },
            ],
        },

        // ============================================================== 2 · EL PASILLO
        {
            id: 'pasillo', number: 2, title: 'El pasillo',
            scene: 'exit', setup: {},
            mood: 'still', camera: 'wide', quake: 0,
            tasks: ['leer', 'juego-pasillo'],
            beats: [
                {
                    dialog: { speaker: 'nico', text: '¿Ya puedo salir?' },
                    do: ['nico.peek'],
                },
                {
                    dialog: { speaker: 'guardian', text: 'Espera un momentito. Mira bien antes de moverte.' },
                },
                // ---- Juego 3, parte A: "Congelados en el pasillo"
                {
                    dialog: { speaker: 'guardian', text: 'Puede haber cosas rotas en el piso.' },
                    do: ['shards.glint'],
                    instruction: { icon: 'zapatos', text: 'Ponle los zapatos a Nico', short: 'Zapatos', taskId: 'juego-pasillo' },
                },
                {
                    narrator: 'Nico salió despacito de debajo de la mesa.',
                },
                {
                    dialog: { speaker: 'guardian', text: 'Ahora ponte los zapatos, por si hay vidrios.' },
                },
                {
                    dialog: { speaker: 'guardian', text: 'Y caminamos sin correr y sin empujar.' },
                },
                {
                    narrator: 'Nico se puso los zapatos y avanzó con cuidado por el pasillo,',
                },
                {
                    narrator: 'mirando dónde pisaba, hasta llegar a la puerta de la casa.',
                    do: ['door.open'],
                },
            ],
        },

        // ================================================================ 3 · EL PATIO
        {
            id: 'patio', number: 3, title: 'El patio',
            scene: 'patio', setup: { nico: 'door' },
            mood: 'golden', camera: 'patio', quake: 0,
            tasks: ['leer', 'juego-patio'],
            beats: [
                // ---- Juego 3, parte B: el lugar más seguro del patio
                {
                    narrator: 'Afuera, el Guardián le señaló un lugar abierto, en medio del patio.',
                    do: ['guardian.point'],
                    instruction: { icon: 'patio', text: 'Lleva a Nico al lugar más seguro', short: 'Lugar seguro', taskId: 'juego-patio' },
                },
                {
                    dialog: { speaker: 'guardian', text: 'Lejos de paredes, postes y cables. Aquí nada se nos puede caer encima.' },
                    do: ['hazards.wobble'],
                },
                {
                    narrator: 'Nico se sentó en el suelo, con las manos sobre las rodillas.',
                    do: ['nico.pose:sit'],
                },
                {
                    narrator: 'Todavía sentía el corazón rápido, pero ya no estaba solo.',
                    do: ['nico.heart:2'],
                },
                {
                    narrator: 'Esperaría allí a que llegara un adulto de confianza.',
                },
                {
                    narrator: 'De pronto, la tierra se movió otra vez, un poquito.',
                    do: ['nico.face:o'],
                    quake: [0.22, 0.8], mood: 'rumble',
                },
                {
                    dialog: { speaker: 'guardian', text: 'Eso se llama réplica. Es un temblor más pequeño. Si pasa, haz lo mismo.' },
                    do: ['guardian.glow'],
                },
                {
                    narrator: 'Nico se agachó, se cubrió la cabeza con los brazos y esperó. Esta vez, ya sabía qué hacer.',
                    do: ['nico.pose:cover', 'calm'],
                    quake: [0, 4], mood: 'golden',
                },
                {
                    narrator: 'Cuando todo se calmó, Nico sonrió.',
                    dialog: { speaker: 'nico', text: 'Gracias, Guardián. Sin ti no habría sabido cómo protegerme.' },
                    do: [['nico.pose:idle', 'nico.face:smile'], 'rainbow.show'],
                },
                {
                    narrator: 'FIN',
                    dialog: { speaker: 'guardian', text: 'Para eso estoy. Cuando haya peligro, yo te aviso… y tú te cuidas.' },
                    do: ['celebrate'],
                },
            ],
        },
    ],
}

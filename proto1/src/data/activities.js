/**
 * Textos de las actividades lúdicas (según el "Instructivo de los 3 mini juegos").
 * La lógica vive en /activities; aquí solo hay contenido editable.
 *
 * `guide` es lo que el Guardián le dice directamente al lector (rompiendo la
 * cuarta pared) antes de cada actividad: corto, claro y dentro del cuento.
 *
 * Reglas del instructivo:
 *  - el niño no puede avanzar hasta completar la actividad;
 *  - no hay penalización: si se equivoca, el Guardián lo anima y explica el porqué;
 *  - instrucciones de una sola frase.
 */
export const activities = {
    /** Juego 1 — entre las páginas 5 y 6 */
    safePlace: {
        title: '¿Dónde me protejo?',
        guide: '¡Psst! Sí, tú, que estás leyendo. Nico necesita tu ayuda: toca el lugar donde estará más seguro.',
        intro: '¡Ayúdame a encontrar el lugar más seguro!',
        targets: {
            mesa: { label: 'Mesa', safe: true },
            ventana: { label: 'Ventana' },
            lampara: { label: 'Lámpara' },
            estante: { label: 'Estante' },
            cuadro: { label: 'Cuadro' },
            sofa: { label: 'Sofá' },
        },
        wrong: 'Uy, esto se puede caer. ¡Busca otro!',
        // El instructivo no da un mensaje para el sofá (no es algo que se caiga):
        wrongBy: { sofa: 'Uy, aquí nada te cubre la cabeza. ¡Busca otro!' },
        success: '¡Eso es! Lejos de ventanas y de cosas que se caen.',
    },

    /** Juego 2 — entre las páginas 6 y 7 */
    protectSteps: {
        title: 'Agáchate, cúbrete y sujétate',
        guide: '¡Ahora te toca a ti! Practica con Nico: toca los tres pasos mágicos, en orden.',
        intro: 'Toca los tres pasos mágicos, uno detrás de otro.',
        steps: [
            { id: 'agachate', label: 'Agáchate', icon: 'turtle', pose: 'crouch' },
            { id: 'cubrete', label: 'Cúbrete', icon: 'cover', pose: 'cover' },
            { id: 'sujetate', label: 'Sujétate', icon: 'hold', pose: 'hold' },
        ],
        wrongOrder: 'Primero agáchate, luego cúbrete y después sujétate.',
        success: '¡Lo lograste! Ya sabes cómo protegerte.',
    },

    /** Juego 3 — entre las páginas 10 y 11 */
    safeRoute: {
        title: 'Camino al lugar seguro',
        guide: '¡Hola otra vez! Ayúdame a sacar a Nico: primero los zapatos, luego pasitos lentos y al final un lugar abierto.',
        stops: [
            { id: 'shoes', short: 'Zapatos', prompt: 'Arrastra los zapatos hasta los pies de Nico.' },
            { id: 'walk', short: 'Sin correr', prompt: 'Toca los pasos de Nico, uno por uno.', tooFast: 'Despacito, sin correr.' },
            {
                id: 'open', short: 'Lugar abierto', prompt: 'Arrastra a Nico al lugar más seguro del patio.',
                zones: {
                    centro: { label: 'Centro del patio', safe: true },
                    poste: { label: 'Poste con cables' },
                    pared: { label: 'Pared alta' },
                },
                wrongBy: {
                    poste: 'Uy, el poste y los cables se pueden caer. ¡Busca otro!',
                    pared: 'Uy, la pared alta se puede caer. ¡Busca otro!',
                },
            },
        ],
        success: 'Aquí nada se puede caer sobre nosotros. Ahora esperamos a un adulto de confianza.',
    },
}

/**
 * Textos de los juegos (documento "Juegos_interactivos_Nico").
 * La lógica vive en /activities; aquí solo hay contenido editable.
 *
 * Reglas comunes: un solo gesto, sin puntajes ni tiempo límite, los errores
 * nunca castigan (las pistas las dice el Guardián en su tarjeta). Cada juego
 * completado le da al niño una estrella del Guardián.
 *
 * Límites de la Guía visual: misión ≤ 8 palabras (short: 2 o 3), diálogo ≤ 14.
 */
export const activities = {
    /** Juego 1 — La sala. Entra después de "Primero, nos protegemos." */
    'juego-radar': {
        title: 'El radar del Guardián',
        guide: '¡Más rápido el bip, más cerca el peligro!',
        hazards: ['lampara', 'cuadro', 'estante', 'ventana'],
        safe: { sofa: '¡Boing!', planta: '¡Ji, ji!' },
        found: '¡UY!',
        tada: '¡TA-DÁ!',
        refuge: { icon: 'mesa', text: 'Lleva a Nico bajo la mesa', short: 'A la mesa' },
        refugeHint: 'La mesa es fuerte y firme.',
        win: 'pum',
    },

    /** Juego 2 — Debajo de la mesa. Entra cuando el temblor se pone fuerte. */
    'juego-tambor': {
        title: 'El tambor de la tortuga',
        guide: '¡Toca al ritmo de mi corazón!',
        taps: 12,
        postures: [
            { every: 3, text: '¡Agáchate!', icon: 'turtle', pose: 'crouch' },
            { every: 6, text: '¡Cúbrete!', icon: 'cover', pose: 'cover' },
            { every: 9, text: '¡Sujétate!', icon: 'hold', pose: 'hold' },
        ],
        calm: 'Ya pasó',
    },

    /** Juego 3, parte A — El pasillo. Entra cuando el Guardián dice "Mira bien antes de moverte." */
    'juego-pasillo': {
        title: 'Congelados en el pasillo',
        shoesDone: 'Zapatos puestos. ¡Despacito!',
        clac: '¡Clac!',
        walk: { icon: 'camino', text: 'Lleva a Nico despacito a la puerta', short: 'Despacito' },
        tooFast: '¡Despacito!',
        turtle: { icon: 'turtle', text: '¡Toca la tortuga!', short: '¡Tortuga!' },
        turtleHint: '¡Tortuga, ahora!',
    },

    /** Juego 3, parte B — El patio. */
    'juego-patio': {
        title: 'Congelados en el patio',
        notHere: '¡Aquí no!',
        zones: { centro: { safe: true }, poste: {}, pared: {} },
    },
}

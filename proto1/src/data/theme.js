/**
 * Identidad visual derivada del moodboard.
 * Todo lo que es "look" (colores, atmósferas, encuadres) vive aquí para
 * poder ajustarse sin tocar la lógica.
 */

export const palette = {
    red: '#ea5b4f',
    orange: '#f08a45',
    yellow: '#f9dc6b',
    green: '#5db65a',
    blue: '#5eaff2',
    lilac: '#cf94f2',
    cream: '#fff6e6',
    paper: '#fffaf0',
    ink: '#3b2f4a',
    wood: '#e9a45e',
    woodDark: '#c4733f',
    mint: '#8ee59b',
    leaf: '#4fae5b',
    pink: '#f4a3b4',
}

/** Colores de los bloques de la torre (paleta del moodboard). */
export const blockColors = [palette.red, palette.orange, palette.yellow, palette.green, palette.lilac, palette.pink]

/**
 * Atmósferas del mundo que rodea al libro. Cada página elige una.
 *  - dusk / night / day: mezcla del cielo (HDRI de atardecer, HDRI nocturno o degradado diurno)
 *  - tint: color que tiñe el cielo para mantenerlo pastel y secundario
 */
export const moods = {
    night: {
        dusk: 0, day: 0, skyBright: 0.55, tint: '#7b6fd0', tintAmount: 0.45,
        fog: '#3a3768', fogNear: 18, fogFar: 60,
        hemiSky: '#9a9be8', hemiGround: '#34453b', hemiIntensity: 1.35,
        sun: '#c9d2ff', sunIntensity: 1.7,
        ground: '#3f6b4c', hills: '#4d7a63', mountains: '#5b5a8c',
        fireflies: 1, dust: 0, exposure: 1.0,
    },
    afternoon: {
        dusk: 1, day: 0.25, skyBright: 1.05, tint: '#ffd9c2', tintAmount: 0.18,
        fog: '#e8d6e4', fogNear: 20, fogFar: 70,
        hemiSky: '#fff1e0', hemiGround: '#9cc48a', hemiIntensity: 1.35,
        sun: '#ffe2b8', sunIntensity: 2.4,
        ground: '#93cc78', hills: '#b9e09a', mountains: '#dcd3ee',
        fireflies: 0, dust: 0, exposure: 1.0,
    },
    rumble: {
        dusk: 1, day: 0.1, skyBright: 0.92, tint: '#d9c3e4', tintAmount: 0.3,
        fog: '#d6c7dd', fogNear: 18, fogFar: 62,
        hemiSky: '#f1e3ef', hemiGround: '#8fb487', hemiIntensity: 1.25,
        sun: '#ffd7b0', sunIntensity: 2.0,
        ground: '#88bf73', hills: '#acd394', mountains: '#cfc5e4',
        fireflies: 0, dust: 0.25, exposure: 0.98,
    },
    quake: {
        dusk: 1, day: 0, skyBright: 0.78, tint: '#a996cf', tintAmount: 0.45,
        fog: '#b9a9cd', fogNear: 14, fogFar: 52,
        hemiSky: '#d9cfee', hemiGround: '#7f9a83', hemiIntensity: 1.15,
        sun: '#f6c9a8', sunIntensity: 1.5,
        ground: '#7fae72', hills: '#9cc28c', mountains: '#b6abd2',
        fireflies: 0, dust: 1, exposure: 0.96,
    },
    calming: {
        dusk: 1, day: 0.15, skyBright: 0.9, tint: '#c7b7e4', tintAmount: 0.32,
        fog: '#cfc2e0', fogNear: 18, fogFar: 62,
        hemiSky: '#ece2f6', hemiGround: '#8db68a', hemiIntensity: 1.2,
        sun: '#ffd9b8', sunIntensity: 1.8,
        ground: '#86ba76', hills: '#a9d095', mountains: '#c9bfe2',
        fireflies: 0, dust: 0.3, exposure: 0.98,
    },
    still: {
        dusk: 1, day: 0.35, skyBright: 1.0, tint: '#e2d4f2', tintAmount: 0.22,
        fog: '#e3d8ec', fogNear: 20, fogFar: 70,
        hemiSky: '#f6efff', hemiGround: '#97c387', hemiIntensity: 1.3,
        sun: '#ffe6c8', sunIntensity: 2.1,
        ground: '#8fc679', hills: '#b5dc9e', mountains: '#d8d0ee',
        fireflies: 0, dust: 0, exposure: 1.0,
    },
    golden: {
        dusk: 1, day: 0.2, skyBright: 1.08, tint: '#ffc9a6', tintAmount: 0.28,
        fog: '#f1d2cf', fogNear: 20, fogFar: 70,
        hemiSky: '#ffe9d6', hemiGround: '#a2c785', hemiIntensity: 1.35,
        sun: '#ffcf96', sunIntensity: 2.5,
        ground: '#9acb74', hills: '#c3e19a', mountains: '#e6d2e6',
        fireflies: 0.35, dust: 0, exposure: 1.02,
    },
    day: {
        dusk: 1, day: 1, skyBright: 1.0, tint: '#ffffff', tintAmount: 0,
        fog: '#dcebf7', fogNear: 22, fogFar: 75,
        hemiSky: '#eef6ff', hemiGround: '#9fd08a', hemiIntensity: 1.45,
        sun: '#fff1d6', sunIntensity: 2.6,
        ground: '#8fd171', hills: '#b6e39b', mountains: '#e4e6f4',
        fireflies: 0, dust: 0, exposure: 1.02,
    },
}

/** Colores del degradado del cielo diurno (cuando day = 1). */
export const daySky = { top: '#8fc6f2', horizon: '#e8f3ff' }

/**
 * Encuadres de cámara. `pos` y `target` están en coordenadas del mundo.
 * El libro abierto está centrado en el origen, ligeramente elevado.
 */
export const cameraShots = {
    cover:  { pos: [0, 2.0, 10.4], target: [0, 2.05, 0] },
    open:   { pos: [0, 3.9, 9.2],  target: [0, 1.05, -0.3] },
    wide:   { pos: [0, 3.95, 8.7], target: [0, 1.1, -0.45] },
    close:  { pos: [0, 3.35, 7.0], target: [0, 1.05, -0.55] },
    route:  { pos: [0, 5.1, 7.7],  target: [0, 0.75, -0.2] },
    patio:  { pos: [0.3, 3.85, 8.6], target: [0.15, 1.1, -0.5] },
}

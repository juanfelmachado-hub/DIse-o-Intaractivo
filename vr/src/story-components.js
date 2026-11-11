/**
 * Componentes ECS del cuento en VR (sin sistemas, DOM ni renderer: el editor de
 * IWSDK importa este módulo para construir su inspector).
 *
 *  StoryState    estado narrativo publicado cada cuadro por StorySystem
 *                (modo, página/capítulo, momento, pausa). Lo leen la UI, la
 *                colocación del jugador y el audio.
 *  StoryPanel    marca un panel UIKitML del cuento y su papel ('story' o 'menu').
 *  PlayerSpot    dónde está el lector: portada, vista general o junto a Nico.
 *  SoundEmitter  un punto del mundo desde el que suenan ciertos efectos
 *                originales (audio espacial). `keys` = nombres de sfx.js.
 *  StoryMarker   marcador visible (anillo) sobre un objeto tocable de un juego.
 */
import { createComponent, Types } from '@iwsdk/core';

export const StoryState = createComponent('StoryState', {
    mode: { type: Types.String, default: 'loading' }, // loading | cover | opening | reading | closing
    page: { type: Types.Int8, default: 0 },
    pages: { type: Types.Int8, default: 3 },
    beat: { type: Types.Int16, default: -1 },
    chapter: { type: Types.String, default: '' },
    turning: { type: Types.Boolean, default: false },
    activity: { type: Types.String, default: '' },
    paused: { type: Types.Boolean, default: false },
}, 'Estado narrativo del cuento (lo escribe StorySystem).');

export const StoryPanel = createComponent('StoryPanel', {
    role: { type: Types.String, default: 'story' },
}, 'Panel UIKitML del cuento: story (texto y avance) o menu (inicio, pausa, accesibilidad).');

export const PlayerSpot = createComponent('PlayerSpot', {
    spot: { type: Types.String, default: 'cover' }, // cover | overview | page
    eye: { type: Types.Float32, default: 2.1 }, // altura de los ojos en unidades del cuento
    scale: { type: Types.Float32, default: 1 }, // unidades del cuento por metro real
}, 'Lugar actual del lector en el cuento (lo escribe PlacementSystem).');

export const SoundEmitter = createComponent('SoundEmitter', {
    keys: { type: Types.String, default: '' }, // lista separada por comas
}, 'Origen espacial de efectos de sfx.js (lo usa SpatialAudioSystem).');

export const StoryMarker = createComponent('StoryMarker', {
    id: { type: Types.String, default: '' },
}, 'Anillo visible sobre un objeto tocable de un juego.');

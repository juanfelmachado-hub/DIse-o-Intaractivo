/**
 * Catálogo de componentes compartido entre la app y el editor de IWSDK.
 */
import { defineComponents } from '@iwsdk/core';
import { PlayerSpot, SoundEmitter, StoryMarker, StoryPanel, StoryState } from './story-components.js';

export default defineComponents([StoryState, StoryPanel, PlayerSpot, SoundEmitter, StoryMarker]);

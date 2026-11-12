/**
 * «Nico y su guardián personal» — realidad mixta para Meta Quest 3.
 *
 * IWSDK crea el mundo (renderer, cámara, jugador, WebXR immersive-ar con
 * passthrough, hit-test, entrada, UI espacial) a partir de iwsdk.config.json;
 * luego se arma el cuento original dentro de él, como una maqueta sobre el
 * piso real, y se registran los sistemas ECS que lo hacen funcionar.
 */
import { World } from '@iwsdk/core';
import projectOptions from 'virtual:iwsdk-project';
import { createStory } from './story/runtime.js';
import { StorySystem } from './systems/StorySystem.js';
import { PlacementSystem } from './systems/PlacementSystem.js';
import { StoryInputSystem } from './systems/StoryInputSystem.js';
import { StoryUISystem } from './systems/StoryUISystem.js';
import { SpatialAudioSystem } from './systems/SpatialAudioSystem.js';
import { StoryFxSystem } from './systems/StoryFxSystem.js';

World.create(document.getElementById('scene-container'), projectOptions)
    .then(async (world) => {
        world.registerSystem(StorySystem);
        world.registerSystem(StoryInputSystem);
        world.registerSystem(PlacementSystem);
        world.registerSystem(StoryUISystem);
        world.registerSystem(SpatialAudioSystem);
        world.registerSystem(StoryFxSystem);
        world.globals.cuento = await createStory(world);
        window.cuento = world.globals.cuento; // útil para depurar desde la consola
    })
    .catch((err) => {
        console.error('[cuento-vr] No se pudo abrir el cuento:', err);
    });

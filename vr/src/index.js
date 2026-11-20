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
import { HandInteractionSystem } from './systems/HandInteractionSystem.js';
import { PanelSystem } from './systems/PanelSystem.js';
import { TowerSystem } from './systems/TowerSystem.js';
import { ReactionSystem } from './systems/ReactionSystem.js';
import { GestureSystem } from './systems/GestureSystem.js';
import { NicoSystem } from './systems/NicoSystem.js';
import { PageSystem } from './systems/PageSystem.js';
import { HeartSystem } from './systems/HeartSystem.js';
import { RadarTouchSystem } from './systems/RadarTouchSystem.js';
import { ShoesSystem } from './systems/ShoesSystem.js';

World.create(document.getElementById('scene-container'), projectOptions)
    .then(async (world) => {
        // las manos primero (todo lo demás lee su estado de este cuadro)
        world.registerSystem(HandInteractionSystem);
        world.registerSystem(StorySystem);
        world.registerSystem(StoryInputSystem);
        world.registerSystem(PlacementSystem);
        world.registerSystem(StoryUISystem);
        world.registerSystem(SpatialAudioSystem);
        world.registerSystem(StoryFxSystem);
        world.registerSystem(PanelSystem);
        world.registerSystem(TowerSystem);
        world.registerSystem(ReactionSystem);
        world.registerSystem(GestureSystem);
        world.registerSystem(NicoSystem);
        world.registerSystem(PageSystem);
        world.registerSystem(HeartSystem);
        world.registerSystem(RadarTouchSystem);
        world.registerSystem(ShoesSystem);
        // «Reiniciar» del panel: lo manipulable vuelve a su lugar; la historia y el progreso no cambian
        world.globals.resetObjects = () => {
            const g = world.globals;
            const done = { bloques: !!g.tower?.reset(), nico: false, guardian: true, ritmo: !!g.heart?.retry(), zapatos: !!g.shoes?.reset() };
            if (g.nico?.away || g.nico?.mode === 'held' || g.nico?.mode === 'falling') { g.nico.reset(); done.nico = true; }
            g.reactions?.resetGuardian?.();
            return done;
        };
        world.globals.cuento = await createStory(world);
        window.cuento = world.globals.cuento; // útil para depurar desde la consola
    })
    .catch((err) => {
        console.error('[cuento-vr] No se pudo abrir el cuento:', err);
    });

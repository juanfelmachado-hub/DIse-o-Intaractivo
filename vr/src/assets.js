/**
 * Catálogo de recursos de IWSDK (se evalúa dos veces: app y editor; debe ser
 * determinista y sin efectos). Solo registra los paneles UIKitML del cuento.
 *
 * Los modelos, audios y texturas originales del cuento NO se registran aquí:
 * los carga el mismo código de la versión web (../src/models/assets.js y
 * ../src/audio/sfx.js) para no duplicar ni cambiar su lógica.
 */
import { AssetType, defineAssets } from '@iwsdk/core';

const publicAssetUrl = (filePath) => `${import.meta.env.BASE_URL}${filePath.replace(/^\/+/u, '')}`;

const uikitml = (fileName, name) => ({
    url: publicAssetUrl(`ui/${fileName}`),
    type: AssetType.UIKitML,
    name,
});

export default defineAssets({
    'story-panel': uikitml('story.uikitml', 'Panel del cuento'),
    'menu-panel': uikitml('menu.uikitml', 'Menú del cuento'),
});

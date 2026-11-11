# Nico y su guardián personal — versión VR (Meta Quest 3)

Versión de realidad virtual del cuento interactivo 3D «El susurro de la Tierra —
Nico y su guardián personal». Funciona en el navegador del **Meta Quest 3** con
**WebXR** (`immersive-vr`). Está hecha con el **Immersive Web SDK (IWSDK)** de Meta,
que a su vez usa **Three.js** (super-three r185).

- **Web original:** https://juanfelmachado-hub.github.io/DIse-o-Intaractivo/
- **VR:** https://juanfelmachado-hub.github.io/DIse-o-Intaractivo/dist/vr/

La historia, el orden, los personajes, los escenarios, los textos, los 5 juegos,
los modelos y los audios son **los mismos de la web**. Esta app no copia el cuento:
importa el código original de `../src` y los recursos de `../static`.

## Cómo abrirlo en el Meta Quest 3

1. En el visor, abre el **navegador Meta Quest Browser**.
2. Entra a la dirección de la versión VR (arriba).
3. Toca **«Entrar en VR»**, en el panel o en el botón de la página.
4. En la portada, apunta a **«Abre el libro»** y presiona el gatillo.

### Controles

| Acción | Controles | Manos |
| --- | --- | --- |
| Tocar / elegir | Apuntar con el rayo y apretar el gatillo | Apuntar y juntar índice y pulgar (pellizco) |
| Arrastrar (Nico, zapatos) | Mantener el gatillo y mover el rayo | Mantener el pellizco y mover la mano |
| Radar (juego 1) | Mover el rayo; el bip late más rápido cerca del peligro | Igual |
| Tambor (juego 2) | Gatillo al ritmo, en cualquier lugar | Pellizco al ritmo |
| Girar 30° | Palanca a la izquierda o derecha | — |
| Recentrar | Botón A o X, o «Recentrar» en el panel | «Recentrar» en el panel |
| Acercarse a Nico | «Junto a Nico» en el panel | Igual |
| Pausa, reinicio, tamaño del texto, salir de VR | «Pausa» en el panel abre el menú | Igual |

## Desarrollo

Requisitos: Node 20.19+ o 22.12+. Instala las dependencias de esta app (el código
compartido de `../src` usa el mismo Three.js y GSAP de aquí):

```sh
npm install
```

Servidor de desarrollo de IWSDK. Abre un Chromium con el emulador **IWER**, que
emula un Meta Quest 3:

```sh
npm run dev
```

Otros comandos:

- **Compilar para publicar:** `npm run build`. El resultado queda en `dist/`.
- **Probar en el visor desde tu computador:** `npx @iwsdk/cli dev status` muestra
  la URL de red (`https://<ip>:8081`). Ábrela en el Quest conectado a la misma Wi-Fi
  y acepta el certificado local.

## Arquitectura

IWSDK es dueño del renderer, la cámara, el jugador, la sesión WebXR, la entrada y
la UI espacial. El cuento original se monta dentro de ese mundo
(`src/story/runtime.js`). Solo se adaptan las piezas que en la web dependían de la
pantalla:

| Web | VR |
| --- | --- |
| Cámara cinematográfica (`CameraRig`) | No se usa: nada mueve la cabeza del lector (comodidad). |
| Mouse / dedo (`Pointer`) | El mismo `Pointer`, alimentado por el rayo del control o de la mano (`VRPointer`). |
| Marcadores HTML (`Hotspots`) | Anillos 3D. |
| Interfaz HTML (`UI`) | La misma clase `UI` decide qué mostrar; los paneles **UIKitML** lo dibujan. |
| Onomatopeyas HTML | Palabras 3D junto al objeto que suena. |
| Audio estéreo | Los mismos audios, con efectos ubicados en el espacio (HRTF). |

### ECS: entidades, componentes y sistemas

Componentes (`src/story-components.js`):

- `StoryState`: modo, página, momento, juego y pausa.
- `StoryPanel`: papel del panel.
- `PlayerSpot`: lugar y escala del lector.
- `SoundEmitter`: origen de un sonido.
- `StoryMarker`: anillo sobre un objeto tocable.

Sistemas (`src/systems/`):

- **StorySystem**: el bucle del cuento, igual que `Experience.tick()` de la web. Lo detiene la pausa o el menú del sistema del visor.
- **PlacementSystem**: dónde está el lector (portada, vista general o junto a Nico), siempre con fundido. También el giro por pasos, recentrar y la colocación de los paneles.
- **StoryInputSystem**: rayo del control o de la mano y mouse → juegos originales.
- **StoryUISystem**: paneles UIKitML (`public/ui/story.uikitml`, `public/ui/menu.uikitml`).
- **SpatialAudioSystem**: oído del lector y orígenes de los efectos.
- **StoryFxSystem**: anillos de radar, tambor y objetos tocables.

### Comodidad

- Nunca hay movimiento continuo de cámara. El lector cambia de lugar con un fundido a negro corto (0,3 s + 0,45 s).
- El tamaño del lector se ajusta para que Nico se vea de su tamaño de niño: el rig se escala según la altura real de la cabeza.
- El libro no flota en VR y su sacudida durante el temblor es un cuarto de la de la web. El temblor sigue sintiéndose en los objetos, pero el piso casi no se mueve.
- El giro es por pasos de 30° y se puede recentrar.
- El panel sigue al lector con suavidad solo si este se gira mucho.

### Rendimiento (objetivo 72 fps)

- Una sola sombra, de 1024 px, con PCF simple.
- Foveación activa (la de IWSDK).
- Sin asignaciones de memoria por cuadro en los sistemas. La UI se sincroniza a 10 Hz y solo cuando algo cambia.

Medido en el emulador, sala abierta: **446 llamadas de dibujo** (ambos ojos y sombra) y **282 mil triángulos**.

### Tipografía

La fuente de UIKit incluida no trae tildes, ñ ni ¡¿. Por eso se generó **Fredoka**,
la tipografía del cuento, como fuente MSDF (`public/fonts/`, licencia OFL). Contiene
todos los caracteres usados en la historia.

## Pruebas

Todas las pruebas automáticas se hicieron en el **emulador IWER (Meta Quest 3
emulado) en un computador, no en un visor físico**.

```sh
npx @iwsdk/cli dev up --headless --allow-browser-automation
npx @iwsdk/cli xr enter --input-json '{}'
npx @iwsdk/cli browser run tests/recorrido.mjs --timeout 110000   # repetir hasta "terminado"
```

`tests/recorrido.mjs` recorre el cuento completo:

1. Portada.
2. La sala: radar, ponerse a salvo, tambor.
3. El pasillo: zapatos, camino, réplica, tortuga.
4. El patio: zona segura.
5. Cierre y vuelta a la portada.

Además se probaron con el **control y la mano emulados** (rayo + gatillo o pellizco
de IWER):

- los botones de los paneles;
- el radar;
- arrastrar a Nico;
- ponerse a salvo;
- el tambor;
- pausa, continuar, texto, reinicio y salir de VR;
- giro por pasos y recentrar.

**Pendiente de verificar en un Quest 3 real:**

- fps reales;
- comodidad;
- legibilidad de los paneles;
- audio espacial con los altavoces del visor;
- seguimiento real de manos.

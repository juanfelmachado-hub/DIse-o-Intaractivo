# Nico y su guardián personal — realidad mixta (Meta Quest 3)

Versión de **realidad mixta** del cuento interactivo 3D «El susurro de la Tierra —
Nico y su guardián personal». El cuento aparece como una **maqueta** (una casa de
muñecas) sobre el piso real de tu habitación, vista con el passthrough del
**Meta Quest 3**. Funciona en el navegador del visor con **WebXR** (`immersive-ar`)
y está hecha con el **Immersive Web SDK (IWSDK)** de Meta, que usa **Three.js**
(super-three r185).

- **Web original:** https://juanfelmachado-hub.github.io/DIse-o-Intaractivo/
- **Realidad mixta:** https://juanfelmachado-hub.github.io/DIse-o-Intaractivo/dist/vr/

La historia, el orden, los personajes, los escenarios, los textos, los 5 juegos,
los modelos y los audios son **los mismos de la web**. Esta app no copia el cuento:
importa el código original de `../src` y los recursos de `../static`.

## Cómo abrirlo en el Meta Quest 3

1. En el visor, abre el **navegador Meta Quest Browser** y entra a la dirección de arriba.
2. Toca **«Entrar (passthrough)»** en el panel, o el botón de la página. Acepta el permiso de realidad mixta si el visor lo pide.
3. **Coloca el libro.** Apunta al piso con el control o con la mano. Aparece un área gris con un punto naranja y una flecha amarilla que muestra hacia dónde mira el frente del libro. Aprieta el gatillo (o pellizca) para dejarlo ahí.
4. En el panel, toca **«Abre el libro»**. El libro se abre en el piso y de sus páginas surge el mundo en miniatura.
5. Camina alrededor de la maqueta y agáchate para ver a Nico (mide unos 16 cm).

### Controles

| Acción | Controles | Manos |
| --- | --- | --- |
| Colocar el libro en el piso | Apuntar al piso y apretar el gatillo | Apuntar y pellizcar (índice + pulgar) |
| Tocar / elegir | Rayo + gatillo | Rayo de la mano + pellizco |
| Agarrar algo de la maqueta (bloques, Nico, zapatos, el Guardián) | Acercar el control y apretar el botón lateral | Pellizcarlo con el pulgar y el índice (a menos de 2 cm); abrir los dedos para soltar |
| Construir la torre (primera página) | Agarrar los bloques con el botón lateral y apilarlos | Pellizcar los bloques y apilarlos |
| Arrastrar (Nico, zapatos) | Mantener el gatillo y mover el rayo, o agarrarlo de cerca | Agarrarlo con la mano (con la mano no se arrastra a distancia) |
| Radar (juego 1) | Mover el rayo sobre la maqueta; el bip late más rápido cerca del peligro | Igual |
| Ponerse a salvo | Tocar a Nico con el rayo (o el botón del panel) | Igual. En «¡Cúbrete!», poner las dos manos sobre la cabeza |
| Mover el panel del cuento | Agarrar el asa (barra bajo el panel) con el botón lateral, de cerca o apuntándole | Pellizcar el asa; girar la muñeca lo gira |
| Ocultar el panel | «Ocultar» en el panel; vuelve tocando el icono junto al libro (o apuntándole con el gatillo) | Igual, tocando el icono con el índice |
| Tambor (juego 2) | Golpear el tambor dorado sobre Nico: tocarlo con el control, o apuntarle y apretar el gatillo al ritmo | Tocarlo con la mano, o apuntar y pellizcar |
| Girar la maqueta 30° | Palanca a la izquierda o la derecha | — |
| Tamaño de la maqueta | Palanca arriba (más grande) o abajo (más pequeña), o «Tamaño» en el panel | «Tamaño» en el panel |
| Mover el libro a otro lugar | Botón A o X, o «Mover» en el panel | «Mover» en el panel |
| Pausa, reinicio, tamaño del texto, salir | «Pausa» en el panel abre el menú | Igual |

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
(`src/story/runtime.js`), colgado de un grupo `maqueta` que se apoya en el piso
real y se escala. Solo se adaptan las piezas que en la web dependían de la
pantalla:

| Web | Realidad mixta |
| --- | --- |
| Cámara cinematográfica (`CameraRig`) | No se usa: el lector camina de verdad alrededor de la maqueta. |
| Cielo, niebla, pasto, colinas y polvo | No se dibujan: se ve la habitación (passthrough). |
| Luces y sombra del cuento | Dentro de la maqueta (giran y se escalan con ella). La sombra cae sobre el piso real en un plano invisible que solo recibe sombra. |
| Mouse / dedo (`Pointer`) | El mismo `Pointer`, alimentado por el rayo del control o de la mano (`VRPointer`). |
| Marcadores HTML (`Hotspots`) | Anillos 3D a escala de la maqueta. |
| Círculo HTML del tambor | Anillo dorado sobre el caparazón de Nico, que se toca con el control o la mano. |
| Interfaz HTML (`UI`) | La misma clase `UI` decide qué mostrar; los paneles **UIKitML** lo dibujan. |
| Onomatopeyas HTML | Palabras 3D dentro de la maqueta. |
| Audio estéreo | Los mismos audios, con efectos ubicados en el espacio (HRTF). |

### Escala

- La escala inicial es **0,17**. El libro abierto mide unos 1,04 × 0,68 m, Nico unos 16 cm y el área de la maqueta unos 1,2 × 0,9 m.
- Se puede elegir entre **0,12**, **0,17** y **0,22** (`DIORAMA_SCALES` en `src/story/runtime.js`).
- La base del libro abierto toca el piso: el cuento se baja 0,40 unidades, la altura a la que flotaba sobre el pasto en la web.
- Lo que depende de metros reales se ajusta a la escala: la cámara de la sombra, el tamaño de las luciérnagas, la luz del Guardián y los anillos.

### Piso y colocación

- El piso se busca con el **hit-test** de WebXR (`EnvironmentRaycastTarget` de IWSDK, una sonda por mano).
- Solo vale un punto horizontal a menos de 25 cm del piso del espacio `local-floor`.
- Si el visor no da hit-test, se usa el piso de `local-floor` (y = 0). El Quest lo calibra con el límite de seguridad (Guardian), así que esa colocación manual funciona igual.
- La maqueta queda **fija en la habitación**. El jugador de IWSDK no se mueve ni se escala.
- El panel del cuento también queda **fijo en la habitación**, a la izquierda de la maqueta y a la altura de una mesa. No sigue la cabeza, así que no tapa la maqueta. Al volver a colocar el libro, vuelve a su lugar inicial (o con «Panel a su lugar» en el menú).
- No se usan anclas espaciales (`XRAnchor`). Si el visor recalibra el piso o se pierde el seguimiento, la maqueta se puede volver a colocar con A/X o «Mover».

### ECS: entidades, componentes y sistemas

Componentes (`src/story-components.js`):

- `StoryState`: modo, página, momento, juego y pausa.
- `StoryPanel`: papel del panel.
- `PlayerSpot`: estado de la maqueta (`colocando`, `maqueta` o `escritorio`), su escala y la altura de los ojos sobre ella.
- `SoundEmitter`: origen de un sonido.
- `StoryMarker`: anillo sobre un objeto tocable.

Sistemas (`src/systems/`):

- **StorySystem**: el bucle del cuento, igual que `Experience.tick()` de la web. Se detiene en la pausa, mientras se coloca la maqueta y cuando el visor muestra su menú.
- **PlacementSystem**: vista previa sobre el piso, colocación, giro y tamaño.
- **HandInteractionSystem**: manos y controles → agarrar objetos de la maqueta (ver «Interacción con las manos»).
- **PanelSystem**: panel fijo en la habitación, asa, ocultar e icono.
- **TowerSystem**: la torre de bloques con físicas.
- **ReactionSystem**: reacciones de Nico y del Guardián al tacto.
- **GestureSystem**: el gesto de cubrirse la cabeza.
- **StoryInputSystem**: rayo del control o de la mano y mouse → juegos originales, y toque físico del tambor.
- **StoryUISystem**: paneles UIKitML (`public/ui/story.uikitml`, `public/ui/menu.uikitml`).
- **SpatialAudioSystem**: oído del lector y orígenes de los efectos.
- **StoryFxSystem**: anillos de radar, tambor y objetos tocables.

### Interacción con las manos

Todo pasa por un solo sistema (`HandInteractionSystem`) con un registro de objetos
agarrables (`world.globals.interact`). Cada mano, sea mano real o control, sigue
esta máquina de estados: **IDLE → HOVER → GRABBING → (soltar) → IDLE**.

- **Manos** (`src/interaction/hands.js`): se leen las articulaciones de WebXR (puntas del pulgar y del índice, palma y muñeca). La pinza se cierra a menos de **1,8 cm** entre las puntas y se abre a más de **4 cm** (histéresis: no parpadea). Mientras está cerrada, el punto de agarre queda anclado a la muñeca: al abrir los dedos el objeto no se arrastra ni sale disparado. Si la mano se deja de ver más de **0,25 s**, se suelta lo que tenía.
- **Controles**: el punto de agarre está 5 cm delante de la empuñadura y el botón lateral es la pinza.
- **Formas de interacción** (`src/interaction/shapes.js`): una caja ajustada a las mallas **visibles** de cada objeto (sin sprites, brillos ni las cajas de "hit" invisibles de la web). La distancia se mide en metros reales hasta la superficie de la caja. Se resalta a menos de **5 cm** (punto amarillo) y se agarra a menos de **2,2 cm** (punto verde mientras se sostiene). Si dos objetos están casi igual de cerca, ganan los del juego (Nico, zapatos) sobre el Guardián.
- **Capas** (`src/interaction/layers.js`): levantar a Nico o empujar al Guardián se suma encima de la animación del cuento y se deshace exacta cada cuadro. Así no pelea con el código original.
- **Nico como un juguete**: al levantarlo cuelga (postura `dangle`) y balancea las piernas; si se mueve rápido pone cara de sorpresa. No sale del escenario. Al soltarlo baja suave al piso, y si el lugar no vale, el juego lo devuelve a su última posición segura.

**La torre** (`TowerSystem`, primera página):

- En la web la torre se armaba sola. En el visor Nico dice «¿Me ayudas a construir una torre con estos bloques?» y los 6 bloques quedan regados por la sala.
- Usa las físicas de IWSDK (**Havok**, el motor que ya trae IWSDK; no se agregó otro). Cada bloque tiene gravedad, masa, fricción y rotación, y choca con la página, con Nico y con los otros bloques.
- **Espacio de físicas**: un bloque mide ~3 cm en la maqueta, y Havok no sostiene cajas tan chicas (en el emulador se hundían en el piso). Por eso la simulación corre aparte, en las coordenadas de la página × 2, con la gravedad compensada: vista en la maqueta, un bloque cae a 9,8 m/s², como un juguete real.
- Al soltar un bloque casi derecho (menos de 25° de inclinación) se endereza solo. Hereda la velocidad de la mano (con un tope).
- **Validación**: 4 bloques en reposo, cada nivel a su altura y apoyado sobre el de abajo, quietos 2 s. Si la torre se cae, Nico se cubre y anima a intentarlo otra vez.
- Al terminar, Nico celebra («¡Gracias! ¡Es la torre más alta del mundo!») y la historia sigue igual que en la web: el temblor derriba la torre que construyó el lector.
- Después de 40 s, «Siguiente» ofrece «Que la termine Nico».

**Reacciones** (`ReactionSystem`): cada personaje tiene una máquina de estados
**IDLE → OBSERVANDO → SORPRESA → REACCIÓN → RECUPERACIÓN → IDLE**, con tiempos de
espera. Las reacciones no interrumpen los diálogos del cuento.

- **Clasificación del contacto:**
  - *toque*: contacto lento;
  - *caricia*: la mano se mueve despacio sobre él más de 0,45 s;
  - *empujón*: la mano entra a más de 0,12 m/s;
  - *golpe*: a más de 0,8 m/s;
  - *agarre*: pinza.
- **Guardián**:
  - el toque lo aplasta y estira (squash & stretch);
  - el golpe lo desplaza, lo hace girar y balancea la flor con inercia;
  - el empujón lo corre;
  - la caricia lo hace brillar;
  - se puede agarrar: flota detrás de la mano y, al soltarlo, vuelve con un resorte amortiguado (si se lanza, más despacio);
  - no sale de la maqueta.
- **Nico**:
  - mira los bloques que se mueven;
  - se asusta si cae uno cerca;
  - una caricia en la cabeza lo hace sonreír y saltar.

**Gesto de protección** (`GestureSystem`):

- En «Ponerse a salvo», en el paso de cubrirse, el Guardián pide «¡Cúbrete tú también! Pon las dos manos sobre tu cabeza».
- Cuenta cuando las dos palmas están a menos de **30 cm** del visor y no más abajo de la barbilla. Deja de contar a más de **40 cm** (histéresis). Hay que sostenerlo **0,6 s**, con una barra de progreso.
- No hace falta tocar el visor.
- Al lograrlo, Nico imita la postura, aparece «¡Bien hecho!» y el paso avanza.
- Tocar a Nico o el botón del panel siguen valiendo, como alternativa accesible.

**Gestos:**

| Gesto | Uso |
| --- | --- |
| Pinza (índice + pulgar) | Agarrar |
| Abrir los dedos | Soltar |
| Manos a la cabeza | Cubrirse |
| Tocar con el índice | Icono del panel, tambor |
| Golpe con la mano | Tambor, Guardián |
| Pinza en el asa | Mover el panel |
| Mano abierta cerca de un objeto | Resaltado (punto amarillo) |

Los umbrales están en `HAND_CFG`, `GRAB_CFG`, `REACT_CFG` y `GESTURE_CFG`.

**Limitaciones conocidas:**

- El Guardián no tiene expresiones faciales animables en su modelo. Por eso sus emociones se muestran con brillo, aplastamiento, giro y la flor.
- Sus límites son los de la maqueta, no los muebles uno por uno.
- La caja de Nico es una sola (no por partes del cuerpo).
- No se usan anclas espaciales.

### Rendimiento (objetivo 72 fps)

- Una sola sombra, de 1024 px, con PCF simple, encuadrada en la maqueta.
- No se dibujan el cielo, el paisaje ni el polvo.
- Foveación activa (la de IWSDK).
- Sin asignaciones de memoria por cuadro en los sistemas. La UI se sincroniza a 10 Hz y solo cuando algo cambia.

- Las físicas solo existen mientras se arma la torre (8 cuerpos, Havok en un worker a paso fijo; los cuerpos quietos duermen).
- Antes de medir la distancia exacta a la caja de un objeto, se descarta con una esfera envolvente.

Medido en el emulador en la sala abierta: **370 llamadas de dibujo** (ambos ojos y sombra) y **269 mil triángulos**. La versión VR anterior tenía 446 llamadas. Con la torre en juego: 192 llamadas y 195 mil triángulos.

### Tipografía

La fuente de UIKit incluida no trae tildes, ñ ni ¡¿. Por eso se generó **Fredoka**,
la tipografía del cuento, como fuente MSDF (`public/fonts/`, licencia OFL). Contiene
todos los caracteres usados en la historia.

## Pruebas

Todas las pruebas automáticas se hicieron en el **emulador IWER (Meta Quest 3
emulado, sesión `immersive-ar`) en un computador, no en un visor físico**. El
emulador no simula la habitación: no hay imagen de passthrough ni hit-test real.
Avisa «Synthetic Environment Module required for emulating hit-test» y usa la
colocación sobre el piso de `local-floor`.

```sh
npx @iwsdk/cli dev up --headless --allow-browser-automation
npx @iwsdk/cli xr enter --input-json '{}'
npx @iwsdk/cli browser run tests/estado-maqueta.mjs                 # colocación, escala, estado
npx @iwsdk/cli browser run tests/recorrido.mjs --timeout 110000     # repetir hasta "terminado"
```

`tests/recorrido.mjs` recorre el cuento completo a escala de maqueta:

1. Portada.
2. La sala: radar, ponerse a salvo, tambor.
3. El pasillo: zapatos, camino, réplica, tortuga.
4. El patio: zona segura.
5. Cierre y vuelta a la portada.

En el emulador se completaron los 5 juegos. Además se probaron con **entrada
emulada real** (rayo + gatillo o pellizco de IWER):

- vista previa sobre el piso y colocación, con el control y con el pellizco de la mano;
- «Abre el libro» en el panel;
- radar (4/4);
- arrastrar a Nico bajo la mesa;
- ponerse a salvo tocando a Nico (3 pasos);
- tambor apuntando (un gatillo fuera del tambor no cuenta) y tocándolo con el control;
- giro de 30°, cambio de tamaño y A para volver a colocar.

Con la **mano emulada** de IWER (pellizco real de las articulaciones) y con el control:

- **torre** (`sh tests/torre-entrar.sh`, luego `sh tests/torre-manos.sh`, con `SRCS="0 5 3"`): 4 bloques apilados con la mano, torre validada, Nico agradece y la historia sigue. Con el botón lateral del control también se apila;
- **Nico con la mano** en el radar (`tests/radar-listo.mjs`): se agarra, cuelga, se lleva bajo la mesa, se suelta y el juego se completa;
- **gesto de cubrirse** (`tests/pasos-hasta-cubrirse.mjs`, luego manos sobre la cabeza): se reconoce y el paso avanza;
- **panel**: moverlo pellizcando el asa, ocultarlo y devolverlo tocando el icono con el índice;
- **Guardián**: el golpe lo desplaza y vuelve con el resorte; agarrarlo, llevarlo y soltarlo.

**Pendiente de verificar en un Quest 3 real:**

- comodidad y precisión de la pinza sobre objetos de 3 cm con el tracking real de manos (los umbrales pueden necesitar ajuste);
- estabilidad de la torre con el temblor natural de las manos;
- el gesto de cubrirse con las manos reales (la palma real puede quedar más lejos o más cerca que en el emulador);
- fps reales con las físicas activas;

- hit-test real del piso y estabilidad de la maqueta al caminar;
- fps reales;
- legibilidad de los paneles;
- si los objetos de 16 cm se pueden tocar cómodamente con el rayo;
- audio espacial;
- seguimiento real de manos y toque del tambor con la mano.

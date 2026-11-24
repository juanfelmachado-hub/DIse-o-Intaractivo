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
| Agarrar algo de la maqueta (bloques, Nico, zapatos, el Guardián) | Acercar el control y apretar el botón lateral | Pellizcarlo con el pulgar y el índice (a menos de 2 cm); abrir los dedos para soltar. Se puede llevar fuera del libro: al soltarlo cae al piso real |
| Pasar la hoja | Apuntar al sello redondo de la esquina de la hoja y apretar el gatillo | Bajar el índice sobre el sello, o pellizcar el borde exterior de la hoja y llevarlo hacia el lomo |
| Construir la torre (primera página) | Agarrar los bloques con el botón lateral y apilarlos | Pellizcar los bloques y apilarlos |
| Arrastrar (Nico en los juegos) | Mantener el gatillo y mover el rayo, o agarrarlo de cerca con el botón lateral | Agarrarlo con la mano (con la mano no se arrastra a distancia) |
| Zapatos (juego 3) | Agarrar cada zapato con el botón lateral y llevarlo a su pie; o tocar el par con el rayo y el gatillo | Pellizcar un zapato, llevarlo al pie que corresponde (aro verde) y soltarlo; cerca del pie se acomoda solo |
| Radar (juego 1) | Acercar la punta del control a los objetos: el anillo del radar va en la punta y el bip late más rápido cerca del peligro; tocar el peligro con la punta (o apuntarle y apretar el gatillo) | Acercar la punta del índice: el anillo del radar va en el dedo; hay que tocar el peligro con la punta del índice |
| Ponerse a salvo | Tocar a Nico con el rayo (o el botón del panel) | Igual. En «¡Cúbrete!», poner las dos manos sobre la cabeza |
| Mover el panel del cuento | Agarrar el asa (barra bajo el panel) con el botón lateral, de cerca o apuntándole | Pellizcar el asa; girar la muñeca lo gira |
| Ocultar el panel | «Ocultar» en el panel; vuelve tocando el icono junto al libro (o apuntándole con el gatillo) | Igual, tocando el icono con el índice |
| Ritmo (juego 2) | Golpear el corazón 3D al ritmo del latido: tocarlo con el control, o apuntarle y apretar el gatillo | Golpearlo con el índice o la palma (hay que moverse hacia él; una mano quieta encima no cuenta). La pinza no golpea |
| Girar la maqueta 30° | Palanca a la izquierda o la derecha | — |
| Tamaño de la maqueta | Palanca arriba (más grande) o abajo (más pequeña), o «Tamaño» en el panel | «Tamaño» en el panel |
| Mover el libro a otro lugar | Botón A o X, o «Mover» en el panel | «Mover» en el panel |
| Devolver los objetos a su lugar (bloques, Nico, Guardián; reinicia la cuenta del corazón) sin cambiar la historia | «Reiniciar» en el panel | Igual |
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

- El piso se busca con el **hit-test** de WebXR, con una fuente por cada mano o control activo. La fuente se renueva al cambiar de controles a manos (o al revés); antes se usaba la sonda de IWSDK, que queda atada a la fuente que existía al entrar y deja de encontrar el piso si después se cambia a las manos.
- Solo valen puntos horizontales al menos 50 cm por debajo de los ojos. El piso real se **aprende** con los puntos más bajos que devuelve el visor, así que el libro queda a ras del piso aunque el `local-floor` (y = 0) del Quest esté mal calibrado. Un punto más de 12 cm por encima del piso aprendido es un mueble (mesa, sofá) y no cuenta (`FLOOR_CFG`).
- Mientras el visor no da ningún punto, se usa la última altura del piso medida (al principio, y = 0 de `local-floor`). El aviso lo dice: «Piso encontrado» o «piso aproximado».
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
- **NicoSystem**: Nico como juguete (agarrar en 3D, caer, volver cuando la historia lo necesita).
- **PageSystem**: pasar la hoja con la mano (sello y borde de la hoja).
- **HeartSystem**: el corazón 3D del juego de ritmo.
- **RadarTouchSystem**: el radar del juego 1 en la punta del índice.
- **ShoesSystem**: los dos zapatos del juego 3, cada uno a su pie.
- **TowerSystem**: la torre de bloques con físicas.
- **ReactionSystem**: reacciones de Nico y del Guardián al tacto.
- **GestureSystem**: el gesto de cubrirse la cabeza.
- **StoryInputSystem**: rayo del control o de la mano y mouse → juegos originales, y toque físico del tambor.
- **StoryUISystem**: paneles UIKitML (`public/ui/story.uikitml`, `public/ui/menu.uikitml`).
- **SpatialAudioSystem**: oído del lector y orígenes de los efectos.
- **StoryFxSystem**: anillos de radar, tambor (fuera del visor) y objetos tocables.

### Interacción con las manos

Todo pasa por un solo sistema (`HandInteractionSystem`) con un registro de objetos
agarrables (`world.globals.interact`). Cada mano, sea mano real o control, sigue
esta máquina de estados: **IDLE → HOVER → GRABBING → (soltar) → IDLE**.

- **Manos** (`src/interaction/hands.js`): se leen las articulaciones de WebXR (puntas del pulgar y del índice, palma y muñeca). El Quest entrega cada articulación ya en 3D, en metros (no es una estimación desde una cámara RGB), así que la profundidad es real y todo se mide en el mismo espacio del mundo que la maqueta.
  - **Filtro One Euro** (`src/interaction/filters.js`) en cada articulación: con la mano quieta corta el temblor (1,6 Hz) y con la mano rápida casi no agrega retraso. La orientación se suaviza con el mismo criterio.
  - **Umbrales adaptativos**: la pinza se cierra a menos de **1,8 cm** y se abre a más de **4 cm** para una mano de referencia (8,5 cm de la muñeca al nudillo del medio); los dos umbrales se escalan con el tamaño real de la mano.
  - **Histéresis y confirmación temporal**: el cierre debe sostenerse **30 ms** y la apertura **50 ms**; un parpadeo del tracking no agarra ni suelta.
  - Mientras la pinza está cerrada, el punto de agarre queda anclado a la muñeca: al abrir los dedos el objeto no se arrastra ni sale disparado.
  - **Pérdida de tracking**: los puntos se congelan donde estaban (nada se teletransporta). Si la mano vuelve antes de **0,35 s**, se sigue sosteniendo y el punto vuelve suave al real (0,2 s). Si no vuelve, se suelta **sin velocidad**: el objeto cae recto. Cambiar de mano a control (o al revés) también suelta sin lanzar.
- **Controles**: el punto de agarre está 5 cm delante de la empuñadura y el botón lateral es la pinza.
- **Formas de interacción** (`src/interaction/shapes.js`): una caja ajustada a las mallas **visibles** de cada objeto (sin sprites, brillos ni las cajas de "hit" invisibles de la web). La distancia se mide en metros reales hasta la superficie de la caja. Se resalta a menos de **5 cm** (punto amarillo) y se agarra a menos de **2,2 cm** (punto verde mientras se sostiene).
- **Prioridades**: si dos objetos están casi igual de cerca, gana el de mayor prioridad: Nico y los objetos de los juegos (3), bloques, Guardián y hoja (0). Mientras se pasa la hoja, solo la hoja responde (`interactLock`).
- **Superficies sólidas** (`src/interaction/surfaces.js`): no hay límites invisibles. Lo sólido es lo que existe: la página, dentro del contorno del libro abierto, y el piso real de la habitación, afuera. Nada los atraviesa.
- **Manipulación 3D común** (`src/interaction/carry.js`): Nico, los zapatos y lo que se arrastra en los juegos usan el MISMO agarre. Se toma desde el punto pellizcado (posición y giro relativos a la mano), sigue a la mano en X, Y y Z y gira con ella en los tres ejes con suavizado exponencial, nunca baja más que la superficie de abajo, y al soltarlo hereda la velocidad (tope 1,2 m/s), cae con gravedad, rebota, frena y se endereza conservando hacia dónde mira.
- **Capas** (`src/interaction/layers.js`): al deshacer una capa se devuelve el giro original exacto (los mismos ángulos), no uno reconstruido: reconstruirlo convertía un giro de 180° en x = π, z = π y el código del cuento, que anima `rotation.y`, dejaba a Nico mirando al revés.
- **Capas**: levantar a Nico o empujar al Guardián se suma encima de la animación del cuento y se deshace exacta cada cuadro. Así no pelea con el código original.
- **Nico como un juguete** (`NicoSystem`): **LIBRE → AGARRADO → CAYENDO → EN EL PISO → VUELVE**.
  - Se toma desde el punto donde se pellizcó (no salta al centro) y sigue a la mano en X, Y y Z con un suavizado exponencial, también fuera del libro.
  - Se puede tomar durante TODA la historia, también en los juegos (radar, pasillo, patio, zapatos, corazón); solo no mientras pasa la hoja o mientras vuelve a su lugar. Gira con la mano en los tres ejes.
  - Cuelga (postura `dangle`), balancea las piernas y pone cara de sorpresa si la mano va rápido. Nunca baja más que la superficie de abajo.
  - Al soltarlo hereda la velocidad de la mano (tope 1,2 m/s) y cae con gravedad real (9,8 m/s²) sobre la página o el piso real; rebota un poco, frena con fricción y recupera el equilibrio.
  - Se queda donde cayó. Solo vuelve (caminando, con un saltito) cuando la historia avanza y lo necesita en su lugar, o con «Reiniciar».
  - Si un juego lo "levanta" dentro del modelo al empezar a arrastrarlo (radar, patio), con la mano ese levantamiento se anula: Nico queda en la pinza.
  - **Debajo de la mesa** (juego 1) se queda sentado en el piso, mirando al lector (en la web sigue agachado).
  - **Camino del pasillo**: mientras camina y mientras se lo lleva en la mano, mira hacia la puerta.
  - En los juegos que mueven a Nico (radar, camino del pasillo, patio) el juego recibe dónde está mientras se lo lleva (el camino avanza llevándolo con la mano) y, al aterrizar, decide si el lugar vale o lo devuelve (mecánica narrativa).

**Los zapatos con las manos** (`ShoesSystem`, juego 3). En el visor el par se separa en dos zapatos, cada uno con su pie:

- Cada zapato se agarra con la pinza y se mueve y gira libre en 3D (el mismo agarre que Nico). Si se suelta lejos, cae y se queda donde cayó: se puede volver a tomar.
- **Zona del pie**: a menos de 5,8 cm (0,34 unidades del cuento) del pie que le corresponde, mirando más o menos hacia donde mira Nico (margen de 80°), aparece un **aro verde** en el pie y un **imán suave** lo acerca. Cerca del otro pie el aro es **naranja** y el Guardián dice «Ese zapato es del otro pie».
- Al soltarlo en la zona (o al llegar a menos de 1,7 cm) se acomoda con una transición corta, queda **pegado al pie** (sigue a Nico aunque se lo lleve en la mano) y se bloquea; suena «clac» y salen chispas.
- Con los dos puestos el juego sigue igual que en la web (zapatos del modelo, saltito, el camino).
- Umbrales en `SHOES_CFG`. «Reiniciar» devuelve a su lugar los zapatos que no están puestos.

**La torre** (`TowerSystem`, primera página):

- En la web la torre se armaba sola. En el visor Nico dice «¿Me ayudas a construir una torre con estos bloques?» y los 6 bloques quedan regados por la sala.
- Usa las físicas de IWSDK (**Havok**, el motor que ya trae IWSDK; no se agregó otro). Cada bloque tiene gravedad, masa, fricción y rotación, y choca con la página, con Nico (un cuerpo cinemático que lo sigue aunque se lo lleve en la mano), con los otros bloques y con el **piso real** de la habitación: un bloque soltado fuera del libro cae al piso y se queda ahí.
- Si un bloque se pierde (cae por debajo del piso o a más de 3 m), vuelve a su lugar: los objetos no desaparecen.
- **Espacio de físicas**: un bloque mide ~3 cm en la maqueta, y Havok no sostiene cajas tan chicas (en el emulador se hundían en el piso). Por eso la simulación corre aparte, en las coordenadas de la página × 2, con la gravedad compensada: vista en la maqueta, un bloque cae a 9,8 m/s², como un juguete real.
- Al soltar un bloque casi derecho (menos de 25° de inclinación) se endereza solo. Hereda la velocidad de la mano (con un tope).
- **Validación**: 4 bloques en reposo, cada nivel a su altura y apoyado sobre el de abajo, quietos 2 s. Si la torre se cae, Nico se cubre y anima a intentarlo otra vez.
- Al terminar, Nico celebra («¡Gracias! ¡Es la torre más alta del mundo!») y la historia sigue igual que en la web: el temblor derriba la torre que construyó el lector.
- Después de 40 s, «Siguiente» ofrece «Que la termine Nico».

**Reacciones** (`ReactionSystem`): cada personaje tiene una máquina de estados
**IDLE (autónomo) → OBSERVANDO → SORPRESA → REACCIÓN → RECUPERACIÓN → IDLE**, con
tiempos de espera. El Guardián además: **AGARRADO (control del usuario) → LIBRE →
VOLVIENDO → IDLE**. Las reacciones no interrumpen los diálogos del cuento.

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
  - se puede agarrar y llevar a cualquier lado, también fuera del libro: un resorte persigue la mano (sin saltos);
  - al soltarlo (o tras un golpe fuerte) queda LIBRE: flota donde quedó, frenado por el aire, durante 6 s (3 s tras un golpe). Después vuelve solo, despacio, junto a Nico (VOLVIENDO), porque es su guardián y la historia lo necesita cerca;
  - nunca atraviesa la página ni el piso real, y no se atasca en el borde del libro: al salir del contorno, la superficie de abajo pasa a ser el piso.
- **Nico**:
  - mira los bloques que se mueven;
  - se asusta si cae uno cerca;
  - una caricia en la cabeza lo hace sonreír y saltar.

**Pasar la hoja con la mano** (`PageSystem`). Respeta el avance del cuento igual
que la web (`story.canTurn`): durante un juego la hoja no se agarra y, si todavía
no se puede pasar, la hoja cede apenas (0,16 rad) y vuelve.

- **Método A, botón «Continuar» en la página**: un botón ancho impreso en el margen de abajo de la hoja derecha. Hace lo mismo que «Siguiente» del panel: avanza el cuento y, con la página lista, la pasa. Aparece cuando se puede avanzar (no durante un juego ni con una tarea pendiente) y late suave. En la hoja izquierda, «Volver» regresa a la página anterior. Se presiona bajando el índice sobre él (un dedo quieto encima no lo presiona) o apuntándole con el rayo; se hunde y brilla al presionarlo.
- **Método B, pellizcar el borde**: se pellizca la franja del borde exterior de la hoja. No gira hasta que la mano se mueve unos 3 cm hacia el lomo o hacia arriba (evita giros accidentales). Después la hoja se curva y sigue el ángulo de la mano alrededor del lomo. Al soltar, la misma lógica de la web decide: pasado el umbral (o con impulso) termina de girar; si no, vuelve. Funciona hacia adelante y hacia atrás. Mientras se sostiene, las demás interacciones quedan bloqueadas, y un gesto pasa una sola hoja.

**El juego de ritmo con un corazón 3D** (`HeartSystem`). En el visor el tambor se
reemplaza por un corazón que late flotando frente a Nico (Nico ya no es la
superficie de golpe).

- Late con el sonido del latido («pum… pum») y se contrae y expande con cada uno.
- Primero hay una **demostración**: 3 latidos que solo se escuchan y se ven. Después aparece «¡Ahora tú! Golpéalo al ritmo».
- **Golpe real**: cuenta solo cuando el índice o la palma entran al corazón moviéndose hacia él a más de **0,25 m/s**. Un roce lento o una mano quieta dentro no cuentan, y para volver a golpear hay que salir 3 cm.
- **Nunca con la pinza**: pellizcar (o apuntar con el rayo de la mano y pellizcar) no golpea el corazón. Con el control, el gatillo apuntando sigue valiendo.
- **Calificación de cada golpe**: «¡Perfecto!» a menos del 12 % del intervalo del latido (más chispas, doradas), «Correcto» hasta el 38 % (la ventana del juego original, en `DrumActivity`), y «Fuera de ritmo» más allá: el corazón se apaga un instante.
- **Progreso**: un anillo de 12 puntos alrededor del corazón; cada acierto enciende uno con chispas.
- «Reiniciar» vuelve la cuenta a 0 y repite la demostración, sin reiniciar la historia.
- Los umbrales están en `HEART_CFG`.

**Radar con la punta del índice** (`RadarTouchSystem`). En el visor el radar ya
no sigue al rayo ni a la mirada: el anillo que late está en la punta del índice (o
del control), y la cercanía se mide en 3D, en metros, desde esa punta hasta la
superficie de cada peligro (la misma curva de bip de la web, con un alcance de
unos 44 cm a escala 0,17). Un peligro se descubre **tocándolo** con la punta del
dedo (a menos de 1,2 cm); para volver a tocar el mismo objeto hay que alejar el
dedo 3 cm y esperar 0,6 s (vale para las dos manos: un toque se registra una vez). Lo seguro (sofá, planta) responde como en la web. El pellizco a
distancia ya no descubre peligros (con el control, el gatillo apuntando sigue
valiendo). Umbrales en `RADAR_CFG`.

**Reiniciar** (botón del panel, `world.globals.resetObjects`): devuelve los bloques
(si la torre está en juego), Nico y el Guardián a su lugar, con posición, rotación y
velocidad en cero, reinicia la cuenta del corazón y devuelve los zapatos que no están puestos. La historia no cambia. Una torre
ya terminada no se deshace: es parte del cuento.

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
| Tocar con el índice | Icono del panel, sello de la hoja |
| Golpe con la mano | Corazón, Guardián |
| Pinza en el borde de la hoja | Pasar la hoja |
| Pinza en el asa | Mover el panel |
| Mano abierta cerca de un objeto | Resaltado (punto amarillo) |

Los umbrales están en `HAND_CFG`, `GRAB_CFG`, `NICO_CFG`, `PAGE_CFG`, `HEART_CFG`, `REACT_CFG` y `GESTURE_CFG`.

**Limitaciones conocidas:**

- El Guardián no tiene expresiones faciales animables en su modelo. Por eso sus emociones se muestran con brillo, aplastamiento, giro y la flor.
- Las superficies sólidas son la página y el piso real. No se reconocen los muebles de la habitación (una mesa o un sofá): un objeto soltado sobre una mesa real cae hasta el piso. Tampoco los muebles del cuento son sólidos: Nico y el Guardián se apoyan en la página, y los bloques chocan con la página, Nico, los otros bloques y el piso.
- El piso real es la altura donde se colocó el libro (hit-test o `local-floor`).
- La caja de Nico es una sola (no por partes del cuerpo).
- La pinza sobre objetos de 3 cm depende de la precisión del tracking de manos del visor; los umbrales se ajustan con el tamaño de la mano, pero deben probarse en el Quest.
- Si las manos se tapan entre sí o salen de la vista de las cámaras del visor, el Quest deja de entregar articulaciones: el objeto se suelta tras 0,35 s.
- No se usan anclas espaciales.

### Rendimiento (objetivo 72 fps)

- Una sola sombra, de 1024 px, con PCF simple, encuadrada en la maqueta.
- No se dibujan el cielo, el paisaje ni el polvo.
- Foveación activa (la de IWSDK).
- Sin asignaciones de memoria por cuadro en los sistemas. La UI se sincroniza a 10 Hz y solo cuando algo cambia.

- Las físicas solo existen mientras se arma la torre (9 cuerpos: 6 bloques, la página, el piso de la habitación y Nico; Havok en un worker a paso fijo; los cuerpos quietos duermen). Nico, el Guardián y la hoja usan dinámica propia, liviana (sin cuerpos de Havok).
- El filtro One Euro y la máquina de la pinza no asignan memoria por cuadro.
- Antes de medir la distancia exacta a la caja de un objeto, se descarta con una esfera envolvente.

Medido en el emulador en la sala abierta: **370 llamadas de dibujo** (ambos ojos y sombra) y **269 mil triángulos**. La versión VR anterior tenía 446 llamadas. Con la torre en juego: 192 llamadas y 195 mil triángulos. Con el corazón del juego de ritmo: 205 llamadas y 215 mil triángulos.

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

**Interacción libre, hoja, corazón y tracking** (emulador, mano emulada; estado con
`tests/objetos-estado.mjs`):

| Prueba | Cómo | Resultado |
| --- | --- | --- |
| Nico sale del libro | Pellizcarlo, subirlo a 30 cm, llevarlo a x = 0,80 m (el libro termina en 0,54) y soltarlo | Lo sigue en X, Y y Z; cae al piso real (y = 0) y se queda ahí |
| Nico en el radar | `tests/radar-listo.mjs`, llevarlo con la mano bajo la mesa | El juego se completa |
| Guardián sale del libro | Pellizcarlo y llevarlo a x = 0,75 m | AGARRADO → LIBRE (se queda flotando) → VOLVIENDO → IDLE junto a Nico |
| Guardián reacciona | Golpe rápido con el índice | Sale despedido fuera del libro (x = −1,15 m), queda sobre el piso real sin atravesarlo, LIBRE y luego vuelve |
| Bloque fuera del libro | Soltar un bloque de la torre en x = −0,85 m | Cae al piso real (y = 0,014, la mitad de su altura) y se queda |
| Los objetos no desaparecen | Los tres casos anteriores | Nico, el Guardián y el bloque siguen visibles donde cayeron |
| Sello de la hoja (A) | Bajar el índice sobre el sello; y apuntarle con el rayo del control + gatillo | Las dos formas pasan la hoja (p0 → p1) |
| Agarrar la hoja (B) | Pellizcar el borde y llevarlo al lomo | Con la historia bloqueada: cede hasta 0,16 rad y vuelve. Movimiento corto y soltar: vuelve. Movimiento largo: pasa la hoja adelante (p0 → p1) y atrás (p1 → p0). Durante un juego no se agarra |
| Corazón: golpe real | `tests/hasta-corazon.mjs`; golpes con el índice | Acercamiento lento: rechazado. Mano quieta dentro 6 s: 0 golpes. Golpes reales: cuentan; uno a destiempo se marca como fallo. 12 aciertos completan el juego |
| Corazón: reintentar | `tests/corazon-reintentar.mjs` | La cuenta vuelve a 0, repite la demostración y la historia sigue en el mismo momento |
| Pérdida de tracking | Sostener a Nico en el aire y desconectar la mano (`xr set-connected`); cambiar de mano a control; `tests/muestrear-nico.mjs` registra cada cuadro | Se suelta sin velocidad y cae recto (x no cambia); la mano que reaparece lejos no lo mueve. Antes del arreglo, el cambio de fuente lo lanzaba 24 cm |
| Reiniciar | Botón del panel con el rayo (`tests/reiniciar.mjs` llama la misma acción) | Bloques, Nico y Guardián vuelven a su lugar; la historia sigue en el mismo momento |
| Filtro One Euro y pinza | `sh tests/torre-manos.sh` | Torre de 4 bloques con la mano, igual que antes |
| Radar con el dedo | `tests/radar-dedo.mjs`, luego la punta del índice hacia cada objeto (`tests/radar-estado.mjs`) | La cercanía sube al acercarse (0,69 → 0,82 → 0,93) sin descubrir nada; al tocar, se descubre cada peligro; la planta (segura) no cuenta; con los 4, el radar se apaga y sigue llevar a Nico. El anillo se dibuja en la punta del dedo |
| Colocar el libro | Entrar, cambiar a manos, apuntar con la mano al piso y pellizcar | Se coloca. El emulador no tiene hit-test, así que solo prueba el piso aproximado |
| Zapatos con la mano | `bash tests/ir-zapatos.sh`, luego `bash tests/zapatos-manos.sh` (estado: `tests/zapatos-estado.mjs`) | Cada zapato se agarra (`grab:shoe`); junto al otro pie se marca «pie equivocado» (aro naranja); junto a su pie, imán y se pone solo (se bloquea pegado al pie); con los dos, Nico queda con zapatos y empieza el camino |
| Nico en el camino del pasillo | `bash tests/pasillo-manos.sh` | Llevándolo con la mano el camino avanza (u 0 → 0,30); sigue la posición y el giro de la mano mientras el juego lo hace caminar |
| Nico en el patio | `tests/_ir-patio.mjs` + `tests/patio-estado.mjs`, llevarlo con la mano | Soltado en el poste (no seguro): el juego lo devuelve. En el centro: el juego se completa |
| Nico gira con la mano | Agarrarlo y girar la mano 60° en X, en Y y en Z | El giro de Nico cambia en los tres ejes; al soltarlo cae, se endereza y conserva hacia dónde mira |
| Corazón sin pinza | `bash tests/corazon-manos.sh` (antes `tests/hasta-corazon.mjs`) | 3 pinzas apuntando desde 30 cm y 4 pinzas con la mano quieta dentro: 0 golpes. Golpes con el índice: «¡Perfecto!», «Correcto» y «Fuera de ritmo» según el momento. Con el control, el gatillo apuntando sigue contando (3 de 3) |
| Radar sin pinza | Pinza apuntando a la lámpara desde 30 cm; luego tocarla con el índice | La pinza no descubre nada; el toque sí. Tocar el sofá, alejarse 30 cm y volver a tocar: cuenta otra vez |
| Botón «Continuar» | `tests/boton-continuar.mjs`; bajar el índice sobre el botón | Cada toque avanza el cuento (b0 → b1 → b2); el dedo quieto encima no lo presiona |
| Nico bajo la mesa | Llevarlo con la mano bajo la mesa (`tests/radar-listo.mjs`, `tests/nico-mesa.mjs`) | Queda sentado (`sit`) bajo la mesa, mirando al lector |
| Nico mira la puerta | `bash tests/pasillo-manos.sh` (usa `tests/nico-puerta.mjs`) | Llevándolo por el camino: 0° entre su frente y la puerta; al soltarlo sigue mirándola |
| Regresión | `bash tests/recorrido.sh` (repite `tests/recorrido.mjs`) | Los 5 juegos completos (los zapatos con la "mano" de ShoesSystem) y el libro se cierra, sin errores |

El emulador mueve la mano a saltos (cada comando la ubica de una vez), no con el
temblor ni la velocidad de una mano real. Por eso los tiempos de golpe, el
filtrado y la pérdida de tracking solo están probados en su lógica.

**Pendiente de verificar en un Quest 3 real:**

- comodidad y precisión de la pinza sobre objetos de 3 cm con el tracking real de manos (los umbrales pueden necesitar ajuste);
- estabilidad de la torre con el temblor natural de las manos;
- el gesto de cubrirse con las manos reales (la palma real puede quedar más lejos o más cerca que en el emulador);
- fps reales con las físicas activas;
- el filtro One Euro y la confirmación de la pinza con el temblor real (que no se sienta retraso);
- la velocidad mínima del golpe al corazón (0,25 m/s) con golpes reales;
- pasar la hoja pellizcando el borde: comodidad del umbral de 3 cm;
- que los personajes caídos al piso real se vean bien con el passthrough y la sombra;

- hit-test real del piso: que el libro quede a ras del piso (con controles y con manos) y estabilidad de la maqueta al caminar;
- radar con el dedo: alcance del bip y que tocar los objetos de la pared sea cómodo;
- la espera de 0,6 s entre toques del radar (en el emulador cada comando tarda ~1 s, así que no se puede probar un doble toque rápido);
- los zapatos: tamaño de la zona del pie (5,8 cm) y el margen de orientación (80°) con manos reales; que el zapato quede bien apoyado en el pie del modelo;
- «Reiniciar» durante el juego de los zapatos (implementado, no probado en el emulador);
- fps reales;
- legibilidad de los paneles;
- si los objetos de 16 cm se pueden tocar cómodamente con el rayo;
- audio espacial;
- seguimiento real de manos y toque del tambor con la mano.

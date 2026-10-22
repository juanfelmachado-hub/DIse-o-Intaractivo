# Nico y su guardián personal — cuento interactivo 3D

Proyecto "El susurro de la Tierra" (Diseño interactivo). Guía de diseño: *Guía visual*;
historia: *Cuento_Nico_y_su_guardian*; juegos: *Juegos_interactivos_Nico*.

Cuento infantil interactivo hecho con Three.js: un libro pop-up flota en un claro
del bosque y **se manipula con el mouse (o el dedo)**, como un libro real:

- **Abrir**: arrastrar la tapa hacia la izquierda.
- **Pasar página**: agarrar la hoja derecha y arrastrarla hacia la izquierda. La hoja
  sigue al cursor, se curva, tiene inercia; si se suelta antes del umbral vuelve
  con un rebote. Hacia atrás: arrastrar la hoja izquierda hacia la derecha.
- **Cerrar**: en la última doble página, arrastrar la hoja izquierda hacia la derecha.

No hay botones de navegación. Los momentos de cada página avanzan solos con un
tiempo de lectura para niños; las actividades bloquean la hoja hasta completarse.

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # versión optimizada en /dist
```

Atajo para revisar una página concreta: `http://localhost:5173/?pagina=6`
(número de página), `?pagina=a1` (actividad) o `?pagina=end` (doble página final).

## Estructura

```text
src/
  main.js                 arranque + carga progresiva (tipografía, cielos y modelos .glb)
  index.html / style.css  interfaz: textos según el Instructivo de texto y diálogos

  data/                   ← CONTENIDO EDITABLE (sin lógica)
    story.js              páginas, momentos (beats), diálogos, acciones, atmósferas
    activities.js         textos de las 3 actividades (según el instructivo)
    theme.js              paleta del moodboard, atmósferas (moods) y encuadres de cámara

  story/StoryController.js  dobles páginas, momentos, actividades; sincroniza los pop-ups con el giro
  core/                   Experience (renderer + bucle), CameraRig, Quake (temblor)
  book/
    Book.js               libro, hoja curvable (malla 25×7) y tapa
    PageTurner.js         arrastre físico de la hoja/tapa (resorte, umbral, inercia, rebote)
    PageArt.js            ilustraciones impresas en las hojas, portada y pies de página
    CoverArt.js           ilustración de la portada pintada con los modelos 3D del cuento
  scenes/                 escenarios pop-up: Room, UnderTable, Exit, Route, Patio
  activities/             SafePlace, ProtectSteps, SafeRoute
  models/
    kit.js                geometrías y materiales compartidos (cacheados)
    assets.js             carga de static/models (niño, pinos y rocas)
    characters/           Nico (modelo con esqueleto, IK en piernas) y el Guardián
    objects/              muebles y objetos del patio
  animations/
    popup.js              mecanismo pop-up: cada pieza nace guardada en el lomo, sale de la
                          ranura, se desliza a su lugar y se levanta (resorte elástico);
                          al cerrar vuelve al lomo. Sincronizado con la apertura de la página
    motions.js            bamboleos, brillos, onomatopeyas
  world/                  cielo (HDRI), paisaje (pinos y rocas entregados), luces, partículas
  ui/                     UI (narrador, globos con colita, instrucciones, pista de arrastre), Hotspots
  utils/Pointer.js        puntero: actividades primero, luego el arrastre de la hoja

static/textures/sky/      HDRI entregados, convertidos a JPG livianos (noche / atardecer)
static/models/nico.glb    el niño (personajej.fbx + esqueleto agregado en Blender)
static/models/naturaleza.glb  pinos y rocas de arbolito.blend
```

## Cómo editar

- **Cambiar un texto o diálogo**: `src/data/story.js` → `beats[].text` / `beats[].dialogue`.
  Bloques de 8 a 18 palabras, una idea por bloque y un personaje por globo.
- **Dónde va el narrador**: `layout.at` de cada página (`'top'`, `'top-left'`,
  `'top-right'`, `'side-left'`, `'side-right'`) y `layout.tone` (`'dark'` en el temblor
  y debajo de la mesa). Los globos de diálogo se ubican solos junto a quien habla.
- **Agregar una página**: añade una entrada a `pages` con `scene`, `mood`, `camera` y `beats`.
- **Cambiar la animación de un momento**: `beats[].do` lista acciones del escenario
  (`'nico.pose:cover'`, `'tower.fall'`, `['a', 'b']` en paralelo…). Las acciones
  genéricas están en `scenes/BaseScene.js`; las propias de cada escenario en su archivo.
- **Nueva pose de Nico**: agrega una entrada en `POSES` (`models/characters/Nico.js`).
  Las piernas se resuelven con IK (los pies quedan plantados); `crouch`, `lean` y
  `hipZ` controlan cuánto baja la cadera, cuánto se inclina el torso y cuánto se
  echa atrás la cadera para mantener el equilibrio. Cada grupo del cuerpo sigue
  su pose con un resorte (`SPRING`).
- **Nuevo escenario**: extiende `BaseScene`, constrúyelo en `build()` con `piece(obj, pliegue)`
  (`'front' | 'back' | 'left' | 'right' | 'none'`) y regístralo en `scenes/index.js`.
  `backdrop()` crea un telón en V de dos paneles que se para en el lomo y se abre como
  puertas; las piezas secundarias se cuelgan de otra pieza con `{ parent: pieza }` y
  se despliegan después de ella. Cada escenario separa sus piezas en `left` y `right`.
- **Ritmo de los pop-ups**: al pasar la hoja, la página que se va se guarda entre 0 % y
  50 % del giro y la nueva sale entre 50 % y 100 % (`progress()` en `StoryController.js`);
  las fases de cada pieza están en el encabezado de `animations/popup.js`.
- **Nueva actividad**: extiende `activities/Activity.js`, regístrala en
  `activities/index.js` y pon sus textos en `data/activities.js` (`guide` es lo que
  el Guardián le dice al lector cuando se acerca a la cámara).
- **Física de la hoja**: `SPRINGS`, `THRESHOLD` y `PEEK` en `book/PageTurner.js`.
- **Atmósfera / cámara**: `data/theme.js` (`moods`, `cameraShots`).

## Referencias usadas

- **Moodboard** → paleta (rojo, naranja, amarillo, verde, azul, lila sobre crema),
  libro pop-up de papel, personajes tipo arcilla, árboles low-poly, colinas pastel,
  arcoíris, interfaz de vidrio.
- **Wireframe** → libro abierto con pop-up al centro, burbujas de texto de vidrio
  arriba a la izquierda, SIGUIENTE abajo a la derecha, botón ▶ en la portada.
- **.blend (inicio / final)** → solo como referencia: noche con luciérnagas y libro
  flotando que se abre pasando hojas; día con el libro que se cierra y muestra la
  portada "El susurro de la Tierra". Todo se recreó con geometrías de Three.js.
- **Borrador del cuento** → texto literal. La "Página 1" del borrador se dividió en
  las páginas 1 y 2 (el borrador no tiene página 2).
- **Instructivo de mini juegos** → las 3 actividades, en los momentos indicados y
  bloqueando SIGUIENTE hasta completarlas.

## Revisión 4 (modelo, entorno, historia y diseño editorial)

- **Niño**: `personajej.fbx` convertido a `static/models/nico.glb`. El FBX no traía
  esqueleto: se le agregó uno (cadera, columna, pecho, cabeza, ojos, cejas, brazos con
  codo y piernas con rodilla y tobillo) con pesos suaves para que la camisa, la
  pantaloneta y las mangas se doblen sin romperse. Se corrigieron las caras invertidas
  de las piezas con escala negativa del FBX. Se le agregó una boquita discreta (el
  modelo no trae boca) para las expresiones que pide el cuento.
- **Agacharse**: pies plantados (IK), rodillas y cadera que se flexionan juntas, cadera
  hacia atrás y torso hacia adelante para mantener el equilibrio, brazos que se adelantan
  durante el movimiento y cabeza que baja al final. Bajar y subir toman ~0.9 s con
  aceleración y frenado suaves.
- **Entorno**: pinos y rocas de `arbolito.blend` (sin materiales: verde, café y gris
  tierra). El archivo no tiene arbustos: se usan sus formas geodésicas en verde.
- **Historia**: texto de *CUENTO FINAL*, repartido en 16 páginas para respetar los
  bloques del instructivo (máximo 3 momentos por página).
- **Editorial**: una sola tipografía (Fredoka); narrador en recuadro crema u oscuro en
  la zona libre de cada escena; Nico y el Guardián en globos con colita; instrucciones
  de juego con ícono; palabras clave resaltadas; folio con color por escena.
- **Portada**: ilustración a sangre con los modelos del cuento y el título grande.

## Revisión 5 (Guía visual, cuento final y juegos interactivos)

- **Una página por escenario** (`data/story.js`): 1 la sala, 2 el pasillo, 3 el patio.
  La página cambia solo cuando el niño la pasa y solo con la barra de página lista.
  El botón "siguiente" de la banda avanza los momentos (Enter o → también).
- **Sistema de textos** (`ui/UI.js`, `style.css`): narración en la banda inferior,
  diálogo a la izquierda (avatar pintado con los modelos 3D), misión a la derecha
  (compacta al jugar, verde con "¡Lo lograste!"), sonidos escritos en la escena y
  barra de página debajo del libro. Solo los colores, la tipografía y las medidas de la guía.
- **Aparición suave** (`animations/reveal.js`): reemplaza el efecto pop-up. Unidades de
  atrás hacia adelante (máx. 7), 750 ms, 260 ms entre unidades; al pasar la página todo
  sale junto en 300 ms. Respeta "reducir movimiento".
- **Juegos** (`activities/`): `RadarActivity` (el radar del Guardián), `DrumActivity`
  (el tambor de la tortuga), `HallwayActivity` y `PatioActivity` (congelados en el
  pasillo y el patio). Cada juego da una estrella del Guardián; al final se juntan.
- **Sonido** (`audio/sfx.js`): sin voces ni narración. `playSfx(nombre)` está conectado
  a los eventos de la guía y no suena hasta que se llene la tabla `SFX`.
- Atajo de desarrollo: `?pagina=sala`, `?pagina=pasillo` o `?pagina=patio`.

# El susurro de la Tierra — cuento interactivo 3D

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
  main.js                 arranque + carga progresiva (tipografías y cielos)
  index.html / style.css  interfaz Liquid Glass

  data/                   ← CONTENIDO EDITABLE (sin lógica)
    story.js              páginas, momentos (beats), diálogos, acciones, atmósferas
    activities.js         textos de las 3 actividades (según el instructivo)
    theme.js              paleta del moodboard, atmósferas (moods) y encuadres de cámara

  story/StoryController.js  dobles páginas, momentos, actividades; sincroniza los pop-ups con el giro
  core/                   Experience (renderer + bucle), CameraRig, Quake (temblor)
  book/
    Book.js               libro, hoja curvable (malla 25×7) y tapa
    PageTurner.js         arrastre físico de la hoja/tapa (resorte, umbral, inercia, rebote)
    PageArt.js            ilustraciones impresas en las hojas
  scenes/                 escenarios pop-up: Room, UnderTable, Exit, Route, Patio
  activities/             SafePlace, ProtectSteps, SafeRoute
  models/
    kit.js                geometrías y materiales compartidos (cacheados)
    characters/           Nico y el Guardián (poses + animación procedural)
    objects/              muebles y objetos del patio
  animations/
    popup.js              mecanismo pop-up: cada pieza nace guardada en el lomo, sale de la
                          ranura, se desliza a su lugar y se levanta (resorte elástico);
                          al cerrar vuelve al lomo. Sincronizado con la apertura de la página
    motions.js            bamboleos, brillos, onomatopeyas
  world/                  cielo (HDRI), paisaje low-poly, luces, partículas
  ui/                     UI (burbujas, pista de arrastre, globo del Guardián), Hotspots
  utils/Pointer.js        puntero: actividades primero, luego el arrastre de la hoja

static/textures/sky/      HDRI entregados, convertidos a JPG livianos (noche / atardecer)
```

## Cómo editar

- **Cambiar un texto o diálogo**: `src/data/story.js` → `beats[].text` / `beats[].dialogue`.
- **Agregar una página**: añade una entrada a `pages` con `scene`, `mood`, `camera` y `beats`.
- **Cambiar la animación de un momento**: `beats[].do` lista acciones del escenario
  (`'nico.pose:cover'`, `'tower.fall'`, `['a', 'b']` en paralelo…). Las acciones
  genéricas están en `scenes/BaseScene.js`; las propias de cada escenario en su archivo.
- **Nueva pose de Nico**: agrega una entrada en `POSES` (`models/characters/Nico.js`).
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

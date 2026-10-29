/**
 * Motor de audio del cuento (un solo lugar controla reproducción, volumen,
 * fundidos y estados: ningún componente toca Web Audio por su cuenta).
 *
 * La página NO tiene narración ni voces. Hay una música de fondo y efectos:
 *
 *   ambiente     "ambiente para toda la web": en bucle desde que se abre el
 *                libro hasta que se cierra. Es la base: baja (ducking) cuando
 *                un efecto necesita protagonismo y vuelve sola, con suavidad.
 *   pagina       "pasando pagina": al abrir, cerrar y pasar cada hoja.
 *   temblor      "Sonido temblor INICIANDO": colchón del sismo. Su volumen
 *                sigue la intensidad real del temblor en pantalla (setQuake),
 *                así suena cuando la tierra empieza a moverse y se apaga al
 *                volver la calma, sin quedarse sonando fuera de la escena.
 *   fuerte       "temblor FUERTE": una sola vez por lectura, en el momento de
 *                mayor intensidad ("¡La casa empezó a temblar!"), con fundido
 *                cruzado desde el colchón.
 *   guardian     "cuando se acerca el guardian": cuando el Guardián aparece o
 *                se acerca al lector (no se repite mientras está quieto).
 *   radar        "BEEP actvidad uno…": el bip del radar; su volumen depende de
 *                la cercanía al peligro (playSfx('radar', { level })).
 *   acierto      al completar una actividad o elegir bien.
 *   latido/tambor  juego "Al ritmo": tambor suave sintetizado (no hay archivo):
 *                el latido guía y el golpe del niño.
 *
 * Jerarquía de volumen: música de fondo < interacción < sismo; el bip varía con
 * la distancia. Los navegadores solo permiten audio tras un toque o tecla: nada
 * suena antes de que el lector empiece.
 */
const BASE = import.meta.env.BASE_URL + 'audio/'
const FILES = {
    ambiente: 'ambiente para toda la web.mp3',
    pagina: 'pasando pagina.mp3',
    temblor: 'Sonido temblor INICIANDO.mp3',
    fuerte: 'temblor FUERTE.mp3',
    guardian: 'cuando se acerca el guardian.mp3',
    radar: 'BEEP actvidad uno de encontrar los objetos.mp3',
    acierto: 'acierto.mp3',
}
/** Efectos de un disparo: volumen, cuánto baja la música mientras suenan y pausa mínima entre repeticiones. */
const ONE_SHOTS = {
    'pasar-pagina': { file: 'pagina', volume: 0.42, duck: 0.8, gap: 0.45 },
    'guardian-llama': { file: 'guardian', volume: 0.5, duck: 0.65, gap: 2.5, fadeIn: 0.12 },
    acierto: { file: 'acierto', volume: 0.42, duck: 0.75, gap: 0.25 },
    radar: { file: 'radar', volume: 0.32, gap: 0.08 },
}
// Jerarquía: la música es fondo (bajo a moderado); el tambor de «Al ritmo» manda
const MUSIC_VOLUME = 0.45 // ≈ −41 dB de media: acompaña sin tapar instrucciones ni efectos
const DRUM_GUIDE = 0.45 // latido guía ("pum-pum")
const DRUM_TAP = 0.62 // golpe del niño
const QUAKE_BED = 0.36 // máximo del colchón del temblor
const STRONG = 0.5 // máximo del temblor fuerte

let ctx = null
let master, musicBus, sfxBus, drumBus, noiseBuf
const buffers = {}
const lastPlay = {}
const ducks = new Map() // id → factor (0…1) sobre la música
let music = null // { src, gain }
let wantMusic = false
let bed = null // colchón del temblor { src, gain }
let bedLevel = 0
let bedScale = 1 // un juego puede pedir que el colchón del temblor se retire un poco
let strong = null
let strongDone = false
const transient = new Set() // efectos en curso (se cancelan al cambiar de escena)

const now = () => ctx.currentTime
function ramp(param, value, time) {
    const t = now()
    param.cancelScheduledValues(t)
    param.setValueAtTime(param.value, t)
    param.linearRampToValueAtTime(value, t + Math.max(0.01, time))
}

/** Recorta el silencio de relleno del MP3 para que el bucle no tenga hueco. */
function loopBounds(buf) {
    const d = buf.getChannelData(0)
    let a = 0
    let b = d.length - 1
    while (a < b && Math.abs(d[a]) < 1e-4) a++
    while (b > a && Math.abs(d[b]) < 1e-4) b--
    return [a / buf.sampleRate, b / buf.sampleRate]
}

function load(key) {
    if (!buffers[key]) {
        buffers[key] = fetch(BASE + encodeURIComponent(FILES[key]))
            .then((r) => r.arrayBuffer())
            .then((data) => ctx.decodeAudioData(data))
            .catch(() => null)
    }
    return buffers[key]
}

// ------------------------------------------------------------ desbloqueo
function unlock() {
    if (ctx) return
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return
    ctx = new AC()
    ctx.resume?.()
    master = ctx.createGain()
    master.gain.value = 1
    // limitador suave: evita saturación si coinciden varios efectos
    const comp = ctx.createDynamicsCompressor()
    comp.threshold.value = -14
    comp.ratio.value = 4
    comp.attack.value = 0.01
    comp.release.value = 0.25
    master.connect(comp).connect(ctx.destination)
    musicBus = ctx.createGain()
    musicBus.gain.value = 1
    musicBus.connect(master)
    sfxBus = ctx.createGain()
    sfxBus.connect(master)
    // canal propio del tambor: nunca baja con la música ni con los demás efectos
    drumBus = ctx.createGain()
    drumBus.gain.value = 1
    drumBus.connect(master)
    // ruido corto para el golpecito de ataque del tambor
    noiseBuf = ctx.createBuffer(1, Math.round(ctx.sampleRate * 0.05), ctx.sampleRate)
    const nd = noiseBuf.getChannelData(0)
    for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1
    Object.keys(FILES).forEach(load)
    if (wantMusic) startMusic()
}
document.addEventListener('pointerdown', unlock, { once: true, capture: true })
document.addEventListener('keydown', unlock, { once: true, capture: true })

// ------------------------------------------------------------ música de fondo
/** La música baja (ducking) según los efectos activos y vuelve con suavidad. */
function applyDucks(time = 0.6) {
    if (!ctx) return
    let f = 1
    for (const v of ducks.values()) f = Math.min(f, v)
    ramp(musicBus.gain, f, time)
}
export function duck(id, factor, time = 0.6) {
    ducks.set(id, factor)
    applyDucks(time)
}
export function unduck(id, time = 1.2) {
    if (!ducks.delete(id)) return
    applyDucks(time)
}

/** Empieza la música de fondo (con fundido de entrada). Si aún no hay audio, empieza al primer toque. */
export function startMusic(fade = 2.5) {
    wantMusic = true
    if (!ctx) return
    if (music) { ramp(music.gain.gain, MUSIC_VOLUME, fade); return }
    load('ambiente').then((buf) => {
        if (!buf || music || !wantMusic) return
        const src = ctx.createBufferSource()
        const gain = ctx.createGain()
        src.buffer = buf
        src.loop = true
        ;[src.loopStart, src.loopEnd] = loopBounds(buf)
        gain.gain.value = 0
        src.connect(gain).connect(musicBus)
        src.start(0, src.loopStart)
        music = { src, gain }
        ramp(gain.gain, MUSIC_VOLUME, fade)
    })
}

/** Apaga la música con un fundido de salida (nunca de golpe). */
export function stopMusic(fade = 3) {
    wantMusic = false
    if (!music) return
    const m = music
    music = null
    ramp(m.gain.gain, 0, fade)
    m.src.stop(now() + fade + 0.1)
}

// ------------------------------------------------------------ temblor
/**
 * Intensidad del temblor en pantalla (0…1), en cada fotograma. El colchón
 * "temblor INICIANDO" la sigue con suavidad y la música baja mientras tiembla.
 */
export function setQuake(intensity) {
    if (!ctx) return
    const target = intensity < 0.04 ? 0 : Math.min(1, (intensity - 0.04) / 0.5)
    // seguimiento suave (sube un poco más rápido de lo que baja)
    const k = target > bedLevel ? 0.06 : 0.025
    bedLevel += (target - bedLevel) * k
    if (bedLevel < 0.003 && target === 0) bedLevel = 0
    if (bedLevel > 0 && !bed) startBed()
    if (bed) {
        // con el temblor fuerte sonando, el colchón se retira (fundido cruzado)
        const strongMix = strong ? 0.35 : 1
        bed.gain.gain.setTargetAtTime(QUAKE_BED * bedLevel * strongMix * bedScale, now(), 0.15)
        if (bedLevel === 0) stopBed()
    }
    // la música deja protagonismo al sismo, sin desaparecer
    if (bedLevel > 0.02) ducks.set('sismo', 1 - 0.65 * Math.min(1, bedLevel * 1.4))
    else ducks.delete('sismo')
    applyDucks(0.25)
}

function startBed() {
    bed = { pending: true, gain: ctx.createGain() }
    bed.gain.gain.value = 0
    bed.gain.connect(sfxBus)
    const b = bed
    load('temblor').then((buf) => {
        if (!buf || bed !== b) return
        const src = ctx.createBufferSource()
        src.buffer = buf
        src.loop = true
        ;[src.loopStart, src.loopEnd] = loopBounds(buf)
        src.connect(b.gain)
        src.start(0, src.loopStart)
        b.src = src
    })
}
function stopBed(fade = 0.8) {
    const b = bed
    bed = null
    ramp(b.gain.gain, 0, fade)
    b.src?.stop(now() + fade + 0.05)
}

/** Escala del colchón del temblor (1 = normal): el tambor lo baja para oírse claro. */
export function setQuakeBedScale(v) {
    bedScale = v
}

/** "¡La casa empezó a temblar!": el temblor fuerte, una sola vez por lectura. */
export function strongQuake() {
    if (!ctx || strongDone) return
    strongDone = true
    load('fuerte').then((buf) => {
        if (!buf) return
        const src = ctx.createBufferSource()
        const gain = ctx.createGain()
        src.buffer = buf
        // entra en escalada (sin pico repentino) y se retira poco a poco al final
        const t = now()
        gain.gain.setValueAtTime(0, t)
        gain.gain.linearRampToValueAtTime(STRONG, t + 1.1)
        const end = t + buf.duration
        gain.gain.setValueAtTime(STRONG, Math.max(t + 1.2, end - 2.2))
        gain.gain.linearRampToValueAtTime(0, end)
        src.connect(gain).connect(sfxBus)
        src.start(t)
        strong = { src, gain }
        duck('fuerte', 0.25, 1)
        src.onended = () => {
            if (strong?.src === src) strong = null
            unduck('fuerte', 2.5)
        }
    })
}

// ------------------------------------------------------------ efectos
/**
 * Efecto de un disparo. Opciones: level (0…1) escala el volumen (el bip del
 * radar lo usa para la cercanía al peligro).
 */
export function playSfx(name, { level = 1 } = {}) {
    if (!ctx) return
    if (name === 'latido') return drum(DRUM_GUIDE, 92, true)
    if (name === 'tambor') return drum(DRUM_TAP, 118, false)
    const s = ONE_SHOTS[name]
    if (!s) return // ganchos sin archivo: no suenan
    const t = now()
    if (lastPlay[name] && t - lastPlay[name] < s.gap) return // sin duplicados
    lastPlay[name] = t
    ctx.resume?.()
    load(s.file).then((buf) => {
        if (!buf) return
        const src = ctx.createBufferSource()
        const gain = ctx.createGain()
        src.buffer = buf
        const vol = s.volume * level
        const start = now()
        gain.gain.setValueAtTime(0, start)
        gain.gain.linearRampToValueAtTime(vol, start + (s.fadeIn ?? 0.008))
        // cola suave (evita cortes con clic)
        gain.gain.setValueAtTime(vol, Math.max(start + 0.02, start + buf.duration - 0.06))
        gain.gain.linearRampToValueAtTime(0, start + buf.duration)
        src.connect(gain).connect(sfxBus)
        src.start(start)
        const fx = { src, gain }
        transient.add(fx)
        if (s.duck) duck(name, s.duck, 0.25)
        src.onended = () => {
            transient.delete(fx)
            if (s.duck) unduck(name, 1)
        }
    })
}

/**
 * Tambor infantil sintetizado: golpe redondo y cálido (latido = "pum-pum").
 * Tres capas para que se oiga claro también en altavoces pequeños (portátil,
 * tableta, móvil), que casi no reproducen los graves:
 *  - cuerpo: tono grave que cae (el "pum");
 *  - armónico: el mismo golpe una octava y media arriba (lo que se oye en un móvil);
 *  - ataque: un golpecito de ruido muy corto que marca el inicio del golpe.
 */
let lastDrum = 0
function drum(volume, pitch, double) {
    const t0 = now()
    if (t0 - lastDrum < 0.07) return // toques muy seguidos no se apilan
    lastDrum = t0
    ctx.resume?.()
    const tone = (t, v, f0, f1, type, decay) => {
        const osc = ctx.createOscillator()
        const g = ctx.createGain()
        osc.type = type
        osc.frequency.setValueAtTime(f0, t)
        osc.frequency.exponentialRampToValueAtTime(f1, t + 0.09)
        g.gain.setValueAtTime(0.0001, t)
        g.gain.exponentialRampToValueAtTime(v, t + 0.008)
        g.gain.exponentialRampToValueAtTime(0.0001, t + decay)
        osc.connect(g).connect(drumBus)
        osc.start(t)
        osc.stop(t + decay + 0.03)
    }
    const click = (t, v) => {
        const src = ctx.createBufferSource()
        const bp = ctx.createBiquadFilter()
        const g = ctx.createGain()
        src.buffer = noiseBuf
        bp.type = 'bandpass'
        bp.frequency.value = 1600
        bp.Q.value = 0.9
        g.gain.setValueAtTime(v, t)
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.035)
        src.connect(bp).connect(g).connect(drumBus)
        src.start(t)
        src.stop(t + 0.05)
    }
    const hit = (t, v, f) => {
        tone(t, v, f * 1.9, f, 'sine', 0.34) // cuerpo
        tone(t, v * 0.42, f * 3.2, f * 2.5, 'triangle', 0.16) // armónico audible
        click(t, v * 0.22) // ataque
    }
    hit(t0, volume, pitch)
    if (double) hit(t0 + 0.16, volume * 0.72, pitch * 0.92) // "pum-pum" de corazón
}

// ------------------------------------------------------------ escenas
/** Al cambiar de escena: los efectos en curso terminan con un fundido corto. */
export function stopEffects(fade = 0.3) {
    if (!ctx) return
    for (const fx of transient) {
        ramp(fx.gain.gain, 0, fade)
        fx.src.stop(now() + fade + 0.05)
    }
    transient.clear()
    if (strong) {
        ramp(strong.gain.gain, 0, 1)
        strong.src.stop(now() + 1.1)
        strong = null
    }
    for (const id of ['pasar-pagina', 'guardian-llama', 'acierto', 'radar', 'fuerte', 'actividad']) ducks.delete(id)
    applyDucks(0.8)
}

/** Nueva lectura: el temblor fuerte vuelve a estar disponible. */
export function resetOnce() {
    strongDone = false
}

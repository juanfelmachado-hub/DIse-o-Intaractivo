/**
 * Ilustraciones impresas en las hojas del libro (texturas de canvas).
 *
 * Cada página imprime el "piso" del escenario pop-up (madera, alfombra, pasto…)
 * más el número y el título al pie. Las dos hojas forman un solo dibujo continuo
 * a través del lomo (por eso la alfombra se dibuja centrada en el borde del lomo).
 *
 * Orientación del canvas: arriba = borde lejano del libro, abajo = borde cercano
 * al lector. Hoja izquierda: el lomo está en el borde derecho del canvas.
 */
import * as THREE from 'three'
import { palette } from '../data/theme.js'
import { seeded } from '../models/kit.js'

const W = 768
const H = 1024
const FONT = "'Fredoka', 'Trebuchet MS', sans-serif"
const SCRIPT = "'Pacifico', 'Brush Script MT', cursive"

let maxAnisotropy = 4
export function setAnisotropy(value) { maxAnisotropy = Math.min(8, value) }

function finish(canvas) {
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = maxAnisotropy
    tex.userData.disposable = true
    return tex
}

function roundRect(g, x, y, w, h, r) {
    g.beginPath()
    g.moveTo(x + r, y)
    g.arcTo(x + w, y, x + w, y + h, r)
    g.arcTo(x + w, y + h, x, y + h, r)
    g.arcTo(x, y + h, x, y, r)
    g.arcTo(x, y, x + w, y, r)
    g.closePath()
}

function paperGrain(g, seed) {
    const rnd = seeded(seed)
    for (let i = 0; i < 1800; i++) {
        g.fillStyle = rnd() > 0.5 ? 'rgba(120,90,60,0.05)' : 'rgba(255,255,255,0.35)'
        g.fillRect(rnd() * W, rnd() * H, 1.5 + rnd() * 1.5, 1.5 + rnd() * 1.5)
    }
}

// ---------------------------------------------------------------- pisos
function drawWood(g, rnd) {
    g.fillStyle = '#f4d6a6'
    g.fillRect(0, 0, W, H)
    const plank = 78
    for (let row = 0, y = 0; y < H; row++, y += plank) {
        let x = -((row * 137) % 260)
        while (x < W) {
            const len = 220 + rnd() * 180
            const shade = rnd()
            g.fillStyle = shade > 0.66 ? '#f0cd98' : shade > 0.33 ? '#f6dbb0' : '#f2d2a1'
            g.fillRect(x + 2, y + 2, len - 4, plank - 4)
            // vetas
            g.strokeStyle = 'rgba(196,130,70,0.18)'
            g.lineWidth = 2
            g.beginPath()
            const vy = y + 18 + rnd() * (plank - 36)
            g.moveTo(x + 20, vy)
            g.bezierCurveTo(x + len * 0.3, vy - 6, x + len * 0.6, vy + 6, x + len - 20, vy)
            g.stroke()
            x += len
        }
        g.fillStyle = 'rgba(190,125,70,0.22)'
        g.fillRect(0, y, W, 3)
    }
}

function drawRug(g, side, cy = H * 0.5, rx = 360, ry = 300) {
    const cx = side === 'left' ? W : 0
    const rings = [
        ['#d9b2f0', 1], ['#f9dc6b', 0.9], ['#fff3dc', 0.84], ['#f4a3b4', 0.64], ['#fff3dc', 0.58], ['#9fd5f7', 0.36],
    ]
    for (const [color, s] of rings) {
        g.fillStyle = color
        g.beginPath()
        g.ellipse(cx, cy, rx * s, ry * s, 0, 0, Math.PI * 2)
        g.fill()
    }
    // puntitos de colores sobre la alfombra
    const dots = [palette.red, palette.orange, palette.green, palette.blue, palette.lilac]
    for (let i = 0; i < 26; i++) {
        const a = (i / 26) * Math.PI * 2
        g.fillStyle = dots[i % dots.length]
        g.beginPath()
        g.arc(cx + Math.cos(a) * rx * 0.74, cy + Math.sin(a) * ry * 0.74, 9, 0, Math.PI * 2)
        g.fill()
    }
}

function drawGrass(g, rnd, flowers = true) {
    g.fillStyle = '#bfe4a2'
    g.fillRect(0, 0, W, H)
    for (let i = 0; i < 40; i++) {
        g.fillStyle = rnd() > 0.5 ? 'rgba(214,240,190,0.7)' : 'rgba(160,210,130,0.45)'
        g.beginPath()
        g.ellipse(rnd() * W, rnd() * H, 40 + rnd() * 90, 26 + rnd() * 50, rnd() * 3, 0, Math.PI * 2)
        g.fill()
    }
    g.strokeStyle = 'rgba(110,175,90,0.55)'
    g.lineWidth = 3
    g.lineCap = 'round'
    for (let i = 0; i < 260; i++) {
        const x = rnd() * W
        const y = rnd() * H
        g.beginPath()
        g.moveTo(x, y)
        g.lineTo(x + (rnd() - 0.5) * 8, y - 10 - rnd() * 8)
        g.stroke()
    }
    if (!flowers) return
    const colors = [palette.red, palette.yellow, palette.lilac, '#ffffff', palette.orange]
    for (let i = 0; i < 34; i++) {
        const x = rnd() * W
        const y = rnd() * H
        g.fillStyle = colors[i % colors.length]
        for (let p = 0; p < 5; p++) {
            const a = (p / 5) * Math.PI * 2
            g.beginPath()
            g.arc(x + Math.cos(a) * 7, y + Math.sin(a) * 7, 6, 0, Math.PI * 2)
            g.fill()
        }
        g.fillStyle = '#ffe58a'
        g.beginPath()
        g.arc(x, y, 5, 0, Math.PI * 2)
        g.fill()
    }
}

function drawStones(g, points) {
    for (const [x, y, r] of points) {
        g.fillStyle = 'rgba(120,100,90,0.18)'
        g.beginPath()
        g.ellipse(x + 4, y + 6, r * 1.2, r * 0.8, 0, 0, Math.PI * 2)
        g.fill()
        g.fillStyle = '#efe6dc'
        g.beginPath()
        g.ellipse(x, y, r * 1.2, r * 0.8, 0, 0, Math.PI * 2)
        g.fill()
    }
}

function drawConfetti(g, rnd) {
    g.fillStyle = '#fff6e6'
    g.fillRect(0, 0, W, H)
    // cuadrícula crema del moodboard
    g.strokeStyle = 'rgba(240,190,140,0.28)'
    g.lineWidth = 3
    for (let x = 0; x < W; x += 64) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke() }
    for (let y = 0; y < H; y += 64) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke() }
    const colors = [palette.red, palette.orange, palette.yellow, palette.green, palette.blue, palette.lilac]
    for (let i = 0; i < 22; i++) {
        g.fillStyle = colors[i % colors.length]
        g.globalAlpha = 0.85
        g.beginPath()
        g.arc(rnd() * W, rnd() * H, 8 + rnd() * 16, 0, Math.PI * 2)
        g.fill()
    }
    g.globalAlpha = 1
}

const floors = {
    room(g, side, rnd) { drawWood(g, rnd); drawRug(g, side) },
    exit(g, side, rnd) { drawWood(g, rnd); drawRug(g, side, H * 0.5, 300, 240) },
    underTable(g, side, rnd) { drawWood(g, rnd); drawRug(g, side, H * 0.46, 470, 400) },
    route(g, side, rnd) {
        if (side === 'left') drawWood(g, rnd)
        else {
            drawGrass(g, rnd)
            drawStones(g, [[90, 560, 30], [190, 590, 26], [290, 560, 28]])
        }
    },
    patio(g, side, rnd) {
        drawGrass(g, rnd)
        if (side === 'left') drawStones(g, [[300, 250, 30], [400, 330, 28], [500, 400, 30], [600, 470, 26], [700, 520, 28]])
        else drawStones(g, [[30, 560, 26]])
    },
    title(g, side, rnd) { drawConfetti(g, rnd) },
}

/**
 * Crea la textura de una hoja.
 * @param {object} page  entrada de story.pages (o un objeto similar)
 * @param {'left'|'right'} side
 */
export function makePageTexture(page, side) {
    const canvas = document.createElement('canvas')
    canvas.width = W
    canvas.height = H
    const g = canvas.getContext('2d')
    const seed = (String(page.id ?? 'x').split('').reduce((a, c) => a + c.charCodeAt(0), 0) + (side === 'left' ? 11 : 37))
    const rnd = seeded(seed)

    // papel
    g.fillStyle = palette.paper
    g.fillRect(0, 0, W, H)

    // área ilustrada
    const outer = 34
    const spine = 14
    const top = 34
    const bottom = 128
    const x0 = side === 'left' ? outer : spine
    const x1 = side === 'left' ? W - spine : W - outer
    g.save()
    roundRect(g, x0, top, x1 - x0, H - top - bottom, 26)
    g.clip()
    const floor = floors[page.scene] ?? floors.title
    floor(g, side, rnd)
    g.restore()

    // marco suave
    g.strokeStyle = 'rgba(255,255,255,0.9)'
    g.lineWidth = 6
    roundRect(g, x0, top, x1 - x0, H - top - bottom, 26)
    g.stroke()

    // pie de página
    g.textBaseline = 'middle'
    const footY = H - bottom / 2 + 6
    if (side === 'left' && page.title) {
        g.fillStyle = palette.ink
        g.font = `600 44px ${FONT}`
        g.textAlign = 'left'
        g.fillText(page.title, outer + 8, footY, W - outer - 120)
    }
    if (side === 'right' && page.number !== undefined) {
        const cx = W - outer - 36
        g.fillStyle = palette.red
        g.beginPath()
        g.arc(cx, footY, 36, 0, Math.PI * 2)
        g.fill()
        g.fillStyle = '#fff'
        g.font = `700 40px ${FONT}`
        g.textAlign = 'center'
        g.fillText(String(page.number), cx, footY + 2)
        // puntos de la paleta
        const dots = [palette.orange, palette.yellow, palette.green, palette.blue, palette.lilac]
        dots.forEach((c, i) => {
            g.fillStyle = c
            g.beginPath()
            g.arc(cx - 70 - i * 30, footY, 9, 0, Math.PI * 2)
            g.fill()
        })
    }

    // sombra del lomo
    const sx = side === 'left' ? W : 0
    const grd = g.createLinearGradient(sx, 0, side === 'left' ? W - 110 : 110, 0)
    grd.addColorStop(0, 'rgba(110,70,40,0.32)')
    grd.addColorStop(0.35, 'rgba(110,70,40,0.1)')
    grd.addColorStop(1, 'rgba(110,70,40,0)')
    g.fillStyle = grd
    g.fillRect(side === 'left' ? W - 110 : 0, 0, 110, H)

    paperGrain(g, seed)
    return finish(canvas)
}

/** Doble página de título (al abrir el libro). */
export function makeTitleTexture(side, text) {
    const canvas = document.createElement('canvas')
    canvas.width = W
    canvas.height = H
    const g = canvas.getContext('2d')
    const tex = makePageTexture({ id: 'title', scene: 'title' }, side)
    g.drawImage(tex.image, 0, 0)
    tex.dispose()

    g.textAlign = 'center'
    g.textBaseline = 'middle'
    if (side === 'right') {
        g.fillStyle = 'rgba(255,250,240,0.85)'
        roundRect(g, 90, 280, W - 160, 400, 40)
        g.fill()
        g.fillStyle = palette.red
        g.font = `86px ${SCRIPT}`
        const words = text.split(' ')
        const lines = [words.slice(0, 2).join(' '), words.slice(2, 4).join(' '), words.slice(4).join(' ')].filter(Boolean)
        lines.forEach((l, i) => g.fillText(l, W / 2 + 10, 380 + i * 104))
    } else {
        g.fillStyle = 'rgba(255,250,240,0.85)'
        roundRect(g, 120, 380, W - 200, 250, 40)
        g.fill()
        g.fillStyle = palette.ink
        g.font = `500 40px ${FONT}`
        wrap(g, text, W / 2 - 20, 450, W - 280, 54)
    }
    return finish(canvas)
}

/** Doble página final: "Fin" y la última frase del Guardián. */
export function makeEndTexture(side) {
    const canvas = document.createElement('canvas')
    canvas.width = W
    canvas.height = H
    const g = canvas.getContext('2d')
    const tex = makePageTexture({ id: 'end', scene: 'title' }, side)
    g.drawImage(tex.image, 0, 0)
    tex.dispose()
    g.textAlign = 'center'
    g.textBaseline = 'middle'
    if (side === 'left') {
        g.fillStyle = 'rgba(255,250,240,0.88)'
        roundRect(g, 110, 300, W - 190, 360, 40)
        g.fill()
        g.fillStyle = palette.red
        g.font = `150px ${SCRIPT}`
        g.fillText('Fin', W / 2 - 10, 450)
        const dots = [palette.red, palette.orange, palette.yellow, palette.green, palette.blue, palette.lilac]
        dots.forEach((c, i) => {
            g.fillStyle = c
            g.beginPath()
            g.arc(W / 2 - 135 + i * 50, 590, 13, 0, Math.PI * 2)
            g.fill()
        })
    } else {
        g.fillStyle = 'rgba(255,250,240,0.88)'
        roundRect(g, 90, 330, W - 170, 330, 40)
        g.fill()
        g.fillStyle = '#4fae5b'
        g.beginPath()
        g.ellipse(W / 2 - 34, 270, 46, 22, -0.6, 0, Math.PI * 2)
        g.ellipse(W / 2 + 26, 270, 46, 22, 0.6, 0, Math.PI * 2)
        g.fill()
        g.fillStyle = palette.ink
        g.font = `500 42px ${FONT}`
        wrap(g, 'Cuando haya peligro, yo te aviso… y tú te cuidas.', W / 2 - 4, 420, W - 260, 58)
        g.fillStyle = '#3f9a3c'
        g.font = `600 34px ${FONT}`
        g.fillText('— el Guardián', W / 2, 600)
    }
    return finish(canvas)
}

function wrap(g, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ')
    let line = ''
    let yy = y
    for (const w of words) {
        const test = line ? `${line} ${w}` : w
        if (g.measureText(test).width > maxWidth && line) {
            g.fillText(line, x, yy)
            line = w
            yy += lineHeight
        } else line = test
    }
    g.fillText(line, x, yy)
}

/** Portada: título en letra cursiva (como en los archivos de Blender). */
export function makeCoverTexture(title, label = null) {
    const CW = 768
    const CH = 1024
    const canvas = document.createElement('canvas')
    canvas.width = CW
    canvas.height = CH
    const g = canvas.getContext('2d')
    const rnd = seeded(7)

    // cuero / cartón de la tapa
    const grd = g.createLinearGradient(0, 0, CW, CH)
    grd.addColorStop(0, '#dd6a47')
    grd.addColorStop(1, '#c4532f')
    g.fillStyle = grd
    g.fillRect(0, 0, CW, CH)
    for (let i = 0; i < 2600; i++) {
        g.fillStyle = rnd() > 0.5 ? 'rgba(255,220,190,0.05)' : 'rgba(90,30,10,0.06)'
        g.fillRect(rnd() * CW, rnd() * CH, 2, 2)
    }
    // lomo
    g.fillStyle = 'rgba(80,20,10,0.18)'
    g.fillRect(0, 0, 46, CH)
    g.fillStyle = 'rgba(255,220,190,0.18)'
    g.fillRect(46, 0, 4, CH)

    // marcos
    g.strokeStyle = 'rgba(255,231,184,0.9)'
    g.lineWidth = 5
    roundRect(g, 90, 60, CW - 140, CH - 120, 34)
    g.stroke()
    g.lineWidth = 2
    roundRect(g, 108, 78, CW - 176, CH - 156, 26)
    g.stroke()

    // título con relieve
    g.textAlign = 'center'
    g.textBaseline = 'middle'
    g.font = `104px ${SCRIPT}`
    const lines = ['El susurro', 'de la', 'Tierra']
    if (title && title !== 'El susurro de la Tierra') { lines.length = 0; lines.push(title) }
    lines.forEach((l, i) => {
        const y = 250 + i * 128
        g.fillStyle = 'rgba(110,30,15,0.55)'
        g.fillText(l, CW / 2 + 22, y + 6)
        g.fillStyle = '#ffe7b8'
        g.fillText(l, CW / 2 + 18, y)
    })

    // emblema: la hojita del Guardián
    const ex = CW / 2 + 18
    const ey = label ? 790 : 730
    g.fillStyle = 'rgba(255,231,184,0.95)'
    g.beginPath()
    g.arc(ex, ey, 62, 0, Math.PI * 2)
    g.fill()
    g.fillStyle = '#4fae5b'
    g.beginPath()
    g.ellipse(ex - 20, ey - 6, 30, 15, -0.6, 0, Math.PI * 2)
    g.ellipse(ex + 20, ey - 6, 30, 15, 0.6, 0, Math.PI * 2)
    g.fill()
    g.fillStyle = '#3b8d48'
    g.fillRect(ex - 3, ey - 4, 6, 40)

    // puntos de la paleta
    const dots = [palette.red, palette.orange, palette.yellow, palette.green, palette.blue, palette.lilac]
    dots.forEach((c, i) => {
        g.fillStyle = '#ffe7b8'
        g.beginPath()
        g.arc(ex - 125 + i * 50, label ? 900 : 870, 15, 0, Math.PI * 2)
        g.fill()
        g.fillStyle = c
        g.beginPath()
        g.arc(ex - 125 + i * 50, label ? 900 : 870, 11, 0, Math.PI * 2)
        g.fill()
    })

    if (label) {
        g.save()
        g.translate(CW / 2 + 18, 650)
        g.rotate(-0.06)
        g.fillStyle = palette.yellow
        roundRect(g, -130, -50, 260, 100, 50)
        g.fill()
        g.fillStyle = palette.red
        g.font = `70px ${SCRIPT}`
        g.fillText(label, 0, 2)
        g.restore()
    }
    return finish(canvas)
}

/** Textura del canto de las hojas (rayitas de papel apilado). */
export function makeEdgeTexture() {
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const g = canvas.getContext('2d')
    g.fillStyle = '#f6ead4'
    g.fillRect(0, 0, 64, 64)
    for (let y = 0; y < 64; y += 4) {
        g.fillStyle = y % 8 === 0 ? 'rgba(170,130,90,0.25)' : 'rgba(170,130,90,0.12)'
        g.fillRect(0, y, 64, 1)
    }
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
}

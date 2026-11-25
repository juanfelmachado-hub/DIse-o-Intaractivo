/**
 * Sonidos cortos y suaves del visor (sintetizados, sin archivos), con el mismo
 * AudioContext del cuento (`src/audio/sfx.js`): no suenan antes de que el
 * lector empiece y respetan su volumen general.
 *
 *  - 'tap':     toque del botón «Continuar» (un «tic» redondo).
 *  - 'locked':  toque del botón cuando todavía no se puede avanzar (un «tuc» grave y corto).
 *  - 'ok':      golpe a tiempo en el corazón (dos notas que suben, muy suave).
 *  - 'perfect': golpe justo en el latido (tres notas).
 */
import { audioContext } from '../../../src/audio/sfx.js';

const NOTES = {
    tap: [[880, 0, 0.09]],
    locked: [[220, 0, 0.12]],
    ok: [[784, 0, 0.12], [1047, 0.07, 0.16]],
    perfect: [[784, 0, 0.12], [988, 0.06, 0.12], [1319, 0.12, 0.2]],
};
const VOLUME = { tap: 0.12, locked: 0.1, ok: 0.08, perfect: 0.09 };
const last = {};

export function tone(name) {
    const ctx = audioContext();
    const notes = NOTES[name];
    if (!ctx || !notes || ctx.state !== 'running') return;
    const t0 = ctx.currentTime;
    if (last[name] && t0 - last[name] < 0.08) return; // sin duplicados
    last[name] = t0;
    for (const [f, at, decay] of notes) {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = name === 'locked' ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(f, t0 + at);
        g.gain.setValueAtTime(0.0001, t0 + at);
        g.gain.exponentialRampToValueAtTime(VOLUME[name], t0 + at + 0.008);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + at + decay);
        osc.connect(g).connect(ctx.destination);
        osc.start(t0 + at);
        osc.stop(t0 + at + decay + 0.03);
    }
}

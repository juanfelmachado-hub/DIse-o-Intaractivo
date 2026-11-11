/**
 * SpatialAudioSystem — los audios ORIGINALES, ubicados en el espacio.
 *
 * sfx.js (el mismo motor de la web) sigue decidiendo qué suena, cuándo y con
 * qué volumen. Este sistema solo le da un gancho (setSpatialAudio) para que los
 * efectos ligados a un objeto salgan de ese objeto (HRTF), y mueve el "oído"
 * (AudioListener) con la cabeza del lector. La música de ambiente y el colchón
 * del temblor siguen sin posición: son el ambiente que envuelve al lector.
 *
 * Los orígenes son entidades con SoundEmitter que siguen cada cuadro a Nico,
 * al Guardián, al círculo del tambor, a la mira del radar y al libro.
 */
import { createSystem, Group, Vector3 } from '@iwsdk/core';
import { audioContext, setSpatialAudio } from '../../../src/audio/sfx.js';
import { SoundEmitter } from '../story-components.js';

const EMITTERS = {
    nico: 'acierto',
    guardian: 'guardian-llama',
    drum: 'latido,tambor',
    radar: 'radar',
    book: 'pasar-pagina',
};

export class SpatialAudioSystem extends createSystem({
    emitters: { required: [SoundEmitter] },
}) {
    init() {
        this.v = new Vector3();
        this.f = new Vector3();
        this.u = new Vector3();
        this.byName = new Map();
        for (const [id, keys] of Object.entries(EMITTERS)) {
            const g = new Group();
            g.name = `sonido-${id}`;
            const e = this.world.createTransformEntity(g, { persistent: true });
            e.addComponent(SoundEmitter, { keys });
            g.userData.emitter = id;
        }
        this.queries.emitters.subscribe('qualify', (e) => {
            for (const k of e.getValue(SoundEmitter, 'keys').split(',')) this.byName.set(k.trim(), e.object3D);
        });
        for (const e of this.queries.emitters.entities) {
            for (const k of e.getValue(SoundEmitter, 'keys').split(',')) this.byName.set(k.trim(), e.object3D);
        }

        setSpatialAudio((name, ac, bus) => {
            const obj = this.byName.get(name);
            if (!obj || !this.world.globals.cuento) return null;
            obj.getWorldPosition(this.v);
            const s = this.world.globals.cuentoScale ?? 1;
            const p = ac.createPanner();
            p.panningModel = 'HRTF';
            p.distanceModel = 'inverse';
            p.refDistance = 1.0 * s; // a un metro real suena al volumen original
            p.rolloffFactor = 0.8;
            p.maxDistance = 100;
            if (p.positionX) {
                p.positionX.value = this.v.x;
                p.positionY.value = this.v.y;
                p.positionZ.value = this.v.z;
            } else p.setPosition(this.v.x, this.v.y, this.v.z);
            p.connect(bus);
            return p;
        });
        this.cleanupFuncs.push(() => setSpatialAudio(null));
    }

    update() {
        const c = this.world.globals.cuento;
        if (!c) return;
        const scene = c.story.scene;
        for (const e of this.queries.emitters.entities) {
            const o = e.object3D;
            if (!o) continue;
            const id = o.userData.emitter;
            const target = id === 'nico' ? scene?.nico
                : id === 'guardian' ? scene?.guardian
                    : id === 'drum' ? (c.ui.drumTarget ?? scene?.nico)
                        : id === 'book' ? c.book.root : null;
            if (target) target.getWorldPosition(o.position);
            else if (id === 'radar') o.position.copy(this.world.globals.cuentoAim ?? o.position);
        }

        const ac = audioContext();
        if (!ac) return;
        const l = ac.listener;
        const cam = c.viewCam;
        this.f.set(0, 0, -1).applyQuaternion(cam.quaternion);
        this.u.set(0, 1, 0).applyQuaternion(cam.quaternion);
        if (l.positionX) {
            const t = ac.currentTime;
            l.positionX.setValueAtTime(cam.position.x, t);
            l.positionY.setValueAtTime(cam.position.y, t);
            l.positionZ.setValueAtTime(cam.position.z, t);
            l.forwardX.setValueAtTime(this.f.x, t);
            l.forwardY.setValueAtTime(this.f.y, t);
            l.forwardZ.setValueAtTime(this.f.z, t);
            l.upX.setValueAtTime(this.u.x, t);
            l.upY.setValueAtTime(this.u.y, t);
            l.upZ.setValueAtTime(this.u.z, t);
        } else {
            l.setPosition(cam.position.x, cam.position.y, cam.position.z);
            l.setOrientation(this.f.x, this.f.y, this.f.z, this.u.x, this.u.y, this.u.z);
        }
    }
}

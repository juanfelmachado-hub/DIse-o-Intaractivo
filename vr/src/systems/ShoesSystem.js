/**
 * ShoesSystem — ponerle los zapatos a Nico con las manos (juego 3, parte A).
 *
 * En la web se arrastra el par de zapatos hasta Nico. En el visor el par se
 * separa en DOS zapatos de verdad, cada uno con su pie:
 *
 *  1. Agarrar: pinza sobre un zapato (o botón lateral del control).
 *  2. Manipulación libre: el zapato sigue a la mano en 3D y gira con ella
 *     (interaction/carry.js, el mismo agarre que Nico). Si se suelta, cae y se
 *     queda donde cayó: se puede volver a tomar (corregir un intento fallido).
 *  3. Colocación: cada pie tiene una zona. Cerca del pie CORRECTO (a menos de
 *     SNAP), con el zapato mirando más o menos hacia donde mira Nico (margen de
 *     ORIENT), aparece un aro verde en el pie y un imán suave acerca el zapato a
 *     su lugar. Al soltarlo ahí (o al llegar a menos de LOCK) se acomoda con una
 *     transición corta, queda pegado al pie (sigue a Nico aunque se lo mueva) y
 *     se bloquea. Cerca del pie equivocado el aro es naranja y el Guardián avisa.
 *  4. Con los dos zapatos puestos, el juego sigue igual que en la web.
 *
 * Nico sigue siendo manipulable mientras tanto (las zonas siguen a sus pies).
 * Con el control, tocar el par con el rayo y el gatillo sigue valiendo.
 */
import { Box3, createSystem, Euler, Mesh, MeshBasicMaterial, Quaternion, TorusGeometry, Vector3, VisibilityState } from '@iwsdk/core';
import gsap from 'gsap';
import { HallwayActivity } from '../../../src/activities/HallwayActivity.js';
import { sparkle } from '../../../src/animations/motions.js';
import { playSfx } from '../../../src/audio/sfx.js';
import { Carry } from '../interaction/carry.js';
import { OffsetLayer } from '../interaction/layers.js';
import { fitLocalBox } from '../interaction/shapes.js';

export const SHOES_CFG = {
    /** Zona del pie: a esta distancia (unidades del cuento) empieza el imán. */
    SNAP: 0.34,
    /** A esta distancia se pone solo, aunque no se suelte. */
    LOCK: 0.1,
    /** Margen de orientación respecto a hacia dónde mira Nico (grados). */
    ORIENT: 80,
    /** Fuerza máxima del imán (0..1 por cuadro, suavizado). */
    MAGNET: 0.45,
    /** Duración de la transición al acomodarse (s). */
    PLACE_TIME: 0.28,
};

const _q = new Quaternion();
const _e = new Euler(0, 0, 0, 'YXZ');

export class ShoesSystem extends createSystem({}) {
    init() {
        this.act = null;
        this.shoes = [];
        this.feet = { R: null, L: null };
        this.v = new Vector3();
        this.w = new Vector3();
        this.fwd = new Vector3();
        this.sf = new Vector3();
        this.box = new Box3();
        this.hintCool = 0;
        const sys = this;
        this.world.globals.shoes = {
            /** Los zapatos se ponen con las manos (el rayo de la mano no los pone). */
            get active() { return !!sys.act && sys.shoes.some((s) => !s.placed); },
            get placed() { return sys.shoes.filter((s) => s.placed).map((s) => s.side); },
            get list() { return sys.shoes; },
            footTarget: (side, pos, quat) => sys.footTarget(side, pos, quat),
            reset: () => sys.reset(),
        };
        // ring de cada pie: verde = pie correcto, naranja = el otro pie
        this.rings = {};
        for (const side of ['R', 'L']) {
            const m = new Mesh(new TorusGeometry(1, 0.12, 8, 28), new MeshBasicMaterial({ color: '#7be07b', transparent: true, opacity: 0, depthWrite: false, fog: false }));
            m.rotation.x = -Math.PI / 2;
            m.renderOrder = 26;
            m.visible = false;
            this.world.createTransformEntity(m, { persistent: true });
            this.rings[side] = m;
        }
        const stage = HallwayActivity.prototype.stageShoes;
        const cleanup = HallwayActivity.prototype.cleanup;
        HallwayActivity.prototype.stageShoes = function stageShoesVR() {
            stage.call(this);
            sys.start(this);
        };
        HallwayActivity.prototype.cleanup = function cleanupVR() {
            if (sys.act === this) sys.stop();
            cleanup.call(this);
        };
        this.cleanupFuncs.push(() => {
            HallwayActivity.prototype.stageShoes = stage;
            HallwayActivity.prototype.cleanup = cleanup;
        });
    }

    immersive() { return this.world.visibilityState.peek() !== VisibilityState.NonImmersive; }

    // ------------------------------------------------------------ montaje
    start(act) {
        if (!this.immersive()) return;
        const c = this.world.globals.cuento;
        const scene = act.scene;
        const pair = scene.shoes;
        const nico = scene.nico;
        if (!pair || !nico) return;
        this.act = act;
        this.c = c;
        this.pair = pair;
        this.nico = nico;
        // el juego de la web (arrastrar el par) queda para el final: se llama al ponerse los dos
        this.opts = c.pointer.draggables.get(pair) ?? null;
        c.pointer.draggables.delete(pair);
        // los pies (medias) de Nico: R = x negativa en el sistema de Nico
        this.feet.R = this.feet.L = null;
        for (let i = 0; i < nico.socks.length; i += 2) {
            const foot = nico.socks[i];
            const cuff = nico.socks[i + 1];
            nico.worldToLocal(foot.getWorldPosition(this.v));
            this.feet[this.v.x < 0 ? 'R' : 'L'] = { foot, cuff };
        }
        // el par se separa en dos zapatos (mismas mallas, mismo lugar)
        this.shoes.length = 0;
        const kids = pair.children.filter((o) => o.isGroup);
        for (const shoe of kids) {
            const side = shoe.position.x < 0 ? 'R' : 'L';
            const orig = { pos: shoe.position.clone(), quat: shoe.quaternion.clone(), scale: shoe.scale.clone() };
            scene.group.attach(shoe);
            const layer = c.layers.add(new OffsetLayer(shoe));
            const rec = {
                shoe, side, layer, carry: new Carry(shoe, layer), placed: false, orig, home: shoe.position.clone(), homeQ: shoe.quaternion.clone(),
                near: 0, nearSide: null,
            };
            rec.item = this.world.globals.interact.add({
                object: shoe,
                box: fitLocalBox(shoe),
                kind: 'shoe',
                priority: 3,
                enabled: () => !rec.placed && c.story.activity === act,
                onGrab: (hand) => { gsap.killTweensOf(layer.pos); rec.carry.begin(hand); act.played(); },
                onHold: (hand, dt) => this.hold(rec, hand, dt),
                onRelease: (hand) => this.release(rec, hand),
            });
            this.shoes.push(rec);
        }
    }

    stop(finished = false) {
        const c = this.c;
        for (const rec of this.shoes) {
            this.world.globals.interact.remove(rec.item);
            c?.layers.remove(rec.layer);
            gsap.killTweensOf(rec.tw ?? {});
            if (finished) continue;
            // si el juego se interrumpe (cambio de página, salir del visor), cada zapato vuelve al par
            if (rec.placed) {
                const f = this.feet[rec.side];
                if (f) f.foot.visible = f.cuff.visible = true;
            }
            this.pair?.add(rec.shoe);
            rec.shoe.position.copy(rec.orig.pos);
            rec.shoe.quaternion.copy(rec.orig.quat);
            rec.shoe.scale.copy(rec.orig.scale);
        }
        for (const side in this.rings) this.rings[side].visible = false;
        this.shoes.length = 0;
        this.act = null;
    }

    /** «Reiniciar»: los zapatos que no están puestos vuelven a su lugar. */
    reset() {
        for (const rec of this.shoes) {
            if (rec.placed) continue;
            rec.item.busy = false;
            rec.carry.mode = 'idle';
            rec.layer.pos.set(0, 0, 0);
            rec.layer.rot.identity();
            rec.shoe.position.copy(rec.home);
            rec.shoe.quaternion.copy(rec.homeQ);
        }
        return this.shoes.length > 0;
    }

    // ------------------------------------------------------------ pies
    /** Pose del zapato puesto en un pie (mundo): debajo de la media, mirando adonde mira Nico. */
    footTarget(side, pos, quat) {
        const f = this.feet[side];
        if (!f) return false;
        this.box.setFromObject(f.foot);
        this.box.getCenter(pos);
        pos.y = this.box.min.y;
        this.nico.getWorldQuaternion(_q);
        _e.setFromQuaternion(_q);
        quat.setFromEuler(_e.set(0, _e.y, 0, 'YXZ'));
        return true;
    }

    /** ¿A qué pie se acerca el zapato y qué tan cerca (0..1)? */
    measure(rec) {
        const k = this.world.globals.dioramaScale ?? 0.17;
        const snap = SHOES_CFG.SNAP * k;
        rec.near = 0;
        rec.nearSide = null;
        let best = Infinity;
        for (const side of ['R', 'L']) {
            if (!this.footTarget(side, this.v, _q)) continue;
            if (this.shoes.some((s) => s.placed && s.side === side)) continue;
            const d = this.v.distanceTo(rec.carry.pos);
            if (d < best) { best = d; rec.nearSide = side; }
        }
        if (best >= snap) { rec.nearSide = null; return; }
        rec.near = 1 - best / snap;
        rec.dist = best / k;
        // orientación: el frente del zapato (+z) contra el frente de Nico
        this.sf.set(0, 0, 1).applyQuaternion(rec.carry.quat).setY(0).normalize();
        this.footTarget(rec.nearSide, this.v, _q);
        this.fwd.set(0, 0, 1).applyQuaternion(_q);
        rec.oriented = this.sf.dot(this.fwd) > Math.cos((SHOES_CFG.ORIENT * Math.PI) / 180);
        rec.right = rec.nearSide === rec.side;
    }

    // ------------------------------------------------------------ agarrar y poner
    hold(rec, hand, dt) {
        const c = this.c;
        rec.carry.hold(c, hand, dt);
        this.measure(rec);
        if (rec.nearSide && rec.right && rec.oriented) {
            // imán suave hacia el pie (más fuerte cuanto más cerca)
            this.footTarget(rec.side, this.v, _q);
            const m = SHOES_CFG.MAGNET * rec.near * rec.near;
            rec.carry.pos.lerp(this.v, m);
            rec.carry.quat.slerp(_q, m);
            if (rec.dist < SHOES_CFG.LOCK) {
                rec.carry.sync();
                rec.item.busy = false; // la mano lo suelta: queda puesto
                this.place(rec);
                return;
            }
        } else if (rec.nearSide && !rec.right && this.hintCool <= 0) {
            this.hintCool = 3;
            this.act.hint('Ese zapato es del otro pie');
        }
        rec.carry.sync();
    }

    release(rec, hand) {
        this.measure(rec);
        if (rec.nearSide && rec.right && rec.oriented) return this.place(rec);
        rec.carry.release(hand); // cae y se queda donde cayó (se puede volver a tomar)
    }

    place(rec) {
        if (rec.placed) return;
        rec.placed = true;
        rec.carry.mode = 'placing';
        const from = rec.carry.pos.clone();
        const fromQ = rec.carry.quat.clone();
        const k = (rec.tw = { t: 0 });
        gsap.to(k, {
            t: 1, duration: SHOES_CFG.PLACE_TIME, ease: 'back.out(1.6)',
            onUpdate: () => {
                // el pie puede moverse (Nico respira, se lo lleva la mano): se persigue en vivo
                this.footTarget(rec.side, this.v, _q);
                rec.carry.pos.lerpVectors(from, this.v, k.t);
                rec.carry.quat.slerpQuaternions(fromQ, _q, Math.min(1, k.t));
                rec.carry.sync();
            },
            onComplete: () => this.lock(rec),
        });
    }

    /** Queda pegado al pie (sigue a Nico) y se esconde la media de ese pie. */
    lock(rec) {
        const c = this.c;
        if (!this.act) return;
        rec.carry.mode = 'locked';
        // la capa se quita y la pose final (mundo) se escribe en el sistema del hueso del pie
        rec.shoe.getWorldScale(this.w);
        c.layers.remove(rec.layer);
        this.world.globals.interact.remove(rec.item);
        const f = this.feet[rec.side];
        const bone = f.foot.parent;
        bone.add(rec.shoe);
        bone.updateWorldMatrix(true, false);
        rec.shoe.scale.copy(this.w).divide(bone.getWorldScale(this.sf));
        rec.shoe.position.copy(bone.worldToLocal(this.v.copy(rec.carry.pos)));
        rec.shoe.quaternion.copy(bone.getWorldQuaternion(_q).invert().multiply(rec.carry.quat));
        f.foot.visible = false;
        f.cuff.visible = false;
        playSfx('clac');
        rec.shoe.getWorldPosition(this.w);
        const local = this.act.scene.group.worldToLocal(this.w.clone());
        sparkle(this.act.scene.group, local, { color: '#ffd0c8', count: 6, radius: 0.2 });
        this.act.played();
        if (this.shoes.every((s) => s.placed)) gsap.delayedCall(0.45, () => this.finish());
    }

    /** Los dos puestos: el juego sigue igual que en la web (zapatos del modelo, «¡Clac!», saltito). */
    finish() {
        const act = this.act;
        if (!act || act.disposed) return;
        // los zapatos de VR siguen en los pies hasta que aparecen los del modelo (nico.setShoes)
        this.worn = { nico: this.nico, list: this.shoes.map((r) => r.shoe) };
        this.pair.position.x = this.nico.position.x;
        this.pair.position.z = this.nico.position.z;
        const opts = this.opts;
        this.stop(true);
        opts?.onDrop?.(this.v.set(this.pair.position.x, 0, this.pair.position.z), false);
    }

    // ------------------------------------------------------------ cuadro a cuadro
    update(delta) {
        if (this.worn && (this.worn.nico.shoes?.[0]?.visible || !this.worn.nico.parent)) {
            for (const s of this.worn.list) s.parent?.remove(s);
            this.worn = null;
        }
        if (!this.act) return;
        const c = this.c;
        const dt = Math.min(Math.max(delta, 0), 0.05);
        if (this.world.globals.cuentoPaused) return;
        this.hintCool -= dt;
        const k = this.world.globals.dioramaScale ?? 0.17;
        // lo que se soltó cae
        for (const rec of this.shoes) {
            if (rec.carry.mode === 'falling') {
                rec.carry.fall(c, dt);
                rec.carry.sync();
            } else if (rec.carry.mode === 'rest') rec.carry.sync();
        }
        // aros en los pies: verde si el zapato que se lleva es de ese pie y está bien orientado
        for (const side of ['R', 'L']) {
            const ring = this.rings[side];
            const held = this.shoes.find((s) => s.item.busy && s.nearSide === side);
            const done = this.shoes.some((s) => s.placed && s.side === side);
            ring.visible = !!held && !done;
            if (!ring.visible) continue;
            this.footTarget(side, ring.position, _q);
            ring.position.y += 0.004;
            ring.scale.setScalar(0.12 * k * (1 + (1 - held.near) * 0.6));
            ring.material.color.set(held.right && held.oriented ? '#7be07b' : '#ffa94d');
            ring.material.opacity = 0.35 + held.near * 0.55;
        }
    }
}

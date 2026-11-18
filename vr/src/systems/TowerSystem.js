/**
 * TowerSystem — «¿Me ayudas a construir una torre con estos bloques?»
 *
 * Primera página, primer momento: en la web la torre se armaba sola
 * (`tower.build`). En la maqueta, Nico le pide ayuda al lector y la torre se
 * construye con las manos, con físicas reales (Havok de IWSDK):
 *
 *  - cada bloque tiene un cuerpo dinámico invisible del tamaño exacto del
 *    bloque, con gravedad, masa, fricción y rotación; el bloque visible copia
 *    su pose;
 *  - ESPACIO DE FÍSICAS: en la maqueta un bloque mide ~3 cm, y Havok no
 *    sostiene cajas tan chicas (se hunden en el piso: probado en el emulador).
 *    La simulación corre aparte, en un «espacio de físicas» = coordenadas de
 *    la página × PHYS_SCALE (un bloque mide 0,34 m allí), lejos de todo
 *    (PHYS_ORIGIN), con la gravedad multiplicada por PHYS_SCALE / escala de la
 *    maqueta: así, vista en la maqueta, la caída dura lo mismo que en la
 *    realidad. Cada cuadro la pose de cada cuerpo se lleva a la maqueta;
 *  - el piso de la página y Nico son colliders estáticos;
 *  - se agarra con la pinza (o el botón lateral del control) a menos de 2 cm
 *    del bloque; al soltarlo hereda la velocidad de la mano;
 *  - un bloque que se cae del libro vuelve a su lugar.
 *
 * Validación (no basta con que los bloques estén cerca): TOWER_LEVELS bloques
 * EN REPOSO, uno encima de otro (cada nivel a la altura justa y apoyado sobre
 * el de abajo), quietos durante TOWER_HOLD segundos. Si la torre se cae, se
 * puede volver a intentar. Al terminar, la historia sigue igual que en la web
 * (el temblor derriba la torre que construyó el lector).
 *
 * Nico reacciona: mira los bloques que se mueven, se asusta si uno cae cerca,
 * se cubre si la torre se derrumba, anima si pasa mucho tiempo y celebra.
 */
import {
    createSystem, Object3D, PhysicsBody, PhysicsManipulation, PhysicsShape, PhysicsShapeType, PhysicsState,
    PhysicsSystem, Quaternion, Vector3, VisibilityState,
} from '@iwsdk/core';
import gsap from 'gsap';
import { sparkle } from '../../../src/animations/motions.js';
import { RoomScene } from '../../../src/scenes/RoomScene.js';

export const TOWER_LEVELS = 4;
export const TOWER_HOLD = 2;
const BLOCK = 0.17; // lado del bloque en unidades del cuento (RoomScene)
/** Espacio de físicas: unidades de la página × PHYS_SCALE, con origen lejos de la escena. */
const PHYS_SCALE = 2;
const PHYS_ORIGIN = new Vector3(0, 40, 0);
/** Lado del piso de la habitación simulado (m reales). */
const ROOM = 6;
/** Inclinación máxima (rad) que se endereza sola al soltar un bloque. */
const LEVEL_ASSIST = 0.44; // ~25°
const AXES = [new Vector3(1, 0, 0), new Vector3(0, 1, 0), new Vector3(0, 0, 1)];
/** Bloques regados para construir (relativos a la torre): separados entre sí y lejos de Nico. */
const SCATTER = [[-0.6, 0.1], [-0.3, -0.45], [-0.25, 0.5], [-0.85, -0.25], [0.05, -0.6], [-0.65, 0.55]];
const NICO_LINES = {
    ask: '¿Me ayudas a construir una torre con estos bloques?',
    cheer: '¡Tú puedes! Pon un bloque encima de otro.',
    fell: '¡Uy, se cayó! Intentémoslo otra vez.',
    thanks: '¡Gracias! ¡Es la torre más alta del mundo!',
};

export class TowerSystem extends createSystem({}) {
    init() {
        this.v = new Vector3();
        this.w = new Vector3();
        this.q = new Quaternion();
        this.q2 = new Quaternion();
        this.up = new Vector3(0, 1, 0);
        this.stageQ = new Quaternion();
        this.stageQi = new Quaternion();
        this.active = false;
        this.completed = false;
        this.bodies = []; // { block, entity, obj, item, home }
        this.statics = [];
        this.world.globals.tower = {
            get active() { return sys.active; },
            get canSkip() { return sys.active && sys.elapsed > 40; },
            skip: () => this.skip(),
            reset: () => this.resetBlocks(),
            get height() { return sys.height ?? 0; },
        };
        const sys = this;
        // la sala llama a buildTower() en el primer momento: se intercepta en la clase
        // (antes de que exista la escena, así no se pierde el primer cuadro)
        const original = RoomScene.prototype.buildTower;
        RoomScene.prototype.buildTower = function buildTowerVR() {
            const own = () => original.call(this);
            return sys.onBuild(this, own) ?? own();
        };
        this.cleanupFuncs.push(() => { RoomScene.prototype.buildTower = original; });
    }

    get physics() { return this.world.getSystem(PhysicsSystem); }

    // ------------------------------------------------------------ enganche con la sala
    /** En el visor, la primera vez de cada recorrido, la torre la construye el lector. */
    onBuild(scene, original) {
        const c = this.world.globals.cuento;
        const immersive = this.world.visibilityState.peek() !== VisibilityState.NonImmersive;
        if (!c || this.completed || this.active || !immersive || c.story.page?.id !== 'sala') return null;
        this.start(c, scene, original);
        return gsap.timeline().to({}, { duration: 0.1 });
    }

    start(c, scene, original) {
        this.c = c;
        this.scene = scene;
        this.original = original;
        this.active = true;
        this.elapsed = 0;
        this.idle = 0;
        this.height = 0;
        this.best = 0;
        this.stable = 0;
        this.fellCool = 0;
        this.nearCool = 0;
        this.firstGrab = false;
        scene.towerState = 'building'; // el temblor de la web no mueve estos bloques
        // bloques regados alrededor de donde va la torre, derechos sobre la página
        scene.blocks.forEach((b, i) => {
            const [dx, dz] = SCATTER[i];
            b.position.set(dx, BLOCK / 2, dz);
            b.rotation.set(0, i * 0.7, 0);
            b.visible = true;
        });
        const { story, ui } = c;
        story.blocked = true;
        ui.setMission({ icon: 'torre', text: `Ayuda a Nico: apila ${TOWER_LEVELS} bloques, uno encima de otro`, short: 'Construye la torre' }, { delay: 0 });
        ui.say('nico', NICO_LINES.ask);
        ui.setNext(false);
        scene.nico?.face('smile');
        this.buildPhysics(c, scene);
    }

    // ------------------------------------------------------------ espacio de físicas
    /** Orientación de la página en el mundo (cambia si se vuelve a colocar la maqueta). */
    readStage() {
        const stage = this.c.book.stage;
        stage.updateWorldMatrix(true, false);
        stage.getWorldQuaternion(this.stageQ);
        this.stageQi.copy(this.stageQ).invert();
    }

    worldToPhys(p, out) {
        out.copy(p);
        this.c.book.stage.worldToLocal(out);
        return out.multiplyScalar(PHYS_SCALE).add(PHYS_ORIGIN);
    }

    physToWorld(p, out) {
        out.copy(p).sub(PHYS_ORIGIN).divideScalar(PHYS_SCALE);
        return this.c.book.stage.localToWorld(out);
    }

    buildPhysics(c, scene) {
        const k = c.diorama.scale.x;
        this.k = k;
        const size = BLOCK * PHYS_SCALE;
        scene.group.updateMatrixWorld(true);
        this.readStage();
        // el libro abierto (6,1 × 4 unidades): cara superior en y = 0 de la página
        const book = new Object3D();
        book.position.set(0, -0.5, 0).add(PHYS_ORIGIN);
        this.addStatic(book, [6.2 * PHYS_SCALE, 1, 4.1 * PHYS_SCALE]);
        // el piso real de la habitación: lo que cae fuera del libro se queda ahí
        this.v.copy(c.book.stage.getWorldPosition(this.v)).setY(c.diorama.position.y);
        c.book.stage.worldToLocal(this.v);
        this.roomFloor = PHYS_ORIGIN.y + this.v.y * PHYS_SCALE; // cara superior (espacio de físicas)
        const room = new Object3D();
        room.position.set(0, this.roomFloor - 0.5, 0).add(this.w.set(PHYS_ORIGIN.x, 0, PHYS_ORIGIN.z));
        const roomSize = (ROOM / k) * PHYS_SCALE;
        this.addStatic(room, [roomSize, 1, roomSize]);
        // Nico: una caja del tamaño de su tronco (0,3 × 0,9 × 0,25 unidades). Es cinemática:
        // si el lector lo levanta o lo lleva a otro lado, su collider lo sigue
        const nico = scene.nico;
        this.nicoBody = null;
        if (nico) {
            const o = new Object3D();
            this.placeNicoBody(nico, o);
            const e = this.world.createTransformEntity(o);
            e.addComponent(PhysicsShape, { shape: PhysicsShapeType.Box, dimensions: [0.3 * PHYS_SCALE, 0.9 * PHYS_SCALE, 0.25 * PHYS_SCALE], friction: 0.9, restitution: 0 });
            e.addComponent(PhysicsBody, { state: PhysicsState.Kinematic });
            this.statics.push(e);
            this.nicoBody = { entity: e, obj: o, position: new Vector3(), quaternion: new Quaternion() };
        }
        // bloques dinámicos (desde donde se ven ahora)
        for (const block of scene.blocks) {
            const obj = new Object3D();
            const rec = { block, obj, wpos: new Vector3(), wquat: new Quaternion(), offPos: new Vector3(), offQuat: new Quaternion() };
            block.getWorldPosition(rec.wpos);
            block.getWorldQuaternion(rec.wquat);
            this.worldToPhys(rec.wpos, obj.position);
            obj.quaternion.copy(this.stageQi).multiply(rec.wquat);
            rec.home = obj.position.clone();
            rec.homeQ = obj.quaternion.clone();
            const entity = this.world.createTransformEntity(obj);
            entity.addComponent(PhysicsShape, { shape: PhysicsShapeType.Box, dimensions: [size, size, size], density: 600, friction: 0.9, restitution: 0.05 });
            // gravedad × PHYS_SCALE / k: en la maqueta cae a 9,8 m/s², como un juguete real
            entity.addComponent(PhysicsBody, { state: PhysicsState.Dynamic, linearDamping: 0.05, angularDamping: 0.3, gravityFactor: PHYS_SCALE / k });
            rec.entity = entity;
            rec.item = this.world.globals.interact.add({
                object: block,
                // la caja exacta del cubo (su geometría), no la de lo que se ve en este instante
                box: (block.geometry.boundingBox ?? (block.geometry.computeBoundingBox(), block.geometry.boundingBox)).clone(),
                kind: 'block',
                priority: 1,
                onGrab: (hand) => this.grab(rec, hand),
                onHold: (hand) => this.hold(rec, hand),
                onRelease: (hand) => this.release(rec, hand),
            });
            this.bodies.push(rec);
        }
    }

    /** La maqueta cambió de tamaño a mitad de la actividad: se rehacen los cuerpos donde están. */
    rebuild() {
        for (const r of this.bodies) {
            if (r.item) this.world.globals.interact?.remove(r.item);
            r.entity.dispose();
        }
        for (const e of this.statics) e.dispose();
        this.bodies = [];
        this.statics = [];
        this.buildPhysics(this.c, this.scene);
    }

    /** Pose del collider de Nico (espacio de físicas): de pie donde está, con el tronco a 0,45 unidades. */
    placeNicoBody(nico, out) {
        this.worldToPhys(nico.getWorldPosition(this.v), out.position);
        out.position.y += 0.45 * PHYS_SCALE;
        nico.getWorldQuaternion(this.q);
        out.quaternion.copy(this.stageQi).multiply(this.q);
    }

    addStatic(obj, dims) {
        const e = this.world.createTransformEntity(obj);
        e.addComponent(PhysicsShape, { shape: PhysicsShapeType.Box, dimensions: dims, friction: 0.9, restitution: 0 });
        e.addComponent(PhysicsBody, { state: PhysicsState.Static });
        this.statics.push(e);
    }

    // ------------------------------------------------------------ agarre (lo llama HandInteractionSystem)
    grab(rec, hand) {
        rec.held = true;
        // pose relativa a la mano: el bloque sigue la mano desde donde se tomó
        this.q.copy(hand.quat).invert();
        rec.offPos.copy(rec.wpos).sub(hand.point).applyQuaternion(this.q);
        rec.offQuat.copy(this.q).multiply(rec.wquat);
        this.idle = 0;
        if (!this.firstGrab) {
            this.firstGrab = true;
            const nico = this.scene.nico;
            nico?.face('smile');
            nico?.pose('show', 0.6); // lo mira con curiosidad
        }
    }

    /** Lleva el cuerpo a la pose del bloque en la mano (se reubica cada cuadro, sin velocidad acumulada). */
    placeBody(rec) {
        this.worldToPhys(rec.wpos, this.v);
        this.q.copy(this.stageQi).multiply(rec.wquat);
        this.physics?.setBodyTransform(rec.entity, { position: this.v, quaternion: this.q });
    }

    hold(rec, hand) {
        if (!this.active) return;
        rec.wpos.copy(rec.offPos).applyQuaternion(hand.quat).add(hand.point);
        rec.wquat.copy(hand.quat).multiply(rec.offQuat);
        // si choca con otro bloque, lo empuja. (La etiqueta Grabbed de IWSDK no se usa:
        // deja el cuerpo dinámico sin chocar con los estáticos al soltarlo.)
        this.placeBody(rec);
        this.idle = 0;
    }

    /**
     * Ayuda al soltar: si el bloque está casi derecho (< LEVEL_ASSIST de inclinación
     * respecto de la página), se endereza conservando su giro. Con el temblor
     * natural del tracking de manos es casi imposible soltar un cubo de 3 cm
     * perfectamente plano; inclinado, resbala del de abajo.
     */
    level(rec) {
        this.q.copy(this.stageQi).multiply(rec.wquat); // orientación respecto de la página
        let best = null;
        let bestDot = -1;
        for (const ax of AXES) {
            const d = this.v.copy(ax).applyQuaternion(this.q).y;
            if (Math.abs(d) > bestDot) { bestDot = Math.abs(d); best = this.w.copy(this.v).multiplyScalar(Math.sign(d)); }
        }
        if (!best || Math.acos(Math.min(1, bestDot)) > LEVEL_ASSIST) return;
        this.q2.setFromUnitVectors(best, this.up);
        this.q.premultiply(this.q2);
        rec.wquat.copy(this.stageQ).multiply(this.q);
    }

    release(rec, hand) {
        rec.held = false;
        if (!this.active) return; // la actividad ya terminó (los cuerpos no existen)
        this.level(rec);
        // queda exactamente donde se soltó…
        this.placeBody(rec);
        // …y hereda la velocidad de la mano en el cuadro siguiente (un lanzamiento suave, con tope)
        const v = (rec.throwVel ??= new Vector3()).copy(hand.vel);
        if (v.length() > 1.5) v.setLength(1.5);
        v.applyQuaternion(this.stageQi).multiplyScalar(PHYS_SCALE / this.k); // m/s reales → espacio de físicas
        rec.throwPending = v.lengthSq() > 1e-4;
    }

    // ------------------------------------------------------------ bucle
    syncVisuals() {
        for (const r of this.bodies) {
            if (!r.held) {
                this.physToWorld(r.obj.position, r.wpos);
                r.wquat.copy(this.stageQ).multiply(r.obj.quaternion);
            }
            const b = r.block;
            const parent = b.parent;
            if (!parent) continue;
            parent.updateWorldMatrix(true, false);
            b.position.copy(r.wpos);
            parent.worldToLocal(b.position);
            parent.getWorldQuaternion(this.q);
            b.quaternion.copy(this.q.invert()).multiply(r.wquat);
        }
    }

    /** Altura de la torre: niveles seguidos de bloques quietos, cada uno apoyado sobre el de abajo. */
    measure(k) {
        const h = BLOCK * PHYS_SCALE; // todo en el espacio de físicas
        const levels = [];
        for (const r of this.bodies) {
            if (r.held) continue;
            const lv = r.entity.getVectorView(PhysicsBody, '_linearVelocity');
            const speed = Math.hypot(lv[0], lv[1], lv[2]) * (k / PHYS_SCALE); // m/s en la maqueta
            r.speed = speed;
            if (speed > 0.03) continue;
            const y = r.obj.position.y - PHYS_ORIGIN.y - h / 2;
            const level = Math.round(y / h);
            if (level < 0 || Math.abs(y - level * h) > h * 0.25) continue; // apoyado justo sobre algo, no inclinado
            (levels[level] ??= []).push(r.obj.position);
        }
        let n = 0;
        let below = null;
        for (let L = 0; L < levels.length; L++) {
            const here = levels[L];
            if (!here) break;
            if (L > 0) {
                const on = here.find((p) => below.some((q) => Math.hypot(p.x - q.x, p.z - q.z) < h * 0.75));
                if (!on) break;
                below = [on];
            } else below = here;
            n = L + 1;
        }
        return n;
    }

    reactions(dt, k) {
        const nico = this.scene.nico;
        if (!nico) return;
        nico.getWorldPosition(this.v);
        // mira el bloque que se mueve más cerca
        let look = null;
        let near = 1e9;
        for (const r of this.bodies) {
            if (!r.held && (r.speed ?? 0) < 0.05) continue;
            const d = r.wpos.distanceTo(this.v);
            if (d < near) { near = d; look = r; }
            // un bloque que cae cerca: se sobresalta y retrocede un poquito
            if (!r.held && (r.speed ?? 0) > 0.25 && d < 1.1 * k && this.nearCool <= 0) {
                this.nearCool = 2.5;
                nico.face('o');
                nico.pose('worried', 0.35);
                gsap.delayedCall(1.1, () => { if (this.active) { nico.pose('idle', 0.6); nico.face('smile'); } });
            }
        }
        if (look && nico.p) {
            nico.worldToLocal(this.w.copy(look.wpos));
            nico.p.headY = Math.max(-0.7, Math.min(0.7, Math.atan2(this.w.x, this.w.z)));
            nico.p.headX = Math.max(-0.4, Math.min(0.3, -Math.atan2(this.w.y - 0.8, Math.hypot(this.w.x, this.w.z))));
        }
        this.nearCool -= dt;
        this.fellCool -= dt;
    }

    update(delta) {
        const c = this.world.globals.cuento;
        if (!c) return;
        if (c.story.mode === 'cover') this.completed = false; // nuevo recorrido
        if (!this.active) return;
        if (c.story.scene !== this.scene || c.story.page?.id !== 'sala') return this.stop(false);
        if (this.world.globals.cuentoPaused || this.world.globals.placing) return;
        // el momento de la historia se arma después de buildTower(): se vuelve a bloquear «Siguiente»
        if (!c.story.blocked) {
            c.story.blocked = true;
            c.ui.setNext(false);
        }
        const dt = Math.min(delta, 0.1);
        const k = c.diorama.scale.x;
        if (k !== this.k) this.rebuild();
        this.readStage();
        this.elapsed += dt;
        this.idle += dt;
        for (const r of this.bodies) {
            if (!r.throwPending || r.held) continue;
            r.throwPending = false;
            if (r.entity.hasComponent(PhysicsManipulation)) r.entity.removeComponent(PhysicsManipulation);
            r.entity.addComponent(PhysicsManipulation, { linearVelocity: [r.throwVel.x, r.throwVel.y, r.throwVel.z] });
        }
        this.syncVisuals();

        // el collider de Nico va con él (el lector puede moverlo)
        const nb = this.nicoBody;
        if (nb && this.scene.nico) {
            this.placeNicoBody(this.scene.nico, nb);
            this.physics?.setBodyTransform(nb.entity, { position: nb.position, quaternion: nb.quaternion });
        }

        // los bloques pueden salir del libro y quedarse en el piso real. Solo como
        // seguro: uno que atravesó el piso o quedó a más de ROOM/2 m vuelve a su lugar
        const far = (ROOM / 2 / k) * PHYS_SCALE;
        for (const r of this.bodies) {
            if (r.held) continue;
            const p = r.obj.position;
            if (p.y < this.roomFloor - PHYS_SCALE || Math.hypot(p.x - PHYS_ORIGIN.x, p.z - PHYS_ORIGIN.z) > far) {
                this.physics?.setBodyTransform(r.entity, { position: r.home, quaternion: r.homeQ });
            }
        }

        const n = this.measure(k);
        this.reactions(dt, k);
        // la torre se derrumbó: Nico se cubre y anima a intentarlo otra vez
        if (this.best >= 2 && n === 0 && this.fellCool <= 0 && this.bodies.some((r) => (r.speed ?? 0) > 0.15)) {
            this.fellCool = 4;
            const nico = this.scene.nico;
            nico?.pose('cover', 0.4);
            nico?.face('o');
            gsap.delayedCall(1.4, () => { if (this.active) { nico?.pose('idle', 0.7); nico?.face('smile'); c.ui.say('nico', NICO_LINES.fell); } });
            this.best = 0;
        }
        this.best = Math.max(this.best, n);
        this.height = n;
        if (this.idle > 25) {
            this.idle = -15;
            c.ui.say('nico', NICO_LINES.cheer);
        }
        this.stable = n >= TOWER_LEVELS ? this.stable + dt : 0;
        if (this.stable >= TOWER_HOLD) this.succeed(c);
    }

    succeed(c) {
        const scene = this.scene;
        // la torre del lector se queda tal cual (el temblor la derribará después)
        this.syncVisuals();
        let top = null;
        for (const r of this.bodies) {
            const b = r.block;
            b.userData.stack = b.position.clone();
            b.userData.stackRot = b.rotation.y;
            if (!top || r.wpos.y > top.y) top = r.wpos;
        }
        this.stop(true);
        scene.towerState = 'built';
        const nico = scene.nico;
        nico?.face('smile');
        nico?.pose('cheer', 0.5);
        if (nico) gsap.timeline().add(nico.hop()).add(nico.hop(), 0.55).add(nico.hop(), 1.1).call(() => nico.pose('idle', 0.8), null, 1.9);
        if (top) sparkle(scene.group, scene.group.worldToLocal(this.v.copy(top)).add(this.w.set(0, 0.25, 0)), { color: '#fff3b0' });
        const { story, ui } = c;
        story.blocked = false;
        ui.hideMission();
        ui.say('nico', NICO_LINES.thanks);
        ui.setNext(true);
        this.completed = true;
    }

    /**
     * Botón «Reiniciar objetos»: los bloques vuelven a donde estaban al empezar,
     * quietos (posición, giro y velocidades en cero). Sus lugares iniciales no se
     * tocan entre sí; si la mano tenía uno, se suelta. No cambia la historia.
     */
    resetBlocks() {
        if (!this.active) return false;
        for (const r of this.bodies) {
            if (r.held && r.item) {
                r.held = false;
                r.item.busy = false;
            }
            r.throwPending = false;
            this.physics?.setBodyTransform(r.entity, { position: r.home, quaternion: r.homeQ });
        }
        this.best = 0;
        this.stable = 0;
        this.idle = 0;
        this.syncVisuals();
        return true;
    }

    skip() {
        if (!this.active) return;
        const c = this.c;
        this.stop(true);
        this.scene.placeTower('built');
        this.completed = true;
        c.story.blocked = false;
        c.ui.hideMission();
        c.ui.hideDialog();
        c.ui.setNext(true);
        this.original();
    }

    stop() {
        this.active = false;
        const reg = this.world.globals.interact;
        for (const r of this.bodies) {
            if (r.item) reg?.remove(r.item);
            r.entity.dispose();
        }
        for (const e of this.statics) e.dispose();
        this.bodies = [];
        this.statics = [];
        const nico = this.scene?.nico;
        if (nico?.p) { nico.p.headY = 0; nico.p.headX = 0; }
    }
}

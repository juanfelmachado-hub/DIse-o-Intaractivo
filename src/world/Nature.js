/**
 * Paisaje alrededor del libro (secundario): pasto, colinas pastel, montañas
 * low-poly, y los pinos y rocas entregados (arbolito.blend → naturaleza.glb).
 * Geometrías simples y compartidas.
 */
import * as THREE from 'three'
import { seeded } from '../models/kit.js'
import { assets } from '../models/assets.js'

function jitter(geometry, amount, seed, keepBottom = true) {
    const pos = geometry.attributes.position
    const v = new THREE.Vector3()
    for (let i = 0; i < pos.count; i++) {
        v.fromBufferAttribute(pos, i)
        // ruido por posición: vértices compartidos se mueven igual (sin grietas)
        const h = Math.sin(v.x * 12.9898 + v.y * 78.233 + v.z * 37.719 + seed) * 43758.5453
        const n = (h - Math.floor(h)) - 0.5
        const h2 = Math.sin(v.x * 39.3468 + v.y * 11.135 + v.z * 83.155 + seed) * 24634.6345
        const n2 = (h2 - Math.floor(h2)) - 0.5
        if (keepBottom && v.y < -0.45 * (geometry.parameters?.height ?? 1)) continue
        pos.setXYZ(i, v.x + n * amount, v.y + n2 * amount * 0.6, v.z + (n2 - n) * amount * 0.7)
    }
    geometry.computeVertexNormals()
    return geometry
}

export class Nature {
    constructor() {
        this.group = new THREE.Group()
        this.trees = []
        this.clouds = []

        this.groundMat = new THREE.MeshStandardMaterial({ color: '#93cc78', roughness: 1 })
        this.hillMat = new THREE.MeshStandardMaterial({ color: '#b9e09a', roughness: 1 })
        this.mountainMat = new THREE.MeshStandardMaterial({ color: '#dcd3ee', roughness: 1, flatShading: true })
        this.leafMats = [
            new THREE.MeshStandardMaterial({ color: '#72b266', roughness: 0.9, flatShading: true }),
            new THREE.MeshStandardMaterial({ color: '#64a762', roughness: 0.9, flatShading: true }),
            new THREE.MeshStandardMaterial({ color: '#80bd70', roughness: 0.9, flatShading: true }),
        ]
        this.trunkMat = new THREE.MeshStandardMaterial({ color: '#8a5a3c', roughness: 0.9, flatShading: true })
        this.rockMats = [
            new THREE.MeshStandardMaterial({ color: '#a59b90', roughness: 0.95, flatShading: true }),
            new THREE.MeshStandardMaterial({ color: '#968c84', roughness: 0.95, flatShading: true }),
            new THREE.MeshStandardMaterial({ color: '#b3a796', roughness: 0.95, flatShading: true }),
        ]
        this.cloudMat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 1, transparent: true, opacity: 0.9, depthWrite: false })

        this.buildGround()
        this.buildHills()
        this.buildMountains()
        this.buildTrees()
        this.buildClouds()
    }

    buildGround() {
        const ground = new THREE.Mesh(new THREE.CircleGeometry(110, 48), this.groundMat)
        ground.rotation.x = -Math.PI / 2
        this.group.add(ground)
    }

    buildHills() {
        const g = new THREE.SphereGeometry(1, 28, 12, 0, Math.PI * 2, 0, Math.PI / 2)
        const hills = [
            [-22, -26, 11, 4.2, 8], [-8, -32, 13, 5.5, 9], [10, -30, 12, 4.6, 8], [26, -24, 10, 3.8, 7],
            [-32, -12, 9, 3.2, 8], [34, -10, 9, 3.6, 8], [0, -40, 16, 6, 9],
        ]
        for (const [x, z, sx, sy, sz] of hills) {
            const m = new THREE.Mesh(g, this.hillMat)
            m.position.set(x, -0.2, z)
            m.scale.set(sx, sy, sz)
            this.group.add(m)
        }
    }

    buildMountains() {
        const variants = [0, 1, 2].map((s) => jitter(new THREE.ConeGeometry(1, 1, 7, 3), 0.18, s * 3.1, true))
        const mts = [
            [-46, -62, 20, 26], [-20, -72, 24, 32], [8, -66, 18, 24], [34, -70, 26, 30], [58, -56, 18, 22], [-64, -48, 16, 20],
        ]
        mts.forEach(([x, z, r, h], i) => {
            const m = new THREE.Mesh(variants[i % 3], this.mountainMat)
            m.position.set(x, h / 2 - 1, z)
            m.scale.set(r, h, r)
            m.rotation.y = i * 1.3
            this.group.add(m)
        })
    }

    /**
     * Pinos y rocas de arbolito.blend (models/naturaleza.glb). El archivo no
     * trae materiales: copa verde, tronco café y rocas gris tierra.
     */
    buildTrees() {
        const rnd = seeded(42)
        const N = assets.nature
        const pines = [
            { copa: N.pino_1_copa, tronco: N.pino_1_tronco, h: 1.687 },
            { copa: N.pino_2_copa, tronco: N.pino_2_tronco, h: 2.113 },
        ]
        const makePine = (i, height) => {
            const kind = pines[i % 2]
            const t = new THREE.Group()
            t.add(new THREE.Mesh(kind.copa, this.leafMats[i % 3]), new THREE.Mesh(kind.tronco, this.trunkMat))
            t.userData.k = height / kind.h
            return t
        }

        // [x, z, altura] — mismos lugares que los árboles anteriores (nunca delante del libro)
        const layout = [
            [-7.2, -3.2, 4.1], [-10.5, -5.8, 3.9], [-5.2, -7.5, 3.3], [-13.5, -1.0, 4.4],
            [-9.2, 1.8, 3.6], [8.6, -4.2, 4.6], [6.8, -7.4, 3.8], [11.2, -2.0, 3.3],
            [13.6, 2.2, 4.0], [9.8, 3.6, 3.1], [-2.5, -11.5, 4.4], [2.6, -12.0, 4.3],
            [5.5, -14.5, 3.7], [-7.8, -13.2, 3.6], [-15.5, -8.5, 4.3], [17.5, -8.0, 4.8],
            [16.0, -12.5, 3.3], [-18.5, 3.5, 4.0],
        ]
        layout.forEach(([x, z, h], i) => {
            const t = makePine(i, h)
            t.position.set(x, 0, z)
            t.scale.setScalar(t.userData.k)
            t.rotation.y = rnd() * Math.PI * 2
            t.userData.phase = rnd() * Math.PI * 2
            this.trees.push(t)
            this.group.add(t)
        })

        // rocas al pie de algunos pinos y entre las colinas
        const rocks = [N.roca_1, N.roca_2, N.roca_3]
        const stones = [
            [-6.0, -2.1, 1.3], [-8.7, -4.5, 0.9], [-11.6, 0.4, 1.5], [7.4, -2.9, 1.2], [10.0, -5.6, 1.6],
            [12.3, 0.6, 1.0], [-3.9, -9.6, 1.4], [4.0, -10.4, 1.1], [-16.5, -5.6, 1.8], [15.2, -6.0, 1.4],
            [-9.8, 3.4, 0.8], [8.4, 4.6, 0.9],
        ]
        stones.forEach(([x, z, s], i) => {
            const r = new THREE.Mesh(rocks[i % 3], this.rockMats[i % 3])
            r.position.set(x, 0, z)
            r.scale.set(s, s * (0.8 + rnd() * 0.3), s)
            r.rotation.y = rnd() * Math.PI * 2
            this.group.add(r)
        })
    }

    buildClouds() {
        const g = new THREE.SphereGeometry(1, 16, 10)
        const rnd = seeded(9)
        const spots = [[-24, 15, -40], [6, 18, -48], [30, 14, -36], [-40, 12, -24], [44, 16, -30]]
        for (const [x, y, z] of spots) {
            const c = new THREE.Group()
            for (let k = 0; k < 4; k++) {
                const p = new THREE.Mesh(g, this.cloudMat)
                p.position.set((k - 1.5) * 2.2, (rnd() - 0.3) * 1.2, rnd() * 1.5)
                p.scale.set(2.4 + rnd() * 1.5, 1.4 + rnd(), 1.8)
                c.add(p)
            }
            c.position.set(x, y, z)
            c.userData.speed = 0.15 + rnd() * 0.2
            this.clouds.push(c)
            this.group.add(c)
        }
    }

    update(dt, t, quake, cloudOpacity) {
        const q = quake.intensity
        for (const tree of this.trees) {
            const ph = tree.userData.phase
            tree.rotation.z = Math.sin(t * 0.8 + ph) * 0.015 + quake.shake.x * 0.06 * Math.sin(t * 9 + ph)
            tree.rotation.x = Math.sin(t * 0.6 + ph) * 0.01 + q * 0.03 * Math.sin(t * 11 + ph)
        }
        this.cloudMat.opacity = cloudOpacity
        for (const c of this.clouds) {
            c.position.x += c.userData.speed * dt
            if (c.position.x > 60) c.position.x = -60
        }
    }
}

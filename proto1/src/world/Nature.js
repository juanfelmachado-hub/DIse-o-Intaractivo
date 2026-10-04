/**
 * Paisaje alrededor del libro (secundario): pasto, colinas pastel, montañas
 * low-poly y árboles estilizados como en los .blend (cipreses y árboles de copa
 * redonda con tronco terracota). Geometrías simples y compartidas.
 */
import * as THREE from 'three'
import { seeded } from '../models/kit.js'

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
            new THREE.MeshStandardMaterial({ color: '#86c24f', roughness: 0.9, flatShading: true }),
            new THREE.MeshStandardMaterial({ color: '#6fae45', roughness: 0.9, flatShading: true }),
            new THREE.MeshStandardMaterial({ color: '#9bcf5c', roughness: 0.9, flatShading: true }),
        ]
        this.trunkMat = new THREE.MeshStandardMaterial({ color: '#c0643c', roughness: 0.85, flatShading: true })
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

    buildTrees() {
        const rnd = seeded(42)
        const cypress = [0, 1, 2].map((s) => jitter(new THREE.ConeGeometry(0.62, 2.8, 7, 5), 0.16, s + 10, true))
        const blob = [0, 1, 2].map((s) => jitter(new THREE.IcosahedronGeometry(1, 1), 0.22, s + 20, false))
        const trunk = new THREE.CylinderGeometry(0.1, 0.17, 1, 6)

        const makeCypress = (i) => {
            const t = new THREE.Group()
            const leaf = new THREE.Mesh(cypress[i % 3], this.leafMats[i % 3])
            leaf.position.y = 1.85
            const tr = new THREE.Mesh(trunk, this.trunkMat)
            tr.scale.set(1, 0.6, 1)
            tr.position.y = 0.3
            t.add(leaf, tr)
            return t
        }
        const makeRound = (i) => {
            const t = new THREE.Group()
            const tr = new THREE.Mesh(trunk, this.trunkMat)
            tr.scale.set(1.5, 2.2, 1.5)
            tr.position.y = 1.1
            tr.rotation.z = (rnd() - 0.5) * 0.25
            t.add(tr)
            const branch = new THREE.Mesh(trunk, this.trunkMat)
            branch.scale.set(0.8, 1.1, 0.8)
            branch.position.set(0.35, 2.0, 0)
            branch.rotation.z = -0.7
            t.add(branch)
            const n = 3 + (i % 2)
            for (let k = 0; k < n; k++) {
                const c = new THREE.Mesh(blob[(i + k) % 3], this.leafMats[(i + k) % 3])
                const a = (k / n) * Math.PI * 2 + rnd()
                c.position.set(Math.cos(a) * 0.75, 2.75 + rnd() * 0.5, Math.sin(a) * 0.45)
                const s = 0.9 + rnd() * 0.45
                c.scale.set(s * 1.15, s * 0.85, s)
                t.add(c)
            }
            return t
        }

        // [tipo, x, z, escala] — nunca delante del libro (cámara en +z)
        const layout = [
            ['c', -7.2, -3.2, 1.25], ['r', -10.5, -5.8, 1.05], ['c', -5.2, -7.5, 1.0], ['r', -13.5, -1.0, 1.2],
            ['c', -9.2, 1.8, 1.1], ['r', 8.6, -4.2, 1.25], ['c', 6.8, -7.4, 1.15], ['c', 11.2, -2.0, 1.0],
            ['r', 13.6, 2.2, 1.1], ['c', 9.8, 3.6, 0.95], ['r', -2.5, -11.5, 1.2], ['c', 2.6, -12.0, 1.3],
            ['r', 5.5, -14.5, 1.0], ['c', -7.8, -13.2, 1.1], ['c', -15.5, -8.5, 1.3], ['r', 17.5, -8.0, 1.3],
            ['c', 16.0, -12.5, 1.0], ['r', -18.5, 3.5, 1.1],
        ]
        layout.forEach(([type, x, z, s], i) => {
            const t = type === 'c' ? makeCypress(i) : makeRound(i)
            t.position.set(x, 0, z)
            t.scale.setScalar(s)
            t.rotation.y = rnd() * Math.PI * 2
            t.userData.phase = rnd() * Math.PI * 2
            this.trees.push(t)
            this.group.add(t)
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

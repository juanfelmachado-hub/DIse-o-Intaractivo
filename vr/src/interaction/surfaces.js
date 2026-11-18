/**
 * Superficies reales de la maqueta, para que nada atraviese lo que es sólido.
 *
 * El libro ya no es un límite invisible: los personajes y los objetos pueden
 * salir de él. Lo que sí es sólido es lo que existe de verdad:
 *  - la página (la tapa superior del libro abierto), dentro de su contorno;
 *  - el piso de la habitación (donde se colocó el libro), afuera.
 */
import { Vector3 } from '@iwsdk/core';
import { BOOK } from '../../../src/book/Book.js';

const _v = new Vector3();
const _w = new Vector3();

/** ¿El punto (mundo) está sobre el contorno del libro abierto? */
export function overBook(c, p) {
    _v.copy(p);
    c.book.inner.worldToLocal(_v);
    const { PW, PD, M } = BOOK;
    return Math.abs(_v.x) <= PW + M && Math.abs(_v.z) <= PD / 2 + M;
}

/** Altura (m, mundo) de la superficie bajo un punto: la página o el piso real. */
export function groundAt(c, p) {
    if (overBook(c, p)) return c.book.stage.getWorldPosition(_w).y;
    return c.diorama.position.y;
}

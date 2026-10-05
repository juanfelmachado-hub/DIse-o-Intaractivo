/**
 * Contacto por Instagram. Cuando exista carrito/checkout, este es el punto
 * que se reemplaza por la acción de compra.
 */
import { CONFIG } from '../config.js';
import { formatPrice } from '../utils/format.js';
import { productUrl } from '../components/productCard.js';

export function buildContactMessage(product, size) {
  const url = new URL(productUrl(product), window.location.href).href;
  return CONFIG.contactMessage
    .replace('{name}', product.name)
    .replace('{size}', size ? ` — talla ${size}` : '')
    .replace('{price}', formatPrice(product.price))
    .replace('{url}', url);
}

/** Copia el mensaje (si el navegador lo permite). Devuelve true si se copió. */
export async function copyContactMessage(product, size) {
  try {
    await navigator.clipboard.writeText(buildContactMessage(product, size));
    return true;
  } catch {
    return false;
  }
}

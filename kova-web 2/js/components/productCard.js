import { getCategory, getByCategory, isAvailable } from '../services/catalog.js';
import { formatPrice } from '../utils/format.js';
import { esc } from '../utils/dom.js';

// El id va después de # para que funcione en cualquier servidor (algunos, como `npx serve`,
// redirigen producto.html → /producto y borran lo que va después de ?).
export const productUrl = (product) => `producto.html#${encodeURIComponent(product.id)}`;

/** Referencia visible tipo "KV-TEE-01", según la posición del producto en su categoría. */
export const productRef = (product) =>
  `KV-${getCategory(product.category)?.code ?? 'ITM'}-${String(getByCategory(product.category).indexOf(product) + 1).padStart(2, '0')}`;

export function productCard(product, index = 0) {
  const soldOut = !isAvailable(product);
  const [front, back] = product.images;
  const tag = soldOut
    ? '<span class="tag tag--out card__tag">Agotado</span>'
    : product.tag ? `<span class="tag card__tag">${esc(product.tag)}</span>` : '';
  const sizes = product.sizes?.length
    ? `<span class="card__sizes" aria-label="Tallas">${product.sizes.map((s) => `<span${product.soldOutSizes?.includes(s) ? ' class="is-out"' : ''}>${esc(s)}</span>`).join('')}</span>`
    : '';
  return `
    <article class="card reveal${soldOut ? ' is-soldout' : ''}${back ? ' has-back' : ''}" style="--i:${index % 4}" data-category="${esc(product.category)}">
      <a class="card__link" href="${productUrl(product)}">
        <div class="card__media">
          <img class="card__img" src="${front}" alt="${esc(product.name)}" width="800" height="1000" loading="lazy" decoding="async">
          ${back ? `<img class="card__img card__img--back" src="${back}" alt="" width="800" height="1000" loading="lazy" decoding="async">` : ''}
          ${tag}
          <i class="ico ico--destellos card__spark" aria-hidden="true"></i>
          <span class="card__cta" aria-hidden="true">Ver producto <span class="btn__arrow">→</span></span>
        </div>
        <div class="card__info">
          <div class="card__row">
            <span class="card__ref">${productRef(product)}</span>
            ${sizes}
          </div>
          <h3 class="card__name">${esc(product.name)}</h3>
          <span class="card__price">${formatPrice(product.price)}</span>
        </div>
      </a>
    </article>`;
}

export const productGrid = (items) => `<div class="grid">${items.map((p, i) => productCard(p, i)).join('')}</div>`;

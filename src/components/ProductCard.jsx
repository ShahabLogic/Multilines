import React from 'react';
import { FiArrowUpRight, FiCheck, FiShoppingBag } from 'react-icons/fi';
import { useSite } from '../context/SiteContext';
import { useCart } from '../context/CartContext';
import { buildWhatsAppOrderLink } from '../utils/whatsapp';

const hasPrice = (price) => price !== null && price !== undefined && price !== '' && Number.isFinite(Number(price));
const money = (value) => `PKR ${Number(value).toLocaleString('en-PK')}`;

export default function ProductCard({ product, onAdded }) {
  const { settings } = useSite();
  const { addItem } = useCart();
  const priceLabel = hasPrice(product.price) ? money(product.price) : 'Pricing on request';
  const orderLink = buildWhatsAppOrderLink([{ product, quantity: 1 }], settings.phone, settings.companyName);

  return (
    <article className={`product-card${product.featured ? ' product-card--featured' : ''}`}>
      <div className="product-card__image">
        <img src={product.imageUrl || '/images/services/warehouse-large.jpg'} alt={`${product.name} illustrative product reference`} loading="lazy" />
        <span className="product-card__category">{product.category || 'Coating system'}</span>
        {product.featured && <span className="product-card__featured"><FiCheck /> Featured</span>}
      </div>
      <div className="product-card__body">
        <div className="product-card__meta"><span>{product.sku || 'MCS SYSTEM'}</span><span>{product.unit || 'Project-specific'}</span></div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-card__price"><strong>{priceLabel}</strong>{hasPrice(product.price) && <small>per {product.unit || 'unit'}</small>}</div>
        <div className="product-card__actions">
          <button type="button" className="button button--dark" onClick={() => { addItem(product); if (onAdded) onAdded(product); }}><FiShoppingBag /> Add to cart</button>
          <a className="button button--outline" href={orderLink} target="_blank" rel="noreferrer">Buy now <FiArrowUpRight /></a>
        </div>
      </div>
    </article>
  );
}

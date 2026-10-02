import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiArrowUpRight, FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useSite } from '../context/SiteContext';
import { buildWhatsAppOrderLink } from '../utils/whatsapp';

const hasPrice = (price) => price !== null && price !== undefined && price !== '' && Number.isFinite(Number(price));
const money = (value) => `PKR ${Number(value).toLocaleString('en-PK')}`;

export default function CartPage() {
  const { items, setQuantity, removeItem, clearCart, cartCount } = useCart();
  const { settings } = useSite();
  const allPriced = items.length > 0 && items.every((item) => hasPrice(item.product.price));
  const total = allPriced ? items.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0) : null;
  const orderLink = buildWhatsAppOrderLink(items, settings.phone, settings.companyName);

  return (
    <main className="inner-page cart-page">
      <section className="page-hero page-hero--cart"><div className="container page-hero__grid"><div className="page-hero__copy"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to="/products">Products</Link><span>/</span><span>Your cart</span></div><p className="eyebrow">PRODUCT ENQUIRY · WHATSAPP ORDER</p><h1>Your surface<br /><em>order list.</em></h1><p>Review products and quantities here. Send the list to Multilines on WhatsApp to confirm specification, price and availability.</p><div className="page-hero__actions"><Link to="/products" className="button button--outline"><FiArrowLeft /> Continue browsing</Link><span className="location-chip">{cartCount} {cartCount === 1 ? 'item' : 'items'}</span></div></div><div className="cart-hero-art"><div className="cart-hero-art__circle" /><div className="cart-hero-art__card"><span>ORDER / {String(cartCount).padStart(2, '0')}</span><strong>Product list<br />ready to share.</strong><small>WhatsApp / Multilines</small></div></div></div></section>

      <section className="section cart-content" data-reveal><div className="container cart-content__grid">
        <div className="cart-items-panel">
          <div className="cart-items-panel__head"><div><span className="section-index"><span>01</span><i /> YOUR SELECTION</span><h2>Review the <em>details.</em></h2></div>{items.length > 0 && <button className="cart-clear" type="button" onClick={clearCart}>Clear list</button>}</div>
          {items.length === 0 ? <div className="cart-empty"><span className="cart-empty__icon">+</span><h3>Your list is empty.</h3><p>Browse the product catalogue and add the systems you would like to discuss.</p><Link to="/products" className="button button--dark">Browse products <FiArrowUpRight /></Link></div> : <div className="cart-items">{items.map(({ product, quantity }) => <article className="cart-item" key={product.id}><div className="cart-item__image"><img src={product.imageUrl || '/images/services/warehouse-large.jpg'} alt="" /></div><div className="cart-item__details"><span>{product.category} · {product.sku}</span><h3>{product.name}</h3><p>{hasPrice(product.price) ? money(product.price) : 'Price confirmed on request'}</p><div className="cart-quantity"><button type="button" onClick={() => setQuantity(product.id, Math.max(1, quantity - 1))} aria-label={`Reduce quantity of ${product.name}`}><FiMinus /></button><span>{quantity}</span><button type="button" onClick={() => setQuantity(product.id, quantity + 1)} aria-label={`Increase quantity of ${product.name}`}><FiPlus /></button></div></div><button className="cart-item__remove" type="button" onClick={() => removeItem(product.id)} aria-label={`Remove ${product.name}`}><FiTrash2 /></button></article>)}</div>}
        </div>
        {items.length > 0 && <aside className="cart-summary"><span className="section-index"><span>02</span><i /> ORDER SUMMARY</span><h3>Ready to <em>discuss.</em></h3><div className="cart-summary__row"><span>Items</span><strong>{cartCount}</strong></div><div className="cart-summary__row"><span>Subtotal</span><strong>{allPriced ? money(total) : 'Quote on request'}</strong></div><p>Freight, coverage and final system selection are confirmed with the Multilines team before order acceptance.</p><a href={orderLink} target="_blank" rel="noreferrer" className="button button--dark">Send order via WhatsApp <FiArrowUpRight /></a><Link to="/contact" className="cart-summary__contact">Prefer a site recommendation? Contact us <FiArrowUpRight /></Link></aside>}
      </div></section>
    </main>
  );
}

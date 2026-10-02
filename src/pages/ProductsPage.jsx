import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiCheck, FiSearch, FiShoppingBag } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All products');
  const [notice, setNotice] = useState('');
  const { cartCount } = useCart();

  useEffect(() => {
    let live = true;
    fetch('/api/products', { headers: { Accept: 'application/json' } })
      .then(async (response) => {
        const data = await response.json().catch(() => []);
        if (!response.ok) throw new Error(data.error || 'The product list is not available right now.');
        return data;
      })
      .then((data) => { if (live) setProducts(Array.isArray(data) ? data : []); })
      .catch((fetchError) => { if (live) setError(fetchError.message || 'Could not connect to the product catalogue.'); })
      .finally(() => { if (live) setLoading(false); });
    return () => { live = false; };
  }, []);

  const categories = useMemo(() => ['All products', ...Array.from(new Set(products.map((item) => item.category).filter(Boolean)))], [products]);
  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return products.filter((product) => product.active !== false)
      .filter((product) => category === 'All products' || product.category === category)
      .filter((product) => !term || `${product.name} ${product.description} ${product.category} ${product.sku}`.toLowerCase().includes(term));
  }, [products, category, query]);

  return (
    <main className="inner-page products-page">
      <section className="page-hero page-hero--products">
        <div className="container page-hero__grid">
          <div className="page-hero__copy">
            <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>Products</span></div>
            <p className="eyebrow">PRODUCTS · MATERIAL SYSTEMS · PROJECT SUPPLY</p>
            <h1>Materials for<br /><em>better surfaces.</em></h1>
            <p>Explore project-specified flooring, sports and protective coating systems. Product selection and pricing are confirmed against your site, substrate and required performance.</p>
            <div className="page-hero__actions"><Link to="/contact" className="button button--accent">Ask for a product quote <FiArrowUpRight /></Link><Link to="/cart" className="location-chip"><FiShoppingBag /> Your order list · {cartCount}</Link></div>
          </div>
          <div className="products-hero-visual"><img src="/images/services/warehouse-application.jpg" alt="Reflective coating on a clean industrial floor" /><div className="products-hero-visual__label"><span>01 / SYSTEM SELECTION</span><strong>Specified for the surface.<br />Planned for the project.</strong></div><div className="products-hero-visual__stamp"><FiCheck /><span>Quote-led<br />product supply</span></div></div>
        </div>
      </section>

      <section className="section products-store-section" data-reveal>
        <div className="container">
          <div className="products-store-head">
            <div><div className="section-index"><span>01</span><i /> THE PRODUCT STORE</div><h2>Browse by surface.<br /><em>Order with clarity.</em></h2><p>Use the cart to prepare a multi-item WhatsApp enquiry, or use Buy now to ask about one product directly.</p></div>
            <Link to="/cart" className="products-cart-link"><FiShoppingBag /><span><b>Your cart</b><small>{cartCount} {cartCount === 1 ? 'item' : 'items'} saved on this device</small></span><strong>{cartCount}</strong></Link>
          </div>
          <div className="products-tools">
            <div className="products-filters" role="group" aria-label="Filter products by category">{categories.map((item) => <button type="button" key={item} className={category === item ? 'is-active' : ''} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
            <label className="products-search"><FiSearch /><span className="sr-only">Search products</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search systems or products" /></label>
          </div>
          {notice && <div className="store-notice" role="status"><FiCheck /> {notice}</div>}
          {loading && <div className="store-state">Loading the Multilines product catalogue…</div>}
          {!loading && error && <div className="store-state store-state--error"><strong>Catalogue unavailable</strong><p>{error}</p><Link to="/contact" className="text-link text-link--dark">Ask us about a product <FiArrowUpRight /></Link></div>}
          {!loading && !error && visible.length === 0 && <div className="store-state"><strong>No matching products yet.</strong><p>Try another category or contact our team with your surface requirements.</p><Link to="/contact" className="text-link text-link--dark">Request a recommendation <FiArrowUpRight /></Link></div>}
          {!loading && !error && visible.length > 0 && <div className="product-grid">{visible.map((product) => <ProductCard key={product.id} product={product} onAdded={(added) => { setNotice(`${added.name} added to your order list.`); window.setTimeout(() => setNotice(''), 2600); }} />)}</div>}
        </div>
      </section>

      <section className="section store-help" data-reveal><div className="container store-help__inner"><div><span className="section-index section-index--light"><span>02</span><i /> NEED A SPECIFICATION?</span><h2>Start with the site.<br /><em>We’ll help with the system.</em></h2></div><p>Product names are a starting point. Exact build-up, coverage and price depend on the substrate, area, use and manufacturer guidance. Send us your project details for a considered recommendation.</p><Link to="/contact" className="button button--light">Request a quote <FiArrowUpRight /></Link></div></section>
    </main>
  );
}

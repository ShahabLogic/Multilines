import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiCheck, FiEdit2, FiImage, FiLogOut, FiMail, FiPackage, FiPhoneCall, FiSave, FiShield, FiTrash2, FiUpload } from 'react-icons/fi';

const emptyProduct = () => ({ id: '', name: '', sku: '', category: 'Flooring systems', description: '', imageUrl: '', price: '', unit: 'Project system', featured: false, active: true });

async function apiRequest(url, options = {}) {
  const response = await fetch(url, {
    credentials: 'same-origin',
    ...options,
    headers: { ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...(options.headers || {}) }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'The request could not be completed.');
  return data;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Could not read that image file.'));
    reader.readAsDataURL(file);
  });
}

export default function AdminProductsPage() {
  const [authStatus, setAuthStatus] = useState({ loading: true, authenticated: false, setupRequired: false });
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [authDraft, setAuthDraft] = useState({ email: '', password: '', confirmPassword: '', setupKey: '' });
  const [draft, setDraft] = useState(emptyProduct());
  const [feedback, setFeedback] = useState({ type: '', text: '' });
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);

  const loadProducts = useCallback(async () => {
    const list = await apiRequest('/api/admin/products', { headers: { Accept: 'application/json' } });
    setProducts(Array.isArray(list) ? list : []);
  }, []);

  const loadInquiries = useCallback(async () => {
    const list = await apiRequest('/api/admin/inquiries', { headers: { Accept: 'application/json' } });
    setInquiries(Array.isArray(list) ? list : []);
  }, []);

  const refreshStatus = useCallback(async () => {
    const status = await apiRequest('/api/admin/status', { headers: { Accept: 'application/json' } });
    setAuthStatus({ loading: false, ...status });
    if (status.authenticated) await Promise.all([loadProducts(), loadInquiries()]);
    return status;
  }, [loadInquiries, loadProducts]);

  useEffect(() => {
    let live = true;
    apiRequest('/api/admin/status', { headers: { Accept: 'application/json' } })
      .then(async (status) => {
        if (!live) return;
        setAuthStatus({ loading: false, ...status });
        if (status.authenticated) {
          const [list, inbox] = await Promise.all([
            apiRequest('/api/admin/products', { headers: { Accept: 'application/json' } }),
            apiRequest('/api/admin/inquiries', { headers: { Accept: 'application/json' } })
          ]);
          if (live) {
            setProducts(Array.isArray(list) ? list : []);
            setInquiries(Array.isArray(inbox) ? inbox : []);
          }
        }
      })
      .catch((error) => { if (live) { setAuthStatus({ loading: false, authenticated: false, setupRequired: false, unavailable: true }); setFeedback({ type: 'error', text: error.message || 'The product service is unavailable.' }); } });
    return () => { live = false; };
  }, []);

  const changeAuth = (event) => setAuthDraft((current) => ({ ...current, [event.target.name]: event.target.value }));
  const changeProduct = (event) => {
    const { name, value, type, checked } = event.target;
    setDraft((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
    if (feedback.type) setFeedback({ type: '', text: '' });
  };

  const submitAuth = async (event) => {
    event.preventDefault();
    setBusy(true);
    setFeedback({ type: '', text: '' });
    try {
      if (authStatus.setupRequired && authDraft.password !== authDraft.confirmPassword) throw new Error('The passwords do not match.');
      const endpoint = authStatus.setupRequired ? '/api/admin/setup' : '/api/admin/login';
      const body = authStatus.setupRequired
        ? { email: authDraft.email, password: authDraft.password, setupKey: authDraft.setupKey }
        : { email: authDraft.email, password: authDraft.password };
      await apiRequest(endpoint, { method: 'POST', body: JSON.stringify(body) });
      const status = await refreshStatus();
      if (!status.authenticated) throw new Error('The sign-in session could not be started. Please try again.');
      setAuthDraft({ email: '', password: '', confirmPassword: '', setupKey: '' });
      setFeedback({ type: 'success', text: authStatus.setupRequired ? 'Administrator account created. You are now signed in.' : 'Signed in securely.' });
    } catch (error) {
      setFeedback({ type: 'error', text: error.message || 'Could not sign in.' });
    } finally {
      setBusy(false);
    }
  };

  const saveProduct = async (event) => {
    event.preventDefault();
    setBusy(true);
    setFeedback({ type: '', text: '' });
    try {
      const payload = { ...draft, price: draft.price === '' || draft.price === null ? null : Number(draft.price) };
      const path = draft.id ? `/api/admin/products/${encodeURIComponent(draft.id)}` : '/api/admin/products';
      await apiRequest(path, { method: draft.id ? 'PUT' : 'POST', body: JSON.stringify(payload) });
      await loadProducts();
      setDraft(emptyProduct());
      setFeedback({ type: 'success', text: 'Product saved to the shared catalogue.' });
    } catch (error) {
      setFeedback({ type: 'error', text: error.message || 'Product could not be saved.' });
    } finally {
      setBusy(false);
    }
  };

  const uploadImage = async (event) => {
    const file = event.target.files && event.target.files[0];
    event.target.value = '';
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setFeedback({ type: 'error', text: 'Choose a JPG, PNG or WebP image.' });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFeedback({ type: 'error', text: 'Please choose an image smaller than 5 MB.' });
      return;
    }
    setUploading(true);
    setFeedback({ type: '', text: '' });
    try {
      const dataUrl = await readFileAsDataUrl(file);
      const result = await apiRequest('/api/admin/upload', { method: 'POST', body: JSON.stringify({ filename: file.name, dataUrl }) });
      setDraft((current) => ({ ...current, imageUrl: result.imageUrl }));
      setFeedback({ type: 'success', text: 'Image uploaded. Save the product to publish it.' });
    } catch (error) {
      setFeedback({ type: 'error', text: error.message || 'Image upload failed.' });
    } finally {
      setUploading(false);
    }
  };

  const editProduct = (product) => {
    setDraft({ ...emptyProduct(), ...product, price: product.price === null || product.price === undefined ? '' : String(product.price) });
    setFeedback({ type: '', text: '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteProduct = async (product) => {
    if (!window.confirm(`Remove “${product.name}” from the product catalogue?`)) return;
    setBusy(true);
    try {
      await apiRequest(`/api/admin/products/${encodeURIComponent(product.id)}`, { method: 'DELETE' });
      await loadProducts();
      if (draft.id === product.id) setDraft(emptyProduct());
      setFeedback({ type: 'success', text: 'Product removed from the shared catalogue.' });
    } catch (error) {
      setFeedback({ type: 'error', text: error.message || 'Product could not be removed.' });
    } finally {
      setBusy(false);
    }
  };

  const reviewInquiry = async (inquiry) => {
    setBusy(true);
    setFeedback({ type: '', text: '' });
    const status = inquiry.status === 'reviewed' ? 'new' : 'reviewed';
    try {
      await apiRequest(`/api/admin/inquiries/${encodeURIComponent(inquiry.id)}`, { method: 'PATCH', body: JSON.stringify({ status }) });
      await loadInquiries();
      setFeedback({ type: 'success', text: status === 'reviewed' ? 'Enquiry marked as reviewed.' : 'Enquiry returned to the new list.' });
    } catch (error) {
      setFeedback({ type: 'error', text: error.message || 'Enquiry could not be updated.' });
    } finally {
      setBusy(false);
    }
  };

  const logout = async () => {
    setBusy(true);
    try {
      await apiRequest('/api/admin/logout', { method: 'POST', body: JSON.stringify({}) });
      setProducts([]);
      setInquiries([]);
      setDraft(emptyProduct());
      await refreshStatus();
      setFeedback({ type: 'success', text: 'You have signed out.' });
    } catch (error) {
      setFeedback({ type: 'error', text: error.message || 'Could not sign out.' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="inner-page admin-products-page">
      <section className="admin-products-hero"><div className="container admin-products-hero__inner"><div><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to="/products">Products</Link><span>/</span><span>Admin</span></div><p className="eyebrow">PRIVATE AREA · PRODUCT MANAGEMENT</p><h1>Manage the<br /><em>product catalogue.</em></h1><p>Add, update, publish or remove products. The public store reads the same shared catalogue.</p></div><div className="admin-products-hero__badge"><FiPackage /><strong>Multilines<br />product desk</strong><small>Server-backed catalogue</small></div></div></section>

      <section className="section admin-products-content"><div className="container">
        {feedback.text && <div className={`admin-feedback admin-feedback--${feedback.type}`} role="status">{feedback.type === 'success' && <FiCheck />}{feedback.text}</div>}
        {authStatus.loading && <div className="store-state">Checking administrator access…</div>}
        {!authStatus.loading && !authStatus.authenticated && <div className="admin-auth-wrap"><div className="admin-auth-card"><div className="section-index"><span>01</span><i /> {authStatus.setupRequired ? 'FIRST-TIME SETUP' : 'ADMIN SIGN IN'}</div><h2>{authStatus.setupRequired ? 'Create the first admin.' : 'Welcome back.'}</h2><p>{authStatus.setupRequired ? 'Set up the first administrator account before opening the public site. Choose a strong password of at least 12 characters.' : 'Sign in to edit products, images and published catalogue details.'}</p>{authStatus.unavailable && <p className="admin-auth-card__warning">The product administration API is unavailable. Start the Node server and try again.</p>}<form className="admin-auth-form" onSubmit={submitAuth}><label>Email address<input name="email" type="email" value={authDraft.email} onChange={changeAuth} autoComplete="username" required maxLength="120" /></label><label>Password<input name="password" type="password" value={authDraft.password} onChange={changeAuth} autoComplete={authStatus.setupRequired ? 'new-password' : 'current-password'} required minLength={authStatus.setupRequired ? 12 : undefined} /></label>{authStatus.setupRequired && <><label>Confirm password<input name="confirmPassword" type="password" value={authDraft.confirmPassword} onChange={changeAuth} autoComplete="new-password" required minLength="12" /></label><label>Setup key <small>(only if ADMIN_SETUP_KEY is configured on the server)</small><input name="setupKey" type="password" value={authDraft.setupKey} onChange={changeAuth} autoComplete="off" /></label></>}<button className="button button--dark" type="submit" disabled={busy || authStatus.unavailable}>{busy ? 'Please wait…' : authStatus.setupRequired ? 'Create administrator account' : 'Sign in'} <FiArrowUpRight /></button></form><Link className="admin-auth-card__store-link" to="/products">View the public product store <FiArrowUpRight /></Link></div><div className="admin-auth-note"><FiShield /><strong>Private by design</strong><p>Admin sessions use an HTTP-only server cookie. Passwords are stored as a salted scrypt hash, never in browser storage.</p></div></div>}

        {!authStatus.loading && authStatus.authenticated && <div className="admin-dashboard">
          <div className="admin-dashboard__top"><div><div className="section-index"><span>01</span><i /> CATALOGUE DASHBOARD</div><h2>Products, <em>in your control.</em></h2><p>Signed in as <strong>{authStatus.email}</strong> · {products.length} products in the catalogue</p></div><button type="button" className="button button--outline" onClick={logout} disabled={busy}><FiLogOut /> Sign out</button></div>
          <div className="admin-dashboard__grid">
            <form className="admin-product-form" onSubmit={saveProduct}>
              <div className="admin-product-form__head"><span className="section-index"><span>02</span><i /> {draft.id ? 'EDIT PRODUCT' : 'ADD A PRODUCT'}</span>{draft.id && <button type="button" className="admin-form-reset" onClick={() => setDraft(emptyProduct())}>Cancel edit</button>}</div>
              <label>Product name<input name="name" value={draft.name} onChange={changeProduct} required maxLength="100" placeholder="e.g. Jotafloor® epoxy system" /></label>
              <div className="admin-form-row"><label>SKU / reference<input name="sku" value={draft.sku} onChange={changeProduct} maxLength="40" placeholder="MCS-..." /></label><label>Category<input name="category" value={draft.category} onChange={changeProduct} maxLength="60" placeholder="Flooring systems" required /></label></div>
              <label>Description<textarea name="description" value={draft.description} onChange={changeProduct} rows="4" maxLength="1400" required placeholder="Describe the system and how it is selected for a project." /></label>
              <div className="admin-form-row"><label>Price (PKR)<input name="price" type="number" min="0" step="1" value={draft.price} onChange={changeProduct} placeholder="Leave blank for quote-led pricing" /></label><label>Unit / basis<input name="unit" value={draft.unit} onChange={changeProduct} maxLength="40" placeholder="Project system" /></label></div>
              <label className="admin-image-field">Product image<div className="admin-upload-row"><input name="imageUrl" value={draft.imageUrl} onChange={changeProduct} maxLength="240" placeholder="/images/... or upload an image" /><label className="admin-upload-button"><input type="file" accept="image/png,image/jpeg,image/webp" onChange={uploadImage} disabled={uploading} /><FiUpload /> {uploading ? 'Uploading…' : 'Upload image'}</label></div></label>
              {draft.imageUrl && <div className="admin-image-preview"><img src={draft.imageUrl} alt="Product preview" /><span><FiImage /> Preview</span></div>}
              <div className="admin-product-form__flags"><label><input type="checkbox" name="featured" checked={Boolean(draft.featured)} onChange={changeProduct} /> Featured in the store</label><label><input type="checkbox" name="active" checked={Boolean(draft.active)} onChange={changeProduct} /> Published to visitors</label></div>
              <button className="button button--dark" type="submit" disabled={busy || uploading}><FiSave /> {busy ? 'Saving…' : draft.id ? 'Save product changes' : 'Add product to catalogue'}</button>
            </form>

            <div className="admin-products-list"><div className="admin-products-list__head"><span className="section-index"><span>03</span><i /> CURRENT PRODUCTS</span><span>{products.length} total</span></div>{products.length === 0 ? <div className="store-state">No products yet. Add the first product using the form.</div> : products.map((product) => <article className="admin-product-row" key={product.id}><div className="admin-product-row__image"><img src={product.imageUrl || '/images/services/warehouse-large.jpg'} alt="" /></div><div className="admin-product-row__body"><span>{product.category} · {product.sku || 'No SKU'}</span><h3>{product.name}</h3><p>{product.price === null || product.price === undefined ? 'Price on request' : `PKR ${Number(product.price).toLocaleString('en-PK')}`} · {product.unit || 'Project-specific'}</p><small className={product.active ? 'is-published' : 'is-unpublished'}>{product.active ? 'Published' : 'Hidden'}{product.featured ? ' · Featured' : ''}</small></div><div className="admin-product-row__actions"><button type="button" onClick={() => editProduct(product)} aria-label={`Edit ${product.name}`}><FiEdit2 /></button><button type="button" onClick={() => deleteProduct(product)} aria-label={`Delete ${product.name}`} disabled={busy}><FiTrash2 /></button></div></article>)}</div>
          </div>
          <section className="admin-inquiries" aria-labelledby="admin-inquiries-title">
            <div className="admin-inquiries__head">
              <div><span className="section-index"><span>04</span><i /> ENQUIRY INBOX</span><h3 id="admin-inquiries-title">Project enquiries <em>to follow up.</em></h3><p>{inquiries.filter((inquiry) => (inquiry.status || 'new') !== 'reviewed').length} new · {inquiries.length} recent enquiries</p></div>
            </div>
            {inquiries.length === 0 ? <div className="store-state">No enquiries yet. New website enquiries will appear here.</div> : <div className="admin-inquiry-list">{inquiries.map((inquiry) => <article className={`admin-inquiry${inquiry.status === 'reviewed' ? ' is-reviewed' : ''}`} key={inquiry.id}>
              <div className="admin-inquiry__top"><div><span className="admin-inquiry__service">{inquiry.service || 'General project enquiry'}</span><h4>{inquiry.name}</h4></div><time dateTime={inquiry.createdAt}>{new Date(inquiry.createdAt).toLocaleString('en-PK', { dateStyle: 'medium', timeStyle: 'short' })}</time></div>
              <p className="admin-inquiry__message">{inquiry.message}</p>
              <div className="admin-inquiry__bottom"><div className="admin-inquiry__contacts"><a href={`tel:${String(inquiry.phone || '').replace(/[^0-9+]/g, '')}`}><FiPhoneCall /> {inquiry.phone}</a>{inquiry.email && <a href={`mailto:${inquiry.email}`}><FiMail /> {inquiry.email}</a>}</div><button type="button" className="admin-inquiry__status" onClick={() => reviewInquiry(inquiry)} disabled={busy}><FiCheck /> {inquiry.status === 'reviewed' ? 'Mark as new' : 'Mark reviewed'}</button></div>
            </article>)}</div>}
          </section>
          <Link to="/products" className="admin-public-link"><FiArrowUpRight /> Preview the public product store</Link>
        </div>}
      </div></section>
    </main>
  );
}

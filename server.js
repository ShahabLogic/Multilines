const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, 'data');
const SETTINGS_FILE = path.join(DATA_DIR, 'site-settings.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const ADMIN_FILE = path.join(DATA_DIR, 'admin-user.json');
const SESSION_SECRET_FILE = path.join(DATA_DIR, 'admin-session-secret');
const UPLOAD_DIR = path.join(DATA_DIR, 'uploads', 'products');
const BUILD_DIR = path.join(ROOT, 'build');
const SESSION_COOKIE = 'mcs_admin';
const SESSION_TTL = 7 * 24 * 60 * 60 * 1000;

const DEFAULT_SETTINGS = {
  companyName: 'Multilines Coating Solutions',
  phone: '0303-4446027',
  email: 'Imtiaz.ali@coatingsolutions.com.pk',
  address: 'Lahore, Pakistan',
  facebookUrl: 'https://www.facebook.com/ResinFlooringPakistan/',
  mapQuery: 'Lahore, Pakistan',
  themeMode: 'light',
  accentColor: '#bf895f',
  tagline: 'High-performance surfaces. Built for the way you work.'
};
const SETTINGS_KEYS = Object.keys(DEFAULT_SETTINGS);
const clients = new Set();
const loginAttempts = new Map();

fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(UPLOAD_DIR, { recursive: true });
if (!fs.existsSync(SETTINGS_FILE)) fs.writeFileSync(SETTINGS_FILE, JSON.stringify(DEFAULT_SETTINGS, null, 2));
if (!fs.existsSync(INQUIRIES_FILE)) fs.writeFileSync(INQUIRIES_FILE, '[]');
if (!fs.existsSync(PRODUCTS_FILE)) fs.writeFileSync(PRODUCTS_FILE, '[]');

function safeWriteJson(file, value) {
  const temp = `${file}.${process.pid}.${crypto.randomBytes(4).toString('hex')}.tmp`;
  fs.writeFileSync(temp, JSON.stringify(value, null, 2), { mode: 0o600 });
  fs.renameSync(temp, file);
}

function readSettings() {
  try {
    const saved = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
    return { ...DEFAULT_SETTINGS, ...saved };
  } catch (error) {
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings(input) {
  const current = readSettings();
  const next = { ...current };
  SETTINGS_KEYS.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(input, key)) next[key] = input[key];
  });

  next.companyName = cleanText(next.companyName, 90) || DEFAULT_SETTINGS.companyName;
  next.phone = cleanText(next.phone, 50) || DEFAULT_SETTINGS.phone;
  next.email = cleanText(next.email, 120) || DEFAULT_SETTINGS.email;
  next.address = cleanText(next.address, 140) || DEFAULT_SETTINGS.address;
  next.facebookUrl = cleanUrl(next.facebookUrl, DEFAULT_SETTINGS.facebookUrl);
  next.mapQuery = cleanText(next.mapQuery, 140) || DEFAULT_SETTINGS.mapQuery;
  next.tagline = cleanText(next.tagline, 160) || DEFAULT_SETTINGS.tagline;
  next.themeMode = next.themeMode === 'dark' ? 'dark' : 'light';
  next.accentColor = /^#[0-9a-fA-F]{6}$/.test(String(next.accentColor)) ? String(next.accentColor) : DEFAULT_SETTINGS.accentColor;

  safeWriteJson(SETTINGS_FILE, next);
  broadcastSettings(next);
  return next;
}

function cleanText(value, maxLength) {
  return String(value == null ? '' : value).replace(/[<>\u0000-\u001f]/g, '').trim().slice(0, maxLength);
}

function cleanUrl(value, fallback) {
  const candidate = cleanText(value, 240);
  try {
    const parsed = new URL(candidate);
    return ['http:', 'https:'].includes(parsed.protocol) ? parsed.toString() : fallback;
  } catch (error) {
    return fallback;
  }
}

function broadcastSettings(settings) {
  const data = JSON.stringify(settings);
  clients.forEach((res) => {
    try { res.write(`event: settings\ndata: ${data}\n\n`); }
    catch (error) { clients.delete(res); }
  });
}

function sendJson(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  });
  res.end(JSON.stringify(data));
}

function readBody(req, maxBytes = 16 * 1024) {
  return new Promise((resolve, reject) => {
    let body = '';
    let total = 0;
    let tooLarge = false;
    req.on('data', (chunk) => {
      total += chunk.length;
      if (total > maxBytes) {
        tooLarge = true;
        body = '';
        return;
      }
      if (!tooLarge) body += chunk.toString('utf8');
    });
    req.on('end', () => {
      if (tooLarge) return reject(new Error('Request is too large.'));
      try { resolve(body ? JSON.parse(body) : {}); }
      catch (error) { reject(new Error('Invalid JSON body.')); }
    });
    req.on('error', reject);
  });
}

function authorizedSettings(req) {
  const configuredKey = process.env.ADMIN_KEY;
  if (configuredKey && safeEqualString(req.headers['x-admin-key'] || '', configuredKey)) return true;
  if (adminIsConfigured()) return Boolean(currentAdmin(req));
  // Keep first-run editing convenient only when deployment setup is not explicitly guarded.
  return !configuredKey && !process.env.ADMIN_SETUP_KEY;
}

function safeEqualString(first, second) {
  const left = crypto.createHash('sha256').update(String(first)).digest();
  const right = crypto.createHash('sha256').update(String(second)).digest();
  return crypto.timingSafeEqual(left, right);
}

function normaliseEmail(value) {
  return cleanText(value, 120).toLowerCase();
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function readAdminAccount() {
  try {
    const account = JSON.parse(fs.readFileSync(ADMIN_FILE, 'utf8'));
    return account && account.email && account.salt && account.hash ? account : null;
  } catch (error) {
    return null;
  }
}

function hasEnvironmentAdmin() {
  return Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD);
}

function adminIsConfigured() {
  return hasEnvironmentAdmin() || Boolean(readAdminAccount());
}

function getSessionSecret() {
  if (process.env.SESSION_SECRET && process.env.SESSION_SECRET.length >= 32) return Buffer.from(process.env.SESSION_SECRET, 'utf8');
  try {
    const saved = fs.readFileSync(SESSION_SECRET_FILE);
    if (saved.length >= 32) return saved;
  } catch (error) { /* create a private local secret below */ }
  const generated = crypto.randomBytes(48);
  fs.writeFileSync(SESSION_SECRET_FILE, generated, { mode: 0o600, flag: 'wx' });
  return generated;
}

function makeSession(email) {
  const payload = Buffer.from(JSON.stringify({ email, expiresAt: Date.now() + SESSION_TTL, nonce: crypto.randomBytes(16).toString('hex') })).toString('base64url');
  const signature = crypto.createHmac('sha256', getSessionSecret()).update(payload).digest('hex');
  return `${payload}.${signature}`;
}

function cookieValue(req, name) {
  const prefix = `${name}=`;
  const part = String(req.headers.cookie || '').split(';').map((item) => item.trim()).find((item) => item.startsWith(prefix));
  return part ? part.slice(prefix.length) : '';
}

function readSession(req) {
  const token = cookieValue(req, SESSION_COOKIE);
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [payload, signature] = parts;
  const expected = crypto.createHmac('sha256', getSessionSecret()).update(payload).digest();
  let actual;
  try { actual = Buffer.from(signature, 'hex'); } catch (error) { return null; }
  if (actual.length !== expected.length || !crypto.timingSafeEqual(actual, expected)) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (!session.email || !Number.isFinite(session.expiresAt) || session.expiresAt < Date.now()) return null;
    return { email: normaliseEmail(session.email) };
  } catch (error) {
    return null;
  }
}

function currentAdmin(req) {
  const session = readSession(req);
  if (!session) return null;
  if (hasEnvironmentAdmin()) return safeEqualString(session.email, normaliseEmail(process.env.ADMIN_EMAIL)) ? session : null;
  const account = readAdminAccount();
  return account && safeEqualString(session.email, normaliseEmail(account.email)) ? session : null;
}

function setSessionCookie(req, res, email) {
  const forwardedProto = String(req.headers['x-forwarded-proto'] || '').split(',')[0].trim().toLowerCase();
  const secure = forwardedProto === 'https' || Boolean(req.socket && req.socket.encrypted);
  res.setHeader('Set-Cookie', `${SESSION_COOKIE}=${makeSession(email)}; Path=/; Max-Age=${Math.floor(SESSION_TTL / 1000)}; HttpOnly; SameSite=Lax${secure ? '; Secure' : ''}`);
}

function clearSessionCookie(req, res) {
  const forwardedProto = String(req.headers['x-forwarded-proto'] || '').split(',')[0].trim().toLowerCase();
  const secure = forwardedProto === 'https' || Boolean(req.socket && req.socket.encrypted);
  res.setHeader('Set-Cookie', `${SESSION_COOKIE}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax${secure ? '; Secure' : ''}`);
}

function loginKey(req) {
  const forwarded = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  return forwarded || (req.socket && req.socket.remoteAddress) || 'unknown';
}

function loginRateAllowed(req) {
  const key = loginKey(req);
  const entry = loginAttempts.get(key);
  const now = Date.now();
  if (!entry || now - entry.startedAt > 15 * 60 * 1000) {
    loginAttempts.set(key, { startedAt: now, count: 0 });
    return true;
  }
  return entry.count < 10;
}

function recordLoginFailure(req) {
  const key = loginKey(req);
  const entry = loginAttempts.get(key) || { startedAt: Date.now(), count: 0 };
  if (Date.now() - entry.startedAt > 15 * 60 * 1000) { entry.startedAt = Date.now(); entry.count = 0; }
  entry.count += 1;
  loginAttempts.set(key, entry);
}

function clearLoginFailures(req) {
  loginAttempts.delete(loginKey(req));
}

function verifyAdminCredentials(email, password) {
  if (hasEnvironmentAdmin()) {
    return safeEqualString(email, normaliseEmail(process.env.ADMIN_EMAIL)) && safeEqualString(password, process.env.ADMIN_PASSWORD);
  }
  const account = readAdminAccount();
  if (!account || !safeEqualString(email, normaliseEmail(account.email))) return false;
  try {
    const candidate = crypto.scryptSync(password, Buffer.from(account.salt, 'hex'), 64);
    const saved = Buffer.from(account.hash, 'hex');
    return saved.length === candidate.length && crypto.timingSafeEqual(candidate, saved);
  } catch (error) {
    return false;
  }
}

function readProducts() {
  try {
    const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
    return Array.isArray(products) ? products : [];
  } catch (error) {
    return [];
  }
}

function readInquiries() {
  try {
    const inquiries = JSON.parse(fs.readFileSync(INQUIRIES_FILE, 'utf8'));
    return Array.isArray(inquiries) ? inquiries : [];
  } catch (error) {
    return [];
  }
}

function safeProductImage(value) {
  const imageUrl = cleanText(value, 240);
  if (!imageUrl) return '';
  if (imageUrl.includes('..') || imageUrl.startsWith('//') || !/^\/(?:images|media)\/[A-Za-z0-9/_-]+\.(?:jpe?g|png|webp)$/i.test(imageUrl)) {
    throw new Error('Use a local JPG, PNG or WebP image, or upload one from your device.');
  }
  return imageUrl;
}

function normalizeProduct(input, previous = {}) {
  const name = cleanText(input.name, 100);
  const sku = cleanText(input.sku, 40).toUpperCase();
  const category = cleanText(input.category, 60) || 'Other';
  const description = cleanText(input.description, 1400);
  const unit = cleanText(input.unit, 40) || 'Project-specific';
  const imageUrl = safeProductImage(input.imageUrl || previous.imageUrl || '');
  const rawPrice = input.price;
  let price = null;
  if (rawPrice !== '' && rawPrice !== null && rawPrice !== undefined) {
    price = Number(rawPrice);
    if (!Number.isFinite(price) || price < 0 || price > 1000000000) throw new Error('Enter a valid non-negative product price, or leave it blank for quote-led pricing.');
  }
  if (name.length < 3) throw new Error('Enter a product name with at least three characters.');
  if (description.length < 8) throw new Error('Add a little more detail to the product description.');
  return {
    ...previous,
    id: previous.id || cleanText(input.id, 80) || `mcs-${crypto.randomBytes(8).toString('hex')}`,
    slug: cleanText(input.slug, 120) || name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    name, sku, category, description, imageUrl, price, unit,
    featured: Boolean(input.featured),
    active: input.active !== false,
    updatedAt: new Date().toISOString(),
    createdAt: previous.createdAt || new Date().toISOString()
  };
}

function persistProducts(products) {
  safeWriteJson(PRODUCTS_FILE, products);
}

function checkProductSku(products, sku, exceptId = '') {
  if (!sku) return;
  if (products.some((product) => product.id !== exceptId && String(product.sku || '').toLowerCase() === sku.toLowerCase())) {
    throw new Error('That SKU / reference is already in use.');
  }
}

function validImageBytes(buffer, mime) {
  if (mime === 'image/png') return buffer.length >= 8 && buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  if (mime === 'image/jpeg') return buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  if (mime === 'image/webp') return buffer.length >= 12 && buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP';
  return false;
}

function serveMedia(req, res, pathname) {
  const match = pathname.match(/^\/media\/products\/([a-z0-9-]+\.(?:jpg|jpeg|png|webp))$/i);
  if (!match || (req.method !== 'GET' && req.method !== 'HEAD')) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Media file not found.');
  }
  const filename = match[1];
  const file = path.resolve(UPLOAD_DIR, filename);
  if (!file.startsWith(`${UPLOAD_DIR}${path.sep}`) || !fs.existsSync(file)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Media file not found.');
  }
  const ext = path.extname(file).toLowerCase();
  const mime = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' }[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': mime, 'Cache-Control': 'public, max-age=31536000, immutable', 'X-Content-Type-Options': 'nosniff' });
  if (req.method === 'HEAD') return res.end();
  return fs.createReadStream(file).pipe(res);
}

function handleApi(req, res, pathname) {
  if (pathname === '/api/health' && req.method === 'GET') {
    return sendJson(res, 200, { ok: true, service: 'multilines-api' });
  }

  if (pathname === '/api/settings' && req.method === 'GET') return sendJson(res, 200, readSettings());
  if (pathname === '/api/settings' && req.method === 'PUT') {
    if (!authorizedSettings(req)) return sendJson(res, 401, { error: 'An administrator key is required to update shared settings.' });
    return readBody(req).then((input) => sendJson(res, 200, saveSettings(input)))
      .catch((error) => sendJson(res, 400, { error: error.message || 'Could not save settings.' }));
  }

  if (pathname === '/api/events' && req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no'
    });
    res.write(`event: settings\ndata: ${JSON.stringify(readSettings())}\n\n`);
    clients.add(res);
    const heartbeat = setInterval(() => res.write(': keep-alive\n\n'), 25000);
    req.on('close', () => { clearInterval(heartbeat); clients.delete(res); });
    return;
  }

  if (pathname === '/api/inquiries' && req.method === 'POST') {
    return readBody(req, 12 * 1024).then((input) => {
      const name = cleanText(input.name, 100);
      const phone = cleanText(input.phone, 60);
      const email = cleanText(input.email, 120);
      const service = cleanText(input.service, 120);
      const message = cleanText(input.message, 2200);
      if (name.length < 2) return sendJson(res, 422, { error: 'Please enter your name.' });
      if (phone.replace(/\D/g, '').length < 7) return sendJson(res, 422, { error: 'Please enter a valid phone or WhatsApp number.' });
      if (message.length < 10) return sendJson(res, 422, { error: 'Please add a little more detail about your project.' });
      if (email && !isValidEmail(email)) return sendJson(res, 422, { error: 'Please check the email address.' });

      const inquiry = {
        id: `MCS-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`,
        createdAt: new Date().toISOString(), name, phone, email, service, message, status: 'new'
      };
      const items = readInquiries();
      items.push(inquiry);
      safeWriteJson(INQUIRIES_FILE, items.slice(-1000));
      return sendJson(res, 201, { ok: true, inquiryId: inquiry.id, message: 'Your project enquiry has been received.' });
    }).catch((error) => sendJson(res, 400, { error: error.message || 'Could not receive enquiry.' }));
  }

  if (pathname === '/api/products' && req.method === 'GET') {
    return sendJson(res, 200, readProducts().filter((product) => product.active !== false));
  }

  if (pathname === '/api/admin/status' && req.method === 'GET') {
    const session = currentAdmin(req);
    return sendJson(res, 200, {
      setupRequired: !adminIsConfigured(),
      authenticated: Boolean(session),
      email: session ? session.email : ''
    });
  }

  if (pathname === '/api/admin/setup' && req.method === 'POST') {
    return readBody(req, 8 * 1024).then((input) => {
      if (adminIsConfigured()) return sendJson(res, 409, { error: 'An administrator account is already configured.' });
      if (process.env.ADMIN_SETUP_KEY && !safeEqualString(input.setupKey || '', process.env.ADMIN_SETUP_KEY)) {
        return sendJson(res, 401, { error: 'The server setup key is not correct.' });
      }
      const email = normaliseEmail(input.email);
      const password = String(input.password || '');
      if (!isValidEmail(email)) return sendJson(res, 422, { error: 'Enter a valid administrator email address.' });
      if (password.length < 12 || password.length > 128) return sendJson(res, 422, { error: 'Choose a password between 12 and 128 characters.' });
      const salt = crypto.randomBytes(16);
      const hash = crypto.scryptSync(password, salt, 64);
      safeWriteJson(ADMIN_FILE, { email, salt: salt.toString('hex'), hash: hash.toString('hex'), createdAt: new Date().toISOString() });
      setSessionCookie(req, res, email);
      return sendJson(res, 201, { ok: true, email });
    }).catch((error) => sendJson(res, 400, { error: error.message || 'Could not create administrator account.' }));
  }

  if (pathname === '/api/admin/login' && req.method === 'POST') {
    if (!loginRateAllowed(req)) return sendJson(res, 429, { error: 'Too many sign-in attempts. Please wait 15 minutes and try again.' });
    return readBody(req, 8 * 1024).then((input) => {
      const email = normaliseEmail(input.email);
      const password = String(input.password || '');
      if (!email || !password || !adminIsConfigured() || !verifyAdminCredentials(email, password)) {
        recordLoginFailure(req);
        return sendJson(res, 401, { error: 'Email or password is not correct.' });
      }
      clearLoginFailures(req);
      setSessionCookie(req, res, email);
      return sendJson(res, 200, { ok: true, email });
    }).catch((error) => sendJson(res, 400, { error: error.message || 'Could not sign in.' }));
  }

  if (pathname === '/api/admin/logout' && req.method === 'POST') {
    clearSessionCookie(req, res);
    return sendJson(res, 200, { ok: true });
  }

  if (pathname.startsWith('/api/admin/')) {
    const session = currentAdmin(req);
    if (!session) return sendJson(res, 401, { error: 'Sign in to the product dashboard to continue.' });

    if (pathname === '/api/admin/inquiries' && req.method === 'GET') {
      const inquiries = readInquiries().slice(-250).reverse();
      return sendJson(res, 200, inquiries);
    }
    const inquiryMatch = pathname.match(/^\/api\/admin\/inquiries\/([A-Za-z0-9_-]+)$/);
    if (inquiryMatch && req.method === 'PATCH') {
      return readBody(req, 8 * 1024).then((input) => {
        const inquiries = readInquiries();
        const index = inquiries.findIndex((inquiry) => inquiry.id === inquiryMatch[1]);
        if (index < 0) return sendJson(res, 404, { error: 'Enquiry not found.' });
        const status = input.status === 'reviewed' ? 'reviewed' : 'new';
        inquiries[index] = { ...inquiries[index], status, reviewedAt: status === 'reviewed' ? new Date().toISOString() : null };
        safeWriteJson(INQUIRIES_FILE, inquiries);
        return sendJson(res, 200, inquiries[index]);
      }).catch((error) => sendJson(res, 400, { error: error.message || 'Enquiry could not be updated.' }));
    }

    if (pathname === '/api/admin/products' && req.method === 'GET') return sendJson(res, 200, readProducts());
    if (pathname === '/api/admin/products' && req.method === 'POST') {
      return readBody(req, 24 * 1024).then((input) => {
        const products = readProducts();
        const product = normalizeProduct(input);
        checkProductSku(products, product.sku);
        products.unshift(product);
        persistProducts(products);
        return sendJson(res, 201, product);
      }).catch((error) => sendJson(res, 422, { error: error.message || 'Product could not be added.' }));
    }

    const productMatch = pathname.match(/^\/api\/admin\/products\/([a-zA-Z0-9_-]+)$/);
    if (productMatch && req.method === 'PUT') {
      return readBody(req, 24 * 1024).then((input) => {
        const id = productMatch[1];
        const products = readProducts();
        const index = products.findIndex((product) => product.id === id);
        if (index < 0) return sendJson(res, 404, { error: 'Product not found.' });
        const product = normalizeProduct(input, products[index]);
        checkProductSku(products, product.sku, id);
        products[index] = product;
        persistProducts(products);
        return sendJson(res, 200, product);
      }).catch((error) => sendJson(res, 422, { error: error.message || 'Product could not be updated.' }));
    }
    if (productMatch && req.method === 'DELETE') {
      const products = readProducts();
      const next = products.filter((product) => product.id !== productMatch[1]);
      if (next.length === products.length) return sendJson(res, 404, { error: 'Product not found.' });
      persistProducts(next);
      return sendJson(res, 200, { ok: true });
    }

    if (pathname === '/api/admin/upload' && req.method === 'POST') {
      return readBody(req, 8 * 1024 * 1024).then((input) => {
        const dataUrl = String(input.dataUrl || '');
        const match = dataUrl.match(/^data:(image\/(?:png|jpeg|webp));base64,([A-Za-z0-9+/=]+)$/i);
        if (!match) return sendJson(res, 422, { error: 'Choose a JPG, PNG or WebP image.' });
        const mime = match[1].toLowerCase();
        const buffer = Buffer.from(match[2], 'base64');
        if (!buffer.length || buffer.length > 5 * 1024 * 1024) return sendJson(res, 422, { error: 'Images must be smaller than 5 MB.' });
        if (!validImageBytes(buffer, mime)) return sendJson(res, 422, { error: 'That file does not appear to be a valid image.' });
        const ext = mime === 'image/jpeg' ? 'jpg' : mime.split('/')[1];
        const filename = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}.${ext}`;
        fs.writeFileSync(path.join(UPLOAD_DIR, filename), buffer, { flag: 'wx', mode: 0o644 });
        return sendJson(res, 201, { ok: true, imageUrl: `/media/products/${filename}` });
      }).catch((error) => sendJson(res, 400, { error: error.message || 'Image upload failed.' }));
    }

    return sendJson(res, 404, { error: 'Admin endpoint not found.' });
  }

  return sendJson(res, 404, { error: 'API endpoint not found.' });
}

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.mp4': 'video/mp4', '.woff': 'font/woff',
  '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.map': 'application/json'
};

function serveStatic(req, res, pathname) {
  const indexFile = path.join(BUILD_DIR, 'index.html');
  if (!fs.existsSync(indexFile)) {
    res.writeHead(503, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('The production build is not available yet. Run npm run build, or use npm run dev for development.');
  }
  let requested;
  try { requested = decodeURIComponent(pathname); }
  catch (error) { res.writeHead(400); return res.end('Invalid URL.'); }
  if (requested === '/') requested = '/index.html';
  const resolved = path.resolve(BUILD_DIR, `.${requested}`);
  if (resolved !== BUILD_DIR && !resolved.startsWith(`${BUILD_DIR}${path.sep}`)) {
    res.writeHead(403); return res.end('Forbidden');
  }
  let file = resolved;
  try {
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = indexFile;
  } catch (error) { file = indexFile; }
  const ext = path.extname(file).toLowerCase();
  res.writeHead(200, {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=3600',
    'X-Content-Type-Options': 'nosniff'
  });
  if (req.method === 'HEAD') return res.end();
  return fs.createReadStream(file).pipe(res);
}

const requestHandler = (req, res) => {
  let url;
  try { url = new URL(req.url, 'http://localhost'); }
  catch (error) { res.writeHead(400); return res.end('Invalid URL.'); }
  if (url.pathname.startsWith('/api/')) return handleApi(req, res, url.pathname);
  if (url.pathname.startsWith('/media/')) return serveMedia(req, res, url.pathname);
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' }); return res.end('Method not allowed');
  }
  return serveStatic(req, res, url.pathname);
};

const server = http.createServer(requestHandler);

if (require.main === module) {
  const port = Number(process.env.API_PORT || process.env.PORT || 4301);
  const host = process.env.HOST || '0.0.0.0';
  server.listen(port, host, () => console.log(`Multilines API/site server listening on ${host}:${port}`));
}

module.exports = requestHandler;

process.on('SIGTERM', () => {
  clients.forEach((res) => res.end());
  server.close(() => process.exit(0));
});

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function setupProxy(app) {
  app.use(['/api', '/media'], createProxyMiddleware({
    target: 'http://127.0.0.1:4301',
    changeOrigin: true,
    ws: true,
    logLevel: 'warn'
  }));
};

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'http://server:4444',
      changeOrigin: true,
    })
  );

  app.use(
    '/api/items',
    createProxyMiddleware({
      target: 'http://server:4444',
      changeOrigin: true,
    })
  );
};

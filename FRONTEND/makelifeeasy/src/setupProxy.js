// const proxy = require('http-proxy-middleware');

// module.exports = function(app) {
//     app.use(proxy("/users", {target:"http://localhost:5000/"}))
// }

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true
    })
  );
};
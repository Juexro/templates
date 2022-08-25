const proxy = require('http-proxy-middleware');

module.exports = (app) => {
  // app.use('/api', proxy.createProxyMiddleware({
  //   target: 'http://localhost:4000',
  //   changeOrigin: true,
  //   pathRewrite: {
  //     '^/api': ''
  //   }
  // }));
};
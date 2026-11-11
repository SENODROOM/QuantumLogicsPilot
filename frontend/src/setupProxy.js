const { createProxyMiddleware } = require('http-proxy-middleware');
const fs = require('fs');
const path = require('path');

// Resolve the .backend_port file at the repository root
const portFile = path.resolve(__dirname, '../../.backend_port');
let backendPort = process.env.BACKEND_PORT || 5000;
if (fs.existsSync(portFile)) {
  const filePort = parseInt(fs.readFileSync(portFile, 'utf8').trim(), 10);
  if (!isNaN(filePort)) backendPort = filePort;
}

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `http://localhost:${backendPort}`,
      changeOrigin: true,
    })
  );
};

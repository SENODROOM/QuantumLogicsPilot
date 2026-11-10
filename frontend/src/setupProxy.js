const { createProxyMiddleware } = require('http-proxy-middleware');
const fs = require('fs');
const path = require('path');

/**
 * Resolve the actual backend port.
 *
 * The backend server writes its listening port to a temporary file named
 * `.backend_port` located at the repository root (e.g. `./.backend_port`).
 * This proxy reads that file so it can forward API requests to the correct
 * port even when the backend falls back to an alternative port.
 *
 * If the file is missing (for example during the very first start) we fall
 * back to the configured `BACKEND_PORT` environment variable, then to the
 * historic default of `5000`.
 */
function getBackendPort() {
  try {
    // Resolve the path to the root‑level .backend_port file.
    const portFilePath = path.resolve(__dirname, '../../.backend_port');
    const data = fs.readFileSync(portFilePath, { encoding: 'utf8' }).trim();
    const port = parseInt(data, 10);
    if (!isNaN(port) && port > 0) {
      return port;
    }
    console.warn(`Invalid port value in .backend_port: "${data}". Falling back to env vars.`);
  } catch (err) {
    // If the file cannot be read we simply ignore the error and use the
    // fallback chain below.
    console.warn('Could not read .backend_port file. Falling back to environment variables.', err.message);
  }
  return process.env.BACKEND_PORT || 5000;
}

const backendPort = getBackendPort();

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `http://localhost:${backendPort}`,
      changeOrigin: true,
    })
  );
};

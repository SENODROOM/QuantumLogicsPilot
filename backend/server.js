const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env files (both root and backend if present)
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();

// Determine ports (fallback logic handled by the server start routine)
const FRONTEND_PORT = process.env.FRONTEND_PORT || 3000;
const DEFAULT_BACKEND_PORT = process.env.BACKEND_PORT || 5000;

// CORS configuration – only allow the frontend origin
app.use(
  cors({
    origin: `http://localhost:${FRONTEND_PORT}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

// Body parsing middleware (optional but common)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Example placeholder route (can be removed or expanded later)
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Error handling middleware – must be after all routes
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
});

/**
 * Starts the HTTP server on the desired port. If the default port is already in use,
 * the function will increment the port number until a free one is found.
 */
function startServer(initialPort) {
  let currentPort = initialPort;
  const server = app
    .listen(currentPort, () => {
      console.log(`🚀 Server listening on http://localhost:${currentPort}`);
      // Write the actual port to the repository root so the frontend proxy can read it
      const portFilePath = path.resolve(__dirname, '..', '.backend_port');
      try {
        fs.writeFileSync(portFilePath, String(currentPort), { encoding: 'utf8' });
        console.log(`✅ Backend port written to ${portFilePath}`);
      } catch (writeErr) {
        console.error('Failed to write backend port file:', writeErr);
      }
    })
    .on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.warn(`⚠️ Port ${currentPort} in use, trying next port...`);
        currentPort += 1;
        startServer(currentPort);
      } else {
        console.error('Server error:', err);
        process.exit(1);
      }
    });

  return server;
}

// Initiate server start with fallback logic
startServer(DEFAULT_BACKEND_PORT);

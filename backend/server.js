require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Create Express app
const app = express();

// Determine frontend origin for CORS (default to localhost:3000)
const frontendPort = process.env.FRONTEND_PORT || 3000;
const frontendOrigin = `http://localhost:${frontendPort}`;

// Apply middlewares
app.use(cors({ origin: frontendOrigin }));
app.use(express.json());

// Simple health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Dynamic port fallback logic
const maxAttempts = 5;
let basePort = parseInt(process.env.BACKEND_PORT, 10) || 5000;
let attempt = 0;

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`Backend server listening on http://localhost:${port}`);
    // Write the actual port to a .backend_port file at the repository root
    const portFilePath = path.resolve(__dirname, '../.backend_port');
    try {
      fs.writeFileSync(portFilePath, String(port), { encoding: 'utf8' });
      console.log(`Wrote backend port ${port} to ${portFilePath}`);
    } catch (err) {
      console.error('Failed to write backend port file:', err);
    }
  });

  // Handle server errors (e.g., EADDRINUSE) and attempt fallback
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE' && attempt < maxAttempts) {
      attempt += 1;
      const newPort = basePort + attempt;
      console.warn(`Port ${port} in use, trying fallback port ${newPort}...`);
      startServer(newPort);
    } else {
      console.error('Server failed to start:', err);
    }
  });
}

// Initial attempt
startServer(basePort);

module.exports = app;

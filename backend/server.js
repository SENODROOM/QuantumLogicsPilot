require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware
// Restrict CORS to the frontend origin (default to localhost with the configured frontend port)
app.use(
  cors({
    origin:
      process.env.FRONTEND_ORIGIN ||
      `http://localhost:${process.env.FRONTEND_PORT || 3000}`,
  })
);
app.use(express.json());

// Example route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
});

// Dynamic port fallback (already handled via environment variables)
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  const actualPort = server.address().port;
  // Expose the actual port for other parts of the system (e.g., frontend proxy)
  process.env.ACTUAL_BACKEND_PORT = actualPort;
  // Persist the actual port to a temporary file for the frontend proxy to read (repository root)
  const portFile = path.resolve(__dirname, '..', '.backend_port');
  try {
    fs.writeFileSync(portFile, actualPort.toString(), { encoding: 'utf8' });
    console.log(`Backend port written to ${portFile}`);
  } catch (writeErr) {
    console.error('Failed to write backend port file:', writeErr);
  }
  console.log(`Server running on port ${actualPort}`);
});

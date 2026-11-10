require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Create Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Configure CORS – allow only the frontend origin defined in .env (fallback to localhost:3000)
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';
app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }));

// Simple health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

// Add any additional routes here (e.g., placeholder)
// app.use('/api/your-route', yourRouter);

// Determine the port to listen on – use env PORT or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  // Write the actual listening port to a .backend_port file at the repository root.
  // This path matches the location expected by frontend/src/setupProxy.js.
  const portFilePath = path.resolve(__dirname, '..', '.backend_port');
  try {
    fs.writeFileSync(portFilePath, String(PORT), { encoding: 'utf8' });
    console.log(`Wrote backend port (${PORT}) to ${portFilePath}`);
  } catch (err) {
    console.error('Failed to write .backend_port file:', err);
  }
});

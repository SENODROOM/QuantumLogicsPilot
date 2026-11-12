require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Create Express app
const app = express();

// Determine frontend origin for CORS (default to localhost:3000)
const FRONTEND_PORT = process.env.FRONTEND_PORT || 3000;
app.use(
  cors({
    origin: `http://localhost:${FRONTEND_PORT}`,
    credentials: true,
  })
);

// Parse JSON bodies
app.use(express.json());

// Simple health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Determine backend listening port (default to 5000)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  // Write the actual port to a .backend_port file at the repository root
  const portFilePath = path.resolve(__dirname, '..', '..', '.backend_port');
  try {
    fs.writeFileSync(portFilePath, String(PORT), 'utf8');
    console.log(`Backend port written to ${portFilePath}`);
  } catch (err) {
    console.error('Failed to write .backend_port file:', err);
  }
  console.log(`Server listening on port ${PORT}`);
});

import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001; // Using different port for testing

// Basic logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Test route
app.get('/test', (req, res) => {
  console.log('Test route hit!');
  res.json({ status: 'ok', message: 'Server is working!' });
});

// Root route
app.get('/', (req, res) => {
  console.log('Root route hit!');
  res.send(`
    <h1>Test Server Running!</h1>
    <p>If you can see this, the basic server is working.</p>
    <p>Test API: <a href="/test">/test</a></p>
  `);
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Test server running on http://localhost:${PORT}`);
  console.log(`Also try: http://127.0.0.1:${PORT}`);
});
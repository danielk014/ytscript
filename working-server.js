import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Enable all CORS
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Comprehensive logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

// Manual static file serving with logging
const publicDir = path.join(__dirname, 'public');
console.log('Public directory path:', publicDir);
console.log('Public directory exists:', fs.existsSync(publicDir));

if (fs.existsSync(publicDir)) {
  const files = fs.readdirSync(publicDir);
  console.log('Files in public directory:', files);
}

// Serve index.html for root
app.get('/', (req, res) => {
  console.log('Root route hit');
  const indexPath = path.join(publicDir, 'index.html');
  
  if (fs.existsSync(indexPath)) {
    console.log('Serving index.html from:', indexPath);
    res.sendFile(indexPath);
  } else {
    console.error('index.html not found at:', indexPath);
    res.status(404).send(`
      <h1>404 - index.html not found</h1>
      <p>Looking for: ${indexPath}</p>
      <p>Current directory: ${__dirname}</p>
      <p>Public directory: ${publicDir}</p>
    `);
  }
});

// Serve static files manually
app.get('/style.css', (req, res) => {
  const filePath = path.join(publicDir, 'style.css');
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(filePath);
  } else {
    res.status(404).send('style.css not found');
  }
});

app.get('/script.js', (req, res) => {
  const filePath = path.join(publicDir, 'script.js');
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(filePath);
  } else {
    res.status(404).send('script.js not found');
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    workingDirectory: process.cwd(),
    dirname: __dirname,
    publicDir: publicDir
  });
});

// Mock API endpoints for testing
app.get('/api/examples', (req, res) => {
  console.log('Examples endpoint hit');
  res.json({
    script1: "Stop scrolling. Test script 1.",
    script2: "What if I told you... Test script 2."
  });
});

app.post('/api/analyze', (req, res) => {
  console.log('Analyze endpoint hit');
  console.log('Request body:', req.body);
  
  // Return mock data for testing
  res.json({
    script: "This is a test generated script for " + (req.body.topic || "unknown topic"),
    analyses: { script1: {}, script2: {} },
    synthesizedTactics: [],
    blueprint: [],
    tacticMap: [],
    suggestions: ["Test suggestion 1", "Test suggestion 2"],
    formattedAnalysis: "## Test Analysis",
    formattedSynthesis: "## Test Synthesis",
    formattedBlueprint: "## Test Blueprint",
    formattedMapping: "## Test Mapping"
  });
});

// 404 handler
app.use((req, res) => {
  console.log('404 for:', req.url);
  res.status(404).json({ 
    error: 'Not found', 
    url: req.url,
    availableRoutes: ['/', '/health', '/api/examples', '/api/analyze']
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: err.message,
    stack: err.stack
  });
});

// Catch uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔═══════════════════════════════════════════╗
║       Working Test Server                 ║
║                                           ║
║   🚀 Server running on:                   ║
║   http://localhost:${PORT}                    ║
║   http://127.0.0.1:${PORT}                    ║
║                                           ║
║   Working directory: ${process.cwd()}
║   Script directory: ${__dirname}
║   Public directory: ${publicDir}
║                                           ║
║   Test endpoints:                         ║
║   - http://localhost:${PORT}/              ║
║   - http://localhost:${PORT}/health        ║
║   - http://localhost:${PORT}/api/examples  ║
║                                           ║
╚═══════════════════════════════════════════╝
  `);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ Port ${PORT} is already in use!`);
    console.error('Try one of these solutions:');
    console.error('1. Kill the process using the port:');
    console.error(`   lsof -ti:${PORT} | xargs kill -9`);
    console.error('2. Use a different port:');
    console.error('   PORT=3001 node working-server.js');
  } else {
    console.error('Server error:', err);
  }
  process.exit(1);
});
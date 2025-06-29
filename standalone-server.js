const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>PitchArchitect - Working!</title>
        <style>
          body { font-family: Arial; padding: 50px; background: #1a1a1a; color: white; }
          h1 { color: #5865F2; }
          a { color: #EB459E; }
        </style>
      </head>
      <body>
        <h1>✅ Server is Working!</h1>
        <p>This is a standalone Node.js server without Express.</p>
        <p>Time: ${new Date().toLocaleString()}</p>
        <p>Available routes:</p>
        <ul>
          <li><a href="/test">/test</a> - JSON test endpoint</li>
          <li><a href="/app">/app</a> - Load the full application</li>
        </ul>
      </body>
      </html>
    `);
  } else if (req.url === '/test') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      message: 'Basic server working without Express'
    }));
  } else if (req.url === '/app') {
    const indexPath = path.join(__dirname, 'public', 'index.html');
    fs.readFile(indexPath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('File not found: ' + indexPath);
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔═══════════════════════════════════════════╗
║       Standalone Test Server              ║
║                                           ║
║   🚀 Server running on:                   ║
║   http://localhost:${PORT}                    ║
║   http://127.0.0.1:${PORT}                    ║
║                                           ║
║   This uses pure Node.js (no Express)     ║
╚═══════════════════════════════════════════╝
  `);
});

server.on('error', (err) => {
  console.error('Server error:', err);
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use!`);
  }
});
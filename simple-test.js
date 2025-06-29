import http from 'http';

const server = http.createServer((req, res) => {
  console.log('Request received:', req.url);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Server is working!\n');
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Simple server listening on port ${PORT}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});
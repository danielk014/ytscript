import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3002;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Test route
app.get('/test', (req, res) => {
    res.json({ status: 'Server is working!' });
});

app.listen(PORT, () => {
    console.log(`Test server running at http://localhost:${PORT}`);
});
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  console.log('Root route hit');
  res.send('Express is working!');
});

const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});

// Add timeout to test
setTimeout(() => {
  console.log('Server still running after 5 seconds');
}, 5000);
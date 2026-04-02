import express from 'express';

const app = express();
const port = 3001;

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Fengzhi Diving Backend is running' });
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
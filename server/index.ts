import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/tasks';

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
  return;
});

// Mount task routes
app.use('/api/tasks', taskRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
  return;
});

// Handle 404
app.use((_req: express.Request, res: express.Response) => {
  res.status(404).json({ message: 'Not Found' });
  return;
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`API endpoint: http://localhost:${port}/api/tasks`);
  console.log(`Health check: http://localhost:${port}/health`);
});

export default app;
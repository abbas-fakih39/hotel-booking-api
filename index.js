import express from 'express';
import adminRoutes from './routes/admin.routes.js';
import clientRoutes from './routes/client.routes.js';

const app = express();
const port = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Routes Admin
app.use('/api/admin', adminRoutes);

// Routes Client
app.use('/api', clientRoutes);

// Route de test
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Hotel Booking - Bienvenue !',
    routes: {
      admin: '/api/admin',
      client: '/api'
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
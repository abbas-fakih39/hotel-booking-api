import express from 'express';
import dotenv from 'dotenv';
import adminRoutes from './routes/admin.routes.js';
import clientRoutes from './routes/client.routes.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', clientRoutes);

app.get('/', (req, res) => {
  res.json({ 
    message: 'API Hotel Booking - Bienvenue !',
    routes: {
      auth: '/api/auth',
      admin: '/api/admin',
      client: '/api'
    },
    note: 'Routes admin nécessitent API Key + JWT. Routes client nécessitent API Key.'
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
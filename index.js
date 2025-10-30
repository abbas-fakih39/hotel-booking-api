import express from 'express';
import dotenv from 'dotenv';
import adminRoutes from './routes/admin.routes.js';
import clientRoutes from './routes/client.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/admin', adminRoutes);

app.use('/api', clientRoutes);

app.get('/', (req, res) => {
  res.json({ 
    message: 'API Hotel Booking - Bienvenue !',
    routes: {
      admin: '/api/admin',
      client: '/api'
    },
    note: 'Toutes les routes nécessitent un header "x-api-key"'
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
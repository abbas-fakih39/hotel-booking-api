import express from 'express';
import * as adminController from '../controllers/admin.controller.js';

const router = express.Router();

//GET /api/admin/clients
//liste tous les clients
router.get('/clients', adminController.listClients);

//GET /api/admin/clients/:id
//recupere un client specifique
router.get('/clients/:id', adminController.getClient);

//POST /api/admin/clients
//ajoute un nouveau client
router.post('/clients', adminController.addClient);

//PUT /api/admin/clients/:id
//met a jour un client
router.put('/clients/:id', adminController.updateClient);

//POST /api/admin/clients/:clientId/book/:roomId
//reserve une chambre pour un client
router.post('/clients/:clientId/book/:roomId', adminController.bookRoom);


//DELETE /api/admin/bookings/:bookingId
//annule une reservation
router.delete('/bookings/:bookingId', adminController.cancelBooking);

export default router;
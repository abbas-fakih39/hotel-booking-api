import express from 'express';
import * as clientController from '../controllers/client.controller.js';

const router = express.Router();

//GET /api/hotel
//recupere les informations de l'hotel
router.get('/hotel', clientController.getHotelInfo);


//GET /api/rooms
//liste toutes les chambres
router.get('/rooms', clientController.listRooms);

//GET /api/rooms/:id
//recupere une chambre par id
router.get('/rooms/:id', clientController.getRoom);

//POST /api/rooms/:roomId/book
//reserve une chambre
router.post('/rooms/:roomId/book', clientController.bookRoom);

//DELETE /api/bookings/:bookingId
//annule une reservation
router.delete('/bookings/:bookingId', clientController.cancelBooking);

export default router;
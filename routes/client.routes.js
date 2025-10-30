import express from 'express';
import * as clientController from '../controllers/client.controller.js';
import { verifyApiKey } from '../middleware/apiKey.js';
import { validate, validateQuery } from '../middleware/validate.js';
import { clientBookingSchema, roomFiltersSchema } from '../validators/schemas.js';

const router = express.Router();

router.use(verifyApiKey);
router.get('/hotel', clientController.getHotelInfo);
router.get('/rooms', validateQuery(roomFiltersSchema), clientController.listRooms);
router.get('/rooms/:id', clientController.getRoom);
router.post('/rooms/:roomId/book', validate(clientBookingSchema), clientController.bookRoom);
router.delete('/bookings/:bookingId', clientController.cancelBooking);

export default router;
import express from 'express';
import * as adminController from '../controllers/admin.controller.js';
import { verifyApiKey } from '../middleware/apiKey.js';
import { verifyJWT } from '../middleware/verifyJWT.js';
import { validate } from '../middleware/validate.js';
import { addClientSchema, updateClientSchema, bookRoomSchema } from '../validators/schemas.js';

const router = express.Router();

router.use(verifyApiKey);
router.use(verifyJWT);
router.get('/clients', adminController.listClients);
router.get('/clients/:id', adminController.getClient);
router.post('/clients', validate(addClientSchema), adminController.addClient);
router.put('/clients/:id', validate(updateClientSchema), adminController.updateClient);
router.post('/clients/:clientId/book/:roomId', validate(bookRoomSchema), adminController.bookRoom);
router.delete('/bookings/:bookingId', adminController.cancelBooking);

export default router;
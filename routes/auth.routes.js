import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import { verifyJWT } from '../middleware/verifyJWT.js';
import { validate } from '../middleware/validate.js';
import { loginSchema } from '../validators/schemas.js';

const router = express.Router();

router.post('/login', validate(loginSchema), authController.login);
router.get('/profile', verifyJWT, authController.getProfile);
router.post('/logout', authController.logout);

export default router;
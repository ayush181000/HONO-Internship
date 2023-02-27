import express from 'express';
const router = express.Router();

import * as userController from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/signup').post(userController.signupUser);
router.route('/login').post(userController.loginUser);
router.route('/me').patch(protect, userController.updateUser);

export default router;
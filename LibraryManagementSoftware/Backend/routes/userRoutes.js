import express from 'express';
const router = express.Router();

import * as userController from '../controllers/userController.js';

router.route('/signup').post(userController.signupUser);
router.route('/login').post(userController.loginUser);

export default router;
import express from 'express';
const router = express.Router();

import * as bookController from '../controllers/bookController.js';

router.route('/').post(bookController.createBook).get(bookController.getAllBooks);

export default router;

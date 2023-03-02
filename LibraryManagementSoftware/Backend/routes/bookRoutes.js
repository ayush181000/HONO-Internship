import express from 'express';
const router = express.Router();

import * as bookController from '../controllers/bookController.js';
import { protect } from "../middleware/authMiddleware.js";

router.route('/').post(bookController.createBook).get(bookController.getAllBooks);
router.route('/search').get(bookController.searchBook);

export default router;

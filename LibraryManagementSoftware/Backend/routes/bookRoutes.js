import express from 'express';
const router = express.Router();

import * as bookController from '../controllers/bookController.js';
import { protect, restrictTo } from "../middleware/authMiddleware.js";

router.route('/').post(bookController.createBook).get(bookController.getAllBooks);
router.route('/search').get(bookController.searchBook);
router.route('/issue').post(protect, restrictTo('user'), bookController.issueBook);

export default router;

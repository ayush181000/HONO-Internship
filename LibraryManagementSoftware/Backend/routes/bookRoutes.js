import express from 'express';
const router = express.Router();

import * as bookController from '../controllers/bookController.js';
import { protect, restrictTo } from "../middleware/authMiddleware.js";

router.route('/').post(bookController.createBook).get(bookController.getAllBooks);
router.route('/search').get(bookController.searchBook);
router.route('/myBooks').get(protect, restrictTo('user'), bookController.myBooks);
router.route('/issue').post(protect, restrictTo('user'), bookController.issueBook);
router.route('/return').post(protect, restrictTo('user'), bookController.returnBook);
router.route('/payFine').post(protect, restrictTo('user'), bookController.payFine);
router.route('/transactions').get(protect, restrictTo('libraryIncharge', 'admin'), bookController.getAllTransactions);

export default router;

import express from 'express';
const router = express.Router();

import * as authorController from '../controllers/authorController.js';

router.route('/')
    .post(authorController.createAuthor)
    .get(authorController.getAllAuthors);
router.route('/:id').get(authorController.getAuthorById);

export default router;

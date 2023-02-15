import express from 'express';
const router = express.Router();

import * as authorController from '../controllers/authorController.js';

router.route('/').post(authorController.createAuthor);

export default router;

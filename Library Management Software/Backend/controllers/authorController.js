import asyncHandler from 'express-async-handler';
import Author from "../models/authorModel.js";
import createAuthorValidator from '../validators/createAuthorValidator.js';

// @desc    Create new author
// @route   POST /author
const createAuthor = asyncHandler(async (req, res) => {
    const { error } = createAuthorValidator(req.body);
    if (error) {
        throw new Error(error.details[0].message);
    }

    const { firstName, lastName } = req.body;
    const author = new Author({ firstName, lastName });

    res.status(201).json({ message: 'Author created', data: author });
});

export { createAuthor }
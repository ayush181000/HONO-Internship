import asyncHandler from 'express-async-handler';
import Author from "../models/authorModel.js";
import createAuthorValidator from '../validators/createAuthorValidator.js';

// @desc    Create new author
// @route   POST /author
const createAuthor = asyncHandler(async (req, res) => {
    const { error } = createAuthorValidator(req.body);
    if (error) throw new Error(error.details[0].message);

    const { firstName, lastName } = req.body;
    const author = await Author.create({ firstName, lastName });

    res.status(201).json({ message: 'Author created', data: author });
});

// @desc    Get all authors
// @route   GET /author
const getAllAuthors = asyncHandler(async (req, res) => {
    const authors = await Author.find({});

    res.status(200).json({ message: 'Fetched authors successfully', data: authors });
});

export { createAuthor, getAllAuthors }
import asyncHandler from 'express-async-handler';
import Author from "../models/authorModel.js";
import Book from "../models/bookModel.js";
import createAuthorValidator from '../validators/createAuthorValidator.js';

// @desc    Create new author
// @route   POST /author
const createAuthor = asyncHandler(async (req, res) => {
    const { error } = createAuthorValidator(req.body);
    if (error) throw new Error(error.details[0].message);

    const author = await Author.create(req.body);

    res.status(201).json({ message: 'Author created', data: author });
});

// @desc    Get all authors
// @route   GET /author
const getAllAuthors = asyncHandler(async (req, res) => {
    const authors = await Author.find({});

    res.status(200).json({ message: 'Fetched authors successfully', data: authors });
});

const getAuthorById = asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (!author) throw new Error('Author not found');

    const books = await Book.find({ author: req.params.id });

    res.status(200).json({ message: 'Fetched author successfully', data: { author, books } });
})

export { createAuthor, getAllAuthors, getAuthorById }
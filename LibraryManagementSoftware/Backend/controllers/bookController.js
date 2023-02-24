import asyncHandler from 'express-async-handler';
import Book from "../models/bookModel.js";
import createBookValidator from "../validators/createBookValidator.js";

// @desc    Create new book
// @route   POST /book
const createBook = asyncHandler(async (req, res) => {
    const { error } = createBookValidator(req.body);
    if (error) throw new Error(error.details[0].message);

    const { title, author, genre, pages } = req.body;

    const books = await Book.create({ title, author, genre, pages });

    res.status(200).json({ message: 'Created book successfully', data: books });
});


// @desc    Get all books
// @route   GET /book
const getAllBooks = asyncHandler(async (req, res) => {
    const book = await Book.find({}).populate({ path: 'author', model: 'Author', select: 'firstName lastName' });

    res.status(200).json({ message: 'Fetched books successfully', data: book });
});

export { createBook, getAllBooks };

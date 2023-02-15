import asyncHandler from 'express-async-handler';
import Book from "../models/bookModel.js";

// @desc    Create new book
// @route   POST /book
const createBook = asyncHandler(async (req, res) => {
    const { title, author, genre } = req.body;


});

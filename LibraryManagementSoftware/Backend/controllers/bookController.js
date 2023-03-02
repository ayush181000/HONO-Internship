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


// @desc    Get all books
// @route   GET /book
const searchBook = asyncHandler(async (req, res) => {
    const options = req.query.options || 'all';
    const searchText = req.query.search || '';
    console.log(options, searchText)
    let searchArray = [];

    if (options === 'all') {
        searchArray = [
            { title: { $regex: searchText, $options: 'i' } },
            { author: { $regex: searchText, $options: 'i' } },
            { genre: { $regex: searchText, $options: 'i' } }
        ]
    }

    if (options === 'genre') {
        searchArray = [
            { genre: { $regex: searchText, $options: 'i' } }
        ]
    }

    if (options === 'title') {
        searchArray = [
            { title: { $regex: searchText, $options: 'i' } }
        ]
    }

    if (options === 'author') {
        searchArray = [
            { "author.firstName": { $regex: searchText, $options: "i" } },
            { "author.lastName": { $regex: searchText, $options: "i" } }
        ]
    }

    const pipeline = [
        {
            '$lookup': {
                'from': 'authors',
                'localField': 'author',
                'foreignField': '_id',
                'as': 'author'
            }
        }, {
            '$unwind': {
                'path': '$author'
            }
        }, {
            '$project': {
                "author.image": 0,
                "author.createdAt": 0,
                "author.updatedAt": 0,
            }
        }, {
            '$match': {
                '$or': searchArray
            }
        }, {
            '$sort': {
                'quantity': -1
            }
        }

    ]

    const book = await Book.aggregate(pipeline);

    res.status(200).json({ message: 'Searched books successfully', data: book });

});


export { createBook, getAllBooks, searchBook };

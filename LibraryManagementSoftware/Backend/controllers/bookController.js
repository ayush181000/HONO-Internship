import asyncHandler from 'express-async-handler';
import moment from 'moment';
import Book from "../models/bookModel.js";
import Transaction from "../models/transactionModel.js";
import createBookValidator from "../validators/createBookValidator.js";
import finePaymentValidator from "../validators/finePaymentValidator.js";

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


// @desc    Issue a book
// @route   POST /book/issue
const issueBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.body.bookId);

    // check if book exists and available
    if (!book || book.quantity === 0) throw new Error('Not enough stock. Invalid request');

    // check if supposed return date is less than 4 weeks
    let numberOfWeeks = req.body.numberOfWeeks || 1;
    let { deliveryAddress } = req.body;

    if (numberOfWeeks > 4 || numberOfWeeks < 0) {
        res.status(400);
        throw new Error('Book can be issued for maximum 4 weeks');
    }

    if (!deliveryAddress) {
        res.status(400);
        throw new Error('Delivery address is required');
    }

    const existingTransaction = await Transaction.findOne({
        bookId: req.body.bookId,
        userId: req.user._id,
        status: 'issued',
    });

    if (existingTransaction) throw new Error('You have already issued this book');

    const transaction = await Transaction.create({
        bookId: req.body.bookId,
        userId: req.user._id,
        status: 'issued',
        supposedReturnDate: Date.now() + numberOfWeeks * 7 * 24 * 60 * 60 * 1000,
        deliveryAddress
    });

    book.quantity = book.quantity - 1;
    await book.save();

    res.status(200).json({
        message: 'Book issued successfully',
        transaction
    });
})


// @desc    Get my books
// @route   GET /book/myBooks
const myBooks = asyncHandler(async (req, res) => {

    const option = req.query.option || 'issued'; // issued or returned

    if (option !== 'issued' && option !== 'returned')
        throw new Error('Invalid option. Valid options are issued or returned');

    let transaction;

    const pipeline = [{
        '$match': {
            'userId': req.user._id,
            'status': option
        }
    },
    {
        '$lookup': {
            'from': 'books',
            'localField': 'bookId',
            'foreignField': '_id',
            'as': 'bookId'
        }
    }, {
        '$unwind': {
            'path': '$bookId'
        }
    }, {
        '$replaceRoot': {
            'newRoot': {
                '$mergeObjects': [
                    {
                        'issue': '$$ROOT'
                    }, '$bookId'
                ]
            }
        }
    }, {
        '$project': {
            'issue.bookId': 0
        }
    }, {
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
    }];

    transaction = await Transaction.aggregate(pipeline);

    res.status(200).json({
        message: 'Fetched my books successfully',
        myBooks: transaction
    });
})


// @desc    Return a book
// @route   POST /book/return
const returnBook = asyncHandler(async (req, res) => {
    const transaction = await Transaction.findOne({ userId: req.user._id, bookId: req.body.bookId, status: 'issued' });

    // console.log(transaction);
    if (!transaction) {
        res.status(400);
        throw new Error('No book issued by you with this id');
    }

    const endDate = moment(Date.now());
    const startDate = moment(transaction.supposedReturnDate);
    const diff = endDate.diff(startDate, 'days');
    const fine = diff > 0 ? diff * 5 : 0;

    if (fine && transaction.finePaid !== fine) {
        res.status(400);
        throw new Error(`Fine not paid. Fine paid : Rs.${transaction.finePaid} and fine due : Rs.${fine}`);
    }

    transaction.status = 'returned';
    transaction.returnDate = Date.now();
    await transaction.save();

    const book = await Book.findByIdAndUpdate(transaction.bookId, { $inc: { quantity: 1 } });

    res.status(200).json({
        message: 'Book returned successfully'
    })
})

const payFine = asyncHandler(async (req, res) => {
    const { error } = finePaymentValidator(req.body);

    if (error) {
        res.status(400);
        throw new Error(error.details[0].message);
    }

    const { transactionId, finePaid, fineTransactionId } = req.body;

    const updatedTransaction = await Transaction.findByIdAndUpdate(transactionId, { finePaid, fineTransactionId }, { new: true });

    res.status(200).json({
        message: 'Fine paid successfully',
        transaction: updatedTransaction
    });
})

export { createBook, getAllBooks, searchBook, issueBook, myBooks, returnBook, payFine };

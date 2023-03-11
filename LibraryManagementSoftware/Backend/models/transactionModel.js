import mongoose from 'mongoose';
import fs from 'fs';

const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));
const config = loadJSON('../config.json');

const transactionSchema = mongoose.Schema(
    {
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        status: {
            type: String,
            enum: ['issued', 'returned']
        },
        issueDate: {
            type: Date,
            default: Date.now()
        },
        supposedReturnDate: {
            type: Date,
            default: Date.now() + config.returnDays * 24 * 60 * 60 * 1000
        },
        returnDate: { type: Date },
        finePaid: { type: Number, default: 0 },
        fineTransactionId: { type: String },
    },
    { timestamps: true }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;

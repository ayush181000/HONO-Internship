import mongoose from 'mongoose';

const bookSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        pages: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true,
            enum: ['fiction', 'non-fiction', 'biography', 'poetry', 'drama', 'other']
        }
    },
    { timestamps: true }
);

const Book = mongoose.model('Book', bookSchema);

export default Book;

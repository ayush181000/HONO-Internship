import mongoose from 'mongoose';
import fs from 'fs';

const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));
const config = loadJSON('../config.json');

const bookSchema = mongoose.Schema(
    {
        cover: { type: String, required: true, default: 'https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg' },
        title: {
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
        genre: [
            {
                type: String,
                required: true,
                enum: config.genres
            }
        ],
        quantity: { type: Number, required: true, default: config.defaultQuantity },
    },
    { timestamps: true }
);

const Book = mongoose.model('Book', bookSchema);

export default Book;

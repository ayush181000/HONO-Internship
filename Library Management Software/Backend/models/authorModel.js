import mongoose from 'mongoose';

const authorSchema = mongoose.Schema(
    {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        }
    },
    { timestamps: true }
);

const Author = mongoose.model('Author', authorSchema);

export default Author;

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import morgan from "morgan";
import colors from 'colors';
import cors from 'cors';

import authorRoutes from './routes/authorRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import userRoutes from './routes/userRoutes.js';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();
dotenv.config();
connectDB();


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    return res.json('Started HONO Library Management server successfully')
})

// Routes
app.use('/author', authorRoutes);
app.use('/book', bookRoutes);
app.use('/auth', userRoutes);


// Middleware
app.use(notFound);
app.use(errorHandler);


// PORT
const PORT = process.env.PORT || 5000;
app.listen(
    PORT,
    console.log(
        `Server runnning in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
    )
);
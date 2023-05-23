import express from 'express';
import morgan from "morgan";
import colors from 'colors';
import cors from 'cors';
import path from 'path';
import multer from 'multer';
import ResumeParser from 'easy-resume-parser';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

const __dirname = path.resolve();
app.set("resumes", path.join(__dirname, "resumes"))

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'resumes/');
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

var upload = multer({ storage });

app.get('/', (req, res) => {
    return res.json('Started Resume Parser server successfully')
})

app.post('/resume',
    upload.single('resume'), async (req, res) => {
        console.log("1234 - ", __dirname + '/' + req.file.path);
        const resume = new ResumeParser(__dirname + '/' + req.file.path);
        const jsonData = await resume.parseToJSON();

        if (!jsonData)
            return res.status(400).json({ message: 'Error' });

        return res.json({
            message: 'Successfull',
            data: jsonData
        });
    },

)



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
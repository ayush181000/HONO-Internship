import asyncHandler from 'express-async-handler';
import User from "../models/userModel.js";

// @desc    Create new user / Sign up
// @route   POST /user
const signupUser = asyncHandler(async (req, res) => {
    const user = await User.create(req.body);

    res.status(201).json({ message: 'Signup user successfully', data: user });
});


// @desc    Create new user / Sign up
// @route   POST /user
const loginUser = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email, password: req.body.password }).select('-password');

    res.status(200).json({ message: 'Login user successfully', data: user });
});


// @desc    Get all users
// @route   GET /user
// const getAllUsers = asyncHandler(async (req, res) => {
//     const book = await Book.find({});
//     res.status(200).json({ message: 'Fetched books successfully', data: book });
// });

export { signupUser, loginUser };

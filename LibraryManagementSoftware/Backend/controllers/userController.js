import asyncHandler from 'express-async-handler';
import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';

import signupValidator from "../validators/signupValidator.js";

// @desc    Create new user / Sign up
// @route   POST /user
const signupUser = asyncHandler(async (req, res) => {
    const { error } = signupValidator(req.body);
    if (error) throw new Error(error.details[0].message);

    const user = await User.create(req.body);

    user.password = undefined;
    res.status(201).json({ message: 'Signup user successfully', data: user, token: signToken(user._id) });
});


// @desc    Create new user / Sign up
// @route   POST /user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // 1) check if email and password exists
    if (!email || !password) throw new Error('Please provide email and password');


    // 2) check if user exists and password is correct
    const user = await User.findOne({ email });

    if (!user || !(await user.correctPassword(password, user.password))) throw new Error('Incorrect email or password');



    user.password = undefined;
    res.status(200).json({ message: 'Login user successfully', data: user, token: signToken(user._id) });
});


const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

export { signupUser, loginUser };

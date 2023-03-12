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


// @desc    Update password
// @route   PATCH /user
const updateUser = asyncHandler(async (req, res, next) => {
    // 1) Get user from collection
    const user = await User.findById(req.user._id);

    // 2) check if POSTed current password is correctPassword
    if (req.body.currentPassword && req.body.newPassword) {
        if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
            throw new Error('Your current password is wrong');
        }

        if (req.body.newPassword) user.password = req.body.newPassword;
    }

    // 3) If so, update password
    if (req.body.firstName) user.firstName = req.body.firstName;
    if (req.body.lastName) user.lastName = req.body.lastName;
    if (req.body.image) user.image = req.body.image;

    await user.save();

    // $) Log in user, send JWT
    res.status(200).json({ message: 'Updated user successfully', data: user, token: signToken(user._id) });
});


const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

export { signupUser, loginUser, updateUser };

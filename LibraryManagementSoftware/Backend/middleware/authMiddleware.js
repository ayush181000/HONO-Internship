import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { promisify } from 'util';


const protect = asyncHandler(async (req, res, next) => {
  // 1) Getting token and check if it exists
  let token = '';
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) throw new Error('You are not logged in. Please login to get access')

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // console.log(decoded);

  // 3) Check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) throw new Error('The token belonging to this user no longer exists')

  // 4) Check if user changed password after token was issued
  if (await freshUser.changedPasswordAfter(decoded.iat)) throw new Error('User recently changed password! Please login again.')

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = freshUser;
  next();
});

const admin = (req, res, next) => {
  if (req.user && req.user.role == 'admin') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};


export { protect, admin };

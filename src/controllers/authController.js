const { promisify } = require('util'); //To make a function return a promisse
const jwt = require('jsonwebtoken');
const User = require('./../models/User');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);
  
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: false, //since heroku doesn't provide for mobi
      // secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    };
  
    // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true; //Makes that it only works ith HTTPS
  
    res.cookie('jwt', token, cookieOptions);
  
    // Remove password from Output
    user.password = undefined;
  
    res.status(statusCode).json({
      status: 'sucess',
      token, //Sending the token back to the client
      data: {
        user: user,
      },
    });
};

exports.login = catchAsync(async (req, res, next) => {
    const { student_id, password } = req.body;
  
    // 1) Check if e-mail and password was submited
    if (!student_id || !password) {
      return next(new AppError('Please provide student_id and password', 400));
    }
  
    // 2) Check if user eists && password is correct
    const user = await User.findOne({ student_id }).select('+password'); //+"name_of_field" to show passwords that we defined to not show up with "select: false" in the Schema

    if (!user || !(await user.validatePassword(password, user.password))) {
      return next(new AppError('Incorrect student_id or password', 401));
    }

    // 3) If everything ok, send token to client
    createSendToken(user, 200, req, res);
  });
  
// Signing out the user by overriding the existent cookie with toker for a new cookie without token.
exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });

    res.status(200).json({ status: 'sucess' });
};
const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');

//Create new user => api/register -----------------------------------------------------------------------------
exports.registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        // const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        //     folder: 'avatars',
        //     width: 150,
        //     crop: 'scale',
        // });

        const user = await User.create({
            name,
            email,
            password,
            // avatar: {
            //     public_id: result.public_id,
            //     url: result.secure_url,
            // },
        });

        sendToken(user, 201, res);
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
};

//login a user => api/login----------------------------------------------
exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email and password', 401));
    }
    try {
        const user = await User.findOne({ email }).select('+password');

        //user exists?
        if (!user) {
            return next(new ErrorHandler('Invalid Email or Password', 401));
        }

        //match the 2 hashed passwords
        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
            return next(new ErrorHandler('Invalid Email or Password', 401));
        }

        sendToken(user, 201, res);
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
};

//Get currently logged in user /api/me-------------------------------------------
exports.getLoggedUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        return next(new ErrorHandler(error, 500));
    }
};

//logout user => api/logout-------------------------------------------
exports.logOut = async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: 'Logged out',
    });
};

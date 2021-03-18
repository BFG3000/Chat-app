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
        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: 'scale',
        });

        const user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: result.public_id,
                url: result.secure_url,
            },
        });
       
        sendToken(user, 201, res);
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
};

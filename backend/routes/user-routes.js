const express = require('express');
const router = express.Router();
const { getChat } = require('../controllers/chatController');
const { registerUser, getLoggedUser, logOut, loginUser } = require('../controllers/userController');
const { isAuthenticatedUser } = require('../middlewares/auth');

//testing api
router.get('/', getChat);

//create new user
router.post('/register', registerUser);

//login user
router.post('/login', loginUser);

//get logged in user user details
router.get('/me', isAuthenticatedUser, getLoggedUser);

//logout user
router.get('/logout', logOut);

module.exports = router;

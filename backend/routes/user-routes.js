const express = require('express');
const router = express.Router();
const { getChat } = require('../controllers/chatController');
const { registerUser } = require('../controllers/userController');
const { isAuthenticatedUser,authorizeRoles } = require('../middlewares/auth');

//testing api
router.get('/', getChat);

//create new user
router.post('/register', registerUser)


module.exports = router;

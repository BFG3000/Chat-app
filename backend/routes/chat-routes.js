const express = require('express');
const router = express.Router();

const {
    getChat,
    newMessage,
    messageSync,
    newConversation,
    getUserConversations,
    getConversationMessages,
} = require('../controllers/chatController');
const { isAuthenticatedUser } = require('../middlewares/auth');

router.get('/', getChat);

// create new message
router.post('/messages', isAuthenticatedUser, newMessage);

//get all messages for a conversation
router.get('/messages/:id', isAuthenticatedUser, getConversationMessages);

//add new newConversation
router.post('/conversations', isAuthenticatedUser, newConversation);

//get all conversations related to the logged user
router.get('/conversations', isAuthenticatedUser, getUserConversations);

module.exports = router;

const express = require('express');
const router = express.Router();
const { getChat } = require('../controllers/chatController');

router.get('/', getChat);


module.exports = router;

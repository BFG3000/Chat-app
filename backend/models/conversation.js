const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
});

module.exports = mongoose.model('Conversation', messageSchema);

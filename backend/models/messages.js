const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
        maxlength: [1000, 'max length is 1000 characters'],
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },

    conversationId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Conversation',
    },

    timestamp: {
        type: Date,
        default:Date.now,
    },
    //TODO
    received: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Message', messageSchema);

const Message = require('../models/messages');
const Conversation = require('../models/conversation');
const ErrorHandler = require('../utils/errorHandler');

exports.getChat = async (req, res, next) => {
    res.status(200).json({
        success: true,
    });
};

exports.newMessage = async (req, res, next) => {
    const { message, conversationId } = req.body;
    try {
        if (!message || !conversationId) {
            return next(new ErrorHandler('Bad request', 400));
        }

        const result = await Message.create({
            message,
            author: req.user._id,
            conversationId,
        });

        //update the date of the conversation / it helps with sort /maybe i should make it a database trigger but i have no idea how it works in mongoose xD
        await Conversation.updateOne({ _id: conversationId }, { $set: { last_updated: Date.now() } });

        res.status(201).json({
            success: true,
            msg: 'new message created',
            result,
        });
    } catch (error) {
        return next(new ErrorHandler(error, 500));
    }
};

//so basiclly i want to get all conversations that the logged in user participate in
//1-get all conversions related to the author
//2-then get all users related to the logged user or had a conversation before
exports.getUserConversations = async (req, res, next) => {
    try {
        const userConversations = await Conversation.find({ $or: [{ creator: req.user._id }, { receiver: req.user._id }] }).populate(
            'creator receiver',
            'name avatar isOnline email'
        );

        //filter yourself
        const result = [];
        for (let i = 0; i < userConversations.length; i++) {
            query =
                userConversations[i].creator._id.toString() === req.user._id.toString()
                    ? userConversations[i].receiver
                    : userConversations[i].creator;
            //also include to conversation id
            result.push({ ...query._doc, conversationId: userConversations[i]._id.toString() });
        }
        // i feel like this is a dumb way to implement this thing but i suck at databases so its ok
        res.status(201).json({
            success: true,
            result,
        });
    } catch (error) {
        return next(new ErrorHandler(error, 500));
    }
};

// get all messages for a certain conversation
exports.getConversationMessages = async (req, res, next) => {
    try {
        //get all messages related to this conversation
        const messages = await Message.find({
            conversationId: req.params.id,
        });

        res.status(200).json({
            success: true,
            messages,
        });
    } catch (error) {
        return next(new ErrorHandler(error, 500));
    }
};

//add new conversation
exports.newConversation = async (req, res, next) => {
    try {
        //TODO add exception if conversation already exist
        await Conversation.create({
            creator: req.user._id,
            receiver: req.body.receiver,
        });

        res.status(201).json({
            success: true,
            message: 'new Conversation created',
        });
    } catch (error) {
        return next(new ErrorHandler(error, 500));
    }
};

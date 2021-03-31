import React, { useState, createRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '../Avatar/Avatar';
import './chatContent.css';
import ChatItem from './ChatItem';
import { clearErrors, sendMessage } from '../../actions/chatActions';
import { toastError } from '../../util/Notification/toast';

const ChatContent = ({ socket }) => {
    const dispatch = useDispatch();

    //move it redux later
    const contact = localStorage.getItem('contactInfo') ? JSON.parse(localStorage.getItem('contactInfo')) : {};

    const { chatContent, loading = true, error } = useSelector((state) => state.chatContent);

    const { user } = useSelector((state) => state.auth);

    const messagesEndRef = createRef(null);

    const [chats, setChat] = useState([]);

    const [message, setMessage] = useState('');

    useEffect(() => {
        const scrollToBottom = () => {
            message && messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        };
        scrollToBottom();
    }, [message, messagesEndRef]);

    useEffect(() => {
        if (error) {
            toastError(error);
            dispatch(clearErrors());
        }

        chatContent && setChat(chatContent);
        console.log('render');
        return () => {
            console.log('Cleaning...');
            //socket.off('new-message');
        };
    }, [chatContent, dispatch, error, socket]);

    socket.on('new-message', (chat) => {
        if (chat.conversationId !== contact.conversationId) return;

        // const chatsToDelete = [...chats, chat];
        // const chatLimit = chatsToDelete.splice(-limit);
        console.log("new-message: ", chat);
        const newMsg = [...chats, chat];
        updateChats(newMsg);
    });

    const pushMessage = (e) => {
        e.preventDefault();

        if (message.trim() === '') return;

        dispatch(sendMessage(message, contact.conversationId));

        socket.emit('broadcast-message', message);

        // console.log("submtMessage: ", chatMsg);
        updateChats([...chats,message])
        setMessage('');
    };
    //newChats=>[...chat,newMsg]
    function updateChats(newChats) {
        if (socket.connected) setChat(newChats);
    }

    return (
        <>
            {loading ? (
                <div className="chatcontent text-center mx-2 my-4">Please Select or Add new Conversation</div>
            ) : (
                <div className="chatcontent">
                    <div className="content_header">
                        <div className="blocks">
                            <div className="current-chatting-user">
                                <Avatar isOnline="active" image={contact.image} />
                                <p>{contact.name}</p>
                            </div>
                        </div>
                        <div className="blocks">
                            <div className="settings">
                                <button className="btn-nobg">
                                    <i className="fa fa-cog"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="content_body">
                        <div className="chat__items">
                            {chatContent &&
                                chats.map((item, index) => (
                                    <ChatItem
                                        animationDelay={index + 2}
                                        key={item._id}
                                        user={item.author.toString() === user._id.toString() ? 'me' : 'other'}
                                        message={item.message}
                                        image={item.author.toString() === user._id.toString() ? user.avatar.url : contact.image}
                                    />
                                ))}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                    <form onSubmit={pushMessage}>
                        <div className="content_footer">
                            <div className="sendNewMessage">
                                <button className="addFiles">
                                    <i className="fa fa-plus"></i>
                                </button>
                                <input
                                    type="text"
                                    placeholder="Type a message here"
                                    onChange={(e) => setMessage(e.target.value)}
                                    value={message}
                                />
                                <button className="btnSendMsg" id="sendMsgBtn">
                                    <i className="fa fa-paper-plane"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default ChatContent;

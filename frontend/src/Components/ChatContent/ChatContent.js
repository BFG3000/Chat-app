import React, { useState, createRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '../Avatar/Avatar';
import './chatContent.css';
import ChatItem from './ChatItem';
import { clearErrors } from '../../actions/chatActions';
import { toastError } from '../../util/Notification/toast';

const chatItms = [
    {
        key: 1,
        image: 'https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg',
        type: '',
        msg: 'Hi Tim, How are you?',
    },
    {
        key: 2,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU',
        type: 'other',
        msg: 'I am fine.',
    },
    {
        key: 3,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU',
        type: 'other',
        msg: 'What about you?',
    },
    {
        key: 4,
        image: 'https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg',
        type: '',
        msg: 'Awesome these days.',
    },
    {
        key: 5,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU',
        type: 'other',
        msg: "Finally. What's the plan?",
    },
    {
        key: 6,
        image: 'https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg',
        type: '',
        msg: 'what plan mate?',
    },
    {
        key: 7,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU',
        type: 'other',
        msg: "I'm taliking about the tutorial",
    },
];

const ChatContent = () => {
    const dispatch = useDispatch();

    const contact =localStorage.getItem('contactInfo') ? JSON.parse(localStorage.getItem('contactInfo')):{};

    const { chatContent, loading, error } = useSelector((state) => state.chatContent);
    const { user } = useSelector((state) => state.auth);
    
    const messagesEndRef = createRef(null);

    const [chat, setChat] = useState(chatItms);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (error) {
            toastError(error);
            dispatch(clearErrors());
        }
        const scrollToBottom = () => {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        };
        scrollToBottom();
    }, [dispatch, error, message, messagesEndRef]);

    return (
        <div className="chatcontent">
            <div className="content_header">
                <div className="blocks">
                    <div className="current-chatting-user">
                        <Avatar
                            isOnline="active"
                            image={contact.image}
                        />
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
                        chatContent.map((item, index) => (
                            <ChatItem
                                animationDelay={index + 2}
                                key={item.key}
                                user={item.author.toString() === user._id.toString() ? 'me' : 'other'}
                                message={item.message}
                                // image={}
                            />
                        ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <div className="content_footer">
                <div className="sendNewMessage">
                    <button className="addFiles">
                        <i className="fa fa-plus"></i>
                    </button>
                    <input type="text" placeholder="Type a message here" onChange={(e) => setMessage(e.target.value)} value={message} />
                    <button className="btnSendMsg" id="sendMsgBtn">
                        <i className="fa fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatContent;

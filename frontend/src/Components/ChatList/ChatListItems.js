import React, { useState } from 'react';

import Avatar from '../Avatar/Avatar';
import { useDispatch } from 'react-redux';
import { loadChat } from '../../actions/chatActions';
import './chatList.css';

const ChatListItems = ({ animationDelay, image, isOnline, name, conversationId }) => {
    const [active, setActive] = useState(false);
    const dispatch = useDispatch();

    const selectChat = (e) => {
        dispatch(loadChat(conversationId));

        localStorage.setItem('contactInfo', JSON.stringify({ name, image, conversationId }));

        setActive(true);
    };
    return (
        <div style={{ animationDelay: `0.${animationDelay}s` }} onClick={selectChat} className={`chatlist_item ${active ? active : ''}`}>
            <Avatar image={image} isOnline={isOnline}></Avatar>
            <div className="userMeta">
                <p>{name}</p>
                <span className="activeItem">32 min ago</span>
            </div>
        </div>
    );
};

export default ChatListItems;

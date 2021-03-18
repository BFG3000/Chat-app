import React from 'react';
import Avatar from '../Avatar/Avatar';
import './chatList.css';

const ChatListItems = ({ animationDelay, active, image, isOnline, name }) => {
    const selectChat = (e) => {};

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

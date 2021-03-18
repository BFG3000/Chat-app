import React from 'react';
import Avatar from '../Avatar/Avatar';
import './chatContent.css';
const ChatItem = ({ user, message, image }) => {
    return (
        <div style={{ animationDelay: `0.8s` }} className={`chat_item ${user ? user : ''}`}>
            <div className="chat_item_content">
                <div className="chat_msg">{message}</div>
                <div className="chat_meta">
                    <span>16 min ago</span>
                    <span>Seen 1:03PM</span>
                </div>
            </div>
            <Avatar isOnline="active" image={image} />
        </div>
    );
};

export default ChatItem;

import React from 'react';
import './chat.css';
import ChatList from '../../Components/ChatList/ChatList';
import ChatContent from '../../Components/ChatContent/ChatContent';
import UserProfile from '../../Components/UserProfile/UserProfile';

const Chat = () => {
    return (
        <div className="chat_body">
            
            <ChatList />
            <ChatContent />
            <UserProfile />
        </div>
    );
};

export default Chat;

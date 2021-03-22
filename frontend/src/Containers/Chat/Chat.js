import React, { useEffect } from 'react';
import './chat.css';
import ChatList from '../../Components/ChatList/ChatList';
import ChatContent from '../../Components/ChatContent/ChatContent';
import UserProfile from '../../Components/UserProfile/UserProfile';
import Pusher from 'pusher-js'

const Chat = () => {
    useEffect(() => {
        const pusher = new Pusher('33d15c538d49e0e8359a', {
            cluster: 'eu',
        });

        const channel = pusher.subscribe('messages');
        channel.bind('inserted', function (data) {
            alert(JSON.stringify(data));
        });
    }, []);

    return (
        <div className="chat_body">
            <ChatList />
            <ChatContent />
            <UserProfile />
        </div>
    );
};

export default Chat;

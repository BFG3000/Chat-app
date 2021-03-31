import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './chat.css';
import ChatList from '../../Components/ChatList/ChatList';
import ChatContent from '../../Components/ChatContent/ChatContent';
import UserProfile from '../../Components/UserProfile/UserProfile';
import openSocket from 'socket.io-client';
//import Pusher from 'pusher-js'
//import socket from '../../socket';
const socket = openSocket(process.env.REACT_APP_SOCKET_ENDPOINT || 'http://localhost:3000');

const Chat = () => {
    console.log(process.env.REACT_APP_SOCKET_ENDPOINT);
    const { user } = useSelector((state) => state.auth);
    useEffect(() => {
        socket.connect();
        socket.emit("new-user", user);
        //TODO is online should be implemented here
        // const pusher = new Pusher('33d15c538d49e0e8359a', {
        //     cluster: 'eu',
        // });
        // socket.auth = { user:user._id };
        // console.log(user._id);
        // socket.connect();
        // const channel = pusher.subscribe('messages');
        // channel.bind('inserted', function (data) {
        //     alert(JSON.stringify(data));
        // });
        return () => {
            socket.disconnect();
        };
    }, [user]);

    return (
        <div className="chat_body">
            <ChatList />
            <ChatContent socket={socket}/>
            <UserProfile />
        </div>
    );
};

export default Chat;

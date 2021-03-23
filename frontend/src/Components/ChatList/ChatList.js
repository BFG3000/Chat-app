import React, { useEffect } from 'react';
import './chatList.css';
import ChatListItems from './ChatListItems';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserConversations, clearErrors, loadChat } from '../../actions/chatActions';
import { toastError } from '../../util/Notification/toast';
import Loader from '../Loader';

const ChatList = () => {
    const dispatch = useDispatch();

    const { chatList, loading, error } = useSelector((state) => state.chatList);

    useEffect(() => {
        dispatch(getAllUserConversations());

        if (error) {
            toastError(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error]);
    
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="chatList">
                    <button className="btn">
                        <i className="fa fa-plus"></i>
                        <span>New conversation</span>
                    </button>
                    <div className="chatList_heading">
                        <h2>Chats</h2>
                        <button className="btn_nobg">
                            <i className="fa fa-ellipsis-h"></i>
                        </button>
                    </div>
                    <div className="chatList_search">
                        <div className="search_wrap">
                            <input type="text" placeholder="Search Here" required />
                            <button className="search_btn">
                                <i className="fa fa-search"></i>
                            </button>
                        </div>
                    </div>
                    <div className="chatlist_items">
                        {chatList &&
                            chatList.map((item, index) => (
                                <ChatListItems
                                    key={index}
                                    id={item.id}
                                    name={item.name}
                                    animationDelay={index + 1}
                                    active={item.active ? 'active' : ''}
                                    isOnline={item.isOnline ? 'active' : ''}
                                    image={item.avatar.url}
                                    conversationId={item.conversationId}
                                />
                            ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatList;

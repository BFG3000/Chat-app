import axios from 'axios';

import {
    GET_CHAT_REQUEST,
    GET_CHAT_SUCCESS,
    GET_CHAT_FAIL,
    GET_CONVERSATIONS_REQUEST,
    GET_CONVERSATIONS_SUCCESS,
    GET_CONVERSATIONS_FAIL,
    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAIL,
    CLEAR_ERRORS,
} from '../constants/chatConstants';

export const loadChat = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_CHAT_REQUEST });

        const { data } = await axios.get(`/api/messages/${id}`);

        dispatch({
            type: GET_CHAT_SUCCESS,
            payload: data.messages,
        });
    } catch (error) {
        dispatch({
            type: GET_CHAT_FAIL,
            payload: error.response.data.message,
        });
    }
};

//get all users related to current logged user
export const getAllUserConversations = () => async (dispatch) => {
    try {
        dispatch({ type: GET_CONVERSATIONS_REQUEST });

        const { data } = await axios.get('/api/conversations');
        dispatch({
            type: GET_CONVERSATIONS_SUCCESS,
            payload: data.result,
        });
    } catch (error) {
        dispatch({
            type: GET_CONVERSATIONS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const sendMessage = (message, conversationId) => async (dispatch) => {
    try {
        dispatch({ type: SEND_MESSAGE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post('/api/messages', { message, conversationId }, config);

        dispatch({
            type: SEND_MESSAGE_SUCCESS,
            payload: data.messages,
        });
    } catch (error) {
        dispatch({
            type: SEND_MESSAGE_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};

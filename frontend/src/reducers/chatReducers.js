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

export const chatListReducer = (state = { chatList: [] }, action) => {
    switch (action.type) {
        case GET_CONVERSATIONS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case GET_CONVERSATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                chatList: action.payload,
            };

        case GET_CONVERSATIONS_FAIL:
            return {
                ...state,
                loading: false,
                chatList: null,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

export const chatContentReducer = (state = { chatContent: [] }, action) => {
    switch (action.type) {
        case GET_CHAT_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case GET_CHAT_SUCCESS:
            return {
                ...state,
                loading: false,
                chatContent: action.payload,
            };

        case GET_CHAT_FAIL:
            return {
                ...state,
                loading: false,
                chatContent: null,
            };

        case SEND_MESSAGE_REQUEST:
            return {
                ...state,
                pending: true,
            };

        case SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                pending: false,
            };

        case SEND_MESSAGE_FAIL:
            return {
                ...state,
                pending: false,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

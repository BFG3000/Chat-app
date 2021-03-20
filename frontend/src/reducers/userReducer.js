import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    // //update profile
    // UPDATE_PROFILE_REQUEST,
    // UPDATE_PROFILE_SUCCESS,
    // UPDATE_PROFILE_FAIL,
    // //update password
    // UPDATE_PASSWORD_REQUEST,
    // UPDATE_PASSWORD_SUCCESS,
    // UPDATE_PASSWORD_FAIL,
    CLEAR_ERRORS,
    // //forgot password
    // FORGOT_PASSWORD_REQUEST,
    // FORGOT_PASSWORD_SUCCESS,
    // FORGOT_PASSWORD_FAIL,
    // //setNewPassword
    // NEW_PASSWORD_REQUEST,
    // NEW_PASSWORD_SUCCESS,
    // NEW_PASSWORD_FAIL,
    // ALL_USERS_REQUEST,
    // ALL_USERS_SUCCESS,
    // ALL_USERS_FAIL,
    // UPDATE_USER_REQUEST,
    // UPDATE_USER_SUCCESS,
    // UPDATE_USER_FAIL,
    // USER_DETAILS_REQUEST,
    // USER_DETAILS_SUCCESS,
    // USER_DETAILS_FAIL,
    // DELETE_USER_REQUEST,
    // DELETE_USER_SUCCESS,
    // DELETE_USER_FAIL,
} from '../constants/userConstants';

export const authReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        //Register------
        case REGISTER_USER_REQUEST:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
            };

        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };

        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                lrError: action.payload,
            };

        //LOGIN------
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false,
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };

        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                lrError: action.payload,
            };

        //Load a logged in user------
        case LOAD_USER_REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false,
            };

        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };

        case LOAD_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };

        //Logout user------
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
            };

        case LOGOUT_FAIL:
            return {
                ...state,
                error: action.payload,
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

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer } from '../reducers/userReducer';
import { chatListReducer, chatContentReducer } from '../reducers/chatReducers';
const reducer = combineReducers({
    auth: authReducer,
    chatList: chatListReducer,
    chatContent: chatContentReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;

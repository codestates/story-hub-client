import { combineReducers } from 'redux';
import userReducer from './userReducer';
import pageReducer from './pageReducer';
import textReducer from './textReducer';
import messageReducer from './messageReducer';

const rootReducer = combineReducers({
    userReducer,
    pageReducer,
    textReducer,
    messageReducer
});
export default rootReducer;

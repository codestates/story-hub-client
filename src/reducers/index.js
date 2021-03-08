import { combineReducers } from 'redux';
import userReducer from './userReducer';
import pageReducer from './pageReducer';
import messageReducer from './messageReducer';

const rootReducer = combineReducers({
    userReducer,
    pageReducer,
    messageReducer
});
export default rootReducer;
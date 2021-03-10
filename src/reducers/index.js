import { combineReducers } from 'redux';
import userReducer from './userReducer';
import pageReducer from './pageReducer';
import textReducer from './textReducer';
import messageReducer from './messageReducer';
import infoReducer from './infoReducer'

const rootReducer = combineReducers({
    userReducer,
    pageReducer,
    textReducer,
    messageReducer,
    infoReducer,
});
export default rootReducer;

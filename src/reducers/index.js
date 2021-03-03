import { combineReducers } from 'redux';
import userReducer from './userReducer';
import buttonReducer from './buttonReducer';
import pageReducer from './pageReducer';

const rootReducer = combineReducers({
    userReducer,
    buttonReducer,
    pageReducer,
});
export default rootReducer;
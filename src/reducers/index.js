import { combineReducers } from 'redux';
import userReducer from './userReducer';
import pageReducer from './pageReducer';

const rootReducer = combineReducers({
    userReducer,
    pageReducer,
});
export default rootReducer;
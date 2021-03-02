import { combineReducers } from 'redux';

import userReducer from './userReducer';
import buttonReducer from './buttonReducer';

const rootReducer = combineReducers({
    userReducer,
    buttonReducer
});

export default rootReducer;
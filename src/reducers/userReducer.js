import {
    USER_LOGIN,
    USER_LOGOUT,
    USER_SIGNUP,
    USER_UPDATE,
} from '../actions';
import { userState } from './initialState';

const userReducer = (state = userState, action) => {
    switch (action.type) {
    case USER_LOGIN:
        return {
        ...state,
        users: [action.payload],
        isLogin: true,
        };
    case USER_LOGOUT:
        return {
        ...state,
        users: [],
        isLogin: false,
        };
    case USER_UPDATE: {
        return {
        ...state,
        users: [
            {
            nickname: action.payload,
            },
        ],
        };
    }
    case USER_SIGNUP:
        return {
        ...state,
        users: [action.payload],
        isLogin: true,
        };
    default:
        return state;
    }
};
export default userReducer;

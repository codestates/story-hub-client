import {
    LOGO_CLICKED,
    CREATE_CLICKED,
    DETAIL_CLICKED,
    BUTTON_CLICKED,
} from '../actions';
import { buttonState } from './initialState';
const buttonReducer = (state = buttonState, action) => {
    switch (action.type) {
    case LOGO_CLICKED:
        return {
        ...state,
        isLogo: action.payload,
        };
    case CREATE_CLICKED:
        return {
        isCreate: action.payload,
        };
    case DETAIL_CLICKED: {
        return {
        ...state,
        users: [
            {
            nickname: action.payload,
            },
        ],
        };
    }
    case BUTTON_CLICKED:
        return {
        ...state,
        users: [action.payload],
        isLogin: true,
        };
    default:
        return state;
    }
};
export default buttonReducer;
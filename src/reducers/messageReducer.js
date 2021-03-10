import {
    MESSAGE_OPEN,
    MESSAGE_CLOSE
} from '../actions';
import { messageState } from './initialState';
const messageReducer = (state = messageState, action) => {
    switch (action.type) {
    case MESSAGE_OPEN:
        return {
        ...state,
        isOpen: true,
        message: action.payload,
        };
    case MESSAGE_CLOSE:
        return {
        ...state,
        isOpen: false,
        message: "",
        }
    default: return state
    }
};
export default messageReducer;

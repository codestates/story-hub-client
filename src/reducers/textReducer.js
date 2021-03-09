import {
    CONTENT_SAVED,
    COMMIT_SAVED,
} from '../actions';
import { textState } from './initialState';
const textReducer = (state = textState, action) => {
    switch (action.type) {
    case CONTENT_SAVED:
        return {
        ...state,
        content: action.payload,        
        };
    case COMMIT_SAVED:
        return {
        ...state,
        commit: action.payload,
        };
    default: return state
    }
};
export default textReducer;

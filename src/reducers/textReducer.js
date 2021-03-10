import { 
    CONTENT_SAVED, 
    COMMIT_SAVED, 
    CONTENT_TITLE,
    COMMIT_TITLE,
    SEARCH_TITLE, 
    SEARCH_LIST,
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
        case CONTENT_TITLE:
        return {
            ...state,
            contentTitle: action.payload,        
        };
        case COMMIT_TITLE:
        return {
            ...state,
            commitTitle: action.payload,
        };
        case SEARCH_TITLE:
        return {
            ...state,
            title: action.payload,
        };
        case SEARCH_LIST:
        return {
            ...state,
            searchList: action.payload,
        };
        default: return state
    }
};
export default textReducer;

import { 
    CATEGORY_SAVED, 
    COMMENT_SAVED, 
    COMMITBY_SAVED,
    MAX_SAVED,
    MIN_SAVED, 
    ETC_SAVED,
} from '../actions';
import { infoState } from './initialState';

const infoReducer = (state = infoState, action) => {
    switch (action.type) {
        case CATEGORY_SAVED:
        return {
            ...state,
            category: action.payload,        
        };
        case COMMENT_SAVED:
        return {
            ...state,
            comment: action.payload,
        };
        case COMMITBY_SAVED:
        return {
            ...state,
            commitBy: action.payload,        
        };
        case MAX_SAVED:
        return {
            ...state,
            max: action.payload,
        };
        case MIN_SAVED:
        return {
            ...state,
            min: action.payload,
        };
        case ETC_SAVED:
        return {
            ...state,
            etc: action.payload,
        };
        default: return state
    }
};
export default infoReducer;
import {
    PAGE_MOVED,
    MODAL_MOVED
} from '../actions';
import { pageState } from './initialState';
const pageReducer = (state = pageState, action) => {
    switch (action.type) {
    case PAGE_MOVED:
        return {
        ...state,
        page: action.payload,
        
        };
    case MODAL_MOVED:
        return {
        ...state,
        modalPage: action.payload,
        }
    default: return state
    }
};
export default pageReducer;

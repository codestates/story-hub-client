import {
    PAGE_MOVED
} from '../actions';
import { pageState } from './initialState';
const pageReducer = (state = pageState, action) => {
    switch (action.type) {
    case PAGE_MOVED:
        return {
        ...state,
        page: action.payload,
        
        };
    default: return state
    }
};
export default pageReducer;

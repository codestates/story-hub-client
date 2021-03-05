import {
    PAGE_MOVED
} from '../actions';
import { modalState } from './initialState';
const modalReducer = (state = modalState, action) => {
    switch (action.type) {
    case PAGE_MOVED:
        return {
        ...state,
        page: action.payload,
        
        };
    default: return state
    }
};
// export default modalReducer;

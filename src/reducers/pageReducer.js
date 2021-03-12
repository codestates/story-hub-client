import {
    PAGE_MOVED,
    MODAL_MOVED,
    BOARD_INDEX_SAVED,
    STORY_DETAIL_SAVED
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
    case BOARD_INDEX_SAVED:
        return {
        ...state,
        boardIndex: action.payload,
        }
    case STORY_DETAIL_SAVED:
        return {
        ...state,
        storyDetail: action.payload,
        }
    default: return state
    }
};
export default pageReducer;

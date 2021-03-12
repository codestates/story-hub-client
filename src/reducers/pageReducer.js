import {
    PAGE_MOVED,
    MODAL_MOVED,
    BOARD_INDEX_SAVED,
    STORY_DETAIL_SAVED,
    SET_MY_PAGE_PROPS,
    COMMIT_DETAIL_SAVED,
    COMMIT_DETAIL_INDEX_SAVED,
    COMMIT_DETAIL_TITLE_SAVED,
    COMMIT_DETAIL_NICKNAME_SAVED,
    COMMIT_DETAIL_CREATED_SAVED,
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
        case SET_MY_PAGE_PROPS:
        return {
            ...state,
            myPageProps: action.payload,
        }
        case COMMIT_DETAIL_SAVED:
        return {
            ...state,
            commitDetail: action.payload,
        }
        case COMMIT_DETAIL_INDEX_SAVED:
        return {
            ...state,
            commitDetailIndex: action.payload,
        }
        case COMMIT_DETAIL_TITLE_SAVED:
        return {
            ...state,
            commitDetailTitle: action.payload,
        }
        case COMMIT_DETAIL_NICKNAME_SAVED:
        return {
            ...state,
            commitDetailNickname: action.payload,
        }
        case COMMIT_DETAIL_CREATED_SAVED:
        return {
            ...state,
            commitDetailCreated: action.payload,
        }
        default: return state
    }
};
export default pageReducer;

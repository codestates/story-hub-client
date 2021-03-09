import { CONTENT_SAVED, COMMIT_SAVED, SEARCH_TITLE, SEARCH_LIST } from '../actions';
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
    case SEARCH_TITLE:
      console.log(action.payload);
      return {
        ...state,
        title: action.payload,
      };
    case SEARCH_LIST:
      console.log(action.payload);
      return {
        ...state,
        searchList: action.payload,
      };
    default:
      return state;
  }
};
export default textReducer;

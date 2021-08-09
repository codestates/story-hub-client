import { BOARD_ALERT_LIST, BOARD_LIST } from '../actions';

const { boardState } = require('./initialState');

const boardReducer = (state = boardState, action) => {
  switch (action.type) {
    case BOARD_LIST:
      return {
        ...state,
        list: action.payload,
      };
    case BOARD_ALERT_LIST:
      return {
        ...state,
        alertList: action.payload,
      };
    default:
      return state;
  }
};

export default boardReducer;

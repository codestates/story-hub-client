import { USER_LOGIN, USER_LOGOUT, USER_SIGNUP, USER_UPDATE, USER_INFO } from '../actions';
import { userState } from './initialState';
const userReducer = (state = userState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        isLogin: true,
        loginType: action.payload.loginType,
        accessToken: action.payload.accessToken,
      };
    case USER_LOGOUT:
      return {
        ...state,
        isLogin: false,
        loginType: null,
        accessToken: '',
      };
    case USER_UPDATE: {
      console.log(action.payload);
      return {
        ...state,
        accessToken: action.payload,
      };
    }
    case USER_SIGNUP:
      return {
        ...state,
        isLogin: true,
        accessToken: action.payload,
      };
    default:
      return state;
  }
};
export default userReducer;

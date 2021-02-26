import { compose, createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;
// 개발자 도구와 미들웨어를 사용하기 위해서 __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 사용
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;

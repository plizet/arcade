import { applyMiddleware, combineReducers, createStore, compose } from 'redux';

import appReducer from './app/reducers/index';
import pacmanReducer from './pacman/reducers/index';

const initialState = {
  ...appReducer,
  ...pacmanReducer,
};

const reducer = combineReducers({
  appReducer,
  pacmanReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, {...initialState}, composeEnhancers(applyMiddleware()));
window.store = store;

export default store;

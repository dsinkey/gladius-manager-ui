import { routerMiddleware } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers';
import * as ls from '../util/localStorage';

const stateKey = 'state-1';
function loadState() {
  return ls.getOrDefault(stateKey);
}

export function saveState(state) {
  ls.putJSON(stateKey, state);
}

// eslint-disable-next-line no-underscore-dangle
const devtoolsInstalled = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = process.env.NODE_ENV !== 'production' && devtoolsInstalled
  // eslint-disable-next-line no-underscore-dangle
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;
export const storeFactory = (state = loadState(), history) => createStore(
  combineReducers(reducers),
  state,
  composeEnhancers(applyMiddleware(thunk, routerMiddleware(history))),
);

export default storeFactory();

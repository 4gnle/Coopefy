import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import authToken from '../utilities/authToken'

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

let currentState = store.getState();

store.subscribe(() => {
  // keep track of the previous and current state
  // so you can compare changes
  const previousState = currentState;
  currentState = store.getState();

  // if the token changes
  // set the value in localStorage and axios headers
  // (with authToken)

  if (previousState.authenticate.token !== currentState.authenticate.token) {
    const token = currentState.authenticate.token;
    authToken(token);
  }
  });

export default store;

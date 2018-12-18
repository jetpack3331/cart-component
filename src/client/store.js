import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
  const storeArgs = [
    rootReducer,
    initialState
  ];

  if (process.env.NODE_ENV === 'development') {
    storeArgs.push(composeEnhancers(applyMiddleware(thunk)));
  } else {
    storeArgs.push(applyMiddleware(thunk));
  }
  return createStore(...storeArgs);
}
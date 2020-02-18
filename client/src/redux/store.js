import { createStore, applyMiddleware } from 'redux';

// allow browser to cache our store
import { persistStore } from 'redux-persist';

// console log changes in state
import logger from 'redux-logger';

// get the reducer that combined all other reducers
import rootReducer from './root.reducer';

// // implementing redux-thunk
// import thunk from 'redux-thunk';

// use redux-saga
import createSagaMiddleware from 'redux-saga';
// import { fetchCollectionsStart } from './shop/shop.sagas';
import rootSaga from './root-saga';
const sagaMiddleware = createSagaMiddleware();

// array of middleware
// const middlewares = [thunk];
const middlewares = [sagaMiddleware];

// only allow on development
// react will create a new NODE_ENV variable with
// a 'production' value
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

// create store using the rootReducer and return value of applyMiddleware()
const store = createStore(rootReducer, applyMiddleware(...middlewares));

// run saga middleware, need to be after applyMiddleware()
// sagaMiddleware.run(fetchCollectionsStart);  // run saga
sagaMiddleware.run(rootSaga);

// create a new object that will persist the store
const persistor = persistStore(store);

export default { store, persistor };
// --- hold all redux-saga code ---

import { takeLatest, call, put, all } from 'redux-saga/effects';
import ShopActionTypes from './shop.types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure
} from './shop.actions';

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection('collections');

    // .get() returns a promise, instead of .then(), but when using 'yield' we
    // set the returned promise to the variable on the left hand side
    const snapshot = yield collectionRef.get();

    // call() effect that invokes the method convertCollectionsSnapshotToMap
    // pass function as reference, then argument are the parameters passed on that function
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);

    // put() is like dispatch()
    // it's a like a return statement which executes
    // a new action
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error));
  }
}

// listen to ShopActionTypes.FETCH_COLLECTIONS_START
// pass action and another generator function
// run all events asynchronously without blocking by using 'takeEvery()'
export function* fetchCollectionsStart() {
  yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}

export function* shopSagas() {
  yield all([
    call(fetchCollectionsStart)
  ])
}
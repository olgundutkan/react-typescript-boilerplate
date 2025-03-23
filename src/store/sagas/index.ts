import { all, fork } from 'redux-saga/effects';
import itemSaga from './item';

/**
 * Root saga that forks all other sagas in the application.
 * This is the entry point for Redux-Saga middleware.
 */
export default function* rootSaga() {
  yield all([
    fork(itemSaga),
  ]);
}

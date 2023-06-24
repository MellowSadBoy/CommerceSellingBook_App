import {all} from 'redux-saga/effects';

import authSaga from './redux/auth/saga';
import orderSaga from './redux/order/saga';




/**
 * Root saga
 * @returns {IterableIterator<AllEffect | GenericAllEffect<any> | *>}
 */
export default function* rootSagas() {
  yield all([
    authSaga(),
    orderSaga(),
  ]);
}

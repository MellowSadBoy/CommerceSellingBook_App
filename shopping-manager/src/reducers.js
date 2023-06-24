import { combineReducers } from 'redux';

import commonReducer from './redux/common/reducer';
import authReducer from './redux/auth/reducer';
import orderReducer from './redux/order/reducer';




/**
 * Root reducer
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
const rootReducers = combineReducers({
  auth: authReducer,
  common: commonReducer,
  order: orderReducer,
});

export default rootReducers;

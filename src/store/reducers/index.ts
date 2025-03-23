import { combineReducers } from '@reduxjs/toolkit';
import itemReducer from './item';

/**
 * Combines all reducers into a single root reducer.
 */
const rootReducer = combineReducers({
  item: itemReducer,
});

/**
 * Represents the overall state structure of the Redux store.
 */
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

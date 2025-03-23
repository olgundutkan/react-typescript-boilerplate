import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

/**
 * Configure the Redux store with reducers and middleware.
 */
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

/**
 * Run the root saga.
 */
sagaMiddleware.run(rootSaga);

/**
 * Represents the overall state structure of the application.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Represents the dispatch function of the Redux store.
 */
export type AppDispatch = typeof store.dispatch;

export default store;

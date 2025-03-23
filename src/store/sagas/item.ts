import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchItemsStart,
  fetchItemsSuccess,
  fetchItemsFailure,
  addItemStart,
  addItemSuccess,
  addItemFailure,
  updateItemStart,
  updateItemSuccess,
  updateItemFailure,
  deleteItemStart,
  deleteItemSuccess,
  deleteItemFailure,
  getItemStart,
  getItemSuccess,
  getItemFailure
} from '../reducers/item';
import {
  fetchItems,
  addItem,
  updateItem,
  deleteItem,
  getItem
} from '@api/item';
import { PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../types/item';



/**
 * Handles fetching all items from the API.
 * Dispatches success or failure actions accordingly.
 */
function* fetchItemsSaga(): Generator<any, void, any> {
  try {
    const response: Item[] = yield call(fetchItems);
    yield put(fetchItemsSuccess(response));
  } catch (error: any) {
    yield put(fetchItemsFailure(error.message));
  }
}

/**
 * Handles adding a new item via the API.
 * Dispatches success or failure actions accordingly.
 * 
 * @param action - The action containing the item to add.
 */
function* addItemSaga(action: PayloadAction<Item>): Generator<any, void, any> {
  try {
    const response: Item = yield call(addItem, action.payload);
    yield put(addItemSuccess(response));
  } catch (error: any) {
    yield put(addItemFailure(error.message));
  }
}

/**
 * Handles fetching a single item from the API.
 * Dispatches success or failure actions accordingly.
 *
 * @param action - The action containing the ID of the item to fetch.
 */
function* getItemSaga(action: PayloadAction<number>): Generator<any, void, any> {
  try {
    const response: Item = yield call(getItem, action.payload);
    yield put(getItemSuccess(response));
  } catch (error: any) {
    yield put(getItemFailure(error.message));
  }
}

/**
 * Handles updating an item via the API.
 * Dispatches success or failure actions accordingly.
 * 
 * @param action - The action containing the updated item.
 */
function* updateItemSaga(action: PayloadAction<Item>): Generator<any, void, any> {
  try {
    const response: Item = yield call(updateItem, action.payload.id, action.payload);
    yield put(updateItemSuccess(response));
  } catch (error: any) {
    yield put(updateItemFailure(error.message));
  }
}

/**
 * Handles deleting an item by ID via the API.
 * Dispatches success or failure actions accordingly.
 * 
 * @param action - The action containing the ID of the item to delete.
 */
function* deleteItemSaga(action: PayloadAction<number>): Generator<any, void, any> {
  try {
    yield call(deleteItem, action.payload);
    yield put(deleteItemSuccess(action.payload));
  } catch (error: any) {
    yield put(deleteItemFailure(error.message));
  }
}

/**
 * Watches for item-related actions and triggers the corresponding sagas.
 */
export default function* itemSaga() {
  yield takeLatest(fetchItemsStart.type, fetchItemsSaga);
  yield takeLatest(addItemStart.type, addItemSaga);
  yield takeLatest(getItemStart.type, getItemSaga);
  yield takeLatest(updateItemStart.type, updateItemSaga);
  yield takeLatest(deleteItemStart.type, deleteItemSaga);

}

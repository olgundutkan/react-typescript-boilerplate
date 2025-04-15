import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '@store/types/item';

/**
 * BaseAction enum represents the different actions that can be performed on items.
 * It includes actions for indexing, getting one, updating, deleting, and creating items.
 */
export const enum BaseAction {
  INDEX = 'INDEX',
  CREATE = 'CREATE',
  GET_ONE = 'GET_ONE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

/**
 * ItemState interface represents the shape of the item slice of the Redux store.
 * It includes properties for managing items, loading state, error messages,
 * success messages, and the currently selected item.
 */
interface ItemState {
  items: Item[];
  lastAction: BaseAction | null;
  lastActionError: string | null;
  lastActionSuccessMessage: string | null;
  lastActionLoading: boolean;
  selectedItem?: Item;
}

const initialState: ItemState = {
  items: [],
  lastAction: null,
  lastActionError: null,
  lastActionSuccessMessage: null,
  lastActionLoading: false,
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    /**
     * Sets loading to true and clears error before fetching items.
     */
    fetchItemsStart(state) {
      state.lastAction = BaseAction.INDEX;
      state.lastActionLoading = true;
      state.lastActionError = null;
    },
    /**
     * Sets fetched items to state and stops loading.
     */
    fetchItemsSuccess(state, action: PayloadAction<Item[]>) {
      state.items = action.payload;
      state.lastActionLoading = false;
      state.lastActionError = null;
      state.lastActionSuccessMessage = 'Items successfully fetched!';
    },
    /**
     * Sets error message if fetching items fails.
     */
    fetchItemsFailure(state, action: PayloadAction<string>) {
      state.lastActionLoading = false;
      state.lastActionError = action.payload;
      state.lastActionSuccessMessage = null;
    },

    /**
     * Sets loading to true and clears error before adding item.
     */
    addItemStart(state) {
      state.lastAction = BaseAction.CREATE;
      state.lastActionLoading = true;
      state.lastActionError = null;
      state.lastActionSuccessMessage = null;
    },
    /**
     * Adds a new item to the list and sets success message.
     */
    addItemSuccess(state, action: PayloadAction<Item>) {
      state.items.push(action.payload);
      state.lastActionLoading = false;
      state.lastActionError = null;
      state.lastActionSuccessMessage = 'Item successfully added!';
    },
    /**
     * Sets error message if adding item fails.
     */
    addItemFailure(state, action: PayloadAction<string>) {
      state.lastActionSuccessMessage = null;
      state.lastActionLoading = false;
      state.lastActionError = action.payload;
    },

    /**
     * Sets loading to true and clears error before fetching a single item.
     */
    getItemStart(state) {
      state.selectedItem = undefined;
      state.lastAction = BaseAction.GET_ONE;
      state.lastActionLoading = true;
      state.lastActionError = null;
      state.lastActionSuccessMessage = null;
    },

    /**
     * Sets the selected item when successfully fetched.
     */
    getItemSuccess(state, action: PayloadAction<Item>) {
      state.lastActionLoading = false;
      state.lastActionError = null;
      state.selectedItem = action.payload;
      state.lastActionSuccessMessage = 'Item successfully fetched!';
    },

    /**
     * Sets error message if fetching a single item fails.
     */
    getItemFailure(state, action: PayloadAction<string>) {
      state.lastActionLoading = false;
      state.lastActionError = action.payload;
      state.lastActionSuccessMessage = null;
      state.selectedItem = undefined;
    },

    /**
     * Sets loading to true and clears error before updating item.
     */
    updateItemStart(state) {
      state.lastAction = BaseAction.UPDATE;
      state.lastActionLoading = true;
      state.lastActionError = null;
      state.lastActionSuccessMessage = null;
    },
    /**
     * Updates an existing item and sets success message.
     */
    updateItemSuccess(state, action: PayloadAction<Item>) {
      state.lastActionLoading = false;
      state.lastActionError = null;
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
      state.lastActionSuccessMessage = 'Item successfully updated!';
    },
    /**
     * Sets error message if updating item fails.
     */
    updateItemFailure(state, action: PayloadAction<string>) {
      state.lastActionLoading = false;
      state.lastActionError = action.payload;
      state.lastActionSuccessMessage = null;
    },

    /**
     * Sets loading to true and clears error before deleting item.
     */
    deleteItemStart(state) {
      state.lastAction = BaseAction.DELETE;
      state.lastActionLoading = true;
      state.lastActionError = null;
      state.lastActionSuccessMessage = null; 
    },
    /**
     * Removes item by ID and sets success message.
     */
    deleteItemSuccess(state, action: PayloadAction<number>) {
      state.lastActionLoading = false;
      state.lastActionError = null;
      state.items = state.items.filter(item => item.id !== action.payload);
      state.lastActionSuccessMessage = 'Item successfully deleted!';
    },
    /**
     * Sets error message if deleting item fails.
     */
    deleteItemFailure(state, action: PayloadAction<string>) {
      state.lastActionLoading = false;
      state.lastActionError = action.payload;
      state.lastActionSuccessMessage = null;
    },

    /**
     * Clears error and success messages from state.
     */
    clearMessages(state) {
      state.lastActionError = null;
      state.lastActionSuccessMessage = null;
    }
  }
});

export const {
  fetchItemsStart, fetchItemsSuccess, fetchItemsFailure,
  addItemStart, addItemSuccess, addItemFailure,
  getItemStart, getItemSuccess, getItemFailure,
  updateItemStart, updateItemSuccess, updateItemFailure,
  deleteItemStart, deleteItemSuccess, deleteItemFailure,
  clearMessages
} = itemSlice.actions;

export default itemSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '@store/types/item';


interface ItemState {
  items: Item[];
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  selectedItem: Item | null;
}

const initialState: ItemState = {
  items: [],
  loading: false,
  error: null,
  successMessage: null,
  selectedItem: null,
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    /**
     * Sets loading to true and clears error before fetching items.
     */
    fetchItemsStart(state) {
      state.loading = true;
      state.error = null;
    },
    /**
     * Sets fetched items to state and stops loading.
     */
    fetchItemsSuccess(state, action: PayloadAction<Item[]>) {
      state.loading = false;
      state.items = action.payload;
    },
    /**
     * Sets error message if fetching items fails.
     */
    fetchItemsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    /**
     * Sets loading to true and clears error before adding item.
     */
    addItemStart(state) {
      state.loading = true;
      state.error = null;
    },
    /**
     * Adds a new item to the list and sets success message.
     */
    addItemSuccess(state, action: PayloadAction<Item>) {
      state.loading = false;
      state.items.push(action.payload);
      state.successMessage = 'Item successfully added!';
    },
    /**
     * Sets error message if adding item fails.
     */
    addItemFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    /**
     * Sets loading to true and clears error before fetching a single item.
     */
    getItemStart(state) {
      state.loading = true;
      state.error = null;
    },

    /**
     * Sets the selected item when successfully fetched.
     */
    getItemSuccess(state, action: PayloadAction<Item>) {
      state.selectedItem = action.payload;
    },

    /**
     * Sets error message if fetching a single item fails.
     */
    getItemFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },

    /**
     * Sets loading to true and clears error before updating item.
     */
    updateItemStart(state) {
      state.loading = true;
      state.error = null;
    },
    /**
     * Updates an existing item and sets success message.
     */
    updateItemSuccess(state, action: PayloadAction<Item>) {
      state.loading = false;
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
      state.successMessage = 'Item successfully updated!';
    },
    /**
     * Sets error message if updating item fails.
     */
    updateItemFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    /**
     * Sets loading to true and clears error before deleting item.
     */
    deleteItemStart(state) {
      state.loading = true;
      state.error = null;
    },
    /**
     * Removes item by ID and sets success message.
     */
    deleteItemSuccess(state, action: PayloadAction<number>) {
      state.loading = false;
      state.items = state.items.filter(item => item.id !== action.payload);
      state.successMessage = 'Item successfully deleted!';
    },
    /**
     * Sets error message if deleting item fails.
     */
    deleteItemFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    /**
     * Clears error and success messages from state.
     */
    clearMessages(state) {
      state.error = null;
      state.successMessage = null;
    },


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
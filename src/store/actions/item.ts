import { createAction } from '@reduxjs/toolkit';
import { Item } from '../types/item';

/**
 * Triggers fetching all items.
 */
export const fetchItemsStart = createAction('item/fetchItemsStart');

/**
 * Triggers fetching a single item by ID.
 */
export const getItemStart = createAction<number>('item/getItemStart');

/**
 * Triggers adding a new item.
 */
export const addItemStart = createAction<Item>('item/addItemStart');

/**
 * Triggers updating an existing item.
 */
export const updateItemStart = createAction<Item>('item/updateItemStart');

/**
 * Triggers deleting an item by ID.
 */
export const deleteItemStart = createAction<number>('item/deleteItemStart');
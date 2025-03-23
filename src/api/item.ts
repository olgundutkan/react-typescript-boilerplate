import api from '@api';
import { AxiosRequestConfig } from 'axios';

/**
 * Fetches all items from the API.
 * @param config Optional Axios request config.
 * @returns Promise resolving with item list.
 */
export const fetchItems = async <T>(config?: AxiosRequestConfig): Promise<T> => {
    const response = await api.get<T>('', config);
    return response.data;
};

/**
 * Fetches a single item by ID.
 * @param id The ID of the item to retrieve.
 * @param config Optional Axios request config.
 * @returns Promise resolving with the item.
 */
export const getItem = async <T>(id: number, config?: AxiosRequestConfig): Promise<T> => {
    const response = await api.get<T>(`/${id}`, config);
    return response.data;
};

/**
 * Creates a new item.
 * @param data The item data to send.
 * @param config Optional Axios request config.
 * @returns Promise resolving with the created item.
 */
export const addItem = async <T, D>(data: D, config?: AxiosRequestConfig): Promise<T> => {
    const response = await api.post<T>('', data, config);
    return response.data;
};

/**
 * Updates an existing item by ID.
 * @param id The ID of the item to update.
 * @param data The updated data.
 * @param config Optional Axios request config.
 * @returns Promise resolving with the updated item.
 */
export const updateItem = async <T, D>(id: number, data: D, config?: AxiosRequestConfig): Promise<T> => {
    const response = await api.patch<T>(`/${id}`, data, config);
    return response.data;
};

/**
 * Deletes an item by ID.
 * @param id The ID of the item to delete.
 * @param config Optional Axios request config.
 * @returns Promise resolving with the deleted item response.
 */
export const deleteItem = async <T>(id: number, config?: AxiosRequestConfig): Promise<T> => {
    const response = await api.delete<T>(`/${id}`, config);
    return response.data;
};

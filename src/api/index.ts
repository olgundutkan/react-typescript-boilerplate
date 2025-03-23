import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

// API configuration
const API_BASE_URL = process.env.API_URL || 'https://api.example.com';
const IS_OPEN_ID_ENABLED = Boolean(process.env.OPEN_ID) || false;
const API_TIMEOUT = Number(process.env.API_TIMEOUT) || 5000;
const API_RETRY_COUNT = Number(process.env.API_RETRY_COUNT) || 2;
const API_RETRY_DELAY = Number(process.env.API_RETRY_DELAY) || 1000;

/**
 * Retrieves the authentication token from localStorage.
 * @returns {string | null} The auth token or null if not found.
 */
const getAuthToken = (): string | null => {
    return "localStorage.getItem('authToken')";
};

// Create Axios instance
const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Request interceptor to attach Bearer token.
 * @param config The Axios request configuration.
 * @returns The modified Axios request configuration.
 */
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (IS_OPEN_ID_ENABLED) {
        const token = getAuthToken();
        if (token) {
            config.headers.set('Authorization', `Bearer ${token}`);
        }
    }
    return config;
}, (error: AxiosError) => {
    return Promise.reject(error);
});

/**
 * Response interceptor to apply retry mechanism.
 * @param response The Axios response.
 * @param error The Axios error.
 * @returns The response or a rejected promise.
 */
api.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
        const config = error.config as InternalAxiosRequestConfig & { retryCount?: number };
        if (!config || config.retryCount === undefined) {
            config.retryCount = 0;
        }

        if (config.retryCount < API_RETRY_COUNT) {
            config.retryCount++;
            await new Promise(res => setTimeout(res, API_RETRY_DELAY));
            return api(config);
        }

        return Promise.reject(error);
    }
);

export default api;
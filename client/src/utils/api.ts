import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
    baseURL: apiBaseUrl,
    headers: { 'Content-Type': 'application/json' },
    // 12 second timeout — enough for Render's cold start wake-up but not
    // so long that users wait forever if the backend is truly down.
    timeout: 12000,
});

// Attach JWT token from localStorage if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('hekimika_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Log errors to console in development for easier debugging
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (import.meta.env.DEV) {
            console.error(
                `[API Error] ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
                error?.response?.status,
                error?.response?.data
            );
        }
        return Promise.reject(error);
    }
);

export default api;

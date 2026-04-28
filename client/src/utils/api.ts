import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
    baseURL: apiBaseUrl,
    headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token from localStorage if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('hekimika_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default api;

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

const API_URL = import.meta.env.API_URL;

export const getData = async () => {
    const response = await fetch(`${API_URL}/api/test`);

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    return response.json();
};

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;

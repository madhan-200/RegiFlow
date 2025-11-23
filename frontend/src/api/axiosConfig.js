import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.authHeader) {
            config.headers.Authorization = user.authHeader;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;

import axios from "axios";
import { jwtDecode } from "jwt-decode";


const api = axios.create({
    baseURL: 'http://127.0.0.1:8000'
})

const refreshToken = async () => {
    const refresh = localStorage.getItem('refreshToken');
    try {
        const response = await api.post('/authentication/token/refresh/', { refresh });
        const { access } = response.data;
        localStorage.setItem('accessToken', access);
        return access;
    } catch (err) {
        console.error('Token refresh failed', err);
        return null;
    }
};

const isTokenValid = (token) => {
    try {
        const { exp } = jwtDecode(token);
        return Date.now() < exp * 1000;
    } catch {
        return false;
    }
};

// Add Authorization header for requests
api.interceptors.request.use(async (config) => {
    let token = localStorage.getItem('accessToken');
    if (!isTokenValid(token)) {
        token = await refreshToken();
    }
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
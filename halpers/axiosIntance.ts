import { authKey } from '@/app/contants/authKey';
import { getFromLocalStorage } from '@/utils/local-storage';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const acctssToken = getFromLocalStorage(authKey)
        if (acctssToken) {
            config.headers.Authorization = acctssToken
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized, logging out...');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
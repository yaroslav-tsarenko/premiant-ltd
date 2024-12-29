import axios from 'axios';
import { useRouter } from 'next/navigation';

let token = "";
if (typeof document !== "undefined") {
    token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1] || "";
}

export const newRequest = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    timeout: 5000,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${token}`,
    }
});

newRequest.interceptors.response.use(
    response => response,
    error => {
        const router = useRouter();
        if (error.response.status === 401 && error.response.data.message === 'TokenExpiredError') {
            router.push('/');
        } else if (error.response.status === 403) {
            router.push('/login');
        }
        return Promise.reject(error);
    }
);
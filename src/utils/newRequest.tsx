import axios from 'axios';

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
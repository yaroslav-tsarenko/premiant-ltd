import axios from 'axios';
import { BACKEND_URL } from "@/constants/constants";

let token = "";
if (typeof document !== "undefined") {
    token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1] || "";
}

export const newRequest = axios.create({
    baseURL: `${BACKEND_URL}`,
    timeout: 5000,
    withCredentials: true,
    headers: {
        Authorization: token ? `Bearer ${token}` : "",
    }
});
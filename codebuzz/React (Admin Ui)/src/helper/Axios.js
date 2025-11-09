import axios from "axios";

export const authHeader = () => {
    const token = localStorage.getItem("admin-Token");

    return {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }
}

export const authImageHeader = () => {
    const token = localStorage.getItem("admin-Token");

    return {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    }
}

export const Axios = axios.create({
    baseURL: import.meta.env.VITE_APP_ADMIN_API,
})
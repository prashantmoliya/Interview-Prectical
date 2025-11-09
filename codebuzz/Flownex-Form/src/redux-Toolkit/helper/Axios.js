import axios from "axios";

export const authHeaders = () => {
    const token = localStorage.getItem("superAdmin-token");

    return {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    }
}

export const adminAuthHeaders = (type) => {
    const token = localStorage.getItem("token") || localStorage.getItem("admin-token");

    return {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": type,
        }
    }
}

export const Axios = axios.create({
    baseURL: import.meta.env.VITE_APP_ADMIN_API
})
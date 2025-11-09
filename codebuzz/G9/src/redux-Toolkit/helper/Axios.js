import axios from "axios";

export const otpAuthHeaders = () => {
    // const token = localStorage.getItem("otp-token");
    const token = localStorage.getItem("g9jewellery-user-token");

    return {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    }
}

export const authHeaders = (type) => {
    const token = localStorage.getItem("g9jewellery-user-token");
    
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": type,
        }
    }
}

export const Axios = axios.create({
    baseURL: import.meta.env.VITE_APP_G9JEWELLERY_API,
});
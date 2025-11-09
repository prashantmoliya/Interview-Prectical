import axios from "axios";

const axiosapi = axios.create({
    baseURL: "http://localhost:4000",
})

export default axiosapi;
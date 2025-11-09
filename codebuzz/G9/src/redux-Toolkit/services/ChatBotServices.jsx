import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiendpoints } from "../../constants";
import { authHeaders, Axios } from "../helper/Axios";
import { toast } from "react-toastify";

// reqtoChatBot
export const reqtoChatBot = createAsyncThunk("reqtoChatBot", async (data) => {
    try {
        const res = await Axios.post(apiendpoints.chatBot, data);
        
        if (res.data?.reply) {
            return res.data;
        } else {
            toast.error(res.data?.message);
        }

    } catch (err) {
        console.error(err);
    }
});

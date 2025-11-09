import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiendpoints } from "../../constants";
import { Axios } from "../helper/Axios";
import { toast } from "react-toastify";

// reqtoGetPolicy
export const reqtoGetPolicy = createAsyncThunk("reqtoGetPolicy", async () => {
    try {
        const res = await Axios.get(apiendpoints.getPolicy);

        if (res.data?.status) {
            return res.data;
        } else {
            toast.error(res.data?.message);
        }

    } catch (err) {
        console.error(err);
    }
});
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiendpoints } from "../../constants";
import { Axios } from "../helper/Axios";
import { toast } from "react-toastify";

// reqtoGetFaqs
export const reqtoGetFaqs = createAsyncThunk("reqtoGetFaqs", async () => {
    try {
        const res = await Axios.get(apiendpoints.getFaqs);

        if (res.data?.status) {
            return res.data;
        } else {
            toast.error(res.data?.message);
        }

    } catch (err) {
        console.error(err);
    }
});

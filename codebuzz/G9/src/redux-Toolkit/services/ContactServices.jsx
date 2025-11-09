import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiendpoints } from "../../constants";
import { authHeaders, Axios } from "../helper/Axios";
import { toast } from "react-toastify";
import { unauthorized } from "../helper/Unauthorized";

// reqtoAddContact
export const reqtoAddContact = createAsyncThunk("reqtoAddContact", async (data, { dispatch }) => {
    try {
        const res = await Axios.post(apiendpoints.addContact, data, authHeaders("application/json"));

        if (res.data?.status) {
            toast.success(res.data?.message);

            return res.data;
        } else {
            toast.error(res.data?.message);
        }

    } catch (err) {
        console.error(err);

        if (err?.response?.status === 401) {
            unauthorized(err, dispatch);
        }
    }
});

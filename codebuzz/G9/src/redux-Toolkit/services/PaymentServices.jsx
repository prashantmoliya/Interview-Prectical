import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiendpoints } from "../../constants";
import { authHeaders, Axios } from "../helper/Axios";
import { toast } from "react-toastify";
import { unauthorized } from "../helper/Unauthorized";

// reqtoGetOrderSummary
export const reqtoGetOrderSummary = createAsyncThunk("reqtoGetOrderSummary", async (currency, { dispatch }) => {
    try {
        const res = await Axios.get(apiendpoints.getOrderSummary, {
            ...authHeaders("application/json"),
            params: currency ? { currency } : {}
        });

        if (res.data?.status) {
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


// reqtoAddAddressDetail
export const reqtoAddAddressDetail = createAsyncThunk("reqtoAddAddressDetail", async (data, { dispatch }) => {
    try {
        const res = await Axios.post(apiendpoints.addAddressDetail, data, authHeaders("application/json"));

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


// reqtoPaymentFetch
export const reqtoPaymentFetch = createAsyncThunk("reqtoPaymentFetch", async (data, { dispatch }) => {
    try {
        const res = await Axios.post(apiendpoints.paymentFetch, data, authHeaders("application/json"));

        if (res.data?.status) {
            // toast.success(res.data?.message);

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

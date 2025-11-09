import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiendpoints } from "../../constants";
import { authHeaders, Axios } from "../helper/Axios";
import { toast } from "react-toastify";
import { unauthorized } from "../helper/Unauthorized";

// reqtoGetCart
export const reqtoGetCart = createAsyncThunk("reqtoGetCart", async (currency, { dispatch }) => {
    try {
        const res = await Axios.get(apiendpoints.getCart, {
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


// reqtoAddCart
export const reqtoAddCart = createAsyncThunk("reqtoAddCart", async (data, { dispatch }) => {
    try {
        const res = await Axios.post(apiendpoints.addCart, data, authHeaders("application/json"));

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


// reqtoCartQty
export const reqtoCartQty = createAsyncThunk("reqtoCartQty", async (data, { dispatch }) => {
    try {
        const res = await Axios.post(apiendpoints.cartQty, data, authHeaders("application/json"));

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


// reqtoDeleteCart
export const reqtoDeleteCart = createAsyncThunk("reqtoDeleteCart", async (id, { dispatch }) => {
    try {
        const res = await Axios.delete(apiendpoints.deleteCart.replace(":id", id), authHeaders("application/json"));

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


// reqtoShareProduct
export const reqtoShareProduct = createAsyncThunk("reqtoShareProduct", async (data) => {
    try {
        const res = await Axios.post(apiendpoints.shareProduct, data);

        if (res.data?.status) {
            return res.data;
        } else {
            toast.error(res.data?.message);
        }

    } catch (err) {
        console.error(err);
    }
});
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiendpoints } from "../../constants";
import { Axios } from "../helper/Axios";
import { toast } from "react-toastify";

// reqtoGetOfferbar
export const reqtoGetOfferbar = createAsyncThunk("reqtoGetOfferbar", async () => {
    try {
        const res = await Axios.get(apiendpoints.getOfferbar);

        if (res.data?.status) {
            return res.data;
        } else {
            toast.error(res.data?.message);
        }

    } catch (err) {
        console.error(err);
    }
});


// reqtoGetSlider
export const reqtoGetSlider = createAsyncThunk("reqtoGetSlider", async () => {
    try {
        const res = await Axios.get(apiendpoints.getSlider);

        if (res.data?.status) {
            return res.data;
        } else {
            toast.error(res.data?.message);
        }

    } catch (err) {
        console.error(err);
    }
});


// reqtoGetTopSellingProduct
export const reqtoGetTopSellingProduct = createAsyncThunk("reqtoGetTopSellingProduct", async (currency) => {
    try {
        const res = await Axios.get(apiendpoints.getTopSellingProduct, {
            params: currency ? { currency } : {}
        });

        if (res.data?.status) {
            return res.data;
        } else {
            toast.error(res.data?.message);
        }

    } catch (err) {
        console.error(err);
    }
});
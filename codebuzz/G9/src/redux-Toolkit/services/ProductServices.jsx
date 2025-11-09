import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiendpoints } from "../../constants";
import { Axios } from "../helper/Axios";
import { toast } from "react-toastify";

// reqtoGetProductCategory
export const reqtoGetProductCategory = createAsyncThunk("reqtoGetProductCategory", async () => {
    try {
        const res = await Axios.get(apiendpoints.getProductCategory);

        if (res.data?.status) {
            return res.data;
        } else {
            toast.error(res.data?.message);
        }

    } catch (err) {
        console.error(err);
    }
});


// reqtoGetProductSubCategory
export const reqtoGetProductSubCategory = createAsyncThunk("reqtoGetProductSubCategory", async (id) => {
    try {
        const res = await Axios.get(apiendpoints.getProductSubCategory.replace(":id", id));

        if (res.data?.status) {
            return res.data;
        } else {
            toast.error(res.data?.message);
        }

    } catch (err) {
        console.error(err);
    }
});


// reqtoGetProductMetals
export const reqtoGetProductMetals = createAsyncThunk("reqtoGetProductMetals", async () => {
    try {
        const res = await Axios.get(apiendpoints.getProductMetals);

        if (res.data?.status) {
            return res.data;
        } else {
            toast.error(res.data?.message);
        }

    } catch (err) {
        console.error(err);
    }
});


// reqtoGetProductGoldPurity
export const reqtoGetProductGoldPurity = createAsyncThunk("reqtoGetProductGoldPurity", async () => {
    try {
        const res = await Axios.get(apiendpoints.getProductGoldPurity);

        if (res.data?.status) {
            return res.data;
        } else {
            toast.error(res.data?.message);
        }

    } catch (err) {
        console.error(err);
    }
});


// reqtoGetProductStoneShape
export const reqtoGetProductStoneShape = createAsyncThunk("reqtoGetProductStoneShape", async () => {
    try {
        const res = await Axios.get(apiendpoints.getProductStoneShape);

        if (res.data?.status) {
            return res.data;
        } else {
            toast.error(res.data?.message);
        }

    } catch (err) {
        console.error(err);
    }
});


// reqtoGetProductPriceFilter
export const reqtoGetProductPriceFilter = createAsyncThunk("reqtoGetProductPriceFilter", async (filters = {}) => {
    try {
        const res = await Axios.get(apiendpoints.getProductPriceFilter, {
            params: filters,
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


// reqtoGetProductList
export const reqtoGetProductList = createAsyncThunk("reqtoGetProductList", async ({ filters = {}, page = 1, perPage }) => {
    try {
        const res = await Axios.get(apiendpoints.getProductList, {
            params: {
                ...filters,
                page,
                perPage
            }
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


// reqtoGetProductDetail
export const reqtoGetProductDetail = createAsyncThunk("reqtoGetProductDetail", async ({ id, currency }) => {
    try {
        const res = await Axios.get(apiendpoints.getProductDetail.replace(":id", id), {
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


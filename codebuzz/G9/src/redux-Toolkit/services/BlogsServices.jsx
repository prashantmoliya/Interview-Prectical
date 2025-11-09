import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiendpoints } from "../../constants";
import { Axios } from "../helper/Axios";
import { toast } from "react-toastify";

// reqtoGetBlogs
export const reqtoGetBlogs = createAsyncThunk("reqtoGetBlogs", async (data) => {
    try {
        const res = await Axios.get(apiendpoints.getBlogs, {
            params: {
                page: data?.page || 1,
                perPage: data?.perPage,
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


// reqtoGetBlogsDetail
export const reqtoGetBlogsDetail = createAsyncThunk("reqtoGetBlogsDetail", async (id) => {
    try {
        const res = await Axios.get(apiendpoints.getBlogsDetail.replace(":id", id));

        if (res.data?.status) {
            return res.data;
        } else {
            toast.error(res.data?.message);
        }

    } catch (err) {
        console.error(err);
    }
});


// reqtoGetMedia
export const reqtoGetMedia = createAsyncThunk("reqtoGetMedia", async (data) => {
    try {
        const res = await Axios.get(apiendpoints.getMedia, {
            params: {
                page: data?.page || 1,
                perPage: data?.perPage,
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
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const delay = (time) => new Promise(resolve => setTimeout(resolve, time));

// Get Api User 
export const getuser = createAsyncThunk("user/getuser", async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_USER_API}/user`);
        console.log("api-getuser++", res);

        await delay(600);

        if (res.status === 200) {
            return res.data;
        }
    } catch (err) {
        console.error("api-getuser-error++", err);

        await delay(600);

        if (err.response && err.response.status === 404) {
            return rejectWithValue(err.message);
        }
        else{
            return rejectWithValue(err.message);
        }
    }
});


// Post Api User 
export const postuser = createAsyncThunk("user/postuser", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_USER_API}/user`, data);
        console.log("api-postuser++", res);

        if (res.status === 201) {
            toast.success("User SuccessFul Added");

            return res;
        }
    } catch (err) {
        console.error("api-postuser-error++", err);

        if (err.response && err.response.status === 404) {
            toast.error(err.message);

            return rejectWithValue(err.message);
        }
        else {
            toast.error(err.message)

            return rejectWithValue(err.message);
        }
    }
});


// Delete Api User
export const deleteuser = createAsyncThunk("user/deleteuser", async (Did, { rejectWithValue }) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_APP_USER_API}/user/${Did}`);
        console.log("api-deleteuser++", res);

        if (res.status === 200) {
            toast.success("User SuccessFul Delete");

            return Did;
        }
    } catch (err) {
        console.error("api-deleteuser-error++", err);

        if (err.response.status === 404) {
            toast.error(err.message);

            return rejectWithValue(err.message);
        }
    }
});


// Get Api Singal-User
export const getsingaluser = createAsyncThunk("user/getsingaluser", async (Uid, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_USER_API}/user/${Uid}`);
        console.log("api-getsingaluser++", res);

        if (res.status === 200) {
            return res.data;
        }
    } catch (err) {
        console.error("api-getsingaluser-error++", err);

        if (err.response.status === 404) {
            return rejectWithValue(err.message);
        }
    }
});


// Put Api User
export const putuser = createAsyncThunk("user/putuser", async ({ Uid, data }, { rejectWithValue }) => {
    try {
        const res = await axios.put(`${import.meta.env.VITE_APP_USER_API}/user/${Uid}`, data);
        console.log("api-putuser++", res);

        if (res.status === 200) {
            toast.success("User SuccessFul Updated");

            return res;
        }
    } catch (err) {
        console.error("api-putuser-error++", err);

        if (err.response.status === 404) {
            toast.error(err.message);

            return rejectWithValue(err.message);
        }
    }
});


// console.log("Redux-Toolkit createAsyncThunk :- ", getuser);  

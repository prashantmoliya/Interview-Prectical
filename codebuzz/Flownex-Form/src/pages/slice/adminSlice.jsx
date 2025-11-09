import { createSlice } from "@reduxjs/toolkit";
import { adminLogin, forgetpassword } from './../services/adminServices';


const initialState = {
    data: null,
    loader: false,
    error: null
}

const adminSlice = createSlice({
    name: 'admin',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {


        // ---Login---
        builder.addCase(adminLogin.pending, (state, action) => {
            state.loader = true;
        })
        builder.addCase(adminLogin.fulfilled, (state, action) => {
            state.data = action.payload || [];
            state.loader = false;
            state.error = null;
        })
        builder.addCase(adminLogin.rejected, (state, action) => {
            state.error = action.payload || [];
            state.loader = false;
        })


        // ---forgetPassword---
        builder.addCase(forgetpassword.pending, (state, action) => {
            state.loader = true;
        })
        builder.addCase(forgetpassword.fulfilled, (state, action) => {
            state.data = action.payload || [];
            state.loader = false;
            state.error = null;
        })
        builder.addCase(forgetpassword.rejected, (state, action) => {
            state.error = action.payload || [];
            state.loader = false;
        })

    }
})
export default adminSlice.reducer;
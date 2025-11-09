import { createSlice } from "@reduxjs/toolkit";
import { superAdminlogin } from './../services/superAdminServices';

const initialState = {
    data: null,
    loader: false,
    error: null
}

const superAdminSlice = createSlice({
    name: 'superAdmin',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(superAdminlogin.pending, (state, action) => {
            state.loader = true;
        })
        builder.addCase(superAdminlogin.fulfilled, (state, action) => {
            state.data = action.payload || [];
            state.loader = false;
            state.error = null;
        })
        builder.addCase(superAdminlogin.rejected, (state, action) => {
            state.error = action.payload || [];
            state.loader = false;
        })
    }
})

export default superAdminSlice.reducer;
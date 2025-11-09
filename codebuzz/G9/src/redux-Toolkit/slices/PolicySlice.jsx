import { createSlice } from "@reduxjs/toolkit";
import { reqtoGetPolicy } from "../services/PolicyServices";

const initialState = {
    loader: false,

    policyList: [],

    error: null
}

const PolicySlice = createSlice({
    name: "PolicySlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // reqtoGetPolicy
        builder.addCase(reqtoGetPolicy.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoGetPolicy.fulfilled, (state, action) => {
            state.loader = false;
            state.policyList = action.payload?.data;
        });
        builder.addCase(reqtoGetPolicy.rejected, (state, action) => {
            state.loader = false;
        });
    }
});

export default PolicySlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { reqtoAddComplaint } from "../services/ComplaintServices";

const initialState = {
    loader: false,

    error: null
}

const ComplaintSlice = createSlice({
    name: "ComplaintSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // reqtoAddComplaint
        builder.addCase(reqtoAddComplaint.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoAddComplaint.fulfilled, (state, action) => {
            state.loader = false;
        });
        builder.addCase(reqtoAddComplaint.rejected, (state, action) => {
            state.loader = false;
        });
    }
});

export default ComplaintSlice.reducer;
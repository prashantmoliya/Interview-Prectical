import { createSlice } from "@reduxjs/toolkit";
import { reqtoGetFaqs } from "../services/FaqsServices";

const initialState = {
    loader: false,

    faqsList: [],

    error: null
}

const FaqsSlice = createSlice({
    name: "FaqsSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // reqtoGetFaqs
        builder.addCase(reqtoGetFaqs.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoGetFaqs.fulfilled, (state, action) => {
            state.loader = false;

            state.faqsList = action.payload?.data;
        });
        builder.addCase(reqtoGetFaqs.rejected, (state, action) => {
            state.loader = false;
        });
    }
});

export default FaqsSlice.reducer;
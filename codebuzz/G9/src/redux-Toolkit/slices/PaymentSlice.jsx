import { createSlice } from "@reduxjs/toolkit";
import { reqtoAddAddressDetail, reqtoGetOrderSummary, reqtoPaymentFetch } from "../services/PaymentServices";

const initialState = {
    loader: false,

    orderSummary: {},

    error: null
}

const PaymentSlice = createSlice({
    name: "PaymentSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // reqtoGetOrderSummary
        builder.addCase(reqtoGetOrderSummary.pending, (state) => {
            // state.loader = true;
        });
        builder.addCase(reqtoGetOrderSummary.fulfilled, (state, action) => {
            // state.loader = false;
            state.orderSummary = action.payload?.data;
        });
        builder.addCase(reqtoGetOrderSummary.rejected, (state, action) => {
            // state.loader = false;
        });


        // reqtoAddAddressDetail
        builder.addCase(reqtoAddAddressDetail.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoAddAddressDetail.fulfilled, (state, action) => {
            state.loader = false;
        });
        builder.addCase(reqtoAddAddressDetail.rejected, (state, action) => {
            state.loader = false;
        });


        // reqtoPaymentFetch
        builder.addCase(reqtoPaymentFetch.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoPaymentFetch.fulfilled, (state, action) => {
            state.loader = false;
        });
        builder.addCase(reqtoPaymentFetch.rejected, (state, action) => {
            state.loader = false;
        });
    }
});

export default PaymentSlice.reducer;   
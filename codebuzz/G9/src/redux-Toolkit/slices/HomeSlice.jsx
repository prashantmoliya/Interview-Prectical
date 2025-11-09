import { createSlice } from "@reduxjs/toolkit";
import { reqtoGetOfferbar, reqtoGetSlider, reqtoGetTopSellingProduct } from "../services/HomeServices";

const initialState = {
    loader: false,

    offerbarList: [],

    sliderList: [],

    topSellingProductList: [],

    error: null
}

const HomeSlice = createSlice({
    name: "HomeSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // reqtoGetOfferbar
        builder.addCase(reqtoGetOfferbar.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoGetOfferbar.fulfilled, (state, action) => {
            state.loader = false;
            state.offerbarList = action.payload?.data;
        });
        builder.addCase(reqtoGetOfferbar.rejected, (state, action) => {
            state.loader = false;
        });


        // reqtoGetSlider
        builder.addCase(reqtoGetSlider.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoGetSlider.fulfilled, (state, action) => {
            state.loader = false;
            state.sliderList = action.payload?.data;
        });
        builder.addCase(reqtoGetSlider.rejected, (state, action) => {
            state.loader = false;
        });


        // reqtoGetTopSellingProduct
        builder.addCase(reqtoGetTopSellingProduct.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoGetTopSellingProduct.fulfilled, (state, action) => {
            state.loader = false;
            state.topSellingProductList = action.payload?.data;
        });
        builder.addCase(reqtoGetTopSellingProduct.rejected, (state, action) => {
            state.loader = false;
        });
    }
});

export default HomeSlice.reducer;
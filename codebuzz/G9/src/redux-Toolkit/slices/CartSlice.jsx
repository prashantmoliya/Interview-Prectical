import { createSlice } from "@reduxjs/toolkit";
import { reqtoGetPolicy } from "../services/PolicyServices";
import { reqtoGetProductCategory, reqtoGetProductDetail, reqtoGetProductGoldPurity, reqtoGetProductList, reqtoGetProductMetals, reqtoGetProductStoneShape, reqtoGetProductSubCategory } from "../services/ProductServices";
import { reqtoAddCart, reqtoCartQty, reqtoDeleteCart, reqtoGetCart, reqtoShareProduct } from "../services/CartServices";

const initialState = {
    loader: false,

    cartList: [],

    cartTotal: null,

    shareProduct: {},

    error: null
}

const CartSlice = createSlice({
    name: "CartSlice",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartList = [];
        },
    },
    extraReducers: (builder) => {
        // reqtoGetCart
        builder.addCase(reqtoGetCart.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoGetCart.fulfilled, (state, action) => {
            state.loader = false;
            state.cartList = action.payload?.data;
        });
        builder.addCase(reqtoGetCart.rejected, (state, action) => {
            state.loader = false;
        });


        // reqtoAddCart
        builder.addCase(reqtoAddCart.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoAddCart.fulfilled, (state, action) => {
            state.loader = false;
        });
        builder.addCase(reqtoAddCart.rejected, (state, action) => {
            state.loader = false;
        });


        // reqtoCartQty
        builder.addCase(reqtoCartQty.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoCartQty.fulfilled, (state, action) => {
            state.loader = false;
        });
        builder.addCase(reqtoCartQty.rejected, (state, action) => {
            state.loader = false;
        });


        // reqtoDeleteCart
        builder.addCase(reqtoDeleteCart.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoDeleteCart.fulfilled, (state, action) => {
            state.loader = false;
        });
        builder.addCase(reqtoDeleteCart.rejected, (state, action) => {
            state.loader = false;
        });


        // reqtoShareProduct
        builder.addCase(reqtoShareProduct.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoShareProduct.fulfilled, (state, action) => {
            state.loader = false;
            state.shareProduct = action.payload?.data;
        });
        builder.addCase(reqtoShareProduct.rejected, (state, action) => {
            state.loader = false;
        });
    }
});

export default CartSlice.reducer;
export const { clearCart } = CartSlice.actions;

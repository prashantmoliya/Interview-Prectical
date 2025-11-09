import { createSlice } from "@reduxjs/toolkit";
import { reqtoGetPolicy } from "../services/PolicyServices";
import { reqtoGetProductCategory, reqtoGetProductDetail, reqtoGetProductGoldPurity, reqtoGetProductList, reqtoGetProductMetals, reqtoGetProductPriceFilter, reqtoGetProductStoneShape, reqtoGetProductSubCategory } from "../services/ProductServices";

const initialState = {
    loader: false,

    categoryList: [],
    subCategoryList: [],

    metalsList: [],
    goldPurityList: [],
    stoneShapeList: [],

    productPriceList: {},

    productList: [],
    productListPagination: {},
    productDetail: {},

    error: null
}

const ProductSlice = createSlice({
    name: "ProductSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // reqtoGetProductCategory
        builder.addCase(reqtoGetProductCategory.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoGetProductCategory.fulfilled, (state, action) => {
            state.loader = false;
            state.categoryList = action.payload?.data;
        });
        builder.addCase(reqtoGetProductCategory.rejected, (state, action) => {
            state.loader = false;
        });


        // reqtoGetProductSubCategory
        builder.addCase(reqtoGetProductSubCategory.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoGetProductSubCategory.fulfilled, (state, action) => {
            state.loader = false;
            state.subCategoryList = action.payload?.data?.data;
        });
        builder.addCase(reqtoGetProductSubCategory.rejected, (state, action) => {
            state.loader = false;
        });


        // reqtoGetProductMetals
        builder.addCase(reqtoGetProductMetals.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoGetProductMetals.fulfilled, (state, action) => {
            state.loader = false;
            state.metalsList = action.payload?.data;
        });
        builder.addCase(reqtoGetProductMetals.rejected, (state, action) => {
            state.loader = false;
        });


        // reqtoGetProductGoldPurity
        builder.addCase(reqtoGetProductGoldPurity.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoGetProductGoldPurity.fulfilled, (state, action) => {
            state.loader = false;
            state.goldPurityList = action.payload?.data;
        });
        builder.addCase(reqtoGetProductGoldPurity.rejected, (state, action) => {
            state.loader = false;
        });


        // reqtoGetProductStoneShape
        builder.addCase(reqtoGetProductStoneShape.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoGetProductStoneShape.fulfilled, (state, action) => {
            state.loader = false;
            state.stoneShapeList = action.payload?.data;
        });
        builder.addCase(reqtoGetProductStoneShape.rejected, (state, action) => {
            state.loader = false;
        });


        // reqtoGetProductPriceFilter
        builder.addCase(reqtoGetProductPriceFilter.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoGetProductPriceFilter.fulfilled, (state, action) => {
            state.loader = false;
            state.productPriceList = action.payload?.data;
        });
        builder.addCase(reqtoGetProductPriceFilter.rejected, (state, action) => {
            state.loader = false;
        });


        // reqtoGetProductList
        builder.addCase(reqtoGetProductList.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoGetProductList.fulfilled, (state, action) => {
            state.loader = false;
            state.productList = action.payload?.data;
            state.productListPagination = action.payload?.pagination;
        });
        builder.addCase(reqtoGetProductList.rejected, (state, action) => {
            state.loader = false;
        });


        // reqtoGetProductDetail
        builder.addCase(reqtoGetProductDetail.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoGetProductDetail.fulfilled, (state, action) => {
            state.loader = false;
            state.productDetail = action.payload?.data;
        });
        builder.addCase(reqtoGetProductDetail.rejected, (state, action) => {
            state.loader = false;
        });
    }
});

export default ProductSlice.reducer;
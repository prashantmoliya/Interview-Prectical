import { createSlice } from "@reduxjs/toolkit";
import { reqtoAddManageAddress, reqtoAddOrder, reqtoAddProductSaved, reqtoAddWishlist, reqtoDeleteManageAddress, reqtoDeleteProductSaved, reqtoDeleteWishlist, reqtoEditManageAddress, reqtoEditProfile, reqtoGetManageAddress, reqtoGetOrder, reqtoGetOrderDetail, reqtoGetProductSaved, reqtoGetProfile, reqtoGetWishlist, reqtoMovetoCartProductSaved, reqtoSetPrimaryManageAddress, reqtoUserAddress, reqtoUserChangePassword } from "../services/AccountServices";

const initialState = {
    loader: false,

    userProfile: {},
    userProfileEdit: {},
    userProfileLoader: false,
    userAddress: {},

    manageAddressList: [],
    manageAddressEdit: {},
    manageAddressLoader: false,

    orderList: [],
    orderListPagination: {},
    orderDetail: {},

    wishList: [],

    productSavedList: [],
    productSavedLoader: false,

    error: null
}

const AccountSlice = createSlice({
    name: "AccountSlice",
    initialState,
    reducers: {
        editUserProfile: (state, action) => {
            console.log(action);

            if (action.payload) {
                state.userProfileEdit = action.payload;
            } else {
                state.userProfileEdit = {};
            }
        },
        editManageAddress: (state, action) => {
            console.log(action);

            if (action.payload) {
                state.manageAddressEdit = action.payload;
            } else {
                state.manageAddressEdit = {};
            }
        },
        signOut: (state) => {
            state.userProfile = {};
        }
    },
    extraReducers: (builder) => {
        // reqtoGetProfile
        builder.addCase(reqtoGetProfile.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoGetProfile.fulfilled, (state, action) => {
            state.loader = false;

            state.userProfile = action.payload?.data;
        });
        builder.addCase(reqtoGetProfile.rejected, (state, action) => {
            state.loader = false;
        });


        // reqtoEditProfile
        builder.addCase(reqtoEditProfile.pending, (state) => {
            state.userProfileLoader = true;
        });
        builder.addCase(reqtoEditProfile.fulfilled, (state, action) => {
            state.userProfileLoader = false;
        });
        builder.addCase(reqtoEditProfile.rejected, (state, action) => {
            state.userProfileLoader = false;
        });


        // reqtoUserAddress
        builder.addCase(reqtoUserAddress.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoUserAddress.fulfilled, (state, action) => {
            state.loader = false;

            state.userAddress = action.payload?.data;
        });
        builder.addCase(reqtoUserAddress.rejected, (state, action) => {
            state.loader = false;
        });


        // reqtoUserChangePassword
        builder.addCase(reqtoUserChangePassword.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoUserChangePassword.fulfilled, (state, action) => {
            state.loader = false;
        });
        builder.addCase(reqtoUserChangePassword.rejected, (state, action) => {
            state.loader = false;
        });


        // reqtoGetManageAddress
        builder.addCase(reqtoGetManageAddress.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoGetManageAddress.fulfilled, (state, action) => {
            state.loader = false;

            state.manageAddressList = action.payload?.data;
        });
        builder.addCase(reqtoGetManageAddress.rejected, (state, action) => {
            state.loader = false;
        });


        // reqtoAddManageAddress
        builder.addCase(reqtoAddManageAddress.pending, (state) => {
            state.manageAddressLoader = true;
        });
        builder.addCase(reqtoAddManageAddress.fulfilled, (state, action) => {
            state.manageAddressLoader = false;
        });
        builder.addCase(reqtoAddManageAddress.rejected, (state, action) => {
            state.manageAddressLoader = false;
        });


        // reqtoEditManageAddress
        builder.addCase(reqtoEditManageAddress.pending, (state) => {
            state.manageAddressLoader = true;
        });
        builder.addCase(reqtoEditManageAddress.fulfilled, (state, action) => {
            state.manageAddressLoader = false;
        });
        builder.addCase(reqtoEditManageAddress.rejected, (state, action) => {
            state.manageAddressLoader = false;
        });


        // reqtoDeleteManageAddress
        builder.addCase(reqtoDeleteManageAddress.pending, (state) => {
            state.manageAddressLoader = true;
        });
        builder.addCase(reqtoDeleteManageAddress.fulfilled, (state, action) => {
            state.manageAddressLoader = false;
        });
        builder.addCase(reqtoDeleteManageAddress.rejected, (state, action) => {
            state.manageAddressLoader = false;
        });


        // reqtoSetPrimaryManageAddress
        builder.addCase(reqtoSetPrimaryManageAddress.pending, (state) => {
            state.manageAddressLoader = true;
        });
        builder.addCase(reqtoSetPrimaryManageAddress.fulfilled, (state, action) => {
            state.manageAddressLoader = false;
        });
        builder.addCase(reqtoSetPrimaryManageAddress.rejected, (state, action) => {
            state.manageAddressLoader = false;
        });


        // reqtoGetOrder
        builder.addCase(reqtoGetOrder.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoGetOrder.fulfilled, (state, action) => {
            state.loader = false;

            state.orderList = action.payload?.orders;
            state.orderListPagination = action.payload?.pagination;
        });
        builder.addCase(reqtoGetOrder.rejected, (state, action) => {
            state.loader = false;
        });


        // reqtoGetOrderDetail
        builder.addCase(reqtoGetOrderDetail.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoGetOrderDetail.fulfilled, (state, action) => {
            state.loader = false;

            state.orderDetail = action.payload?.data;
        });
        builder.addCase(reqtoGetOrderDetail.rejected, (state, action) => {
            state.loader = false;
        });


        // reqtoAddOrder
        builder.addCase(reqtoAddOrder.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoAddOrder.fulfilled, (state, action) => {
            state.loader = false;
        });
        builder.addCase(reqtoAddOrder.rejected, (state, action) => {
            state.loader = false;
        });


        // reqtoGetWishlist
        builder.addCase(reqtoGetWishlist.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoGetWishlist.fulfilled, (state, action) => {
            state.loader = false;

            state.wishList = action.payload?.data?.wishlist;
        });
        builder.addCase(reqtoGetWishlist.rejected, (state, action) => {
            state.loader = false;
        });


        // reqtoAddWishlist
        builder.addCase(reqtoAddWishlist.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoAddWishlist.fulfilled, (state, action) => {
            state.loader = false;
        });
        builder.addCase(reqtoAddWishlist.rejected, (state, action) => {
            state.loader = false;
        });


        // reqtoDeleteWishlist
        builder.addCase(reqtoDeleteWishlist.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoDeleteWishlist.fulfilled, (state, action) => {
            state.loader = false;
        });
        builder.addCase(reqtoDeleteWishlist.rejected, (state, action) => {
            state.loader = false;
        });


        // reqtoGetProductSaved
        builder.addCase(reqtoGetProductSaved.pending, (state) => {
            state.productSavedLoader = true;
        });
        builder.addCase(reqtoGetProductSaved.fulfilled, (state, action) => {
            state.productSavedLoader = false;

            state.productSavedList = action.payload?.data?.productSaved;
        });
        builder.addCase(reqtoGetProductSaved.rejected, (state, action) => {
            state.productSavedLoader = false;
        });


        // reqtoAddProductSaved
        builder.addCase(reqtoAddProductSaved.pending, (state) => {
            state.productSavedLoader = true;
        });
        builder.addCase(reqtoAddProductSaved.fulfilled, (state, action) => {
            state.productSavedLoader = false;
        });
        builder.addCase(reqtoAddProductSaved.rejected, (state, action) => {
            state.productSavedLoader = false;
        });


        // reqtoDeleteProductSaved
        builder.addCase(reqtoDeleteProductSaved.pending, (state) => {
            state.productSavedLoader = true;
        });
        builder.addCase(reqtoDeleteProductSaved.fulfilled, (state, action) => {
            state.productSavedLoader = false;
        });
        builder.addCase(reqtoDeleteProductSaved.rejected, (state, action) => {
            state.productSavedLoader = false;
        });


        // reqtoMovetoCartProductSaved
        builder.addCase(reqtoMovetoCartProductSaved.pending, (state) => {
            state.productSavedLoader = true;
        });
        builder.addCase(reqtoMovetoCartProductSaved.fulfilled, (state, action) => {
            state.productSavedLoader = false;
        });
        builder.addCase(reqtoMovetoCartProductSaved.rejected, (state, action) => {
            state.productSavedLoader = false;
        });
    }
});

export default AccountSlice.reducer;
export const { editUserProfile, editManageAddress, signOut } = AccountSlice.actions;
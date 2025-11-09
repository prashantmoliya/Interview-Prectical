import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiendpoints } from "../../constants";
import { authHeaders, Axios } from "../helper/Axios";
import { toast } from "react-toastify";
import { unauthorized } from "../helper/Unauthorized";

// reqtoGetProfile
export const reqtoGetProfile = createAsyncThunk("reqtoGetProfile", async (_, { dispatch }) => {
    try {
        const res = await Axios.get(apiendpoints.getProfile, authHeaders("application/json"));

        if (res.data?.status) {
            return res.data;
        } else {
            toast.error(res.data?.message);
        }

    } catch (err) {
        console.error(err);

        if (err?.response?.status === 401) {
            unauthorized(err, dispatch);
        }
    }
});


// reqtoEditProfile
export const reqtoEditProfile = createAsyncThunk("reqtoEditProfile", async (data, { dispatch }) => {
    try {
        const res = await Axios.post(apiendpoints.editProfile, data, authHeaders("multipart/form-data"));

        if (res.data?.status) {
            toast.success(res.data?.message);

            return res.data;
        } else {
            toast.error(res.data?.message);
        }

    } catch (err) {
        console.error(err);

        if (err?.response?.status === 401) {
            unauthorized(err, dispatch);
        }
    }
});


// reqtoUserAddress
export const reqtoUserAddress = createAsyncThunk("reqtoUserAddress", async (_, { dispatch }) => {
    try {
        const res = await Axios.get(apiendpoints.userAddress, authHeaders("application/json"));

        if (res.data?.status) {
            return res.data;
        } else {
            toast.error(res.data?.message);
        }

    } catch (err) {
        console.error(err);

        if (err?.response?.status === 401) {
            unauthorized(err, dispatch);
        }
    }
});


// reqtoUserChangePassword
export const reqtoUserChangePassword = createAsyncThunk("reqtoUserChangePassword", async (data, { dispatch }) => {
    try {
        const res = await Axios.post(apiendpoints.userChangePassword, data, authHeaders("application/json"));

        if (res.data?.status) {
            return res.data;
        } else {
            toast.error(res.data?.message);
        }

    } catch (err) {
        console.error(err);

        if (err?.response?.status === 401) {
            unauthorized(err, dispatch);
        }
    }
});


// reqtoGetManageAddress
export const reqtoGetManageAddress = createAsyncThunk("reqtoGetManageAddress", async (_, { dispatch }) => {
    try {
        const res = await Axios.get(apiendpoints.getManageAddress, authHeaders("application/json"));

        if (res.data?.status) {
            return res.data;
        } else {
            toast.error(res.data?.message);
        }

    } catch (err) {
        console.error(err);

        if (err?.response?.status === 401) {
            unauthorized(err, dispatch);
        }
    }
});


// reqtoAddManageAddress
export const reqtoAddManageAddress = createAsyncThunk("reqtoAddManageAddress", async (data, { dispatch }) => {
    try {
        const res = await Axios.post(apiendpoints.addManageAddress, data, authHeaders("application/json"));

        if (res.data?.status) {
            toast.success(res.data?.message);

            return res.data;
        } else {
            toast.error(res.data?.message)
        }
    } catch (err) {
        console.error(err);

        if (err?.response?.status === 401) {
            unauthorized(err, dispatch);
        }
    }
});


// reqtoEditManageAddress
export const reqtoEditManageAddress = createAsyncThunk("reqtoEditManageAddress", async ({ id, data }, { dispatch }) => {
    try {
        const res = await Axios.post(apiendpoints.editManageAddress.replace(':id', id), data, authHeaders("application/json"));

        if (res.data?.status) {
            toast.success(res.data?.message);

            return res.data;
        } else {
            toast.error(res.data?.message)
        }
    } catch (err) {
        console.error(err);

        if (err?.response?.status === 401) {
            unauthorized(err, dispatch);
        }
    }
});


// reqtoDeleteManageAddress
export const reqtoDeleteManageAddress = createAsyncThunk("reqtoDeleteManageAddress", async (id, { dispatch }) => {
    try {
        const res = await Axios.delete(apiendpoints.deleteManageAddress.replace(':id', id), authHeaders("application/json"));

        if (res.data?.status) {
            toast.success(res.data.message);

            return res.data;
        } else {
            toast.error(res.data?.message);
        }

    } catch (err) {
        console.error(err);

        if (err?.response?.status === 401) {
            unauthorized(err, dispatch);
        }
    }
});


// reqtoSetPrimaryManageAddress
export const reqtoSetPrimaryManageAddress = createAsyncThunk("reqtoSetPrimaryManageAddress", async (id, { dispatch }) => {
    try {
        const res = await Axios.post(apiendpoints.setPrimaryManageAddress.replace(':id', id), {}, authHeaders("application/json"));

        if (res.data?.status) {
            toast.success(res.data.message);

            return res.data;
        } else {
            toast.error(res.data?.message);
        }

    } catch (err) {
        console.error(err);

        if (err?.response?.status === 401) {
            unauthorized(err, dispatch);
        }
    }
});


// reqtoGetOrder
export const reqtoGetOrder = createAsyncThunk("reqtoGetOrder", async ({ filter = '', currency, page = 1, perPage }, { dispatch }) => {
    try {
        const res = await Axios.get(apiendpoints.getOrder, {
            ...authHeaders("application/json"),
            params: {
                ...(filter ? { statusFilter: filter, } : {}),
                ...(currency ? { currency } : {}),
                page,
                perPage
            }
        });

        if (res.data?.status) {
            return res.data;
        } else {
            toast.error(res.data?.message);
        }

    } catch (err) {
        console.error(err);

        if (err?.response?.status === 401) {
            unauthorized(err, dispatch);
        }
    }
});


// reqtoGetOrderDetail
export const reqtoGetOrderDetail = createAsyncThunk("reqtoGetOrderDetail", async ({ id, currency }, { dispatch }) => {
    try {
        const res = await Axios.get(apiendpoints.getOrderDetail.replace(":id", id), {
            ...authHeaders("application/json"),
            params: currency ? { currency } : {}
        });

        if (res.data?.status) {
            return res.data;
        } else {
            toast.error(res.data?.message);
        }

    } catch (err) {
        console.error(err);

        if (err?.response?.status === 401) {
            unauthorized(err, dispatch);
        }
    }
});


// reqtoAddOrder
export const reqtoAddOrder = createAsyncThunk("reqtoAddOrder", async (data, { dispatch }) => {
    try {
        const res = await Axios.post(apiendpoints.addOrder, data, authHeaders("application/json"));

        if (res.data?.status) {
            return res.data;
        } else {
            toast.error(res.data?.message);
        }

    } catch (err) {
        console.error(err);

        if (err?.response?.status === 401) {
            unauthorized(err, dispatch);
        }
    }
});


// reqtoGetWishlist
export const reqtoGetWishlist = createAsyncThunk("reqtoGetWishlist", async (currency, { dispatch }) => {
    try {
        const res = await Axios.get(apiendpoints.getWishlist, {
            ...authHeaders("application/json"),
            params: currency ? { currency } : {}
        });

        if (res.data?.status) {
            return res.data;
        } else {
            toast.error(res.data?.message);
        }

    } catch (err) {
        console.error(err);

        if (err?.response?.status === 401) {
            unauthorized(err, dispatch);
        }
    }
});


// reqtoAddWishlist
export const reqtoAddWishlist = createAsyncThunk("reqtoAddWishlist", async (data, { dispatch }) => {
    try {
        const res = await Axios.post(apiendpoints.addWishlist, data, authHeaders("application/json"));

        if (res.data?.status) {
            toast.success(res.data?.message);

            return res.data;
        } else {
            toast.error(res.data?.message);
        }

    } catch (err) {
        console.error(err);

        if (err?.response?.status === 401) {
            unauthorized(err, dispatch);
        }
    }
});


// reqtoDeleteWishlist
export const reqtoDeleteWishlist = createAsyncThunk("reqtoDeleteWishlist", async (id, { dispatch }) => {
    try {
        const res = await Axios.delete(apiendpoints.deleteWishlist.replace(':id', id), authHeaders("application/json"));

        if (res.data?.status) {
            toast.success(res.data?.message);

            return res.data;
        } else {
            toast.error(res.data?.message);
        }

    } catch (err) {
        console.error(err);

        if (err?.response?.status === 401) {
            unauthorized(err, dispatch);
        }
    }
});


// reqtoGetProductSaved
export const reqtoGetProductSaved = createAsyncThunk("reqtoGetProductSaved", async (currency, { dispatch }) => {
    try {
        const res = await Axios.get(apiendpoints.getProductSaved, {
            ...authHeaders("application/json"),
            params: currency ? { currency } : {}
        });

        if (res.data?.status) {
            return res.data;
        } else {
            toast.error(res.data?.message);
        }

    } catch (err) {
        console.error(err);

        if (err?.response?.status === 401) {
            unauthorized(err, dispatch);
        }
    }
});


// reqtoAddProductSaved
export const reqtoAddProductSaved = createAsyncThunk("reqtoAddProductSaved", async (data, { dispatch }) => {
    try {
        const res = await Axios.post(apiendpoints.addProductSaved, data, authHeaders("application/json"));

        if (res.data?.status) {
            toast.success(res.data?.message);

            return res.data;
        } else {
            toast.error(res.data?.message);
        }

    } catch (err) {
        console.error(err);

        if (err?.response?.status === 401) {
            unauthorized(err, dispatch);
        }
    }
});


// reqtoDeleteProductSaved
export const reqtoDeleteProductSaved = createAsyncThunk("reqtoDeleteProductSaved", async (id, { dispatch }) => {
    try {
        const res = await Axios.delete(apiendpoints.deleteProductSaved.replace(':id', id), authHeaders("application/json"));

        if (res.data?.status) {
            toast.success(res.data?.message);

            return res.data;
        } else {
            toast.error(res.data?.message);
        }

    } catch (err) {
        console.error(err);

        if (err?.response?.status === 401) {
            unauthorized(err, dispatch);
        }
    }
});


// reqtoMovetoCartProductSaved
export const reqtoMovetoCartProductSaved = createAsyncThunk("reqtoMovetoCartProductSaved", async (data, { dispatch }) => {
    try {
        const res = await Axios.post(apiendpoints.movetoCartProductSaved, data, authHeaders("application/json"));

        if (res.data?.status) {
            toast.success(res.data?.message);

            return res.data;
        } else {
            toast.error(res.data?.message);
        }

    } catch (err) {
        console.error(err);

        if (err?.response?.status === 401) {
            unauthorized(err, dispatch);
        }
    }
});



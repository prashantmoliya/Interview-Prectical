import { toast } from "react-toastify";
import { apiendpoints } from "../../../constants/apiendpoint";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminAuthHeaders, Axios } from "../../helper/Axios";
import { adminLogout } from "../../slices/admin/AuthSlice";

// reqtoAdminCheckEmail
export const reqtoAdminCheckEmail = createAsyncThunk("reqtoAdminCheckEmail", async (data) => {
    try {
        const res = await Axios.post(apiendpoints.adminCheckEmail, data);

        if (res.data?.status) {
            if (res.data?.exist) {
                toast.success(res.data.message);
                return res.data;
            } else {
                toast.error(res.data.message);
            }
        } else {
            toast.error(res.data.message);
        }
    } catch (err) {
        throw err
    }
});

// reqtoAdminOtpVerification
export const reqtoAdminOtpVerification = createAsyncThunk("reqtoAdminOtpVerification", async (data) => {
    try {
        const res = await Axios.post(apiendpoints.adminOtpVerification, data);

        if (res.data?.status) {
            toast.success(res.data.message);

            return res.data;
        } else {
            toast.error(res.data.message);
        }
    } catch (err) {
        throw err
    }
});

// reqtoAdminResendOtp
export const reqtoAdminResendOtp = createAsyncThunk("reqtoAdminResendOtp", async (data) => {
    try {
        const res = await Axios.post(apiendpoints.adminResendOtp, data);

        if (res.data?.status) {
            toast.success(res.data.message);

            return res.data;
        } else {
            toast.error(res.data.message);
        }
    } catch (err) {
        throw err
    }
});

// reqtoAdminCompanyPassword
export const reqtoAdminCompanyPassword = createAsyncThunk("reqtoAdminCompanyPassword", async (data) => {
    try {
        const res = await Axios.post(apiendpoints.adminCompanyPassword, data, adminAuthHeaders("application/json"));

        if (res.data?.status) {
            toast.success(res.data.message);

            return res.data;
        } else {
            toast.error(res.data.message);
        }
    } catch (err) {
        if (!err?.response?.data?.status) {
            toast.error(err?.response?.data?.message);
        }
    }
});

// reqtoAdminComplateProfile
export const reqtoAdminComplateProfile = createAsyncThunk("reqtoAdminComplateProfile", async (data) => {
    try {
        const res = await Axios.post(apiendpoints.adminComplateProfile, data, adminAuthHeaders("multipart/form-data"));

        if (res.data?.status) {
            toast.success(res.data.message);

            return res.data;
        } else {
            toast.error(res.data.message);
        }
    } catch (err) {
        if (!err?.response?.data?.status) {
            toast.error(err?.response?.data?.message);
        }
    }
});

// reqtoAdminLogin
export const reqtoAdminLogin = createAsyncThunk("reqtoAdminLogin", async (data) => {
    try {
        const res = await Axios.post(apiendpoints.adminLogin, data);

        if (res.data?.status) {
            toast.success(res.data.message);

            return res.data;
        } else {
            toast.error(res.data.message);
        }
    } catch (err) {
        throw err
    }
});

// reqtoAdminForgetPassword
export const reqtoAdminForgetPassword = createAsyncThunk("reqtoAdminForgetPassword", async (data) => {
    try {
        const res = await Axios.post(apiendpoints.adminForgetPassword, data);

        if (res.data?.status) {
            toast.success(res.data.message);

            return res.data;
        } else {
            toast.error(res.data.message);
        }
    } catch (err) {
        throw err
    }
});

// reqtoAdminLogout
export const reqtoAdminLogout = createAsyncThunk("reqtoAdminLogout", async (_, { rejectWithValue, dispatch }) => {
    try {
        const res = await Axios.get(apiendpoints.adminLogout, adminAuthHeaders("application/json"));

        if (res.data?.status) {
            toast.success(res.data.message);

            return res.data;
        } else {
            toast.error(res.data.message);
        }
    } catch (err) {
        if (err?.response?.status === 401) {
            dispatch(adminLogout());
            toast.error(err?.response?.data?.message)
        }
    }
});




// reqtoAdminCompanyDetail
export const reqtoAdminCompanyDetail = createAsyncThunk("reqtoAdminCompanyDetail", async (_, { rejectWithValue, dispatch }) => {
    try {
        const res = await Axios.get(apiendpoints.adminCompanyDetail, adminAuthHeaders("application/json"));

        if (res.data?.status) {
            return res.data;
        } else {
            toast.error(res.data.message);
        }
    } catch (err) {
        if (err?.response?.status === 401) {
            dispatch(adminLogout());
            toast.error(err?.response?.data?.message)
        }
    }
});

// reqtoAdminCompanyEdit
export const reqtoAdminCompanyEdit = createAsyncThunk("reqtoAdminCompanyEdit", async (data, { rejectWithValue, dispatch }) => {
    try {
        const res = await Axios.put(apiendpoints.adminCompanyEdit, data, adminAuthHeaders("multipart/form-data"));

        if (res.data?.status) {
            toast.success(res.data.message);

            return res.data;
        } else {
            toast.error(res.data.message);
        }
    } catch (err) {
        if (err?.response?.status === 401) {
            dispatch(adminLogout());
            toast.error(err?.response?.data?.message)
        }
    }
});
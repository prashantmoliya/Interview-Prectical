import { createAsyncThunk } from "@reduxjs/toolkit";
import { otpAuthHeaders, Axios, authHeaders } from "../helper/Axios";
import { apiendpoints } from "../../constants";
import { toast } from "react-toastify";
import { signOut } from "../slices/AccountSlice";
import { clearCart } from "../slices/CartSlice";
import { unauthorized } from "../helper/Unauthorized";

// reqtoSignUp
export const reqtoSignUp = createAsyncThunk("reqtoSignUp", async (data) => {
    try {
        const res = await Axios.post(apiendpoints.signUp, data);
        console.log("reqtoSignUp--> Services", res);

        if (res.data?.status) {
            toast.success(res.data?.message);

            return {
                status: res.data?.status,

                email: data.email,
                phone: data.Mobile_number,
            };
        } else {
            toast.error(res.data?.message)
        }
    } catch (err) {
        console.error(err);
    }
});


// reqtoSignInOrSignUpWithGoogle
export const reqtoSignInOrSignUpWithGoogle = createAsyncThunk("reqtoSignInOrSignUpWithGoogle", async (data) => {
    try {
        const res = await Axios.post(apiendpoints.signInOrSignUpWithGoogle, data);
        console.log("reqtoSignInOrSignUpWithGoogle-->", res);

        if (res.data?.status) {
            toast.success(res.data?.message);

            return res.data;
        } else {
            toast.error(res.data?.message)
        }
    } catch (err) {
        console.error(err);
    }
});


// reqtoSignUpOtpMethod
export const reqtoSignUpOtpMethod = createAsyncThunk("reqtoSignUpOtpMethod", async (data) => {
    try {
        const res = await Axios.post(apiendpoints.otpMethod, data);
        console.log("reqtoSignUpOtpMethod--> Services", res);

        if (res.data?.status) {
            toast.success(res.data?.message);

            return {
                status: res.data?.status,

                type: data.type,
                email: data.email,
                phone: data.Mobile_number,
            };
        } else {
            toast.error(res.data?.message)
        }
    } catch (err) {
        console.error(err);
    }
});


// reqtoOtpMethod
export const reqtoOtpMethod = createAsyncThunk("reqtoOtpMethod", async (data) => {
    try {
        const res = await Axios.post(apiendpoints.otpMethod, data);
        console.log("reqtoOtpMethod--> Services", res);

        if (res.data?.status) {
            toast.success(res.data?.message);

            return {
                status: res.data?.status,

                type: data.type,
                email: data.email,
                phone: data.Mobile_number,
            };
        } else {
            toast.error(res.data?.message)
        }
    } catch (err) {
        console.error(err);
    }
});


// reqtoOtpVerification
export const reqtoOtpVerification = createAsyncThunk("reqtoOtpVerification", async (data) => {
    try {
        const res = await Axios.post(apiendpoints.otpVerification, data);
        console.log("reqtoOtpVerification--> Services", res);

        if (res.data?.status) {
            toast.success(res.data?.message);

            return res.data;
        } else {
            toast.error(res.data?.message)
        }
    } catch (err) {
        console.error(err);
    }
});


// reqtoResendOtp
export const reqtoResendOtp = createAsyncThunk("reqtoResendOtp", async (data) => {
    try {
        const res = await Axios.post(apiendpoints.resendOtp, data);
        console.log("reqtoResendOtp--> Services", res);

        if (res.data?.status) {
            toast.success(res.data?.message);

            return {
                status: res.data?.status,

                // type: data.type,
            };
        } else {
            toast.error(res.data?.message)
        }
    } catch (err) {
        console.error(err);
    }
});


// reqtoAddressDetail
export const reqtoAddressDetail = createAsyncThunk("reqtoAddressDetail", async (data) => {
    try {
        const res = await Axios.post(apiendpoints.addressDetail, data, otpAuthHeaders());
        console.log("reqtoAddressDetail--> Services", res);

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


// reqtoSignIn
export const reqtoSignIn = createAsyncThunk("reqtoSignIn", async (data) => {
    try {
        const res = await Axios.post(apiendpoints.signIn, data);
        console.log("reqtoSignIn--> Services", res);

        if (res.data?.status) {
            toast.success(res.data?.message);

            return res.data;
        } else {
            toast.error(res.data?.message)
        }
    } catch (err) {
        console.error(err);
    }
});


// reqtoForgetPassword
export const reqtoForgetPassword = createAsyncThunk("reqtoForgetPassword", async (data) => {
    try {
        const res = await Axios.post(apiendpoints.forgetPassword, data);
        console.log("reqtoForgetPassword--> Services", res);

        if (res.data?.status) {
            // toast.success(res.data?.message);

            return {
                status: res.data?.status,

                email: data.email,
                phone: data.Mobile_number,
            };
        } else {
            toast.error(res.data?.message)
        }
    } catch (err) {
        console.error(err);
    }
});


// reqtoChangePassword
export const reqtoChangePassword = createAsyncThunk("reqtoChangePassword", async (data) => {
    try {
        const res = await Axios.post(apiendpoints.changePassword, data, otpAuthHeaders());
        console.log("reqtoChangePassword--> Services", res);

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


// reqtoSignOut 
export const reqtoSignOut = createAsyncThunk("reqtoSignOut", async (_, { dispatch }) => {
    try {
        const res = await Axios.get(apiendpoints.signOut, authHeaders("application/json"))

        if (res.data?.status) {
            toast.success(res.data?.message);

            dispatch(signOut());
            dispatch(clearCart());
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
})
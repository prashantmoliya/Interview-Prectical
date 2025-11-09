import { createSlice } from "@reduxjs/toolkit";
import { reqtoAdminCheckEmail, reqtoAdminCompanyDetail, reqtoAdminCompanyEdit, reqtoAdminCompanyPassword, reqtoAdminComplateProfile, reqtoAdminForgetPassword, reqtoAdminLogin, reqtoAdminLogout, reqtoAdminOtpVerification, reqtoAdminResendOtp } from "../../services/admin/AuthServices";

const initialState = {
    loader: false,

    exist: false,
    password: false,
    step: null,

    data: null,
    profile: null,

    error: null,

    isOtpVerified: localStorage.getItem("isOtpVerified") === "true" || false,
    isPasswordCreated: localStorage.getItem("isPasswordCreated") === "true" || false,
    isProfileCreated: localStorage.getItem("isProfileCreated") === "true" || false,
}

const AuthSlice = createSlice({
    name: "AuthSlice",
    initialState,
    reducers: {
        adminLogout: (state) => {
            state.loader = false;
            state.exist = false;
            state.password = false;
            state.data = null;
            state.error = null;

            state.isOtpVerified = false;
            state.isPasswordCreated = false;
            state.isProfileCreated = false;

            localStorage.removeItem("admin-token");
            localStorage.removeItem("isOtpVerified");
            localStorage.removeItem("isPasswordCreated");
            localStorage.removeItem("isProfileCreated");
        },
        passwordHide: (state) => {
            state.exist = false;
            state.password = false;
        }
    },
    extraReducers: (builder) => {
        // reqtoAdminCheckEmail
        builder.addCase(reqtoAdminCheckEmail.pending, (state) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(reqtoAdminCheckEmail.fulfilled, (state, action) => {
            state.loader = false;

            state.exist = action.payload?.exist;
            state.password = action.payload?.password;
            state.step = action.payload?.step
        });
        builder.addCase(reqtoAdminCheckEmail.rejected, (state, action) => {
            state.loader = false;
            state.error = null;
        });

        // reqtoAdminOtpVerification    
        builder.addCase(reqtoAdminOtpVerification.pending, (state) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(reqtoAdminOtpVerification.fulfilled, (state, action) => {
            const token = action.payload?.authentication?.accessToken;

            state.loader = false;
            state.exist = action.payload?.exist;
            state.password = false;

            if (token) {
                localStorage.setItem("admin-token", token);
                // localStorage.setItem("forget-password-token", token);
            }
            state.isOtpVerified = true;
            localStorage.setItem("isOtpVerified", "true");
        });
        builder.addCase(reqtoAdminOtpVerification.rejected, (state, action) => {
            state.loader = false;
            state.error = null;
        });

        // reqtoAdminResendOtp
        builder.addCase(reqtoAdminResendOtp.pending, (state) => {
            // state.loader = true;
        });
        builder.addCase(reqtoAdminResendOtp.fulfilled, (state, action) => {
            // state.loader = false;
        });
        builder.addCase(reqtoAdminResendOtp.rejected, (state, action) => {
            // state.loader = false;
        });

        // reqtoAdminCompanyPassword
        builder.addCase(reqtoAdminCompanyPassword.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoAdminCompanyPassword.fulfilled, (state, action) => {
            state.loader = false;

            localStorage.removeItem("forget-password-token");
            state.exist = false;
            state.password = false;

            state.isPasswordCreated = true;
            localStorage.setItem("isPasswordCreated", "true");
        });
        builder.addCase(reqtoAdminCompanyPassword.rejected, (state, action) => {
            state.loader = false;
        });

        // reqtoAdminComplateProfile
        builder.addCase(reqtoAdminComplateProfile.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoAdminComplateProfile.fulfilled, (state, action) => {
            state.loader = false;
            state.password = false;
            state.exist = false;

            state.isProfileCreated = true;
            localStorage.setItem("isProfileCreated", "true");
        });
        builder.addCase(reqtoAdminComplateProfile.rejected, (state, action) => {
            state.loader = false;
        });

        // reqtoAdminLogin
        builder.addCase(reqtoAdminLogin.pending, (state) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(reqtoAdminLogin.fulfilled, (state, action) => {
            const token = action.payload?.data?.authentication?.accessToken;

            state.loader = false;
            // state.exist = action.payload?.exist;

            if (token) {
                localStorage.setItem("admin-token", token);
            }
        });
        builder.addCase(reqtoAdminLogin.rejected, (state, action) => {
            state.loader = false;
            state.error = null;
        });

        // reqtoAdminForgetPassword
        builder.addCase(reqtoAdminForgetPassword.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoAdminForgetPassword.fulfilled, (state, action) => {
            state.loader = false;
            state.password = false;
            state.exist = false;
        });
        builder.addCase(reqtoAdminForgetPassword.rejected, (state, action) => {
            state.loader = false;
        });

        // reqtoAdminLogout
        builder.addCase(reqtoAdminLogout.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoAdminLogout.fulfilled, (state, action) => {
            state.loader = false;
            state.exist = false;
            state.password = false;
            state.data = null;

            state.isOtpVerified = false;
            state.isPasswordCreated = false;
            state.isProfileCreated = false;

            localStorage.removeItem("admin-token");
            localStorage.removeItem("isOtpVerified");
            localStorage.removeItem("isPasswordCreated");
            localStorage.removeItem("isProfileCreated");
        });
        builder.addCase(reqtoAdminLogout.rejected, (state, action) => {
            state.loader = false;
        });




        // reqtoAdminCompanyDetail
        builder.addCase(reqtoAdminCompanyDetail.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoAdminCompanyDetail.fulfilled, (state, action) => {
            state.loader = false;
            state.profile = action.payload?.data;
            state.password = false;
        });
        builder.addCase(reqtoAdminCompanyDetail.rejected, (state, action) => {
            state.loader = false;
        });

        // reqtoAdminCompanyEdit
        builder.addCase(reqtoAdminCompanyEdit.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoAdminCompanyEdit.fulfilled, (state, action) => {
            state.loader = false;
        });
        builder.addCase(reqtoAdminCompanyEdit.rejected, (state, action) => {
            state.loader = false;
        });
    }
});

export default AuthSlice.reducer;
export const { passwordHide, adminLogout } = AuthSlice.actions;
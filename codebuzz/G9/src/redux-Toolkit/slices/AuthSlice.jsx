import { createSlice } from "@reduxjs/toolkit";
import { reqtoAddressDetail, reqtoChangePassword, reqtoForgetPassword, reqtoOtpMethod, reqtoOtpVerification, reqtoResendOtp, reqtoSignIn, reqtoSignInOrSignUpWithGoogle, reqtoSignOut, reqtoSignUp, reqtoSignUpOtpMethod } from "../services/AuthServices";

const checkToken = localStorage.getItem("g9jewellery-user-token");
const googleLogin = localStorage.getItem("g9jewellery-google-login");

const initialState = {
    loader: false,

    signInNUpWithGoogleLoader: false,
    googleLogin: googleLogin || null,

    userToken: checkToken || null,

    email: '',
    phone: '',
    type: '',
    pageType: '',

    error: null,
}

const AuthSlice = createSlice({
    name: "AuthSlice",
    initialState,
    reducers: {
        signUpResendOtp: (state) => {
            state.type = "";
        },
        unauthorizedUser: (state) => {
            localStorage.removeItem("g9jewellery-user-token");
            localStorage.removeItem("g9jewellery-google-login");
            state.userToken = null;
            state.googleLogin = null;
        },
    },
    extraReducers: (builder) => {
        // reqtoSignUp
        builder.addCase(reqtoSignUp.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoSignUp.fulfilled, (state, action) => {
            console.log("reqtoSignUp--> fulfiled", action);

            state.loader = false;

            state.email = action.payload?.email;
            state.phone = action.payload?.phone;
            state.pageType = "sign-up";

            state.type = '';
        });
        builder.addCase(reqtoSignUp.rejected, (state, action) => {
            state.loader = false;
        });


        // reqtoSignInOrSignUpWithGoogle
        builder.addCase(reqtoSignInOrSignUpWithGoogle.pending, (state) => {
            state.signInNUpWithGoogleLoader = true;
        });
        builder.addCase(reqtoSignInOrSignUpWithGoogle.fulfilled, (state, action) => {
            console.log("reqtoSignInOrSignUpWithGoogle--> fulfiled", action);

            const token = action.payload?.data?.authentication?.accessToken;

            state.signInNUpWithGoogleLoader = false;

            if (token) {
                localStorage.setItem("g9jewellery-user-token", token);
                localStorage.setItem("g9jewellery-google-login", true);
                state.userToken = token;
                state.googleLogin = true;
            }
        });
        builder.addCase(reqtoSignInOrSignUpWithGoogle.rejected, (state, action) => {
            state.signInNUpWithGoogleLoader = false;
        });


        // reqtoSignUpOtpMethod
        builder.addCase(reqtoSignUpOtpMethod.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoSignUpOtpMethod.fulfilled, (state, action) => {
            console.log("reqtoSignUp--> fulfiled", action);

            state.loader = false;

            state.type = action.payload?.type;
            state.email = action.payload?.email;
            state.phone = action.payload?.phone;
        });
        builder.addCase(reqtoSignUpOtpMethod.rejected, (state, action) => {
            state.loader = false;
        });


        // reqtoOtpMethod
        builder.addCase(reqtoOtpMethod.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoOtpMethod.fulfilled, (state, action) => {
            console.log("reqtoSignUp--> fulfiled", action);

            state.loader = false;

            state.type = action.payload?.type;
            state.email = action.payload?.email;
            state.phone = action.payload?.phone;
        });
        builder.addCase(reqtoOtpMethod.rejected, (state, action) => {
            state.loader = false;
        });


        // reqtoOtpVerification
        builder.addCase(reqtoOtpVerification.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoOtpVerification.fulfilled, (state, action) => {
            console.log("reqtoOtpVerification--> fulfiled", action);

            const token = action.payload?.data?.authentication?.accessToken;

            state.loader = false;

            if (token) {
                // localStorage.setItem("otp-token", token);
                localStorage.setItem("g9jewellery-user-token", token);

                if (action.payload?.data?.type === "google") {
                    localStorage.setItem("g9jewellery-google-login", true);
                    state.googleLogin = true;
                }

                state.userToken = token;
                state.email = '';
                state.phone = '';
                state.type = '';
                state.pageType = '';
            }
        });
        builder.addCase(reqtoOtpVerification.rejected, (state, action) => {
            state.loader = false;
        });


        // reqtoResendOtp
        builder.addCase(reqtoResendOtp.pending, (state) => {
            // state.loader = true;
        });
        builder.addCase(reqtoResendOtp.fulfilled, (state, action) => {
            console.log("reqtoResendOtp--> fulfiled", action);

            // state.loader = false;
        });
        builder.addCase(reqtoResendOtp.rejected, (state, action) => {
            // state.loader = false;
        });


        // reqtoAddressDetail
        builder.addCase(reqtoAddressDetail.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoAddressDetail.fulfilled, (state, action) => {
            console.log("reqtoAddressDetail--> fulfiled", action);

            state.loader = false;

            if (action.payload?.status) {
                // localStorage.removeItem("otp-token");
                localStorage.removeItem("g9jewellery-user-token");
            }
        });
        builder.addCase(reqtoAddressDetail.rejected, (state, action) => {
            state.loader = false;
        });


        // reqtoSignIn
        builder.addCase(reqtoSignIn.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoSignIn.fulfilled, (state, action) => {
            console.log("reqtoSignIn--> fulfiled", action);

            const token = action.payload?.data?.authentication?.accessToken;

            state.loader = false;

            if (token) {
                localStorage.setItem("g9jewellery-user-token", token);
                state.userToken = token;
            }
        });
        builder.addCase(reqtoSignIn.rejected, (state, action) => {
            state.loader = false;
        });


        // reqtoForgetPassword
        builder.addCase(reqtoForgetPassword.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoForgetPassword.fulfilled, (state, action) => {
            console.log("reqtoForgetPassword--> fulfiled", action);

            state.loader = false;

            // state.email = action.payload?.email;
            // state.phone = action.payload?.phone;
            state.pageType = "forgot-password";

            // state.type = action.payload?.email.includes("@") ? "email" : "select";

        });
        builder.addCase(reqtoForgetPassword.rejected, (state, action) => {
            state.loader = false;
        });


        // reqtoChangePassword
        builder.addCase(reqtoChangePassword.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoChangePassword.fulfilled, (state, action) => {
            console.log("reqtoChangePassword--> fulfiled", action);

            state.loader = false;

            if (action.payload?.status) {
                // localStorage.removeItem("otp-token");
                localStorage.removeItem("g9jewellery-user-token");
            }
        });
        builder.addCase(reqtoChangePassword.rejected, (state, action) => {
            state.loader = false;
        });


        // reqtoSignOut
        builder.addCase(reqtoSignOut.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoSignOut.fulfilled, (state, action) => {
            console.log("reqtoSignOut--> fulfiled", action);

            state.loader = false;

            if (action.payload?.status) {
                localStorage.removeItem("g9jewellery-user-token");
                localStorage.removeItem("g9jewellery-google-login");
                state.userToken = null;
                state.googleLogin = null;
            }
        });
        builder.addCase(reqtoSignOut.rejected, (state, action) => {
            state.loader = false;
        });
    }
});

export default AuthSlice.reducer;
export const { signUpResendOtp, unauthorizedUser } = AuthSlice.actions;
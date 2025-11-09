import { createSlice } from "@reduxjs/toolkit";
import { reqtoSuperAdminLogin } from "../../services/superadmin/AuthServices";

const initialState = {
    loader: false,
    data: null,
    error: null,
};

const AuthSlice = createSlice({
    name: "AuthSlice",
    initialState,
    reducers: {
        logout: (state) => {
            state.loader = false;
            state.data = null;
            state.error = null;
            localStorage.removeItem("superAdmin-token");
        }
    },
    extraReducers: (builer) => {
        // reqtoSuperAdminLogin
        builer.addCase(reqtoSuperAdminLogin.pending, (state) => {
            state.loader = true;
            state.error = null;
        });
        builer.addCase(reqtoSuperAdminLogin.fulfilled, (state, action) => {
            const token = action.payload?.token;

            state.loader = false;
            // state.data = token;

            if (token) {
                localStorage.setItem("superAdmin-token", token);
            }
        });
        builer.addCase(reqtoSuperAdminLogin.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        });
    }
});

export default AuthSlice.reducer;
export const { logout } = AuthSlice.actions;

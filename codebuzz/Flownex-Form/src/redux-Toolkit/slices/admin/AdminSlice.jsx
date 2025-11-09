import { createSlice } from "@reduxjs/toolkit";
import { reqtoAdminAddUser, reqtoAdminDashboard, reqtoAdminDeleteUser, reqtoAdminEditUser, reqtoAdminGetUser, reqtoAdminShareDocFormUser, reqtoAdminShareFormUser, reqtoAdminUserFormPdfDocs, reqtoAdminViewUser, reqtoAdminViewUserDeleteForm, reqtoAdminViewUserGetForm } from "../../services/admin/AdminServices";

const initialState = {
    loader: false,

    dashboard: {},

    usersList: [],
    usersDetail: {},
    usersLoader: false,
    usersFormShareLoader: false,

    usersDetailFormList: [],
    usersDetailFormListLoader: false,
    usersDetailFormShareLoader: false,

    userFormPdfDocsLoader: false,
    userFormPdfDocsList: [],

    deleteLoader: false,

    error: null
}

const AdminSlice = createSlice({
    name: "AdminSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // reqtoAdminDashboard
        builder.addCase(reqtoAdminDashboard.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoAdminDashboard.fulfilled, (state, action) => {
            state.loader = false;
            state.dashboard = action.payload?.data;
        });
        builder.addCase(reqtoAdminDashboard.rejected, (state, action) => {
            state.loader = false;
        });




        // reqtoAdminGetUser
        builder.addCase(reqtoAdminGetUser.pending, (state) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(reqtoAdminGetUser.fulfilled, (state, action) => {
            state.loader = false;
            state.usersList = action.payload?.data;
        });
        builder.addCase(reqtoAdminGetUser.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        });

        // reqtoAdminAddUser
        builder.addCase(reqtoAdminAddUser.pending, (state) => {
            state.usersLoader = true;
        });
        builder.addCase(reqtoAdminAddUser.fulfilled, (state, action) => {
            state.usersLoader = false;
        });
        builder.addCase(reqtoAdminAddUser.rejected, (state, action) => {
            state.usersLoader = false;
        });

        // reqtoAdminDeleteUser
        builder.addCase(reqtoAdminDeleteUser.pending, (state) => {
            state.deleteLoader = true;
        });
        builder.addCase(reqtoAdminDeleteUser.fulfilled, (state, action) => {
            state.deleteLoader = false;
        });
        builder.addCase(reqtoAdminDeleteUser.rejected, (state, action) => {
            state.deleteLoader = false;
        });

        // reqtoAdminEditUser
        builder.addCase(reqtoAdminEditUser.pending, (state) => {
            state.usersLoader = true;
        });
        builder.addCase(reqtoAdminEditUser.fulfilled, (state, action) => {
            state.usersLoader = false;
        });
        builder.addCase(reqtoAdminEditUser.rejected, (state, action) => {
            state.usersLoader = false;
        });

        // reqtoAdminViewUser
        builder.addCase(reqtoAdminViewUser.pending, (state) => {
            state.usersLoader = true;
        });
        builder.addCase(reqtoAdminViewUser.fulfilled, (state, action) => {
            state.usersLoader = false;
            state.usersDetail = action.payload?.data;
        });
        builder.addCase(reqtoAdminViewUser.rejected, (state, action) => {
            state.usersLoader = false;
        });

        // reqtoAdminShareFormUser
        builder.addCase(reqtoAdminShareFormUser.pending, (state) => {
            state.usersFormShareLoader = true;
        });
        builder.addCase(reqtoAdminShareFormUser.fulfilled, (state, action) => {
            state.usersFormShareLoader = false;
        });
        builder.addCase(reqtoAdminShareFormUser.rejected, (state, action) => {
            state.usersFormShareLoader = false;
        });

        // reqtoAdminViewUserGetForm
        builder.addCase(reqtoAdminViewUserGetForm.pending, (state) => {
            state.usersDetailFormListLoader = true;
        });
        builder.addCase(reqtoAdminViewUserGetForm.fulfilled, (state, action) => {
            state.usersDetailFormListLoader = false;
            state.usersDetailFormList = action.payload?.data;
        });
        builder.addCase(reqtoAdminViewUserGetForm.rejected, (state, action) => {
            state.usersDetailFormListLoader = false;
        });


        // reqtoAdminShareDocFormUser
        builder.addCase(reqtoAdminShareDocFormUser.pending, (state) => {
            state.usersFormShareLoader = true;
        });
        builder.addCase(reqtoAdminShareDocFormUser.fulfilled, (state, action) => {
            state.usersFormShareLoader = false;
        });
        builder.addCase(reqtoAdminShareDocFormUser.rejected, (state, action) => {
            state.usersFormShareLoader = false;
        });

        // reqtoAdminViewUserDeleteForm
        builder.addCase(reqtoAdminViewUserDeleteForm.pending, (state) => {
            state.deleteLoader = true;
        });
        builder.addCase(reqtoAdminViewUserDeleteForm.fulfilled, (state, action) => {
            state.deleteLoader = false;
        });
        builder.addCase(reqtoAdminViewUserDeleteForm.rejected, (state, action) => {
            state.deleteLoader = false;
        });

        // reqtoAdminUserFormPdfDocs
        builder.addCase(reqtoAdminUserFormPdfDocs.pending, (state) => {
            state.userFormPdfDocsLoader = true;
        });
        builder.addCase(reqtoAdminUserFormPdfDocs.fulfilled, (state, action) => {
            state.userFormPdfDocsLoader = false;
            state.userFormPdfDocsList = action.payload?.data;
        });
        builder.addCase(reqtoAdminUserFormPdfDocs.rejected, (state, action) => {
            state.userFormPdfDocsLoader = false;
        });
    }
});


export default AdminSlice.reducer;
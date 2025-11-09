import { createSlice } from "@reduxjs/toolkit";
import { reqtoSuperAdminAddCompany, reqtoSuperAdminAddUser, reqtoSuperAdminDashboard, reqtoSuperAdminDeleteCompany, reqtoSuperAdminDeleteContact, reqtoSuperAdminDeleteUser, reqtoSuperAdminEditCompany, reqtoSuperAdminEditUser, reqtoSuperAdminGetCompany, reqtoSuperAdminGetContact, reqtoSuperAdminGetUser, reqtoSuperAdminReplyContact, reqtoSuperAdminStatusCompany, reqtoSuperAdminViewCompany, reqtoSuperAdminViewContact, reqtoSuperAdminViewUser } from "../../services/superadmin/SuperAdminServices";

const initialState = {
    loader: false,

    dashboard: {},

    usersList: [],
    usersDetail: {},

    companyList: [],
    companyDetail: {},
    companyLoader: false,

    contactList: [],
    contactDetail: {},
    contactLoader: false,

    deleteLoader: false,

    error: null,
};

const SuperAdminSlice = createSlice({
    name: "SuperAdminSlice",
    initialState,
    reducers: {},
    extraReducers: (builer) => {
        // reqtoSuperAdminDashboard
        builer.addCase(reqtoSuperAdminDashboard.pending, (state) => {
            state.loader = true;
            state.error = null;
        });
        builer.addCase(reqtoSuperAdminDashboard.fulfilled, (state, action) => {
            state.loader = false;
            state.dashboard = action.payload?.data;
        });
        builer.addCase(reqtoSuperAdminDashboard.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        });




        // reqtoSuperAdminGetUser
        builer.addCase(reqtoSuperAdminGetUser.pending, (state) => {
            state.loader = true;
            state.error = null;
        });
        builer.addCase(reqtoSuperAdminGetUser.fulfilled, (state, action) => {
            state.loader = false;
            state.usersList = action.payload?.data;
        });
        builer.addCase(reqtoSuperAdminGetUser.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        });

        // reqtoSuperAdminAddUser
        builer.addCase(reqtoSuperAdminAddUser.pending, (state) => {
            state.loader = true;
        });
        builer.addCase(reqtoSuperAdminAddUser.fulfilled, (state, action) => {
            state.loader = false;
        });
        builer.addCase(reqtoSuperAdminAddUser.rejected, (state, action) => {
            state.loader = false;
        });

        // reqtoSuperAdminDeleteUser
        builer.addCase(reqtoSuperAdminDeleteUser.pending, (state) => {
            state.deleteLoader = true;
        });
        builer.addCase(reqtoSuperAdminDeleteUser.fulfilled, (state, action) => {
            state.deleteLoader = false;
        });
        builer.addCase(reqtoSuperAdminDeleteUser.rejected, (state, action) => {
            state.deleteLoader = false;
        });

        // reqtoSuperAdminViewUser
        builer.addCase(reqtoSuperAdminViewUser.pending, (state) => {
            state.loader = true;
        });
        builer.addCase(reqtoSuperAdminViewUser.fulfilled, (state, action) => {
            state.loader = false;
            state.usersDetail = action.payload?.data;
        });
        builer.addCase(reqtoSuperAdminViewUser.rejected, (state, action) => {
            state.loader = false;
        });

        // reqtoSuperAdminEditUser
        builer.addCase(reqtoSuperAdminEditUser.pending, (state) => {
            state.loader = true;
        });
        builer.addCase(reqtoSuperAdminEditUser.fulfilled, (state, action) => {
            state.loader = false;
        });
        builer.addCase(reqtoSuperAdminEditUser.rejected, (state, action) => {
            state.loader = false;
        });




        // reqtoSuperAdminGetCompany
        builer.addCase(reqtoSuperAdminGetCompany.pending, (state) => {
            state.loader = true;
            state.error = null;
        });
        builer.addCase(reqtoSuperAdminGetCompany.fulfilled, (state, action) => {
            state.loader = false;
            state.companyList = action.payload?.data;
        });
        builer.addCase(reqtoSuperAdminGetCompany.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        });

        // reqtoSuperAdminStatusCompany
        builer.addCase(reqtoSuperAdminStatusCompany.pending, (state) => {
            // state.loader = true;
            state.error = null;
        });
        builer.addCase(reqtoSuperAdminStatusCompany.fulfilled, (state, action) => {
            // state.loader = false;

            state.companyList = state?.companyList.map((i) =>
                i.id === action.payload?.id ?
                    { ...i, status: i.status === "Active" ? "Inactive" : "Active" }
                    :
                    i
            );
        });
        builer.addCase(reqtoSuperAdminStatusCompany.rejected, (state, action) => {
            // state.loader = false;
            state.error = action.payload;
        });

        // reqtoSuperAdminAddCompany
        builer.addCase(reqtoSuperAdminAddCompany.pending, (state) => {
            state.companyLoader = true;
        });
        builer.addCase(reqtoSuperAdminAddCompany.fulfilled, (state, action) => {
            state.companyLoader = false;
        });
        builer.addCase(reqtoSuperAdminAddCompany.rejected, (state, action) => {
            state.companyLoader = false;
        });

        // reqtoSuperAdminDeleteCompany
        builer.addCase(reqtoSuperAdminDeleteCompany.pending, (state) => {
            state.deleteLoader = true;
        });
        builer.addCase(reqtoSuperAdminDeleteCompany.fulfilled, (state, action) => {
            state.deleteLoader = false;
        });
        builer.addCase(reqtoSuperAdminDeleteCompany.rejected, (state, action) => {
            state.deleteLoader = false;
        });

        // reqtoSuperAdminViewCompany
        builer.addCase(reqtoSuperAdminViewCompany.pending, (state) => {
            state.companyLoader = true;
        });
        builer.addCase(reqtoSuperAdminViewCompany.fulfilled, (state, action) => {
            state.companyLoader = false;
            state.companyDetail = action.payload?.data;
        });
        builer.addCase(reqtoSuperAdminViewCompany.rejected, (state, action) => {
            state.companyLoader = false;
        });

        // reqtoSuperAdminEditCompany
        builer.addCase(reqtoSuperAdminEditCompany.pending, (state) => {
            state.companyLoader = true;
        });
        builer.addCase(reqtoSuperAdminEditCompany.fulfilled, (state, action) => {
            state.companyLoader = false;
        });
        builer.addCase(reqtoSuperAdminEditCompany.rejected, (state, action) => {
            state.companyLoader = false;
        });

        // reqtoSuperAdminGetContact
        builer.addCase(reqtoSuperAdminGetContact.pending, (state) => {
            state.loader = true;
        });
        builer.addCase(reqtoSuperAdminGetContact.fulfilled, (state, action) => {
            state.loader = false;
            state.contactList = action.payload?.data;
        });
        builer.addCase(reqtoSuperAdminGetContact.rejected, (state, action) => {
            state.loader = false;
        });

        // reqtoSuperAdminViewContact
        builer.addCase(reqtoSuperAdminViewContact.pending, (state) => {
            state.contactLoader = true;
        });
        builer.addCase(reqtoSuperAdminViewContact.fulfilled, (state, action) => {
            state.contactLoader = false;
            state.contactDetail = action.payload?.data;
        });
        builer.addCase(reqtoSuperAdminViewContact.rejected, (state, action) => {
            state.contactLoader = false;
        });

        // reqtoSuperAdminReplyContact
        builer.addCase(reqtoSuperAdminReplyContact.pending, (state) => {
            state.contactLoader = true;
        });
        builer.addCase(reqtoSuperAdminReplyContact.fulfilled, (state, action) => {
            state.contactLoader = false;
        });
        builer.addCase(reqtoSuperAdminReplyContact.rejected, (state, action) => {
            state.contactLoader = false;
        });

        // reqtoSuperAdminDeleteContact
        builer.addCase(reqtoSuperAdminDeleteContact.pending, (state) => {
            state.deleteLoader = true;
        });
        builer.addCase(reqtoSuperAdminDeleteContact.fulfilled, (state, action) => {
            state.deleteLoader = false;
        });
        builer.addCase(reqtoSuperAdminDeleteContact.rejected, (state, action) => {
            state.deleteLoader = false;
        });


    }
});

export default SuperAdminSlice.reducer;
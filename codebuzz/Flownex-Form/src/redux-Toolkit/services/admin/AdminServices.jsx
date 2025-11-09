import { toast } from "react-toastify";
import { apiendpoints } from "../../../constants/apiendpoint";
import { adminAuthHeaders, Axios } from "../../helper/Axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminLogout } from "../../slices/admin/AuthSlice";

// reqtoAdminDashboard
export const reqtoAdminDashboard = createAsyncThunk("reqtoAdminDashboard", async (_, { rejectWithValue, dispatch }) => {
    try {
        const res = await Axios.get(apiendpoints.adminDashboard, adminAuthHeaders("application/json"));

        if (res.data?.status) {
            return res.data;
        } else {
            toast.error(res.data?.message)
        }
    } catch (err) {
        if (err?.response?.status === 401) {
            dispatch(adminLogout());
            toast.error(err?.response?.data?.message)
        }
    }
});




// reqtoAdminGetUser
export const reqtoAdminGetUser = createAsyncThunk("reqtoAdminGetUser", async (_, { rejectWithValue, dispatch }) => {
    try {
        const res = await Axios.get(apiendpoints.adminGetUser, adminAuthHeaders("application/json"));

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

// reqtoAdminAddUser
export const reqtoAdminAddUser = createAsyncThunk("reqtoAdminAddUser", async (data, { rejectWithValue, dispatch }) => {
    try {
        const res = await Axios.post(apiendpoints.adminAddUser, data, adminAuthHeaders("application/json"));

        if (res.data?.status) {
            toast.success(res.data.message);

            localStorage.setItem("form-type", "Form");
            localStorage.setItem("form-userUniqueId", data?.userUniqueId);
            localStorage.setItem("form-formUniqueId", data?.formUniqueId);

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

// reqtoAdminDeleteUser
export const reqtoAdminDeleteUser = createAsyncThunk("reqtoAdminDeleteUser", async (id, { rejectWithValue, dispatch }) => {
    try {
        const res = await Axios.delete(apiendpoints.adminDeleteUser.replace(":id", id), adminAuthHeaders("application/json"));

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

// reqtoAdminEditUser
export const reqtoAdminEditUser = createAsyncThunk("reqtoAdminEditUser", async (data, { rejectWithValue, dispatch }) => {
    try {
        const res = await Axios.put(apiendpoints.adminEditUser.replace(":id", data?.id), data, adminAuthHeaders("application/json"));

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

// reqtoAdminViewUser
export const reqtoAdminViewUser = createAsyncThunk("reqtoAdminViewUser", async (id, { rejectWithValue, dispatch }) => {
    try {
        const res = await Axios.get(apiendpoints.adminViewUser.replace(":id", id), adminAuthHeaders("application/json"));

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

// reqtoAdminShareFormUser
export const reqtoAdminShareFormUser = createAsyncThunk("reqtoAdminShareFormUser", async ({ id, data }, { rejectWithValue, dispatch }) => {
    try {
        const res = await Axios.post(apiendpoints.adminShareForm.replace(":id", id), data, adminAuthHeaders("application/json"));

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

// reqtoAdminViewUserGetForm  
export const reqtoAdminViewUserGetForm = createAsyncThunk("reqtoAdminViewUserGetForm", async (id, { rejectWithValue, dispatch }) => {
    try {
        const res = await Axios.get(apiendpoints.adminViewUserGetForm.replace(":id", id), adminAuthHeaders("application/json"));

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

// reqtoAdminShareDocFormUser 
export const reqtoAdminShareDocFormUser = createAsyncThunk("reqtoAdminShareDocFormUser", async ({ id, data }, { rejectWithValue, dispatch }) => {
    try {
        const res = await Axios.post(apiendpoints.adminShareDocForm.replace(":userId", id?.userId).replace(":userFormId", id?.userFormId), data, adminAuthHeaders("application/json"));

        if (res.data?.status) {
            return res.data; userFormId
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

// reqtoAdminViewUserDeleteForm
export const reqtoAdminViewUserDeleteForm = createAsyncThunk("reqtoAdminViewUserDeleteForm", async ({ id }, { rejectWithValue, dispatch }) => {
    try {
        const res = await Axios.delete(apiendpoints.adminViewUserDeleteForm.replace(":userId", id?.userId).replace(":userFormId", id?.userFormId), adminAuthHeaders("application/json"));

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

// reqtoAdminUserFormPdfDocs
export const reqtoAdminUserFormPdfDocs = createAsyncThunk("reqtoAdminUserFormPdfDocs", async ({ userId, userFormId }, { rejectWithValue, dispatch }) => {
    try {
        const res = await Axios.get(apiendpoints.adminUserFormPdfDocs.replace(":userId", userId).replace(":userFormId", userFormId), adminAuthHeaders("application/json"));

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
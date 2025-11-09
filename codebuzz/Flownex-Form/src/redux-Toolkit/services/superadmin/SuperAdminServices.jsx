import { createAsyncThunk } from "@reduxjs/toolkit";
import { authHeaders, Axios } from "../../helper/Axios";
import { apiendpoints } from "../../../constants/apiendpoint";
import { toast } from "react-toastify";

// reqtoSuperAdminDashboard
export const reqtoSuperAdminDashboard = createAsyncThunk("reqtoSuperAdminDashboard", async (_, { rejectWithValue }) => {
    try {
        const res = await Axios.get(apiendpoints.dashboard, authHeaders());

        if (res.data?.status) {
            return res.data;
        } else {
            toast.error(res.data.message);
        }

    } catch (err) {
        throw err
    }
});




// reqtoSuperAdminGetUser
export const reqtoSuperAdminGetUser = createAsyncThunk("reqtoSuperAdminGetUser", async (data, { rejectWithValue }) => {
    try {
        const res = await Axios.get(apiendpoints.getUser, authHeaders());

        if (res.data?.status) {
            return res.data;
        } else {
            toast.error(res.data.message);
        }

    } catch (err) {
        throw err
    }
});

// reqtoSuperAdminAddUser
export const reqtoSuperAdminAddUser = createAsyncThunk("reqtoSuperAdminAddUser", async (data, { rejectWithValue }) => {
    try {
        const res = await Axios.post(apiendpoints.addUser, data, authHeaders());

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

// reqtoSuperAdminDeleteUser
export const reqtoSuperAdminDeleteUser = createAsyncThunk("reqtoSuperAdminDeleteUser", async (id, { rejectWithValue }) => {
    try {
        const res = await Axios.delete(apiendpoints.deleteUser.replace(":id", id), authHeaders());

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

// reqtoSuperAdminViewUser
export const reqtoSuperAdminViewUser = createAsyncThunk("reqtoSuperAdminViewUser", async (id, { rejectWithValue }) => {
    try {
        const res = await Axios.get(apiendpoints.viewUser.replace(":id", id), authHeaders());

        if (res.data?.status) {
            return res.data;
        } else {
            toast.error(res.data.message);
        }

    } catch (err) {
        throw err
    }
});

// reqtoSuperAdminEditUser
export const reqtoSuperAdminEditUser = createAsyncThunk("reqtoSuperAdminEditUser", async (data, { rejectWithValue }) => {
    try {
        const res = await Axios.put(apiendpoints.editUser.replace(":id", data?.id), data, authHeaders());

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




// reqtoSuperAdminGetCompany
export const reqtoSuperAdminGetCompany = createAsyncThunk("reqtoSuperAdminGetCompany", async (data, { rejectWithValue }) => {
    try {
        const res = await Axios.get(apiendpoints.getCompany, authHeaders());

        if (res.data?.status) {
            return res.data;
        } else {
            toast.error(res.data.message);
        }

    } catch (err) {
        throw err
    }
});

// reqtoSuperAdminStatusCompany
export const reqtoSuperAdminStatusCompany = createAsyncThunk("reqtoSuperAdminStatusCompany", async (id, { rejectWithValue }) => {
    try {
        const res = await Axios.get(apiendpoints.statusCompany.replace(":id", id), authHeaders());

        if (res.data?.status) {
            toast.success(res.data.message);

            return {
                id: id,
                status: res.data?.status,
            };
        } else {
            toast.error(res.data.message);
        }

    } catch (err) {
        throw err
    }
});

// reqtoSuperAdminAddCompany
export const reqtoSuperAdminAddCompany = createAsyncThunk("reqtoSuperAdminAddCompany", async (data, { rejectWithValue }) => {
    try {
        const res = await Axios.post(apiendpoints.addCompany, data, authHeaders());

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

// reqtoSuperAdminDeleteCompany
export const reqtoSuperAdminDeleteCompany = createAsyncThunk("reqtoSuperAdminDeleteCompany", async (id, { rejectWithValue }) => {
    try {
        const res = await Axios.delete(apiendpoints.deleteCompany.replace(":id", id), authHeaders());

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

// reqtoSuperAdminViewCompany
export const reqtoSuperAdminViewCompany = createAsyncThunk("reqtoSuperAdminViewCompany", async (id, { rejectWithValue }) => {
    try {
        const res = await Axios.get(apiendpoints.viewCompany.replace(":id", id), authHeaders());

        if (res.data?.status) {
            return res.data;
        } else {
            toast.error(res.data.message);
        }

    } catch (err) {
        throw err
    }
});

// reqtoSuperAdminEditCompany
export const reqtoSuperAdminEditCompany = createAsyncThunk("reqtoSuperAdminEditCompany", async (data, { rejectWithValue }) => {
    try {
        const res = await Axios.put(apiendpoints.editCompany.replace(":id", data?.id), data, authHeaders());

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

// reqtoSuperAdminGetContact
export const reqtoSuperAdminGetContact = createAsyncThunk("reqtoSuperAdminGetContact", async (data, { rejectWithValue }) => {
    try {
        const res = await Axios.get(apiendpoints.getContact, authHeaders());

        if (res.data?.status) {
            return res.data;
        } else {
            toast.error(res.data.message);
        }

    } catch (err) {
        throw err
    }
});

// reqtoSuperAdminViewContact
export const reqtoSuperAdminViewContact = createAsyncThunk("reqtoSuperAdminViewContact", async (id, { rejectWithValue }) => {
    try {
        const res = await Axios.get(apiendpoints.viewContact.replace(":id", id), authHeaders());

        if (res.data?.status) {
            return res.data;
        } else {
            toast.error(res.data.message);
        }

    } catch (err) {
        throw err
    }
});

// reqtoSuperAdminReplyContact
export const reqtoSuperAdminReplyContact = createAsyncThunk("reqtoSuperAdminReplyContact", async ({ id, data }) => {
    try {
        const res = await Axios.post(apiendpoints.replyContact.replace(":id", id), data, authHeaders());

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

// reqtoSuperAdminDeleteContact
export const reqtoSuperAdminDeleteContact = createAsyncThunk("reqtoSuperAdminDeleteContact", async (id, { rejectWithValue }) => {
    try {
        const res = await Axios.delete(apiendpoints.deleteContact.replace(":id", id), authHeaders());

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

import axios from "axios";
import { adduser, deleteuser, edituser, erroruser, requestuser, updateuser, viewuser } from "../Action"
import { toast } from "react-toastify";


export const getasyncuser = () => {
    return (async (dispatch) => {
        dispatch(requestuser());

        try {
            const res = await axios.get(`${import.meta.env.VITE_APP_USER_API}/user`);

            console.log("Api Get++", res);

            if (res.status === 200) {
                dispatch(viewuser(res.data));
            }
        } catch (err) {
            console.error("Api Get Error++", err);

            if (err.response.status === 404) {
                dispatch(erroruser(err.response.data));
            }
        }
    })
}

export const postasyncuser = (user) => {
    return (async (dispatch) => {
        dispatch(requestuser());

        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_USER_API}/user`, user, {
                headers : {
                    "Content-Type": "application/json",
                }
            });

            console.log("Api Post++", res);

            if (res.status === 201) {
                dispatch(adduser(res.data));

                toast.success("User SuccessFuly Added");
            }
        } catch (err) {
            console.error("Api Post Error++", err);

            if (err.response.status === 404) {
                dispatch(erroruser(err.response.data));
            }
        }
    })
}

export const deleteasyncuser = (uid) => {
    return (async (dispatch) => {
        dispatch(requestuser());

        try {
            const res = await axios.delete(`${import.meta.env.VITE_APP_USER_API}/user/${uid}`);

            console.log("Api Delete++", res);

            if (res.status === 200) {
                dispatch(deleteuser(uid));

                toast.success("User SuccessFuly Deleted");
            }
        } catch (err) {
            console.error("Api Delete Error++", err);

            if (err.response.status === 404) {
                dispatch(erroruser(err.response.data));
            }
        }
    })
}

export const getsingleasyncuser = (eid) => {
    return (async (dispatch) => {
        dispatch(requestuser());

        try {
            const res = await axios.get(`${import.meta.env.VITE_APP_USER_API}/user/${eid}`);

            console.log("Api Get-User++", res);

            if (res.status === 200) {
                dispatch(edituser(res.data));
            }
        } catch (err) {
            console.error("Api Get-User Error++", err);

            if (err.response.status === 404) {
                dispatch(erroruser(err.response.data));
            }
        }
    })
}

export const updateasyncuser = (uid, user) => {
    return (async (dispatch) => {
        dispatch(requestuser());

        try {
            const res = await axios.put(`${import.meta.env.VITE_APP_USER_API}/user/${uid}`, user);

            console.log("Api Put++", res);

            if (res.status === 200) {
                dispatch(updateuser(res.data));

                toast.success("User SuccessFuly Updated");
            }
        } catch (err) {
            console.error("Api Put Error++", err);

            if (err.response.status === 404) {
                dispatch(erroruser(err.response.data));
            }
        }
    })
}
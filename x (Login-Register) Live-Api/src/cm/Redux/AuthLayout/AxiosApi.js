import axios from "axios"
import { error, loginget, loginpost, logout, profileput, registerget, registerpost, request } from "./Action";
import { toast } from "react-toastify";

export const registerpostdata = (obj) => {
    return (async (dispatch) => {
        dispatch(request());

        await axios.post("http://localhost:4000/register", obj)
        .then((res)=>{
            console.log("APi Register Post++", res);

            if(res.status== 201){
                toast.success("Register SuccessFul");

                dispatch(registerpost(res.data));
            }
        })
        .catch((err)=>{
            console.error("APi Register Post Error++", err);

            if(err.message== "Network Error"){
                toast.error(err.message);
            }

            if(err?.response?.status== 404){
                toast.error(err.message);

                dispatch(error(err.message))
            }
        })
    })
}

export const registergetdata = () =>{
    return (async (dispatch) => {
        dispatch(request());

        await axios.get("http://localhost:4000/register")
        .then((res)=>{
            console.log("APi Register Get++", res);

            if(res.status== 200){
                dispatch(registerget(res.data));
            }
        })
        .catch((err)=>{
            console.error("APi Register Get Error++", err);

            if(err.message== "Network Error"){
                toast.error(err.message);
            }
            
            if(err?.response?.status== 404){
                dispatch(error(err.message));
            }
        })
    })
}

export const loginpostuser = (obj) => {
    return (async (dispatch) => {

        axios.post("http://localhost:4000/login", obj)
            .then((res) => {
                console.log("APi Login Post++", res);

                if(res.status== 201){
                    toast.success("Login SuccessFul");

                    dispatch(loginpost(res.data));
                }
            })
            .catch((err) => {
                console.error("APi Login Post Error++", err);

                if(err.message== "Network Error"){
                    toast.error(err.message);
                }

                if(err?.response?.status== 404){
                    toast.error(err.message);

                    dispatch(error(err.message));
                }
            })
    })
}

export const logingetuser = () =>{
    return (async (dispatch) => {
        dispatch(request());

        await axios.get("http://localhost:4000/login")
        .then((res)=>{
            console.log("APi Login Get++", res);
            
            if(res.status== 200){
                dispatch(loginget(res.data));
            }
        })
        .catch((err)=>{
            console.error("APi Login Get Error++", err);

            if(err.message== "Network Error"){
                toast.error(err.message);
            }

            if(err?.response?.status== 404){
                dispatch(error(err.message));
            }
        })
    })
}

export const profileupdatedata = (id, upd) => {
    return (async (dispatch) => {

        axios.put(`http://localhost:4000/login/${id}`, upd)
        axios.put(`http://localhost:4000/register/${id}`, upd)
            .then((res) => {
                console.log("APi Profile Put++", res);

                if(res.status== 200){
                    toast.success("Profile Update SuccessFul");

                    dispatch(profileput());
                
                    dispatch(logingetuser());
                    dispatch(registergetdata());
                }
            })
            .catch((err) => {
                console.error("APi Profile Put Error++", err);

                if(err.message== "Network Error"){
                    toast.error(err.message);
                }

                if(err?.response?.status== 404){
                    toast.error(err.message);
                    
                    dispatch(error(err.message));
                }
            })
    })
}

export const logoutuser = (id) => {
    return (async (dispatch) => {

        axios.delete(`http://localhost:4000/login/${id}`)
            .then((res) => {
                console.log("APi Logout++", res);

                if(res.status== 200){
                    toast.success("Logout SuccessFul");
                    
                    dispatch(logout());
                    
                    dispatch(logingetuser());
                }
            })
            .catch((err) => {
                console.error("APi Logout Error++", err);

                if(err.message== "Network Error"){
                    toast.error(err.message);
                }

                if(err?.response?.status== 404) {
                    toast.error(err.message);

                    dispatch(error(err.message));
                }
            })
    })
}
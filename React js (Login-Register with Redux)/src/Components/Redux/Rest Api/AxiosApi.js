import axios from "axios";
import { error, loginget, loginpost, loginput, logout, registerget, registerpost, registerput, request } from "../Action";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


<ToastContainer />

export const registergetdata = () => {
    return (async (dispatch) => {
        dispatch(request());

        await axios.get("http://localhost:4000/redux-register")
            .then((res) => {
                console.log("Register Api Get++", res);

                if(res?.status=== 200){
                    dispatch(registerget(res.data));
                }
            })
            .catch((err) => {
                console.error("Register Api Get Error++", err);

                if(err.response?.status=== 404){
                    dispatch(error(err.message));

                    toast.error(err.response.data, {
                        position: "top-center",
                        autoClose: 3000,
                    });
                }
                else if(err.message=== "Network Error"){
                    toast.error(err.message, {
                        position: "top-center",
                        autoClose: 3000,
                    });
                }
            })
    })
};

export const registerpostdata = (add) => {
    return (async (dispatch) => {
        dispatch(request());

        await axios.post("http://localhost:4000/redux-register", add)
            .then((res) => {
                console.log("Register Api Post++", res);

                if (res?.status === 201) {
                    dispatch(registerpost(res.data));

                    toast.success("User SuccessFully Register", {
                        position: "top-center",
                        autoClose: 3000,
                    });
                }
            })
            .catch((err) => {
                console.error("Register Api Post Error++", err);

                if (err.response?.status === 404) {
                    dispatch(error(err.message));

                    toast.error(err.response.data, {
                        position: "top-center",
                        autoClose: 3000,
                    });
                }
                else if(err.message=== "Network Error"){
                    toast.error(err.message, {
                        position: "top-center",
                        autoClose: 3000,
                    });
                }
            })
    })
};

export const registerputdata = (id, upd) => {
    return (async (dispatch) => {
        dispatch(request());

        await axios.put("http://localhost:4000/redux-register/"+ id, upd)
            .then((res) => {
                console.log("Register Api Put++", res);

                if(res?.status=== 200){
                    dispatch(registerput());
                    dispatch(registergetdata());
                }
            })
            .catch((err) => {
                console.error("Register Api Put Error++", err);

                if(err.response?.status=== 404){
                    dispatch(error(err.message));

                    toast.error(err.response.data, {
                        position: "top-center",
                        autoClose: 3000,
                    });
                }
            })
    })
};

export const logingetuser = () => {
    return (async (dispatch) => {
        dispatch(request());

        await axios.get("http://localhost:4000/redux-login")
            .then((res) => {
                console.log("Login Api Get++", res);

                if(res?.status=== 200){
                    dispatch(loginget(res.data));
                }
            })
            .catch((err) => {
                console.error("Login Api Get Error++", err);

                if(err.response?.status=== 404){
                    dispatch(error(err.message));
                    
                    toast.error(err.response.data, {
                        position: "top-center",
                        autoClose: 3000,
                    }); 
                }
                else if(err.message=== "Network Error"){
                    toast.error(err.message, {
                        position: "top-center",
                        autoClose: 3000,
                    });
                }
            })
    })
}

export const loginpostuser = (user) => {
    return (async (dispatch) => {
        dispatch(request());

        await axios.post("http://localhost:4000/redux-login", user)
            .then((res) => {
                console.log("Login Api Post++", res);

                if(res?.status=== 201){
                    dispatch(loginpost(res.data))

                    toast.success("User SuccessFully Login", {
                        position: "top-center",
                        autoClose: 3000,
                    });
                }
            })
            .catch((err) => {
                console.error("Login Api Post Error++", err);

                if(err.response?.status=== 404){
                    dispatch(error(err.message));

                    toast.error(err.response.data, {
                        position: "top-center",
                        autoClose: 3000,
                    });
                }
            })
    })
};

export const loginputuser = (id, upd) => {
    return (async (dispatch) => {
        dispatch(request());

        await axios.put("http://localhost:4000/redux-login/"+ id, upd)
            .then((res) => {
                console.log("Login Api Put++", res);

                if(res?.status=== 200){
                    dispatch(loginput());
                    dispatch(logingetuser());

                    toast.success("Profile SuccessFully Update", {
                        position: "top-center",
                        autoClose: 3000,
                    });
                }
            })
            .catch((err) => {
                console.error("Login Api Put Error++", err);

                if(err.response?.status=== 404){
                    dispatch(error(err.message));

                    toast.error(err.response.data, {
                        position: "top-center",
                        autoClose: 3000,
                    });
                }
                else if(err.message=== "Network Error"){
                    toast.error(err.message, {
                        position: "top-center",
                        autoClose: 3000,
                    });
                }
            })
    })
};

export const logoutuser = (Did) => {
    return (async (dispatch) => {
        dispatch(request());

        await axios.delete("http://localhost:4000/redux-login/" + Did)
            .then((res) => {
                console.log("Logout Api Delete", res);

                if(res?.status=== 200){
                    dispatch(logout());
                    
                    dispatch(logingetuser())

                    toast.success("User SuccessFully Logout", {
                        position: "top-center",
                        autoClose: 3000,
                    });
                }
            })
            .catch((err) => {
                console.error("Logout Api Delete Error++", err);

                if(err.response?.status=== 404){
                    dispatch(error(err.message));
                    
                    toast.error(err.response.data, {
                        position: "top-center",
                        autoClose: 3000,
                    });
                }
                else if(err.message=== "Network Error"){
                    toast.error(err.message, {
                        position: "top-center",
                        autoClose: 3000,
                    });
                }
            })
    })
};


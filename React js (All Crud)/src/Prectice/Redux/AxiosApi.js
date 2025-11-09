// import axios from "axios"
// import { request, success, error } from "./Action";

import { error, request, userdelete, useredit, userget, userpost, userupdate } from "./Action";
import axios from "axios"

// export const fetchdata = () => {
//     return (dispatch) => {
//         dispatch(request());

//         axios.get('http://localhost:4000/user') 
//         .then((res) => {
//             // console.log('Get++', res.data)
//             dispatch(success(res.data))
//         })
//         .catch((err) => {
//             // console.log('Error++', err.message)
//             dispatch(error(err.message))
//         });
//     }
// }

export const usergetdata = () => {
    return (dispatch) => {
        dispatch(request());

        axios.get("http://localhost:4000/reduxuser")
            .then((res) => {
                console.log('Redux Axios Api Get++', res);

                dispatch(userget(res.data));
            })
            .catch((err) => {
                console.log('Redux Axios Api Get Error++', err);

                dispatch(error(err.message))
            })
    }
}

export const userpostdate = (obj) => {
    return (dispatch) => {
        dispatch(request());

        axios.post("http://localhost:4000/reduxuser", obj)
            .then((res) => {
                console.log('Redux Axios Api Post++', res);

                dispatch(userpost(res.data));
            })
            .catch((err) => {
                console.log('Redux Axios Api Post Error++', err);

                dispatch(error(err.message));
            })
    }
}

export const userdeletedata = (Did) => {
    return (dispatch) => {
        dispatch(request());

        axios.delete("http://localhost:4000/reduxuser/" + Did)
            .then((res) => {
                console.log('Redux Axios Api Delete++', res);

                dispatch(userdelete());

                dispatch(usergetdata());
            })
            .catch((err) => {
                console.log('Redux Axios Api Delete Error++', err);

                dispatch(error(err.message));
            })
    }
}

export const usereditdata = (Eid) => {
    return (dispatch) => {
        dispatch(request());

        axios.get("http://localhost:4000/reduxuser/" + Eid)
            .then((res) => {
                console.log('Redux Axios Api Edit++', res);

                dispatch(useredit(res.data));
            })
            .catch((err) => {
                console.log('Redux Axios Api Edit Error++', err);

                dispatch(error(err.message));
            })

    }
}

export const userupdatedata = (id, upd) => {
    return (dispatch) => {
        dispatch(request());

        axios.put("http://localhost:4000/reduxuser/" + id, upd)
            .then((res) => {
                console.log('Redux Axios Api Update++', res);

                dispatch(userupdate());

                dispatch(usergetdata());
            })
            .catch((err) => {
                console.log('Redux Axios Api Update Error++', err);

                dispatch(error(err.message));
            })
    }
}

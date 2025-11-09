import { DELETE_USER, ERROR_USER, GET_SINGLE_USER, GET_USER, POST_USER, PUT_USER, REQUEST_USER } from "./ActionType";

export const requestuser = () =>{
    return {
        type: REQUEST_USER,
    }
}

export const erroruser = (err) =>{
    return {
        type: ERROR_USER,
        payload: err,
    }
}

export const adduser = (data) =>{
    return {
        type: POST_USER,
        payload : data,
    }
}

export const viewuser = (data) =>{
    return {
        type: GET_USER,
        payload : data,
    }
}

export const deleteuser = (id) =>{
    return {
        type: DELETE_USER,
        payload : id,
    }
}

export const edituser = (data) =>{
    return {
        type: GET_SINGLE_USER,
        payload : data,
    }
}

export const updateuser = (data) =>{
    return {
        type: PUT_USER,
        payload : data,
    }
}

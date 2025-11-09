import { DELETE_USER_ERROR, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, GET_SINGLE_USER_ERROR, GET_SINGLE_USER_REQUEST, GET_SINGLE_USER_SUCCESS, GET_USER_ERROR, GET_USER_REQUEST, GET_USER_SUCCESS, POST_USER_ERROR, POST_USER_REQUEST, POST_USER_SUCCESS, PUT_USER_ERROR, PUT_USER_REQUEST, PUT_USER_SUCCESS } from "./ActionType";

export const getuserdatarequest = () => ({
    type: GET_USER_REQUEST,
});

export const getuserdatasuccess = (data) => ({
    type: GET_USER_SUCCESS,
    payload: data,
});

export const getuserdataerror = (erro) => ({
    type: GET_USER_ERROR,
    payload: erro,
});


export const postuserdatarequest = () => ({
    type: POST_USER_REQUEST,
});

export const postuserdatasuccess = (data) => ({
    type: POST_USER_SUCCESS,
    payload: data,
});

export const postuserdataerror = (erro) => ({
    type: POST_USER_ERROR,
    payload: erro,
});


export const deleteuserdatarequest = () => ({
    type: DELETE_USER_REQUEST,
});

export const deleteuserdata = (data) => ({
    type: DELETE_USER_SUCCESS,
    payload: data,
});

export const deleteuserdataerror = (erro) => ({
    type: DELETE_USER_ERROR,
    payload: erro,
});


export const getsingleuserdatarequest = () => ({
    type: GET_SINGLE_USER_REQUEST,
});

export const getsingleuserdata = (data) => ({
    type: GET_SINGLE_USER_SUCCESS,
    payload: data,
});

export const getsingleuserdataerror = (erro) => ({
    type: GET_SINGLE_USER_ERROR,
    payload: erro,
});


export const putuserdatarequest = () => ({
    type: PUT_USER_REQUEST,
});

export const putuserdata = (data) => ({
    type: PUT_USER_SUCCESS,
    payload: data,
});

export const putuserdataerror = (erro) => ({
    type: PUT_USER_ERROR,
    payload: erro,
});
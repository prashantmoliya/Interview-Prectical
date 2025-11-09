import {GET_DATA_REQUEST, GET_DATA_SUCCESS, GET_DATA_ERROR} from './ActionType';

export const getdatarequest = () => ({
    type: GET_DATA_REQUEST,
});

export const getdatasuccess = (data) => ({
    type: GET_DATA_SUCCESS,
    payload: data,
});

export const getdataerror = (error) => ({
    type: GET_DATA_ERROR,
    payload: error,
});



import { ERROR, LOGIN_GET, LOGIN_POST, LOGOUT, PROFILE_PUT, REGISTER_GET, REGISTER_POST, REQUEST } from "./ActionType"

export const request = (payload) => {
    return {
        type: REQUEST,
        payload,
    }
}

export const error = (error) => {
    return {
        type: ERROR,
        payload: error,
    }
}

export const registerpost = (data) => {
    return {
        type: REGISTER_POST,
        payload: data,
    }
}

export const registerget = (data) =>{
    return {
        type: REGISTER_GET,
        payload: data,
    }
}

export const loginpost = (data) => {
    return {
        type: LOGIN_POST,
        payload: data,
    }
}

export const loginget = (data) =>{
    return {
        type: LOGIN_GET,
        payload: data,
    }
}

export const profileput = () => {
    return {
        type: PROFILE_PUT,
    }
}

export const logout = () => {
    return {
        type: LOGOUT,
    }
}

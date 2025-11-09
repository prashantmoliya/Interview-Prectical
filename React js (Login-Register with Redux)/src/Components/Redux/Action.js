import { ERROR, REQUEST, USER_LOGIN_GET, USER_LOGIN_POST, USER_LOGIN_PUT, USER_LOGOUT, USER_REGISTER_GET, USER_REGISTER_POST, USER_REGISTER_PUT } from "./ActionType";

export const request = (payload) => {
    return {
        type: REQUEST,
        payload,
    }
};

export const error = (error) => {
    return {
        type: ERROR,
        payload: error
    }
};

export const registerpost = (add) => {
    return {
        type: USER_REGISTER_POST,
        payload: add,
    }
};

export const registerget = (data) => {
    return {
        type: USER_REGISTER_GET,
        payload: data,
    };
}

export const registerput = () => {
    return {
        type: USER_REGISTER_PUT,
    }
}

export const loginpost = (user) => {
    return {
        type: USER_LOGIN_POST,
        payload: user,
    }
};

export const loginget = (user) => {
    return {
        type: USER_LOGIN_GET,
        payload: user
    };
}

export const loginput = () => {
    return {
        type: USER_LOGIN_PUT,
    }
}

export const logout = () => {
    return {
        type: USER_LOGOUT,
    }
}


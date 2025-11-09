import { ERROR, REQUEST, USER_LOGIN_GET, USER_LOGIN_POST, USER_LOGIN_PUT, USER_LOGOUT, USER_REGISTER_GET, USER_REGISTER_POST, USER_REGISTER_PUT } from "./ActionType";

const initialState = {
    loader: true,
    error: null,
    register: null,
    login: null,
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST:
            return {
                ...state,
                loader: true,
            }

        case ERROR:
            return {
                ...state,
                loader: false,
                error: action.payload,
            }

        case USER_REGISTER_POST:
            return {
                ...state,
                loader: false,
                error: null,
                register: [...state.register, action.payload],
            }

        case USER_REGISTER_GET:
            return {
                ...state,
                loader: false,
                error: null,
                register: action.payload,
            }

        case USER_REGISTER_PUT:
            return {
                ...state,
                loader: false,
            }

        case USER_LOGIN_POST:

            return {
                ...state,
                loader: false,
                error : null,
                login: action.payload,
            }

        case USER_LOGIN_GET:
            const user = action.payload.find((i) => i);

            return {
                ...state,
                loader: false,
                error: null,
                login: user,
            }

        case USER_LOGIN_PUT:
            return {
                ...state,
                loader: false,
            }

        case USER_LOGOUT:
            return {
                ...state,
                loader: false,
            }

        default:
            return state;
    }
}

export default Reducer;
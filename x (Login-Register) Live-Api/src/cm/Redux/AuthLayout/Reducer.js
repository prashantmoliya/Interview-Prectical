import { ERROR, LOGIN_GET, LOGIN_POST, LOGOUT, PROFILE_PUT, REGISTER_GET, REGISTER_POST, REQUEST } from "../AuthLayout/ActionType"

const initialState = {
    loader: false,
    error: null,
    register: [],
    login: null,
}

export const Reducer = (state = initialState, action) => {
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

        case REGISTER_POST:
            return {
                ...state,
                loader: false,
                error: null,
                register: [...state.register, action.payload],
            }

        case REGISTER_GET:
            return {
                ...state,
                loader: false,
                error: null,
                register: action.payload,
            }

        case LOGIN_POST:
            return {
                ...state,
                loader: false,
                error: null,
                login: action.payload,
            }
        
        case LOGIN_GET:
            const user= action.payload.find((i)=> i);

            return {
                ...state,
                loader: false,
                error: null,
                login: user,
            }

        case PROFILE_PUT:
            return {
                ...state,
                loader: false,
                error: null,
            }
        
        case LOGOUT:
            return {
                ...state,
                loader: false,
                error: null,
            }

        default:
            return state
    }
}

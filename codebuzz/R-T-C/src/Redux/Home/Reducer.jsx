import { DELETE_USER, ERROR_USER, GET_SINGLE_USER, GET_USER, POST_USER, PUT_USER, REQUEST_USER } from "./ActionType";

const initialState = {
    loader: false,
    error: null,
    users: [],
    user: {},
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_USER:
            return {
                ...state,
                loader: true,
            }

        case ERROR_USER:
            return {
                ...state,
                loader: false,
                error: action.payload,
            }

        case GET_USER:
            return {
                ...state,
                loader: false,
                error: null,
                users: action.payload,
            }

        case POST_USER:
            return {
                ...state,
                loader: false,
                error: null,
                users: [...state.users, action.payload],
            }

        case DELETE_USER:
            return {
                ...state,
                loader: false,
                error: null,
                users: state.users.filter((i) => i.id !== action.payload),
            }

        case GET_SINGLE_USER:
            return {
                ...state,
                loader: false,
                error: null,
                user: action.payload,
            }

        case PUT_USER:
            return {
                ...state,
                loader: false,
                error: null,
                users: state.users.map((i) => i.id == action.payload.id ? action.payload : i),
            }

        default:
            return state
    }
}


export default Reducer;
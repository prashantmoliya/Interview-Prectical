import { GET_USER_ERROR, GET_USER_REQUEST, GET_USER_SUCCESS } from "./ActionType"

const initialState = {
    loader: false,
    error: null,
    user: []
}

export default (state = initialState, action) => {
    switch (action.type) {

        case GET_USER_REQUEST:
            return {
                ...state,
                loader: true,
            }

        case GET_USER_ERROR:
            return {
                ...state,
                loader: false,
                error: action.payload,
            }

        case GET_USER_SUCCESS:
            return {
                ...state,
                loader: false,
                error: null,
                user: action.payload,
            }

        default:
            return state
    }
}

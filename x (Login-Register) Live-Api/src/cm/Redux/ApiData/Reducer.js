import { GET_DATA_REQUEST, GET_DATA_SUCCESS, GET_DATA_ERROR } from './ActionType';

const initialState = {
    loader: false,
    data: [],
    error: null,
}

const ApiReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_DATA_REQUEST:
            return {
                ...state,
                loader: true,
            }

        case GET_DATA_ERROR:
            return {
                ...state,
                loader: false,
                error: action.payload,
            }

        case GET_DATA_SUCCESS:
            
            return {
                ...state,
                loader: false,
                error: null,
                data: action.payload,
            }



        default:
            return state
    }
}

export default ApiReducer;

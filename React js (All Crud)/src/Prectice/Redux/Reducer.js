// import { REQUEST, SUCCESS, ERROR, CREATE, DELETE, EDIT, UPDATE } from "./ActionType";

import { ERROR, REQUEST, USER_DELETE, USER_EDIT, USER_GET, USER_POST, USER_UPDATE } from "./ActionType";

// const initialState = {
//     loading: true,
//     data: null,
//     error: null,

//     user: [],
//     edit: {},
// }

// const Reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//             };
        
//         case SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 data: action.payload,
//             };
        
//         case ERROR:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.payload,
//             };
        
//         case CREATE:
//             return {
//                 ...state,
//                 user: [...state.user, action.payload],
//             };
        
//         case DELETE:
//             const deldata = state.user.filter((i) => i.id !== action.payload);
//             return {
//                 ...state,
//                 user: deldata,
//             }
        
//         case EDIT:
//             const editdata = state.user.find((i) => i.id === action.payload);
//             return {
//                 ...state,
//                 edit: editdata,
//             }
        
//         case UPDATE:
//             const updatedata = state.user.map((i) => i.id === action.payload.id ? action.payload : i);
//             return {
//                 ...state,
//                 user: updatedata,
//             }
        
//         default:
//             return state;
//     }
// }

// export default Reducer;


const initialState = {
    loader: true,
    error: null,
    userdata: null,
    useredit: null,
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
        
        case USER_GET:
            return {
                ...state,
                loader: false,
                userdata: action.payload,
            }
        
        case USER_POST:
            return {
                ...state,
                loader: false,
                userdata: [...state.userdata, action.payload],
            }
        
        case USER_DELETE:
            return {
                ...state,
                loader: false,
            }
        
        case USER_EDIT:
            return {
                ...state,
                loader: false,
                useredit: action.payload,
            }
        
        case USER_UPDATE:
            return {
                ...state,
                loader: false,
            }
        
        
        default:
            return state;
    }
}

export default Reducer;
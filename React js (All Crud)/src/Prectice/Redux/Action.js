// import { REQUEST, SUCCESS, ERROR, CREATE, DELETE, EDIT, UPDATE } from "./ActionType"
import { ERROR, REQUEST, USER_DELETE, USER_EDIT, USER_GET, USER_POST, USER_UPDATE } from "./ActionType"

// // Api call Axios --json server
// export const request = () => {
//     return {
//         type: REQUEST,
//     }
// }

// export const success = (data) => {
//     return {
//         type: SUCCESS,
//         payload: data,
//     }
// }

// export const error = (error) => {
//     return {
//         type: ERROR,
//         payload: error,
//     }
// }

// // Crud
// export const create = (add) => {
//     return {
//         type: CREATE,
//         payload: add,
//     }
// }

// export const del = (Did) => {
//     return {
//         type: DELETE,
//         payload: Did,
//     }
// }

// export const edit = (Eid) => {
//     return {
//         type: EDIT,
//         payload: Eid,
//     }
// }

// export const update = (update) => {
//     return {
//         type: UPDATE,
//         payload: update,
//     }
// }

// // Axios Crud --json server
export const request = () => {
    return {
        type: REQUEST,
    }
}

export const error = (err) => {
    return {
        type: ERROR,
        payload: err,
    }
}

export const userget = (data) => {
    return {
        type: USER_GET,
        payload: data,
    }
}

export const userpost = (data) => {
    return {
        type: USER_POST,
        payload: data,
    }
}

export const userdelete = () => {
    return {
        type: USER_DELETE,
    }
}

export const useredit = (edit) => {
    return {
        type: USER_EDIT,
        payload: edit,
    }
}

export const userupdate = () => {
    return {
        type: USER_UPDATE,
    }
}




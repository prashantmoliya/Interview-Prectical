import { combineReducers } from "redux";
import { Reducer } from "./AuthLayout/Reducer";
import ApiReducer from "./ApiData/Reducer";

export const RootReducer = combineReducers({
    redux: Reducer,
    dashboard: ApiReducer,
})
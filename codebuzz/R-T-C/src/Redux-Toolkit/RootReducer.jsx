import { combineReducers } from "@reduxjs/toolkit"
import HomeSlice from "./HomeSlice/HomeSlice";

const RootReducer= combineReducers({
    redux: HomeSlice,
});

export default RootReducer;
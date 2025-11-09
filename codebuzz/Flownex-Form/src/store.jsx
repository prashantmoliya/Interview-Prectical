import { combineReducers, configureStore } from "@reduxjs/toolkit";
import adminSlice from "./pages/slice/adminSlice";
import superAdminSlice from './pages/slice/superAdminSlice';

const rootReducer = combineReducers({
   admin: adminSlice,
   superAdmin:superAdminSlice

})

const Store= configureStore({
    reducer:rootReducer,
    devTools:true,
})

export default Store;
import { configureStore } from "@reduxjs/toolkit"
import RootReducer from "./RootReducer";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const persistConfig= {
    key: "root",
    storage
}

const persistedReducer= persistReducer(persistConfig, RootReducer);

const Store = configureStore({  
    reducer: persistedReducer,
    devTools: true,
}); 

// console.log("Redux-Toolkit Store :- ", Store);

export const persistor= persistStore(Store);
export default Store;




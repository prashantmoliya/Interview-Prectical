import { applyMiddleware, compose, createStore } from "redux";
import RootReducer from "./RootReducer";
import { thunk } from "redux-thunk";

const composeEnhancer = (
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

const Store = createStore(
    RootReducer,
    composeEnhancer(applyMiddleware(thunk))
);

export default Store;



// const Store = createStore(
//     RootReducer,
//     applyMiddleware(thunk)
// );
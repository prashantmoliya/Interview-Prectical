import { applyMiddleware, createStore } from "redux";
import RootReducer from "./RootReducer";
import { thunk } from "redux-thunk";

// const composeEnhancers =
//     (typeof window !== 'undefined' &&
//         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//     compose;

const store = createStore(
    RootReducer,
    (applyMiddleware(thunk)),
);

export default store;

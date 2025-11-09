import { applyMiddleware, compose, createStore } from "redux";
import { RootReducer } from "./RootReducer";
import { thunk } from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from 'redux-saga'
import RootSaga from "./RootSaga";

const composeEnhancer = (
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;


// Redux Persist
const persistConfig= {
    key: "root",
    storage
};

const persistedReducer= persistReducer(persistConfig, RootReducer);

// Redux Saga
// const sagamiddleware= createSagaMiddleware();

// Redux Store
const Store = createStore(
    persistedReducer,
    composeEnhancer(applyMiddleware(thunk)),
);

const Persistor= persistStore(Store);

// Redux Saga Run
// sagamiddleware.run(RootSaga);

export default Store;
export {Persistor};
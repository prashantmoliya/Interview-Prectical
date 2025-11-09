import { combineReducers } from "redux";
import Reducer from "./Reducer";

const RootReducer = combineReducers({
    redux: Reducer
});

export default RootReducer;
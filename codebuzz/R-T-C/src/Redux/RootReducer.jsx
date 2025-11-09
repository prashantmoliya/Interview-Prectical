import { combineReducers } from "redux";
import Reducer from "./Home/Reducer";


const RootReducer= combineReducers({
    redux: Reducer,
})

export default RootReducer;

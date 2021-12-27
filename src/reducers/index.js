import { combineReducers } from "redux";
import currencyReducer from './currencyReducer'
import currencySymbol from "./currencySymbol";

export default combineReducers({
    currency:currencyReducer,
    symbol:currencySymbol
})
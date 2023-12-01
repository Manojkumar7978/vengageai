import { legacy_createStore } from "redux";
import { reducer as AppReducer } from "./AppReducer/reducer";


const store = legacy_createStore(AppReducer);

export { store };
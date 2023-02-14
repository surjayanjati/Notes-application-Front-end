// Importing The Module To combine The Reducers
import { combineReducers } from "redux";
// Importing The Reducers ------------------------------>
import gettingValueReducer from "./gettingValueReducer";

//Creating The Root Reducer----------------------------->
const rootReducer=combineReducers({gettingValueReducer});



//Exporting The Root Reducer
export default rootReducer;
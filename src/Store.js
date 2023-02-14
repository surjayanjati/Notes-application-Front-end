// Importing The Create Store From Store---------------------->
import { legacy_createStore } from "redux";
// Importing The RootReducer From The rootReducer Folder------->
import rootReducer from "./reducers/rootReducer";



// Creating The Store------------------------------>
const store=legacy_createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());



// Exporting The Store
export default store;
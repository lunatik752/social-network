import {combineReducers, createStore} from "redux";
import profileReducer from "./profileReduсer";
import dialogsReducer from "./dialogsReduсer";
import sidebarReducer from "./sidebarReduсer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer
});

let store = createStore(reducers);

export default store;

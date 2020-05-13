import {combineReducers, createStore} from "redux";
import profileReducer from "./profileReduсer";
import dialogsReducer from "./dialogsReduсer";
import sidebarReducer from "./sidebarReduсer";
import usersReducer from "./usersReduсer";
import photosReducer from "./photosReduсer";
import {loadingReducer} from "./loadingReducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    photosPage: photosReducer,
    loading: loadingReducer
});

let store = createStore(reducers);

window.store = store;
export default store;

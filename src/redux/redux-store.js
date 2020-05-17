import {combineReducers, createStore} from "redux";
import profileReducer from "./profileReduсer";
import dialogsReducer from "./dialogsReduсer";
import sidebarReducer from "./sidebarReduсer";
import usersReducer from "./usersReduсer";
import photosReducer from "./photosReduсer";
import {loadingReducer} from "./loadingReducer";
import authReducer from "./authReduсer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    photosPage: photosReducer,
    loading: loadingReducer,
    auth: authReducer,
});

let store = createStore(reducers);

window.store = store;
export default store;

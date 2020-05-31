import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profileReduсer";
import dialogsReducer from "./dialogsReduсer";
import sidebarReducer from "./sidebarReduсer";
import usersReducer from "./usersReduсer";
import photosReducer from "./photosReduсer";
import {loadingReducer} from "./loadingReducer";
import authReducer from "./authReduсer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from "redux-form"

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    photosPage: photosReducer,
    loading: loadingReducer,
    auth: authReducer,
    form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;
export default store;

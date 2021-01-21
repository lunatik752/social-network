import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import {profileReducer} from "./profileReducer";
import {dialogsReducer} from "./dialogsReduсer";
import {sidebarReducer} from "./sidebarReduсer";
import {usersReducer} from "./usersReduсer";
import photosReducer from "./photosReduсer";
import {loadingReducer} from "./loadingReducer";
import {authReducer} from "./authReduсer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {reducer as formReducer} from "redux-form"
import appReducer from "./appReduсer";
import {chatReducer} from "./chatReduсer";

let rootReducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    photosPage: photosReducer,
    loading: loadingReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    chat: chatReducer
});

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export type AppRootStateType = ReturnType<typeof rootReducers>


export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppRootStateType, {}, A>


// let store = createStore(reducers, applyMiddleware(thunkMiddleware));

// window.store = store;
export default store;

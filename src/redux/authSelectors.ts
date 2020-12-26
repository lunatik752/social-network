import {AppRootStateType} from "./store";

export const selectIsAuth = (state: AppRootStateType) => {
    return state.auth.isAuth
}

export const selectCurrentUserLogin = (state: AppRootStateType) => {
    return state.auth.login
}

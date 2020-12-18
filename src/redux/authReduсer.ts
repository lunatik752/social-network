import {ResultCodeEnum, ResultCodeForCaptchaEnum} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {Dispatch} from "redux";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";
import {BaseThunkType, InferActionsTypes} from "./store";


let initialState  = {
    userId: null as (number | null),
    email: null as (string | null),
    login: null as (string | null),
    isAuth: false,
    captchaUrl: null as (string | null)// if null the captcha is not required
};

export const authReducer = (state = initialState, action: AuthReducerActionType): AuthInitialStateType => {
    switch (action.type) {
        case "SN/AUTH/SET_USER_DATA":
        case   "SN/AUTH/SET_CAPTCHA_URL_SUCCESS":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}


const authActions = {
    setCaptchaUrlSuccess: (captchaUrl: string)=> ({type: 'SN/AUTH/SET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}} as const),
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SN/AUTH/SET_USER_DATA',
        payload: {userId, email, login, isAuth}
    } as const)
}

//Thunk
export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let response = await authAPI.me();
    if (response.resultCode === ResultCodeEnum.Success) {
        let {id, email, login} = response.data;
        dispatch(authActions.setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if (response.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl());
        }
        let message = response.messages.length > 0 ? response.messages[0] : 'Some error';
        dispatch(stopSubmit('loginForm', {_error: message}))
    }
}

export const getCaptchaUrl = () : ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(authActions.setCaptchaUrlSuccess(captchaUrl));

}

export const logout = (): ThunkType => async (dispatch) => {
    let data = await authAPI.logout();
    if (data.resultCode === 0) {
        dispatch(authActions.setAuthUserData(null, '', '', false));
    }
}


type AuthInitialStateType = typeof initialState
type AuthReducerActionType = InferActionsTypes<typeof authActions>
type ThunkType = BaseThunkType<AuthReducerActionType | FormAction>

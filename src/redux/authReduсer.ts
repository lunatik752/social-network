import {authAPI, ResultCodeEnum, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {Dispatch} from "redux";

const SET_USER_DATA = 'social-network/auth/SET_USER_DATA';
const SET_CAPTCHA_URL_SUCCESS = 'social-network/auth/SET_CAPTCHA_URL_SUCCESS';

// export type InitialStateType = {
//     userId: number | null,
//     email: string | null,
//     login: string | null,
//     isAuth: boolean,
//     captchaUrl: string | null // if null the captcha is not required
// };

export type AuthInitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
};


let initialState : AuthInitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null // if null the captcha is not required
};

const authReducer = (state = initialState, action: AuthReducerActionType): AuthInitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case   SET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

type AuthReducerActionType = ReturnType<typeof getCaptchaUrlSuccess> | SetAuthUserDataType


export const getCaptchaUrlSuccess = (captchaUrl: string)=> ({
    type: SET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
} as const);


type SetAuthDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type SetAuthUserDataType = {
    type: typeof SET_USER_DATA
    payload: SetAuthDataActionPayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataType => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
} as const);


//Thunk
export const getAuthUserData = () => async (dispatch: ThunkType) => {
    let response = await authAPI.me();
    if (response.resultCode === ResultCodeEnum.Success) {
        let {id, email, login} = response.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: Dispatch<AuthReducerActionType> | any) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if (response.resultCode === ResultCodeEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl());
        }
        let message = response.messages.length > 0 ? response.messages[0] : 'Some error';
        dispatch(stopSubmit('loginForm', {_error: message}))
    }
}

export const getCaptchaUrl = () => async (dispatch:Dispatch<AuthReducerActionType> | any) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));

}

export const logout = () => async (dispatch: Dispatch<AuthReducerActionType> | any) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, '', '', false));
    }
}

export default authReducer;

type ThunkType = Dispatch<AuthReducerActionType>

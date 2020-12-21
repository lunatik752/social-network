import {instance, ResultCodeForCaptchaEnum, ApiResponseType, ResultCodeEnum} from "./api";

type MeParamsType = {
    id: number
    email: string
    login: string
}


export type LoginParamsType = {
    userId: null
}

export const authAPI = {
    me() {
        return instance.get<ApiResponseType<MeParamsType>>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post<ApiResponseType<LoginParamsType, ResultCodeEnum | ResultCodeForCaptchaEnum>>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        }).then(res => res.data)
    },
    logout() {
        return instance.delete<ApiResponseType>(`auth/login`).then(res => res.data);
    },
}

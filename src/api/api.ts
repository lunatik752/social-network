import axios from "axios";
import {ProfileType} from "../types/types";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {'API-KEY': '90bf912e-ca5a-4b96-9037-858f400fe7a5'},
});

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`
        ).then(response => {
            return response.data;
        })
    },
    unFollowUser(userId: number) {
        return instance.delete(`follow/${userId}`
        ).then(response => {
            return response.data;
        })
    },
    followUser(userId: number) {
        return instance.post(`follow/${userId}`, {}
        ).then(response => {
            return response.data;
        })
    },
    getProfile(userId: number) {
        console.warn('Obsolete method. Please profileAPI object.')
        return profileAPI.getProfile(userId)
    },
}

export enum ResultCodeEnum  {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}
export enum ResultCodeForCaptchaEnum  {
    CaptchaIsRequired = 10
}

type AuthResponseDataType<T, D> = {
    data: T
    resultCode: ResultCodeEnum | D
    messages: Array<string>
}

type MeParamsType = {
    id: number
    email: string
    login: string
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export const authAPI = {
    me() {
        return instance.get<AuthResponseDataType<MeParamsType, {}>>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post<AuthResponseDataType<LoginParamsType, ResultCodeForCaptchaEnum>>(`auth/login`, {email, password, rememberMe, captcha}).then(res => res.data)
    },
    logout() {
        return instance.delete(`auth/login`);
    },
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`/security/get-captcha-url`,)
    }
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status})
    },
    savePhoto(file: any) {
        const formData = new FormData();
        formData.append("image", file);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
                return response.data;
            }
        )
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile)
    }
}

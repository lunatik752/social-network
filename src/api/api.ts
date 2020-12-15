import axios from "axios";
import {ProfilePhotosType, ProfileType, UserType} from "../types/types";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {'API-KEY': '90bf912e-ca5a-4b96-9037-858f400fe7a5'},
});

type GetUsersResponseDataType = {
    items: Array<UserType>
    totalCount: number
    error: string
}


export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetUsersResponseDataType>(`users?page=${currentPage}&count=${pageSize}`
        ).then(response => response.data)
    },
    unFollowUser(userId: number) {
         return instance.delete<ResponseDataType<{},{}>>(`follow/${userId}`
        ).then(response => response.data)
    },
    followUser(userId: number) {
        return instance.post<ResponseDataType<{},{}>>(`follow/${userId}`, {}
        ).then(response => response.data)
    },
    getProfile(userId: number) {
        console.warn('Obsolete method. Please profileAPI object.')
        return profileAPI.getProfile(userId).then(res => res.data)
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

type ResponseDataType<T, D> = {
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
        return instance.get<ResponseDataType<MeParamsType, {}>>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post<ResponseDataType<LoginParamsType, ResultCodeForCaptchaEnum>>(`auth/login`, {email, password, rememberMe, captcha}).then(res => res.data)
    },
    logout() {
        return instance.delete<ResponseDataType<{}, {}>>(`auth/login`);
    },
}


export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<{url: string}>(`/security/get-captcha-url`,)
    }
}



export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put<ResponseDataType<{}, {}>>(`profile/status`, {status})
    },
    savePhoto(file: any) {
        const formData = new FormData();
        formData.append("image", file);
        return instance.put<ResponseDataType<ProfilePhotosType, {}>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
                return response.data;
            }
        )
    },
    saveProfile(profile: ProfileType) {
        return instance.put<ResponseDataType<{}, {}>>(`profile`, profile)
    }
}

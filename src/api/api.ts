import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {'API-KEY': '90bf912e-ca5a-4b96-9037-858f400fe7a5'},
});

export enum ResultCodeEnum  {
    Success = 0,
    Error = 1,
}
export enum ResultCodeForCaptchaEnum  {
    CaptchaIsRequired = 10
}

export type ResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
}






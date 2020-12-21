import {ProfilePhotosType, ProfileType} from "../types/types";
import {instance, ApiResponseType} from "./api";

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then(res => res.data)
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`).then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put<ApiResponseType>(`profile/status`, {status}).then(res => res.data)
    },
    savePhoto(file: any) {
        const formData = new FormData();
        formData.append("image", file);
        return instance.put<ApiResponseType<ProfilePhotosType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
                return response.data;
            }
        )
    },
    saveProfile(profile: ProfileType) {
        return instance.put<ApiResponseType>(`profile`, profile).then(res => res.data)
    }
}

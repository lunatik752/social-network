import {instance, ApiResponseType} from "./api";
import {UserType} from "../types/types";

type GetUsersResponseDataType = {
    items: Array<UserType>
    totalCount: number
    error: string
}

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number, term: string = '') {
        return instance.get<GetUsersResponseDataType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`
        ).then(response => response.data)
    },
    unFollowUser(userId: number) {
        return instance.delete<ApiResponseType>(`follow/${userId}`
        ).then(response => response.data)
    },
    followUser(userId: number) {
        return instance.post<ApiResponseType>(`follow/${userId}`, {}
        ).then(response => response.data)
    }
}

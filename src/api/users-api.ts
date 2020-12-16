import {instance, ResponseType} from "./api";
import {UserType} from "../types/types";

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
        return instance.delete<ResponseType>(`follow/${userId}`
        ).then(response => response.data)
    },
    followUser(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`, {}
        ).then(response => response.data)
    }
}

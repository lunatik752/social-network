import {createSelector} from "reselect";
import {AppRootStateType} from "./store";

const getUsersSelector = (state: AppRootStateType) => {
    return state.usersPage.users
}

export const getUsers = createSelector(getUsersSelector, (users) =>{
    return users.filter(u => true)
})


export const getPageSize = (state: AppRootStateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: AppRootStateType) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: AppRootStateType) => {
    return state.usersPage.currentPage
}

export const getFollowingInProgress = (state: AppRootStateType) => {
    return state.usersPage.followingInProgress
}

export const getUsersFilter = (state: AppRootStateType) => {
    return state.usersPage.filter
}

export  const getIsLoading = (state: AppRootStateType) => {
    return state.loading.isLoading
}

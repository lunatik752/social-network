import {usersAPI} from "../api/api";
import {setLoading} from "./loadingReducer";
import {PhotosType} from "../types/types";

const FOLLOW = 'social-network/users/FOLLOW';
const UNFOLLOW = 'social-network/users/UNFOLLOW';
const SET_USERS = 'social-network/users/';
const SET_CURRENT_PAGE = 'social-network/users/SET_CURRENT_PAGE';
const SET_TOTAL_USER_COUNT = 'social-network/users/SET_TOTAL_USER_COUNT';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'social-network/users/TOGGLE_IS_FOLLOWING_PROGRESS';


type UserType = {
    name: string
    id: number
    photos: PhotosType
    status: string,
    followed: boolean
}

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    followingInProgress: [] as Array<number> // Array of users id
};

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: UsersReducerActionsType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                // users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true};
                    }
                    return user;
                })
            };
        case UNFOLLOW:
            return {
                ...state,
                // users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: false};
                    }
                    return user;
                })
            };
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case  SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USER_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }

        default:
            return state;
    }
}

type UsersReducerActionsType = ReturnType<typeof followSuccess>
    | ReturnType<typeof followSuccess>
    | ReturnType<typeof unFollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleFollowingProgress>

const followSuccess = (userId: number) => ({type: FOLLOW, userId} as const);
const unFollowSuccess = (userId: number) => ({type: UNFOLLOW, userId} as const);
const setUsers = (users: Array<UserType>) => ({type: SET_USERS, users} as const);
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const);
const setTotalUsersCount = (totalUsersCount: number) => ({type: SET_TOTAL_USER_COUNT, totalUsersCount} as const);
export const toggleFollowingProgress = (isFetching: boolean, userId: number) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
} as const);


// Thunk(санка) для загрузки страниц пользователей
export const requestUsers = (page: number, pageSize: number) => async (dispatch: any) => {
    dispatch(setLoading(true));
    dispatch(setCurrentPage(page))
    let response = await usersAPI.getUsers(page, pageSize);
    dispatch(setLoading(false));
    dispatch(setUsers(response.items));
    dispatch(setTotalUsersCount(response.totalCount));
}

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId)
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}

// Thunk(санка) для  unfollow
export const unFollow = (userId: number) => async (dispatch: any) => {
   await followUnfollowFlow(dispatch, userId, usersAPI.unFollowUser.bind(usersAPI), unFollowSuccess);
}

// Thunk(санка) для  follow
export const follow = (userId: number) => async (dispatch: any) => {
   await followUnfollowFlow(dispatch, userId, usersAPI.followUser.bind(usersAPI), followSuccess);
}


export default usersReducer;

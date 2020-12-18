import {UserType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./store";
import {Dispatch} from "redux";
import {LoadingReducerActionsType, setLoading} from "./loadingReducer";
import {usersAPI} from "../api/users-api";


const initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    followingInProgress: [] as Array<number> // Array of users id
};


export const usersReducer = (state = initialState, action: UsersReducerActionsType): InitialStateType => {
    switch (action.type) {
        case 'social-network/users/FOLLOW':
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
        case 'social-network/users/UNFOLLOW':
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
        case 'social-network/users/SET_USERS':
            return {
                ...state,
                users: action.users
            }
        case  'social-network/users/SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
        case 'social-network/users/SET_TOTAL_USER_COUNT':
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case 'social-network/users/TOGGLE_IS_FOLLOWING_PROGRESS':
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

export const UserReducerActions = {
    followSuccess: (userId: number) => ({type: 'social-network/users/FOLLOW', userId} as const),
    unFollowSuccess: (userId: number) => ({type: 'social-network/users/UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'social-network/users/SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'social-network/users/SET_CURRENT_PAGE', currentPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({
        type: 'social-network/users/SET_TOTAL_USER_COUNT',
        totalUsersCount
    } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: 'social-network/users/TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const)
}


// Thunk(санка) для загрузки страниц пользователей
export const requestUsers = (page: number, pageSize: number): ThunkType => async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(UserReducerActions.setCurrentPage(page))
    let response = await usersAPI.getUsers(page, pageSize);
    dispatch(setLoading(false));
    dispatch(UserReducerActions.setUsers(response.items));
    dispatch(UserReducerActions.setTotalUsersCount(response.totalCount));
}

const _followUnfollowFlow = async (dispatch: Dispatch<UsersReducerActionsType>, userId: number, apiMethod: any, actionCreator: (userId: number) => ReturnType<typeof UserReducerActions.followSuccess> | ReturnType<typeof UserReducerActions.unFollowSuccess>) => {
    dispatch(UserReducerActions.toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId)
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(UserReducerActions.toggleFollowingProgress(false, userId));
}

// Thunk(санка) для  unfollow
export const unFollow = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.unFollowUser.bind(usersAPI), UserReducerActions.unFollowSuccess);
}

// Thunk(санка) для  follow
export const follow = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.followUser.bind(usersAPI), UserReducerActions.followSuccess);
}

type InitialStateType = typeof initialState
type UsersReducerActionsType = InferActionsTypes<typeof UserReducerActions>
type ThunkType = BaseThunkType<UsersReducerActionsType | LoadingReducerActionsType>

import {usersAPI} from "../api/api";
import {setLoading} from "./loadingReducer";
import {updateObjectInArray} from "../utils/helpers/object-helpers";

const FOLLOW = 'social-network/users/FOLLOW';
const UNFOLLOW = 'ocial-network/users/UNFOLLOW';
const SET_USERS = 'ocial-network/users/';
const SET_CURRENT_PAGE = 'ocial-network/users/SET_CURRENT_PAGE';
const SET_TOTAL_USER_COUNT = 'ocial-network/users/SET_TOTAL_USER_COUNT';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'ocial-network/users/TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    followingInProgress: []
};

const usersReducer = (state = initialState, action) => {
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

const followSuccess = (userId) => ({type: FOLLOW, userId});
const unFollowSuccess = (userId) => ({type: UNFOLLOW, userId});
const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USER_COUNT, totalUsersCount});
export const toggleFollowingProgress = (isFetching, userId) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
});



// Thunk(санка) для загрузки страниц пользователей
export const requestUsers = (page, pageSize) => async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setCurrentPage(page))
    let response = await usersAPI.getUsers(page, pageSize);
    dispatch(setLoading(false));
    dispatch(setUsers(response.items));
    dispatch(setTotalUsersCount(response.totalCount));
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId)
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}

// Thunk(санка) для  unfollow
export const unFollow = (userId) => async (dispatch) => {
    followUnfollowFlow(dispatch, userId, usersAPI.unFollowUser.bind(usersAPI), unFollowSuccess);
}

// Thunk(санка) для  follow
export const follow = (userId) => async (dispatch) => {
    followUnfollowFlow(dispatch, userId, usersAPI.followUser.bind(usersAPI), followSuccess);
}


export default usersReducer;
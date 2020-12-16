import {ResultCodeEnum} from "../api/api";
import {stopSubmit} from "redux-form";
import {PostType, ProfilePhotosType, ProfileType} from "../types/types";
import {profileAPI} from "../api/profile-api";

const ADD_POST = 'social-network/profile/ADD-POST';
const SET_USER_PROFILE = 'social-network/profile/SET_USER_PROFILE';
const SET_STATUS = 'social-network/profile/SET_STATUS';
const DELETE_POST = 'social-network/profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'social-network/profile/SAVE_PHOTO_SUCCESS';



let initialState = {
    posts: [
        {id: 1, message: 'Hello!!!', countLikes: 3},
        {id: 2, message: 'This is a post.', countLikes: 12}
    ] as Array<PostType>,
    status: '',
    profile: null as ProfileType | null,
    newPostText: ''
};

type ProfileReducerInitialStateType = typeof initialState

export const profileReducer = (state = initialState, action: ProfileReducerActionsType): ProfileReducerInitialStateType => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: 3, message: action.newPostText, countLikes: 0}],
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.postId)
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state;
    }
}

type ProfileReducerActionsType = ReturnType<typeof addPost>
    | ReturnType<typeof addPost>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof deletePost>
    | ReturnType<typeof savePhotoSuccess>

export const addPost = (newPostText: string) => ({type: ADD_POST, newPostText} as const);
const setUserProfile = (profile: ProfileType) => ({type: SET_USER_PROFILE, profile} as const);
const setStatus = (status: string) => ({type: SET_STATUS, status} as const);
export const deletePost = (postId: number) => ({type: DELETE_POST, postId} as const);
export const savePhotoSuccess = (photos: ProfilePhotosType) => ({type: SAVE_PHOTO_SUCCESS, photos} as const);


export default profileReducer;

export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let data = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(data));
}


export const getStatus = (userId: number) => async (dispatch: any) => {
    const data = await profileAPI.getStatus(userId);
    dispatch(setStatus(data.data));
}

export const updateStatus = (status: string) => async (dispatch: any) => {

        const data = await profileAPI.updateStatus(status);
        if (data.resultCode === 0) {
            dispatch(setStatus(status));
        } else {
            if (data.resultCode === 1) {
                alert(data.messages[0])
            }
        }
}

export const savePhoto = (file: any) => async (dispatch: any) => {
    const data = await profileAPI.savePhoto(file);
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(savePhotoSuccess(data.data));
    }
}
export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId
    const data = await profileAPI.saveProfile(profile);
    if (data.resultCode === 0) {
         dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit('edit-profile', {_error: data.messages[0]}));
        return Promise.reject((data.messages[0]))
    }
}




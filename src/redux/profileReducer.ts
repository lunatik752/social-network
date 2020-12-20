import {ResultCodeEnum} from "../api/api";
import {stopSubmit} from "redux-form";
import {PostType, ProfilePhotosType, ProfileType} from "../types/types";
import {profileAPI} from "../api/profile-api";
import {BaseThunkType, InferActionsTypes} from "./store";


let initialState = {
    posts: [
        {id: 1, message: 'Hello!!!', countLikes: 3},
        {id: 2, message: 'This is a post.', countLikes: 12}
    ] as Array<PostType>,
    status: '',
    profile: null as ProfileType | null,
};

export const profileReducer = (state = initialState, action: ProfileReducerActionsType): ProfileReducerInitialStateType => {
    switch (action.type) {
        case 'SN/PROFILE/ADD-POST':
            return {
                ...state,
                posts: [...state.posts, {id: 3, message: action.newPostText, countLikes: 0}],
            }
        case 'SN/PROFILE/SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case 'SN/PROFILE/SET_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'SN/PROFILE/DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.postId)
            }
        case 'SN/PROFILE/SAVE_PHOTO_SUCCESS':
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state;
    }
}

export const profileActions = {
    addPost: (newPostText: string) => ({type: 'SN/PROFILE/ADD-POST', newPostText} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SN/PROFILE/SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SN/PROFILE/SET_STATUS', status} as const),
    deletePost: (postId: number) => ({type: 'SN/PROFILE/DELETE_POST', postId} as const),
    savePhotoSuccess: (photos: ProfilePhotosType) => ({type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos} as const),
}


export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId);
    dispatch(profileActions.setUserProfile(data));
}


export const getStatus = (userId: number): ThunkType => async (dispatch: any) => {
    const data = await profileAPI.getStatus(userId);
    dispatch(profileActions.setStatus(data.data));
}

export const updateStatus = (status: string): ThunkType => async (dispatch: any) => {
    const data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
        dispatch(profileActions.setStatus(status));
    } else {
        if (data.resultCode === 1) {
            alert(data.messages[0])
        }
    }
}

export const savePhoto = (file: any): ThunkType => async (dispatch: any) => {
    const data = await profileAPI.savePhoto(file);
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(profileActions.savePhotoSuccess(data.data));
    }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId
    const data = await profileAPI.saveProfile(profile);
    if (data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit('edit-profile', {_error: data.messages[0]}));
        return Promise.reject((data.messages[0]))
    }
}

export type ProfileReducerInitialStateType = typeof initialState
type ProfileReducerActionsType = InferActionsTypes<typeof profileActions>
type ThunkType = BaseThunkType<ProfileReducerActionsType>



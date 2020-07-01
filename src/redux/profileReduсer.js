import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = 'social-network/profile/ADD-POST';
const SET_USER_PROFILE = 'social-network/profile/SET_USER_PROFILE';
const SET_STATUS = 'social-network/profile/SET_STATUS';
const DELETE_POST = 'social-network/profile/DELETE_POST';


let initialState = {
    posts: [
        {id: 1, message: 'Hello!!!', countLikes: 3},
        {id: 2, message: 'This is a post.', countLikes: 12}
    ],
    status: '',
    profile: null
};

export const profileReducer = (state = initialState, action) => {
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
        default:
            return state;
    }
}

export const addPost = (newPostText) =>  ({type: ADD_POST, newPostText});

const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});

const setStatus = (status) => ({type: SET_STATUS, status});

export  const deletePost = (postId) => ({type: DELETE_POST, postId});


export default profileReducer;

export const getUserProfile = (userId) => {
    return (dispatch) => {
        usersAPI.getProfile(userId)
            .then(response => {
                    dispatch(setUserProfile(response.data));
                }
            );
    }
}

export const getStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId)
            .then(response => {
                    dispatch(setStatus(response.data));
                }
            );
    }
}

export const updateStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status)
            .then(response => {
                    if (response.data.resultCode === 0) {
                        dispatch(setStatus(status));
                    }
                }
            );
    }
}


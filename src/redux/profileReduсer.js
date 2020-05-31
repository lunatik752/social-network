import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';


let initialState = {
    posts: [
        {id: 1, message: 'Hello!!!', countLikes: 3},
        {id: 2, message: 'This is a post.', countLikes: 12}
    ],
    newPostText: '',
    status: ''
};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: 3, message: state.newPostText, countLikes: 0}],
                newPostText: '',
                profile: null
            }
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            };
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
        default:
            return state;
    }
}

export const addPost = () => ({type: ADD_POST});

const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});

const setStatus = (status) => ({type: SET_STATUS, status})


export const updateNewPostText = (text) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text});

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


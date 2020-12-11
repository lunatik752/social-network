const ADD_COMMENT = 'social-network/photos/ADD_COMMENT';
const UPDATE_NEW_COMMENT_TEXT = 'social-network/photos/UPDATE_NEW_COMMENT_TEXT'

type CommentsType ={
    id: number
    comment: string
}

type PhotosType = {
    id: number
    urlPhoto: string
    title: string
    comments: Array<CommentsType>
}

let initialState = {
    photos:
        [
            {
                id: 1,
                urlPhoto: 'https://sun9-5.userapi.com/c598/u28496219/114838671/x_c7cb1d16.jpg',
                title: 'asdf',
                comments: [
                    {id: 1, comment: 'nice photo'},
                    {id: 2, comment: 'very nice photo'},
                ],
            }] as Array<PhotosType>,
    newCommentText: ''
}

type PhotosReducerInitialStateType = typeof initialState

const photosReducer = (state = initialState, action: PhotosReducerActionsType) : PhotosReducerInitialStateType=> {


    switch (action.type) {
        case UPDATE_NEW_COMMENT_TEXT:
            return {
                ...state,
                photos: {
                    ...state.photos
                }
            };
        default:
            return state;
    }
}

type PhotosReducerActionsType = ReturnType<typeof addComment> | ReturnType<typeof updateNewCommentText>

export const addComment = () => ({type: ADD_COMMENT} as const);

export const updateNewCommentText = (text: string) =>
    ({type: UPDATE_NEW_COMMENT_TEXT, newText: text} as const);

export default photosReducer;

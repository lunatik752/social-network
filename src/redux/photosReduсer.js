const ADD_COMMENT = 'ADD_COMMENT';
const UPDATE_NEW_COMMENT_TEXT = 'UPDATE_NEW_COMMENT_TEXT'


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
            }],
    newCommentText: ''
}

const photosReducer = (state = initialState, action) => {


    switch (action.type) {
        case UPDATE_NEW_COMMENT_TEXT:
            return {
                ...state,
                photos: {
                    ...state.photos,
                    newCommentText: action.newCommentText
                }
            };
        default:
            return state;
    }
}

export const addComment = () => ({type: ADD_COMMENT});

export const updateNewCommentText = (text) =>
    ({type: UPDATE_NEW_COMMENT_TEXT, newText: text});

export default photosReducer;
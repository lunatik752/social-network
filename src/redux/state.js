const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';
const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';


let store = {

    _state: {
        dialogsPage: {
            dialogs: [
                {name: 'Maks', id: 1},
                {name: 'Aleks', id: 2},
                {name: 'Kna', id: 3},
                {name: 'Andy', id: 4}
            ],
            messages: [
                {message: 'Hello!', id: 1},
                {message: 'How are you? What are you doing?!', id: 2},
                {message: 'Come with me.', id: 3},
            ],
            newMessageText: '',
        },

        profilePage: {
            posts: [
                {id: 1, message: 'Hello!!!', countLikes: 3},
                {id: 2, message: 'This is a post.', countLikes: 12}
            ],
            newPostText: '',
        }
    },

    getState() {
        return this._state;
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        if (action.type === ADD_POST) {
            let newPost = {
                id: 3,
                message: this._state.profilePage.newPostText,
                countLikes: 0
            };
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = '';
            this._callSubscriber(this._state);
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state)
        } else if (action.type === ADD_MESSAGE) {
            let newMessage = {
                id: 4,
                message: this._state.dialogsPage.newMessageText,
            };
            this._state.dialogsPage.messages.push(newMessage);
            this._state.dialogsPage.newMessageText = '';
            this._callSubscriber(this._state);
        } else if (action.type === UPDATE_NEW_MESSAGE_TEXT) {
            this._state.dialogsPage.newMessageText = action.newText;
            this._callSubscriber(this._state);
        }
    },


// addPost() {
    //     let newPost = {
    //         id: 3,
    //         message: this._state.profilePage.newPostText,
    //         countLikes: 0
    //     };
    //     this._state.profilePage.posts.push(newPost);
    //     this._state.profilePage.newPostText = '';
    //     this._callSubscriber(this._state);
    // },
    //
    // updateNewPostText(newText) {
    //     this._state.profilePage.newPostText = newText;
    //     this._callSubscriber(this._state);
    // },
    //
    // addMessage() {
    //     let newMessage = {
    //         id: 4,
    //         message: this._state.dialogsPage.newMessageText,
    //     };
    //     this._state.dialogsPage.messages.push(newMessage);
    //     this._state.dialogsPage.newMessageText = '';
    //     this._callSubscriber(this._state);
    // },
    //
    // updateNewMessageText(newText) {
    //     this._state.dialogsPage.newMessageText = newText;
    //     this._callSubscriber(this._state);
    // },


    // _callSubscriber() {
    //     console.log('Store changed')
    // },
};

export const addMessageActionCreator = () => ({type: ADD_MESSAGE});


export const updateNewMessageTextActionCreator = (text) =>
    ({type: UPDATE_NEW_MESSAGE_TEXT, newText: text});

export const addPostActionCreator = () => ({type: ADD_POST});


export const updateNewPostTextActionCreator = (text) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text});



export default store;
window._store = store;
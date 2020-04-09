import profileReducer from "./profileReduсer";
import dialogsReducer from "./dialogsReduсer";
import sidebarReducer from "./sidebarReduсer";


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
        },

        sidebar: {}
    },

    getState() {
        return this._state;
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);
    },
};


export default store;
window._store = store;
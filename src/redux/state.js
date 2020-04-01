let rerenderEntireTree = () =>{
};


let state = {
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
};

export const addPost = () => {
    let newPost = {
        id: 3,
        message: state.profilePage.newPostText,
        countLikes: 0
    };
    state.profilePage.posts.push(newPost);
    state.profilePage.newPostText = '';
    rerenderEntireTree(state);
};

export const updateNewPostText = (newText) => {
    state.profilePage.newPostText = newText;
    rerenderEntireTree(state);
};

export const addMessage = () => {
    let newMessage = {
        id: 4,
        message: state.dialogsPage.newMessageText,
    };
    state.dialogsPage.messages.push(newMessage);
    state.dialogsPage.newMessageText = '';
    rerenderEntireTree(state);
};

export const updateNewMessageText = (newText) => {
    state.dialogsPage.newMessageText = newText;
    rerenderEntireTree(state);
};

export const subscribe = (observer) => {
    rerenderEntireTree = observer;
};


export default state;
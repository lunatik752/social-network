import {rerenderEntireTree} from "../render";

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
        ]
    },
    profilePage: {
        posts: [
            {id: 1, message: 'Hello!!!', countLikes: 3},
            {id: 2, message: 'This is a post.', countLikes: 12}
        ]
    }
};

export let addPost = (postMessage) => {
    let newPost = {
        id: 3,
        message: postMessage,
        countLikes: 0
    };
    state.profilePage.posts.push(newPost);
    rerenderEntireTree(state);
};

export default state;
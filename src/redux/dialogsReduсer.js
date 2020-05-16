const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

let initialState = {
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
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            let newMessage = {
                id: 4,
                message: state.newMessageText,
            };
            return {
                ...state,
                messages: [...state.messages, newMessage],
                newMessageText: ''
            };
        }
        case UPDATE_NEW_MESSAGE_TEXT:
            return {
                ...state,
                newMessageText: action.newText
            };

        default:
            return state;
    }
}

export const addMessage = () => ({type: ADD_MESSAGE});

export const updateNewMessageText= (text) =>
    ({type: UPDATE_NEW_MESSAGE_TEXT, newText: text});


export default dialogsReducer;
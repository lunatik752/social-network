const ADD_MESSAGE = 'social-network/dialogs/ADD-MESSAGE';

type DialogType = {
    name: string
    id: number
}

type MessageType = {
    message: string
    id: number
}

const initialState = {
        dialogs: [
            {name: 'Maks', id: 1},
            {name: 'Aleks', id: 2},
            {name: 'Kna', id: 3},
            {name: 'Andy', id: 4}
        ] as Array<DialogType>,
        messages: [
            {message: 'Hello!', id: 1},
            {message: 'How are you? What are you doing?!', id: 2},
            {message: 'Come with me.', id: 3},
        ] as Array<MessageType>,
};

export type DialogReducerInitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: DialogReducerActionType): DialogReducerInitialStateType => {
    switch (action.type) {
        case ADD_MESSAGE: {
            return {
                ...state,
                messages: [...state.messages, {message: action.newMessageBody, id: 4}],
            };
        }
        default:
            return state;
    }
}

type DialogReducerActionType = ReturnType<typeof addMessage>

export const addMessage = (newMessageBody: string) => (
    {
        type: ADD_MESSAGE,
        newMessageBody
    } as const);


export default dialogsReducer;

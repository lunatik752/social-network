import {DialogType, MessageType} from "../types/types";
import {InferActionsTypes} from "./store";


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

export const dialogsReducer = (state = initialState, action: DialogReducerActionsType): DialogReducerInitialStateType => {
    switch (action.type) {
        case 'SN/DIALOGS/ADD-MESSAGE': {
            return {
                ...state,
                messages: [...state.messages, {message: action.newMessageBody, id: 4}],
            };
        }
        default:
            return state;
    }
}

export type DialogReducerActionsType = InferActionsTypes<typeof dialogsActions>

export const dialogsActions = {
    addMessage: (newMessageBody: string) => ({type: 'SN/DIALOGS/ADD-MESSAGE', newMessageBody} as const)
}

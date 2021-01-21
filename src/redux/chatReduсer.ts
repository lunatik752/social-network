import {FormAction} from "redux-form";
import {BaseThunkType, InferActionsTypes} from "./store";
import {chatApi, ChatMessageType} from "../api/chat-api";
import {Dispatch} from "redux";


let initialState = {
    messages: [] as ChatMessageType[]
};

export const chatReducer = (state = initialState, action: ChatReducerActionType): ChatInitialStateType => {
    switch (action.type) {
        case 'SN/AUTH/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        default:
            return state;
    }
}


const chatActions = {
    messagesReceived: (messages: ChatMessageType[]) => ({
        type: 'SN/AUTH/MESSAGES_RECEIVED',
        payload: {messages}
    } as const),
}
//Thunk
let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages: ChatMessageType[]) => {
            dispatch(chatActions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
};

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatApi.subscribe(newMessageHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatApi.unSubscribe(newMessageHandlerCreator(dispatch))
}


type ChatInitialStateType = typeof initialState
type ChatReducerActionType = InferActionsTypes<typeof chatActions>

type ThunkType = BaseThunkType<ChatReducerActionType | FormAction>

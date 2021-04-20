import {FormAction} from "redux-form";
import {BaseThunkType, InferActionsTypes} from "./store";
import {chatApi, ChatMessageApiType, StatusType} from "../api/chat-api";
import {Dispatch} from "redux";
import {v1} from "uuid"

type ChatMessageType = ChatMessageApiType & {id: string}

let initialState = {
    messages: [] as ChatMessageType[],
    status: "pending" as StatusType
};

export const chatReducer = (state = initialState, action: ChatReducerActionType): ChatInitialStateType => {
    switch (action.type) {
        case 'SN/AUTH/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1()} ))].filter((m, index,  array) => index >= array.length - 100)
            }
        case 'SN/AUTH/STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state;
    }
}


const chatActions = {
    messagesReceived: (messages: ChatMessageApiType[]) => ({
        type: 'SN/AUTH/MESSAGES_RECEIVED',
        payload: {messages}
    } as const),
    statusChanged: (status: StatusType) => ({
        type: 'SN/AUTH/STATUS_CHANGED',
        payload: {status}
    } as const),
}
//Thunk
let _newMessageHandler: ((messages: ChatMessageApiType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages: ChatMessageApiType[]) => {
            dispatch(chatActions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
};

let _statusChangingHandler: ((status: StatusType) => void) | null = null;

const statusChangingHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangingHandler === null) {
        _statusChangingHandler = (status: StatusType) => {
            dispatch(chatActions.statusChanged(status))
        }
    }
    return _statusChangingHandler
};

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatApi.start()
    chatApi.subscribe('message-received', newMessageHandlerCreator(dispatch))
    chatApi.subscribe('status-changed', statusChangingHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatApi.unSubscribe("message-received",newMessageHandlerCreator(dispatch))
    chatApi.unSubscribe("status-changed",statusChangingHandlerCreator(dispatch))
    chatApi.stop()
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatApi.sendMessage(message)
}


type ChatInitialStateType = typeof initialState
type ChatReducerActionType = InferActionsTypes<typeof chatActions>

type ThunkType = BaseThunkType<ChatReducerActionType | FormAction>

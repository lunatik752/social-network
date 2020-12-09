import {getAuthUserData} from "./authReduсer";
import {Dispatch} from "redux";

const INITIALIZED_SUCCESS = 'social-network/app/INITIALIZED_SUCCESS';

export type InitialStateType = typeof initialState;

let initialState  = {
    initialized: false,
};

const appReducer = (state = initialState, action: AppReducerActionTypes):InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

type AppReducerActionTypes = InitializedSuccessActionType;

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

const initializedSuccess = (): InitializedSuccessActionType  => ({type: INITIALIZED_SUCCESS});

//Thunk
export const initializeApp = () => {
    return (dispatch: Dispatch<AppReducerActionTypes> | any) => {
        let promise = dispatch(getAuthUserData());
        Promise.all([promise])
            .then(() => {
                dispatch(initializedSuccess());
            })
    }
}

export default appReducer;
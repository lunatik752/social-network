import {getAuthUserData} from "./authReduсer";
import {Dispatch} from "redux";
import {InferActionsTypes} from "./redux-store";


export type AppInitialStateType = typeof initialState;

const initialState  = {
    initialized: false,
};

const appReducer = (state = initialState, action: AppActionsType):AppInitialStateType => {
    switch (action.type) {
        case 'SN/APP/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

export const appActions = {
    initializedSuccess: () => ({type: 'SN/APP/INITIALIZED_SUCCESS'}) as const
}

type AppActionsType = InferActionsTypes<typeof appActions>



//Thunk
export const initializeApp = () => {
    return (dispatch: Dispatch<AppActionsType> | any) => {
        let promise = dispatch(getAuthUserData());
        Promise.all([promise])
            .then(() => {
                dispatch(appActions.initializedSuccess());
            })
    }
}

export default appReducer;

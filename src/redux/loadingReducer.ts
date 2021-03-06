const SET_LOADING = "social-network/loading/SET_LOADING"


const initialState = {
    isLoading: true
}

type InitialStateType = typeof initialState

export const  loadingReducer = (state = initialState, action: LoadingReducerActionsType): InitialStateType => {
    switch (action.type) {
        case SET_LOADING:
            return {...state, isLoading: action.isLoading};
        default :
            return state;
    }
}

export type LoadingReducerActionsType = ReturnType<typeof setLoading>

export const setLoading = (isLoading: boolean) => ({type: SET_LOADING, isLoading} as const)



const SET_LOADING = "loading/reducer/SET_LOADING"


const initialState = {
    isLoading: true
}

export const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {...state, isLoading: action.isLoading};
        default :
            return state;
    }
}

export const setLoading = (isLoading) => {
    return {type: SET_LOADING, isLoading}
}

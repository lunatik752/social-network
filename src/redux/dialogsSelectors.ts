import {AppRootStateType} from "./store";

export const selectDialogsPage = (state: AppRootStateType) => {
    return state.dialogsPage
}

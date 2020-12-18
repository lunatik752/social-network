import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {DialogReducerInitialStateType, dialogsActions} from "../../redux/dialogsReduсer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppRootStateType} from "../../redux/store";
import React from "react";

type MapStatePropsType = {
    dialogsPage: DialogReducerInitialStateType
}

type MapDispatchPropsType = {
    addMessage: (newMessageBody: string) => void
}

let mapStateToProps = (state: AppRootStateType) => {
    return {
        dialogsPage: state.dialogsPage,
    }
};

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppRootStateType>(mapStateToProps, {addMessage: dialogsActions.addMessage}),
    withAuthRedirect
)(Dialogs)
;


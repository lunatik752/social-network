import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {DialogReducerInitialStateType, dialogsActions} from "../../redux/dialogsReduсer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose, Dispatch} from "redux";
import {AppRootStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    dialogsPage: DialogReducerInitialStateType
}

type MapDispatchPropsType = {
    addMessage: (newMessageBody: string) => void
}

let mapStateToProps = (state: MapStatePropsType) => {
    return {
        dialogsPage: state.dialogsPage,
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addMessage: (newMessageText: string) => {
            dispatch(dialogsActions.addMessage(newMessageText))
        }
    }
}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppRootStateType>(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)
;


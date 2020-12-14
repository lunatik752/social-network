import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {addMessage, DialogReducerInitialStateType} from "../../redux/dialogsReduсer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
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


export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppRootStateType>(mapStateToProps, {addMessage}),
    withAuthRedirect
)(Dialogs)
;

import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {addMessage, updateNewMessageText} from "../../redux/dialogsReduсer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";




let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
};


export default compose(
    connect(mapStateToProps, {updateNewMessageText, addMessage}),
    withAuthRedirect
)(Dialogs)
;


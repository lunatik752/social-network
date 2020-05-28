import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {addMessage, updateNewMessageText} from "../../redux/dialogsReduсer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";




let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
};

let AuthRedirectComponent = withAuthRedirect(Dialogs)


const DialogsContainer = connect(mapStateToProps, {updateNewMessageText, addMessage})(AuthRedirectComponent);

export default DialogsContainer;


import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {addMessage, updateNewMessageText} from "../../redux/dialogsReduсer";




let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
};


const DialogsContainer = connect(mapStateToProps, {updateNewMessageText, addMessage})(Dialogs);

export default DialogsContainer;


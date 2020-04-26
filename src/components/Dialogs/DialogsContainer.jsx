import React from 'react';
import PropTypes from 'prop-types';
import {addMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/dialogsReduсer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";




let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        updateNewMessageText: (text) => {
            dispatch(updateNewMessageTextActionCreator(text));
        },
        addMessage: () => {
            dispatch(addMessageActionCreator());
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;

DialogsContainer.propTypes = {
    state: PropTypes.object
};
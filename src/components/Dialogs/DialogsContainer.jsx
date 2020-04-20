import React from 'react';
import PropTypes from 'prop-types';
import {addMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/dialogsReduсer";
import Dialogs from "./Dialogs";



const DialogsContainer = (props) => {

    let state = props.store.getState().dialogsPage;

    let addMessage = () => {
        props.store.dispatch(addMessageActionCreator());
    };

    let onMessageChange = (text) => {
        props.store.dispatch(updateNewMessageTextActionCreator(text));
    };


    return <Dialogs updateNewMessageText={onMessageChange}
                             addMessage={addMessage}
                             dialogsPage={state}/>
};

export default DialogsContainer;

DialogsContainer.propTypes = {
    state: PropTypes.object
};
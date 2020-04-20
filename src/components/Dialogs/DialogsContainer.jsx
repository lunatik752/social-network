import React from 'react';
import PropTypes from 'prop-types';
import {addMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/dialogsReduсer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";


const DialogsContainer = () => {

    return (
        <StoreContext.Consumer>
            {
                (store) => {
                let state = store.getState().dialogsPage;

                let addMessage = () => {
                    store.dispatch(addMessageActionCreator());
                };

                let onMessageChange = (text) => {
                    store.dispatch(updateNewMessageTextActionCreator(text));
                };
                return <Dialogs updateNewMessageText={onMessageChange}
                                addMessage={addMessage}
                                dialogsPage={state}/>
            }
            }
        </StoreContext.Consumer>
    )
};

export default DialogsContainer;

DialogsContainer.propTypes = {
    state: PropTypes.object
};
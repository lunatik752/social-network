import React from 'react';
import s from './../Dialogs.module.css'
import PropTypes from "prop-types";
import Dialogs from "../Dialogs";



const Message = (props) => {
    return (
        <div className={s.message}>
            {props.message}
        </div>
    )
};


export default Message;


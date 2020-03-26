import React from 'react';
import s from './../Dialogs.module.css'
import PropTypes from "prop-types";




const Message = (props) => {
    return (
        <div className={s.message}>
            {props.message}
        </div>
    )
};


export default Message;


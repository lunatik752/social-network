import React from 'react';
import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";



const DialogsItem = (props) => {
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={'/dialogs/' + props.id}>{props.name}</NavLink>
        </div>
    )
};


export default DialogsItem;

DialogsItem.propTypes = {
    name: PropTypes.string,
    id: PropTypes.number
};
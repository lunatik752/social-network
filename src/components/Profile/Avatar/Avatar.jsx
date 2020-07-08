import React from 'react';
import s from './Avatar.module.css';
import userPhoto from '../../../assets/image/user.png'


const Avatar = (props) => {
    return (
        <div className={s.avatar}>
            <img src={props.photo || userPhoto} alt='photo'/>
        </div>
    )
};

export default Avatar;
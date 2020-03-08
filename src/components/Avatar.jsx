import React from 'react';
import s from './Avatar.module.css';

const Avatar = () => {
    return (
        <div className={s.avatar}>
            <img src='https://semantica.in/wp-content/uploads/2018/08/av-427845.png' alt='my photo'/>
        </div>
    )
};

export default Avatar;
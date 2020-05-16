import React from 'react';
import s from './PersonalInfo.module.css';

const PersonalInfo = (props) => {
    debugger
    return (
        <div className={s.personalInfo}>
            <p>Name: <span>{props.profile.fullName}</span> </p>
            <p>status: <span>{props.profile.aboutMe}</span></p>


        </div>
    )
};

export default PersonalInfo;


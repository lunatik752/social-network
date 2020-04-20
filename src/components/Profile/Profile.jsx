import React from 'react';
import s from './Profile.module.css';
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import Avatar from "./Avatar/Avatar";
import './Profile.module.css'
import PropTypes from "prop-types";
import MyPostsContainer from "./MyPosts/MyPostsContainer";


const Profile = (props) => {
    debugger
    return (
        <div className={s.profileWrapper}>
            <Avatar/>
            <PersonalInfo/>
            <MyPostsContainer store={props.store}/>
        </div>
    )
};

export default Profile;

Profile.propTypes = {
    state: PropTypes.string
};
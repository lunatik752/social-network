import React from 'react';
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import Avatar from "./Avatar/Avatar";
import './Profile.module.css'
import PropTypes from "prop-types";




const Profile = (props) => {
    return (
        <div className={s.profileWrapper}>
            <Avatar/>
            <PersonalInfo/>
            <MyPosts posts={props.profilePage.posts}
                     newPostText={props.profilePage.newPostText}
                     addPost={props.addPost}
                     updateNewPostText={props.updateNewPostText}/>
        </div>
    )
};

export default Profile;

Profile.propTypes = {
    state: PropTypes.string
};
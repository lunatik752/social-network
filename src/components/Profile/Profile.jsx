import React from 'react';
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import Avatar from "./Avatar/Avatar";
import './Profile.module.css'



const Profile = (props) => {
    return (
        <div className={s.profileWrapper}>
            <Avatar/>
            <PersonalInfo/>
            <MyPosts posts={props.posts}/>
        </div>
    )
};

export default Profile;
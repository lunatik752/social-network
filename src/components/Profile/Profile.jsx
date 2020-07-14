import React from 'react';
import s from './Profile.module.css';
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import Avatar from "./Avatar/Avatar";
import './Profile.module.css'
import PropTypes from "prop-types";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Loading from "../../common/Loading/Loading";



const Profile = (props) => {

    if (!props.profile) {
        return <Loading/>
    }

    return (
        <div className={s.profileWrapper}>
            <Avatar photos={props.profile.photos}
                    isOwner={props.isOwner}
                    savePhoto={props.savePhoto}/>
            <PersonalInfo profile={props.profile}
                          updateStatus={props.updateStatus}
                          status={props.status}
                          isOwner={props.isOwner}
                          saveProfile={props.saveProfile}/>
            <MyPostsContainer/>
        </div>
    )
};

export default Profile;

Profile.propTypes = {
    state: PropTypes.string
};
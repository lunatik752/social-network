import React from 'react';
import styles from './Avatar.module.css';
import userPhoto from '../../../assets/image/user.png'


const Avatar = (props) => {

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }
    return (
        <div className={styles.avatar}>
            <img src={props.photos.large || userPhoto} alt='photo'/>
            {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
        </div>
    )
};

export default Avatar;
import React, {ChangeEvent} from 'react';
import styles from './Avatar.module.css';
import userPhoto from '../../../assets/image/user.png'
import {ProfilePhotosType} from "../../../types/types";

type PropsType = {
    photos: ProfilePhotosType
    isOwner: boolean
    savePhoto: (file: File) => void
}

const Avatar: React.FC<PropsType> = (props) => {

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
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

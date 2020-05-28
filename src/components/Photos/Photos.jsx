import React from 'react';
import style from './Photos.module.css'
import PhotoItem from "./PhotoItem/PhotoItem";


const Photos = (props) => {


    let photosElement = props.photos.map(photo => <PhotoItem key={photo.id}
                                                             urlPhoto={photo.urlPhoto}
                                                             title={photo.title}/>)


    return (
        <div className={style.photosWrapper}>
            {photosElement}
        </div>
    )
};


export default Photos;

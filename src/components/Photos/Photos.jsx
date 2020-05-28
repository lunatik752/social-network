import React from 'react';
import style from './Photos.module.css'
import PhotoItem from "./PhotoItem/PhotoItem";
import {Redirect} from "react-router-dom";




const Photos = (props) => {



 let photosElement =  props.photos.map(photo => <PhotoItem key={photo.id}
                                          urlPhoto={photo.urlPhoto}
                                          title={photo.title}/>)

    if (!props.isAuth) return <Redirect to={'/login'}/>

    return (
        <div className={style.photosWrapper}>
            {photosElement}
        </div>
    )
};



export default Photos;

import React from 'react';
import style from './PhotoItem.module.css'




const PhotoItem = (props) => {
    debugger
    return (
        <div className={style.photoWrapper}>
           <img src={props.urlPhoto} alt='photo'/>
           <p>{props.title}</p>
        </div>
    )
};



export default PhotoItem;

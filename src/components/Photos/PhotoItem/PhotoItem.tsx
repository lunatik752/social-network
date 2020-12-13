import React from 'react';
import style from './PhotoItem.module.css'

type PropsType = {
    urlPhoto: string
    title: string
}


const PhotoItem: React.FC<PropsType> = (props) => {
    return (
        <div className={style.photoWrapper}>
           <img src={props.urlPhoto} alt='photo'/>
           <p>{props.title}</p>
        </div>
    )
};



export default PhotoItem;

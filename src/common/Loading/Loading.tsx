import React from 'react';
import style from './Loading.module.css';
import gif from '../../assets/gif/35.gif'

const Loading: React.FC = () => {
    return (
        <div className={style.loader}>
            <img src={gif} alt='loading...'/>
        </div>
    )
};

export default Loading;

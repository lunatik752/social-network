import React from 'react';
import s from './Post.module.css';

const Post = () => {
    return (
        <div className={s.item}>
            <img src='https://newscor.net/wp-content/uploads/9dae4c5ef70508e82f3bed0dcbac2209-800x700.jpg' alt='ava'/>
            post 1
            <div>
                <span>like</span>
            </div>
        </div>
    )
};

export default Post;
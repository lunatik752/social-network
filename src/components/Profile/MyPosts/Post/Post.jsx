import React from 'react';
import s from './Post.module.css';
import PropTypes from "prop-types";



const Post = (props) => {
    return (
        <div className={s.item}>
            <img src='https://newscor.net/wp-content/uploads/9dae4c5ef70508e82f3bed0dcbac2209-800x700.jpg' alt='ava'/>
            {props.message}
            <div>
                <span>like-{props.countLikes}</span>
            </div>
        </div>
    )
};

export default Post;

Post.propTypes = {
    message: PropTypes.string,
    countLikes: PropTypes.number
};
import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = () => {
    return (
        <div className={s.myPosts}>
            <h3> My posts </h3>
            <div>
                <div>
                    <textarea> </textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
            <Post massege='Hello!!!' countLikes='3'/>
            <Post massege='This is a post.' countLikes='8'/>
            </div>
        </div>
    )
};

export default MyPosts;
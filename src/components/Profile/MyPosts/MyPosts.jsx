import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = () => {
    return (
        <div>
            My posts
            <div>
                <textarea> </textarea>
                <button>Add post</button>
            </div>
            <Post massege='Hello!!!' countLikes='3'/>
            <Post massege='This is a post.' countLikes='8'/>
        </div>
    )
};

export default MyPosts;
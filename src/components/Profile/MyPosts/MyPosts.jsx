import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = () => {

    let posts = [
        {massege: 'Hello!!!', countLikes: '3'},
        {massege: 'This is a post.', countLikes: '12'}
    ];
    let postsElements = posts.map(p => <Post massege={p.massege} countLikes={p.countLikes}/>);

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
                {postsElements}
            </div>
        </div>
    )
};

export default MyPosts;
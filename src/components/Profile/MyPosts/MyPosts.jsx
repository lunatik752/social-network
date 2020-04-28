import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import PropTypes from "prop-types";




const MyPosts = (props) => {

    let postsElements = props.posts.map(p => <Post message={p.message} key={p.id} countLikes={p.countLikes}/>);


    let onAddPost = () => {
        props.addPost();
    };

    let onPostChange = (e) => {
        let text = e.target.value;
        props.updateNewPostText(text);
    };

    return (
        <div className={s.myPosts}>
            <h3> My posts </h3>
            <div>
                <div>
                    <textarea onChange={onPostChange}  value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={onAddPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
};

export default MyPosts;

MyPosts.propTypes = {
    posts: PropTypes.array
};
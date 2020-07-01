import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../../common/FormsControl/FormsControl";


const MyPosts = React.memo((props) => {

    let postsElements = props.posts.map(p => <Post message={p.message} key={p.id} countLikes={p.countLikes}/>);

    const addNewPost = (values) => {
        props.addPost(values.newPost)
    }

    return (
        <div className={s.myPosts}>
            <h3> My posts </h3>
            <AddPostReduxForm onSubmit={addNewPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
});

const maxLength10 = maxLengthCreator(10);

const AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       placeholder='Enter your message'
                       name='newPost'
                       validate={[required, maxLength10]}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddPostReduxForm = reduxForm({form: 'addPostForm'})(AddPostForm)


export default MyPosts;




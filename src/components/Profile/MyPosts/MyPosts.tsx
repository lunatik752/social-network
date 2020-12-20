import React, {useCallback} from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {InjectedFormProps, reduxForm} from "redux-form";
import {required} from "../../../utils/validators/validators";
import {createField, GetStringKeys, Textarea} from "../../../common/FormsControl/FormsControl";
import {PostType} from "../../../types/types";

export type MyPostsPropsType = {
    posts: Array<PostType>
}

export type DispatchPropsType = {
    addPost: (newPost: string) => void
}



const MyPosts: React.FC<MyPostsPropsType & DispatchPropsType> = (props) => {

    let postsElements = props.posts.map(p => <Post message={p.message} key={p.id} countLikes={p.countLikes}/>);

    const addNewPost = useCallback((values: AddPostFormDataType) => {
        props.addPost(values.newPost)}
    , [])

    return (
        <div className={s.myPosts}>
            <h3> My posts </h3>
            <AddPostReduxForm onSubmit={addNewPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
};

const MyPostMemorized = React.memo(MyPosts)

type AddPostFormPropsType = {
}

type AddPostFormDataType = {
    newPost: string
}

type AddPostFormDataTypeKeys = GetStringKeys<AddPostFormDataType>


const AddPostForm: React.FC<InjectedFormProps<AddPostFormDataType, AddPostFormPropsType> & AddPostFormPropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<AddPostFormDataTypeKeys>('Yor post', 'newPost', Textarea, [required])}
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddPostReduxForm = reduxForm<AddPostFormDataType, AddPostFormPropsType>({form: 'addPostForm'})(AddPostForm)


export default MyPostMemorized;




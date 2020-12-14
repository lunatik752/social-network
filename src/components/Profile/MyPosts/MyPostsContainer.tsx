import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {addPost} from "../../../redux/profileReduсer";
import {AppRootStateType} from "../../../redux/redux-store";
import {PostType} from "../../../types/types";

type MapStatePropsType = {
    newPostText: string
    posts: Array<PostType>
}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        newPostText: state.profilePage.newPostText,
        posts: state.profilePage.posts
    }
};



const MyPostsContainer = connect(mapStateToProps, {addPost})(MyPosts);

export default MyPostsContainer;

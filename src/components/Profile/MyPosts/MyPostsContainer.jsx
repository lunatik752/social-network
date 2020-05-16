import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {addPost, updateNewPostText} from "../../../redux/profileReduсer";


const mapStateToProps = (state) => {
    return {
        newPostText: state.profilePage.newPostText,
        posts: state.profilePage.posts
    }
};



const MyPostsContainer = connect(mapStateToProps, {addPost, updateNewPostText })(MyPosts);

export default MyPostsContainer;

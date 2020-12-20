import MyPosts, {MyPostsPropsType, DispatchPropsType} from "./MyPosts";
import {connect} from "react-redux";
import {profileActions} from "../../../redux/profileReducer";
import {AppRootStateType} from "../../../redux/store";


const mapStateToProps = (state: AppRootStateType) => {
    return {
        posts: state.profilePage.posts
    }
};


const MyPostsContainer = connect<MyPostsPropsType, DispatchPropsType, {}, AppRootStateType>(mapStateToProps, {addPost: profileActions.addPost})(MyPosts);

export default MyPostsContainer;

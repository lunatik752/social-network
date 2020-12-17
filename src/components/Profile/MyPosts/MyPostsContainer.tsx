import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {profileActions} from "../../../redux/profileReducer";
import {AppRootStateType} from "../../../redux/redux-store";
import {PostType} from "../../../types/types";
import {Dispatch} from "redux";

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

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addPost: (newPostText: string) => {
            dispatch(profileActions.addPost(newPostText))
        }
    }
}


const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;

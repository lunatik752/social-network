import {connect} from "react-redux";
import Photos from "./Photos";
import {addComment, updateNewCommentText} from "../../redux/photosReduсer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {AppRootStateType} from "../../redux/redux-store";
import {PhotosType, UserType} from "../../types/types";

type MapStatePropsType = {
    photos: Array<PhotosType>
}

type MapDispatchPropsType = {
}

type PropsType = MapStatePropsType & MapDispatchPropsType

let AuthRedirectComponent = withAuthRedirect(Photos)


const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        photos: state.photosPage.photos,
    }
};

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppRootStateType>(mapStateToProps, {addComment, updateNewCommentText})(AuthRedirectComponent);

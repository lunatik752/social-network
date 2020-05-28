import {connect} from "react-redux";
import Photos from "./Photos";
import {addComment, updateNewCommentText} from "../../redux/photosReduсer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


let AuthRedirectComponent = withAuthRedirect(Photos)


const mapStateToProps = (state) => {
    return {
        photos: state.photosPage.photos,
    }
};

export default connect(mapStateToProps, {addComment, updateNewCommentText})(AuthRedirectComponent);
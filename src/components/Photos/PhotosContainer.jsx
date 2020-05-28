import {connect} from "react-redux";
import Photos from "./Photos";
import {addComment, updateNewCommentText} from "../../redux/photosReduсer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import Dialogs from "../Dialogs/Dialogs";


let AuthRedirectComponent = withAuthRedirect(Photos)


const mapStateToProps = (state) => {
    return {
        photos: state.photosPage.photos,
    }
};

export default connect(mapStateToProps, {addComment, updateNewCommentText})(AuthRedirectComponent);
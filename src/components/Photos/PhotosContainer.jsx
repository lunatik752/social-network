import {connect} from "react-redux";
import Photos from "./Photos";
import {addComment, updateNewCommentText} from "../../redux/photosReduсer";


const mapStateToProps = (state) => {
    return {
        photos: state.photosPage.photos,
        isAuth: state.auth.isAuth,

    }
};



export default connect(mapStateToProps, {addComment, updateNewCommentText})(Photos);
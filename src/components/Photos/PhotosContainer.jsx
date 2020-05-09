import {connect} from "react-redux";
import Photos from "./Photos";
import {addCommentAC, updateNewCommentTextAC} from "../../redux/photosReduсer";


const mapStateToProps = (state) => {
    return {
        photos: state.photosPage.photos
    }
};

const mapDispatchToProps = (dispatch) => {
    debugger
    return {
        addComment: () => {
            dispatch(addCommentAC())
        },
        updateNewCommentText: (text) => {
            let action = updateNewCommentTextAC(text)
            dispatch(action);
        }

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Photos);
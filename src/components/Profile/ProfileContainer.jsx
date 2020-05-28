import React from 'react';
import './Profile.module.css'
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile} from "../../redux/profileReduсer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import Photos from "../Photos/Photos";


class ProfileContainer extends React.Component {


    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 11;
        }
        this.props.getUserProfile(userId)
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile
})

let AuthRedirectComponent = withAuthRedirect(ProfileContainer)

let withUrlDataContainerComponent = withRouter(AuthRedirectComponent)

export default connect(mapStateToProps, {getUserProfile})(withUrlDataContainerComponent);


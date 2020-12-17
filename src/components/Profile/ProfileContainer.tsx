import React from 'react';
import './Profile.module.css'
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile} from "../../redux/profileReducer";
import {withRouter, RouteProps} from "react-router-dom";
import {compose} from "redux";
import {AppRootStateType} from "../../redux/redux-store";
import {ProfileType} from "../../types/types";

type MapStatePropsType = {
    profile: ProfileType
    status: string
    authorizedUserId: number
    isAuth: boolean
}

type MapDispatchPropsType = {
    getUserProfile: (userId: string) => void
    getStatus: (userId: string) => void

}

type PropsType = MapStatePropsType & MapDispatchPropsType

class ProfileContainer extends React.Component<any> {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }


    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
        if (this.props.match.params !== prevProps.match.params) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <Profile {...this.props}
                     isOwner={!this.props.match.params.userId}
                     profile={this.props.profile}
                     updateStatus={this.props.updateStatus}
                     savePhoto={this.props.savePhoto}
                     saveProfile={this.props.saveProfile}
            status={this.props.status}/>
        )
    }
}

let mapStateToProps = (state: AppRootStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default compose(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter)(ProfileContainer);

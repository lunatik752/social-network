import React from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {follow, requestUsers, unFollow} from "../../redux/usersReduсer";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
} from "../../redux/usersSelectors";
import {UserType} from "../../types/types";
import {AppRootStateType} from '../../redux/store';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    users: Array<UserType>
    totalUsersCount: number
    isLoading: boolean
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    requestUsers: (currentPage: number, pageSize: number) => void
    follow: (userId: number) => void
    unFollow: (userId: number) => void
}

type OwnPropsType ={

}


type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersComponent extends React.Component<PropsType> {


    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.requestUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        this.props.requestUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return (
            <>
                <Users users={this.props.users}
                       onPageChanged={this.onPageChanged}
                       pageSize={this.props.pageSize}
                       totalUsersCount={this.props.totalUsersCount}
                       follow={this.props.follow}
                       unFollow={this.props.unFollow}
                       followingInProgress={this.props.followingInProgress}
                       currentPage={this.props.currentPage}
                       isLoading={this.props.isLoading}
                />
            </>
        )
    }
}

let mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isLoading: state.loading.isLoading,
        followingInProgress: getFollowingInProgress(state)
    }
};

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppRootStateType>(mapStateToProps, {
        follow, unFollow, requestUsers,
    }),
    withAuthRedirect
)(UsersComponent);

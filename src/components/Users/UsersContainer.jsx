import React from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import Loading from "../../common/Loading/Loading";
import {
    follow, requestUsers, setCurrentPage,
    toggleFollowingProgress,
    unFollow
} from "../../redux/usersReduсer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount, getUsers,
} from "../../redux/usersSelectors";


class UsersComponent extends React.Component {


    componentDidMount() {
        let {currentPage, pageSize} = this.props
        this.props.requestUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber) => {
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
                       toggleFollowingProgress={this.props.toggleFollowingProgress}
                       currentPage={this.props.currentPage}
                       isLoading={this.props.isLoading}
                />
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isLoading: state.loading.isLoading,
        followingInProgress: getFollowingInProgress(state)
    }
};


export default compose(
    connect(mapStateToProps, {
        follow, unFollow, requestUsers,
        toggleFollowingProgress, setCurrentPage
    }),
    withAuthRedirect
)(UsersComponent);
import React from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import Loading from "../../common/Loading/Loading";
import {
    follow, getUsers, setCurrentPage,
    toggleFollowingProgress,
    unFollow
} from "../../redux/usersReduсer";



class UsersComponent extends React.Component {


    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return (
            <>
                {this.props.isLoading ? <Loading/> :
                    <Users users={this.props.users}
                           onPageChanged={this.onPageChanged}
                           pageSize={this.props.pageSize}
                           totalUsersCount={this.props.totalUsersCount}
                           follow={this.props.follow}
                           unFollow={this.props.unFollow}
                           followingInProgress={this.props.followingInProgress}
                           toggleFollowingProgress={this.props.toggleFollowingProgress}
                    />}
            </>
        )
    }

}


let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isLoading: state.loading.isLoading,
        followingInProgress: state.usersPage.followingInProgress
    }
};


export default connect(mapStateToProps, {
    follow, unFollow, getUsers, toggleFollowingProgress, setCurrentPage
})(UsersComponent);
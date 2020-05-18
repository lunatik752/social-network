import React from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import Loading from "../../common/Loading/Loading";
import {follow, setCurrentPage, setTotalUsersCount, setUsers, unFollow} from "../../redux/usersReduсer";
import {setLoading} from "../../redux/loadingReducer";
import {usersAPI} from "../../api/api";


class UsersComponent extends React.Component {


    componentDidMount() {
        this.props.setLoading(true)
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
                    this.props.setLoading(false);
                    this.props.setUsers(data.items);
                    this.props.setTotalUsersCount(data.totalCount);
                }
            );
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.setLoading(true)
        usersAPI.getUsers(pageNumber, this.props.pageSize)
            .then(data => {
                    this.props.setLoading(false)
                    this.props.setUsers(data.items);
                }
            );
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
        isLoading: state.loading.isLoading
    }
};


export default connect(mapStateToProps, {follow, unFollow, setUsers, setCurrentPage, setTotalUsersCount, setLoading})(UsersComponent);
import React from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import * as axios from "axios";
import Loading from "../../common/Loading/Loading";
import {follow, setCurrentPage, setTotalUsersCount, setUsers, unFollow} from "../../redux/usersReduсer";
import {setLoading} from "../../redux/loadingReducer";


class UsersComponent extends React.Component {


    componentDidMount() {
        this.props.setLoading(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                    this.props.setLoading(false);
                    this.props.setUsers(response.data.items);
                    this.props.setTotalUsersCount(response.data.totalCount);
                }
            );
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.setLoading(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                    this.props.setLoading(false)
                    this.props.setUsers(response.data.items);
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
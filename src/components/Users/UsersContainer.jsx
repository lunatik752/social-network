import React from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {followAC, setCurrentPageAC, setTotalUsersCountAC, setUsersAC, unFollowAC} from "../../redux/usersReduсer";
import * as axios from "axios";
import Loading from "../../common/Loading/Loading";
import {setLoadingAC} from "../../redux/loadingReducer";

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

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId))
        },
        unFollow: (userId) => {
            dispatch(unFollowAC(userId))
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalUsersCount: (totalCount) => {
            dispatch(setTotalUsersCountAC(totalCount))
        },
        setLoading: (isLoading) => {
            dispatch(setLoadingAC(isLoading))
        }


    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UsersComponent);
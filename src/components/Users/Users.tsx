import React from 'react';
import style from './Usere.module.css'
import Paginator from "../../common/Paginator/Paginator";
import User from "./User";
import Loading from "../../common/Loading/Loading";
import { UserType } from '../../types/types';
import { UsersSearchForm } from './UsersSearchForm';


type PropsTypes = {
    pageSize: number
    currentPage: number
    onPageChanged: (page: number) => void
    totalUsersCount: number
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    users: Array<UserType>
    isLoading: boolean
}

const Users:React.FC<PropsTypes> = ({currentPage, onPageChanged, totalUsersCount, pageSize, followingInProgress, follow, unFollow, users, isLoading}) => {


    return (
        <div className={style.usersWrapper}>
            <UsersSearchForm/>
            <Paginator currentPage={currentPage}
                       onPageChanged={onPageChanged}
                       totalItemsCount={totalUsersCount}
                       pageSize={pageSize}
                       portionSize={10}

            />

            {isLoading ? <Loading/> : users.map(user => <User user={user}
                                     followingInProgress={followingInProgress}
                                     follow={follow}
                                     unFollow={unFollow}
                                     key={user.id}
                />
            )}
        </div>
    )
};


export default Users;

import React from 'react';
import style from './Usere.module.css'
import Paginator from "../../common/Paginator/Paginator";
import User from "./User";
import Loading from "../../common/Loading/Loading";


const Users = ({currentPage, onPageChanged, totalUsersCount, pageSize, followingInProgress, follow, unFollow, users, isLoading}) => {


    return (
        <div className={style.usersWrapper}>
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
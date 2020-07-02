import React from 'react';
import style from './Usere.module.css'
import Paginator from "../../common/Paginator/Paginator";
import User from "./User";


const Users = ({currentPage, onPageChanged, totalUsersCount, pageSize, followingInProgress, follow, unFollow, users}) => {


    return (
        <div className={style.usersWrapper}>
            <Paginator currentPage={currentPage}
                       onPageChanged={onPageChanged}
                       totalUsersCount={totalUsersCount}
                       pageSize={pageSize}
            />

            {users.map(user => <User user={user}
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
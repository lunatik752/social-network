import React from 'react';
import style from './Usere.module.css'
import userPhoto from '../../assets/image/user.png'
import {NavLink} from "react-router-dom";
import Paginator from "../../common/Paginator/Paginator";


const Users = ( {currentPage, onPageChanged, totalUsersCount, pageSize ,  ...props}) => {


    return (
        <div className={style.usersWrapper}>
            <Paginator currentPage={currentPage}
                       onPageChanged={onPageChanged}
                       totalUsersCount={totalUsersCount}
                       pageSize={pageSize}
            />

            {props.users.map(user => <div key={user.id}>
                    <span>
                        <div>
                            <NavLink to={`/profile/${user.id}`}>
                                 <img src={user.photos.small != null ? user.photos.small : userPhoto}
                                      alt='photo'
                                      className={style.userPhoto}/>
                            </NavLink>
                        </div>
                        <div>
                            {user.followed
                                ? <button disabled={props.followingInProgress.some(id => id === user.id)}
                                          onClick={() => {
                                              props.unFollow(user.id)
                                          }}>Unfollow
                                </button>
                                : <button disabled={props.followingInProgress.some(id => id === user.id)}
                                          onClick={() => {
                                              props.follow(user.id)
                                          }}>Follow
                                </button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>
                                <span>{user.name}</span>
                            </div>
                            <div>
                                {user.status}
                            </div>
                        </span>
                    </span>
            </div>)
            }
        </div>
    )
};


export default Users;
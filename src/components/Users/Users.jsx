import React from 'react';
import style from './Usere.module.css'
import userPhoto from '../../assets/image/user.png'
import {NavLink} from "react-router-dom";
import axios from "axios";
import {usersAPI} from "../../api/api";


const Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }


    return (
        <div className={style.usersWrapper}>
            <div>
                {pages.map(page => {
                    return <span key={page.id}
                                 className={props.currentPage === page && style.selectedPage}
                                 onClick={(e) => {
                                     props.onPageChanged(page)
                                 }}
                    >{page}</span>
                })}
            </div>
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
                            {user.followed ? <button onClick={() => {
                                    usersAPI.unFollowUser(user.id)
                                        .then(data => {
                                                if (data.resultCode === 0) {
                                                    props.unFollow(user.id);
                                                }
                                            }
                                        );
                                }
                                }

                                >Unfollow</button>
                                : <button onClick={() => {
                                    usersAPI.followUser(user.id)
                                        .then(data => {
                                                if (data.resultCode === 0) {
                                                    props.follow(user.id)
                                                }
                                            }
                                        );
                                }}>Follow</button>}


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
                                <span>
                                <div>
                                {'user.location.country'}
                                </div>
                                <div>
                                {'user.location.city'}
                                </div>
                                </span>
                                </span>
            </div>)
            }
        </div>
    )
};


export default Users;
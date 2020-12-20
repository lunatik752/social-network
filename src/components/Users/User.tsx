import React from 'react';
import style from './Usere.module.css'
import userPhoto from '../../assets/image/user.png'
import {NavLink} from "react-router-dom";
import {UserType} from "../../types/types";

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    unFollow: (id: number) => void
    follow: (id: number) => void
}

const User: React.FC<PropsType> = ({user, followingInProgress, unFollow, follow}) => {


    return (
        <div>
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
                                ? <button disabled={followingInProgress.some(id => id === user.id)}
                                          onClick={() => {
                                              unFollow(user.id)
                                          }}>Unfollow
                                </button>
                                : <button disabled={followingInProgress.some(id => id === user.id)}
                                          onClick={() => {
                                              follow(user.id)
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


export default User;

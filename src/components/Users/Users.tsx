import React, {useEffect} from 'react';
import style from './Usere.module.css'
import Paginator from "../../common/Paginator/Paginator";
import User from "./User";
import Loading from "../../common/Loading/Loading";
import {UserType} from '../../types/types';
import {UsersSearchForm} from './UsersSearchForm';
import {FilterType, follow, requestUsers, unFollow} from "../../redux/usersReduсer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsLoading,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/usersSelectors";


type PropsTypes = {
}

export const Users: React.FC<PropsTypes> = React.memo(() => {

        const totalUsersCount = useSelector<AppRootStateType, number>(getTotalUsersCount)
        const currentPage = useSelector<AppRootStateType, number>(getCurrentPage)
        const pageSize = useSelector<AppRootStateType, number>(getPageSize)
        const filter = useSelector<AppRootStateType, FilterType>(getUsersFilter)
        const isLoading = useSelector<AppRootStateType, boolean>(getIsLoading)
        const followingInProgress = useSelector<AppRootStateType, Array<number>>(getFollowingInProgress)
        const users = useSelector<AppRootStateType, Array<UserType>>(getUsers)

        const dispatch = useDispatch()

        useEffect(() => {
          dispatch(requestUsers(currentPage, pageSize, filter))
        }, [])

        const onPageChanged = (pageNumber: number) => {
            dispatch(requestUsers(pageNumber, pageSize, filter))
        }

        const onFilterChanged = (filter: FilterType) => {
            dispatch(requestUsers(1, pageSize, filter))

        }

        const followHandler = (userId: number) => {
            dispatch(follow(userId))
        }

        const unFollowHandler = (userId: number) => {
            dispatch(unFollow(userId))

        }

        return (
            <div className={style.usersWrapper}>
                <UsersSearchForm onFilterChanged={onFilterChanged}/>
                <Paginator currentPage={currentPage}
                           onPageChanged={onPageChanged}
                           totalItemsCount={totalUsersCount}
                           pageSize={pageSize}
                           portionSize={10}

                />

                {isLoading ? <Loading/> : users.map(user => <User user={user}
                                                                  followingInProgress={followingInProgress}
                                                                  follow={followHandler}
                                                                  unFollow={unFollowHandler}
                                                                  key={user.id}
                    />
                )}
            </div>
        )
    }
);

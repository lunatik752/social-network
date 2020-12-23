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
import {useHistory} from 'react-router-dom';
import * as queryString from 'querystring'

type PropsTypes = {}
type QueryParamsType = { term?: string; page?: string; friend?: string}

export const Users: React.FC<PropsTypes> = React.memo(() => {

        const totalUsersCount = useSelector<AppRootStateType, number>(getTotalUsersCount)
        const currentPage = useSelector<AppRootStateType, number>(getCurrentPage)
        const pageSize = useSelector<AppRootStateType, number>(getPageSize)
        const filter = useSelector<AppRootStateType, FilterType>(getUsersFilter)
        const isLoading = useSelector<AppRootStateType, boolean>(getIsLoading)
        const followingInProgress = useSelector<AppRootStateType, Array<number>>(getFollowingInProgress)
        const users = useSelector<AppRootStateType, Array<UserType>>(getUsers)

        const dispatch = useDispatch()
        const history = useHistory()

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType

        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = Number(parsed.page)


        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

        switch(parsed.friend) {
            case "null":
                actualFilter = {...actualFilter, friend: null}
                break;
            case "true":
                actualFilter = {...actualFilter, friend: true}
                break;
            case "false":
                actualFilter = {...actualFilter, friend: false}
                break;
        }

        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const query: QueryParamsType = {}

        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)

        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])


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

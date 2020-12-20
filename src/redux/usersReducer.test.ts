import {UserType} from "../types/types";
import {InitialStateType, usersReducer, userReducerActions} from "./usersReduсer";

let state: InitialStateType

beforeEach(() => {
    state = {
        users: [
            {id: 0, followed: false, name: 'Max', photos: {large: null, small: null}, status: 'status 0'},
            {id: 1, followed: false, name: 'Kna', photos: {large: null, small: null}, status: 'status 1'},
            {id: 2, followed: true, name: 'Alex', photos: {large: null, small: null}, status: 'status 2'},
            {id: 3, followed: true, name: 'Lena', photos: {large: null, small: null}, status: 'status 3'},
        ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        followingInProgress: []
    }
})

test('follow success', () => {

    const newState = usersReducer(state, userReducerActions.followSuccess(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

test('unfollow success', () => {

    const newState = usersReducer(state, userReducerActions.unFollowSuccess(2))

    expect(newState.users[2].followed).toBeFalsy()
    expect(newState.users[3].followed).toBeTruthy()
})

import {follow, unFollow, userReducerActions} from "./usersReduсer";
import {usersAPI} from "../api/users-api";
import {ApiResponseType, ResultCodeEnum} from "../api/api";

jest.mock("../api/users-api")
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    usersAPIMock.followUser.mockClear()
    usersAPIMock.unFollowUser.mockClear()
})

const result: ApiResponseType = {
    resultCode: ResultCodeEnum.Success,
    messages: [],
    data: {}
}

usersAPIMock.followUser.mockReturnValue(Promise.resolve(result))
usersAPIMock.unFollowUser.mockReturnValue(Promise.resolve(result))

test('success follow thunk', async () => {
    const thunk = follow(1)


    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, userReducerActions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, userReducerActions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, userReducerActions.toggleFollowingProgress(false, 1))
})

test('success unfollow thunk', async () => {
    const thunk = unFollow(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, userReducerActions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, userReducerActions.unFollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, userReducerActions.toggleFollowingProgress(false, 1))
})

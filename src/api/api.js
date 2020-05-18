import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {'API-KEY': '90bf912e-ca5a-4b96-9037-858f400fe7a5'},
});

export  const usersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`
        ).then(response => {
                return response.data;
            })
    },
    unFollowUser(userId) {
        return instance.delete(`follow/${userId}`
        ).then(response => {
            return response.data;
        })
    },
    followUser(userId) {
        return instance.post(`follow/${userId}`, {}
        ).then(response => {
            return response.data;
        })
    },

}

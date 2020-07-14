import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {'API-KEY': '90bf912e-ca5a-4b96-9037-858f400fe7a5'},
});

export const usersAPI = {
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
    getProfile(userId) {
        console.warn('Obsolete method. Please profileAPI object.')
        return profileAPI.getProfile(userId)
    },
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`,)
    },
    login(email, password, rememberMe) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout() {
        return instance.delete(`auth/login`);
    },

}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status})
    },
    savePhoto(file) {
        const formData = new FormData();
        formData.append("image", file);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
                return response.data;
            }
        )
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile)
    }
}
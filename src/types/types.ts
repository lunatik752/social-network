
export type ProfilePhotosType = {
    small: string
    large: string
}

export type PostType = {
    id: number
    message: string
    countLikes: number
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: ProfilePhotosType
    aboutMe: string
}

export type UserType = {
    name: string
    id: number
    photos: ProfilePhotosType
    status: string,
    followed: boolean
}

export type DialogType = {
    name: string
    id: number
}

export type MessageType = {
    message: string
    id: number
}

export type CommentsType ={
    id: number
    comment: string
}

export type PhotosType = {
    id: number
    urlPhoto: string
    title: string
    comments: Array<CommentsType>
}

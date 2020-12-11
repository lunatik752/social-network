
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
}

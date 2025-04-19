export interface User {
    id: string
    avatar?: string
    first_name: string
    last_name: string
    email: string
    gender?: Gender
    date_of_birth: string
    weight: number
    height: number
    isProfileComplete: boolean
}

export type Gender = 'Male' | 'Female' | 'Other'

export type UpdateNameReqBody = {
    first_name: string
    last_name: string
}

export type UpdateProfileDetailReqBody = {
    gender?: Gender
    date_of_birth: string
    weight: number
    height: number
}

export type UpdateAvatarReqBody = {
    avatar: string
}

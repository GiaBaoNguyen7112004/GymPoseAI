export interface User {
    id: string
    avatar?: string
    username: string
    first_name: string
    last_name: string
    email: string
    gender?: Gender
    date_of_birth: string
    weight: number
    height: number
}

export type Gender = 'Male' | 'Female' | 'Other'

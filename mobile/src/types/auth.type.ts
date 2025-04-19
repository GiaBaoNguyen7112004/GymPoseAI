import { User } from './user.type'
import { ResponseApi } from './utils.type'

export type AuthResponse = ResponseApi<
    {
        access_token: string
        refresh_token: string
        user: User
    },
    any
>

export type RefreshTokenResponse = ResponseApi<
    {
        access_token: string
        refresh_token: string
    },
    any
>

export type FindAccountResponse = ResponseApi<
    {
        user: User
    },
    any
>

export type RegisterReqBody = {
    first_name: string
    last_name: string
    email: string
    password: string
}

export type ChangePasswordRedBody = {
    password: string
    newPassword: string
}

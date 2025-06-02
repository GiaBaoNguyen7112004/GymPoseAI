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
    },
    any
>

// request body types
export type RegisterReqBody = {
    first_name: string
    last_name: string
    email: string
    password: string
}

export type LoginReqBody = {
    email: string
    password: string
}

export type ForgotPasswordReqBody = {
    email: string
    otp: string
}

export type VerifyAccountReqBody = {
    account_verification_token: string
}

export type ResetPasswordReqBody = {
    email: string
    password: string
    otp: string
}

export type ChangePasswordReqBody = {
    old_password: string
    new_password: string
    new_password_confirmation: string
}

export type LoginWithFacebookReqBody = {
    access_token: string
}

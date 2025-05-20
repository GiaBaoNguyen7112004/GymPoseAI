import http from '@/services/core/http'
import storage from '@/utils/StorageManager.util'

import {
    AuthResponse,
    ForgotPasswordReqBody,
    LoginReqBody,
    RegisterReqBody,
    ResetPasswordReqBody,
    VerifyAccountReqBody
} from '@/types/auth.type'

import { ResponseApi } from '@/types/utils.type'

const authApi = {
    registerAccount(body: RegisterReqBody) {
        return http.post<AuthResponse>(process.env.EXPO_PUBLIC_URL_REGISTER, body)
    },

    login(body: LoginReqBody) {
        return http.post<AuthResponse>(process.env.EXPO_PUBLIC_URL_LOGIN, body)
    },

    logout() {
        const body = { refresh_token: storage.getRefreshToken() }
        console.log(storage.getRefreshToken())
        return http.post(process.env.EXPO_PUBLIC_URL_LOGOUT, body)
    },

    findAccount(body: Omit<ForgotPasswordReqBody, 'otp'>) {
        console.log('findAccount', process.env.EXPO_PUBLIC_URL_FORGOT_PASSWORD)
        return http.post(process.env.EXPO_PUBLIC_URL_FORGOT_PASSWORD, body)
    },

    verifyOtpForgotPassword(body: ForgotPasswordReqBody) {
        return http.post<ResponseApi<any, any>>(process.env.EXPO_PUBLIC_URL_VERIFY_OTP, body)
    },

    resentOTPForgotPassword(body: Omit<ForgotPasswordReqBody, 'otp'>) {
        return http.post<ResponseApi<any, any>>(process.env.EXPO_PUBLIC_URL_RESEND_OTP_FORGOT_PASSWORD, body)
    },

    resetPassword(body: ResetPasswordReqBody) {
        return http.post<ResponseApi<any, any>>(process.env.EXPO_PUBLIC_URL_RESET_PASSWORD, body)
    },

    verifyAccount(body: VerifyAccountReqBody) {
        return http.post<ResponseApi<any, any>>(process.env.EXPO_PUBLIC_URL_VERIFY_ACCOUNT, body)
    }
}

export default authApi

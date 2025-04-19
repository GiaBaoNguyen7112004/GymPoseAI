import http from '@/services/core/httpClient'
import storage from '@/utils/StorageManager.util'

import { AuthResponse, ChangePasswordRedBody, FindAccountResponse, RegisterReqBody } from '@/types/auth.type'

import { ResponseApi } from '@/types/utils.type'

import {
    URL_REGISTER,
    URL_LOGIN,
    URL_LOGOUT,
    URL_FORGOT_PASSWORD,
    URL_VERIFY_OTP,
    URL_RESET_PASSWORD,
    URL_RESEND_OTP_FORGOT_PASSWORD,
    URL_CHANGE_PASSWORD
} from '@env'

const authApi = {
    registerAccount(body: RegisterReqBody) {
        return http.post<AuthResponse>(URL_REGISTER, body)
    },

    login(body: { email: string; password: string }) {
        return http.post<AuthResponse>(URL_LOGIN, body)
    },

    logout() {
        return http.post(URL_LOGOUT, {
            body: { refresh_token: storage.getRefreshToken() }
        })
    },

    findAccount(body: { email: string }) {
        return http.post<FindAccountResponse>(URL_FORGOT_PASSWORD, body)
    },

    verifyOtpForgotPassword(body: { email: string; otp: string }) {
        return http.post<ResponseApi<any, any>>(URL_VERIFY_OTP, body)
    },

    resentOTPForgotPassword(body: { email: string }) {
        return http.post<ResponseApi<any, any>>(URL_RESEND_OTP_FORGOT_PASSWORD, body)
    },

    resetPassword(body: { email: string; password: string; otp: string }) {
        return http.post<ResponseApi<any, any>>(URL_RESET_PASSWORD, body)
    },

    changePassword(body: ChangePasswordRedBody) {
        return http.put<ResponseApi<any, any>>(URL_CHANGE_PASSWORD, body)
    }
}

export default authApi

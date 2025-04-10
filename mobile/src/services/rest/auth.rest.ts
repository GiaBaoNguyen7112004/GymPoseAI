import http from '@/src/services/core/httpClient'
import { AuthResponse, FindAccountResponse } from '@/src/types/auth.type'
import {
    URL_LOGIN,
    URL_LOGOUT,
    URL_REGISTER,
    URL_FORGOT_PASSWORD,
    URL_VERIFY_OTP,
    URL_RESET_PASSWORD,
    URL_RESEND_OTP_FORGOT_PASSWORD
} from '@env'
import { ResponseApi } from '@/src/types/utils.type'

const authApi = {
    registerAccount(body: { first_name: string; last_name: string; email: string; password: string }) {
        return http.post<AuthResponse>(URL_REGISTER, body)
    },
    login(body: { email: string; password: string }) {
        return http.post<AuthResponse>(URL_LOGIN, body)
    },

    logout() {
        return http.post(URL_LOGOUT)
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
    }
}

export default authApi

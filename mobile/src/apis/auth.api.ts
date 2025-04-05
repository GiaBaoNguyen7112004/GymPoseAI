import http from '@/src/utils/https.util'
import { AuthResponse } from '@/src/types/auth.type'

const authApi = {
    registerAccount(body: { first_name: string; last_name: string; email: string; password: string }) {
        return http.post<AuthResponse>(URL_LOGIN, body)
    },
    login(body: { email: string; password: string }) {
        return http.post<AuthResponse>(URL_LOGIN, body)
    },

    logout() {
        return http.post(URL_LOGOUT)
    }
}

export default authApi

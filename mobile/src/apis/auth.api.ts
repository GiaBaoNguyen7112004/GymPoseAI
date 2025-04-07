import http from '@/src/utils/https.util'
import { AuthResponse } from '@/src/types/auth.type'
import { URL_LOGIN, URL_LOGOUT, URL_REGISTER } from '@env'
console.log('API_URL ', URL_LOGIN)
const authApi = {
    registerAccount(body: { first_name: string; last_name: string; email: string; password: string }) {
        return http.post<AuthResponse>(URL_REGISTER, body)
    },
    login(body: { email: string; password: string }) {
        return http.post<AuthResponse>(URL_LOGIN, body)
    },

    logout() {
        return http.post(URL_LOGOUT)
    }
}

export default authApi

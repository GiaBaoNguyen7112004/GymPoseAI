import { AuthResponse } from '@/types/auth.type'
import http from '@/services/core/http'
const OauthApi = {
    loginWithFacebook: (body: { access_token: string }) => {
        return http.post<AuthResponse>(`${process.env.EXPO_PUBLIC_URL_LOGIN}/oauth/facebook`, body)
    }
}

export default OauthApi

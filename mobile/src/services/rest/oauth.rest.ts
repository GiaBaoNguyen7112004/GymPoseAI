import { AuthResponse, LoginWithFacebookReqBody } from '@/types/auth.type'
import http from '@/services/core/http'
const OauthApi = {
    loginWithFacebook: (body: LoginWithFacebookReqBody) => {
        return http.post<AuthResponse>(`${process.env.EXPO_PUBLIC_URL_LOGIN}/oauth/facebook`, body)
    }
}

export default OauthApi

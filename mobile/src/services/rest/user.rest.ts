import { ResponseApi } from '@/types/utils.type'
import { User } from '@/types/user.type'
import http from '../core/httpClient'
import { URL_USER } from '@env'
const userApi = {
    getProfile() {
        return http.get<ResponseApi<User, any>>(`${URL_USER}`)
    },
    updateProfile(body: any) {
        return http.put<ResponseApi<User, any>>(URL_USER, body)
    }
}

export default userApi

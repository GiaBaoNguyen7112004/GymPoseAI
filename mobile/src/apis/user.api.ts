import { ResponseApi } from '../types/utils.type'
import { URL_USER } from '@env'
import http from '../utils/https.util'
import { User } from '../types/user.type'

const userApi = {
    getProfile({ id }: { id: string }) {
        return http.get<ResponseApi<User, any>>(`${URL_USER}/${id}`)
    },
    updateProfile(body: any) {
        return http.put<ResponseApi<User, any>>(URL_USER, body)
    }
}

export default userApi

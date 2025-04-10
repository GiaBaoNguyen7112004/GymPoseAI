import { ResponseApi } from '@/src/types/utils.type'
import { URL_USER } from '@env'
import { User } from '@/src/types/user.type'
import http from '../core/httpClient'

const userApi = {
    getProfile({ id }: { id: string }) {
        return http.get<ResponseApi<User, any>>(`${URL_USER}/${id}`)
    },
    updateProfile(body: any) {
        return http.put<ResponseApi<User, any>>(URL_USER, body)
    }
}

export default userApi

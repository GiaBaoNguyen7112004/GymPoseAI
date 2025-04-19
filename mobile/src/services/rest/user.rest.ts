import { ResponseApi } from '@/types/utils.type'
import { UpdateAvatarReqBody, UpdateNameReqBody, UpdateProfileDetailReqBody, User } from '@/types/user.type'
import http from '../core/httpClient'
import { URL_USER } from '@env'
type updateProfileBodyReq = UpdateNameReqBody | UpdateProfileDetailReqBody | UpdateAvatarReqBody
const userApi = {
    getProfile() {
        return http.get<ResponseApi<User, any>>(`${URL_USER}`)
    },
    updateProfile(body: updateProfileBodyReq) {
        return http.patch<ResponseApi<User, any>>(URL_USER, body)
    }
}

export default userApi

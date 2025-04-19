import { ResponseApi } from '@/types/utils.type'
import { UpdateAvatarReqBody, UpdateNameReqBody, UpdateProfileDetailReqBody, User } from '@/types/user.type'
import http from '../core/httpClient'
import { URL_CHANGE_PASSWORD, URL_USER } from '@env'
import { ChangePasswordRedBody } from '@/types/auth.type'
type updateProfileBodyReq = UpdateNameReqBody | UpdateProfileDetailReqBody | UpdateAvatarReqBody
const userApi = {
    getProfile() {
        return http.get<ResponseApi<User, any>>(`${URL_USER}`)
    },
    updateProfile(body: updateProfileBodyReq) {
        return http.patch<ResponseApi<User, any>>(URL_USER, body)
    },
    changePassword(body: ChangePasswordRedBody) {
        return http.put<ResponseApi<any, any>>(URL_CHANGE_PASSWORD, body)
    }
}

export default userApi

import { ResponseApi } from '@/types/utils.type'
import { UpdateAvatarReqBody, UpdateNameReqBody, UpdateProfileDetailReqBody, User } from '@/types/user.type'
import http from '../core/httpClient'
import { ChangePasswordRedBody } from '@/types/auth.type'

type updateProfileBodyReq = UpdateNameReqBody | UpdateProfileDetailReqBody | UpdateAvatarReqBody

const userApi = {
    getProfile() {
        return http.get<ResponseApi<User, any>>(process.env.EXPO_PUBLIC_URL_USER)
    },
    updateProfile(body: updateProfileBodyReq) {
        return http.patch<ResponseApi<User, any>>(process.env.EXPO_PUBLIC_URL_USER, body)
    },
    changePassword(body: ChangePasswordRedBody) {
        return http.put<ResponseApi<any, any>>(process.env.EXPO_PUBLIC_URL_CHANGE_PASSWORD, body)
    }
}

export default userApi

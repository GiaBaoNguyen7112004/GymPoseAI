import { ResponseApi } from '@/types/utils.type'
import {
    ResponseUserApi,
    UpdateAvatarReqBody,
    UpdateNameReqBody,
    UpdateProfileDetailReqBody,
    User
} from '@/types/user.type'
import http from '@/services/core/http'
import { ChangePasswordReqBody } from '@/types/auth.type'

type updateProfileBodyReq = UpdateNameReqBody | UpdateProfileDetailReqBody | UpdateAvatarReqBody

const userApi = {
    getProfile() {
        return http.get<ResponseUserApi>(`${process.env.EXPO_PUBLIC_URL_USER}/profile`)
    },
    updateProfile(body: updateProfileBodyReq) {
        return http.patch<ResponseUserApi>(process.env.EXPO_PUBLIC_URL_USER, body)
    },
    changePassword(body: ChangePasswordReqBody) {
        return http.patch<ResponseApi<any, any>>(process.env.EXPO_PUBLIC_URL_CHANGE_PASSWORD, body)
    }
}

export default userApi

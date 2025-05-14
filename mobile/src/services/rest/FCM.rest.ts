import { ResponseApi } from '@/types/utils.type'
import http from '@/services/core/http'
import { RegisterFCMReqBody } from '@/types/FCM.type'

const FCMApi = {
    registerFCMToken: (body: RegisterFCMReqBody) => {
        return http.post<ResponseApi<any, any>>(`${process.env.EXPO_PUBLIC_URL_NOTIFICATION}`, body)
    },
    deleteFCMToken: (body: RegisterFCMReqBody) => {
        return http.delete<ResponseApi<any, any>>(`${process.env.EXPO_PUBLIC_URL_NOTIFICATION}`, { data: body })
    }
}

export default FCMApi

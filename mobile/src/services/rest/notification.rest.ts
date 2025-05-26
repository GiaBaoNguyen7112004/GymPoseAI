import { BaseQueryConfig, ResponseApi } from '@/types/utils.type'
import http from '@/services/core/http'
import { ResponseAPINotificationPage } from '@/types/notification.type'
import { ResponseNewNotificationCount } from '@/types/FCM.type'

const notificationApi = {
    getNotification(params: BaseQueryConfig) {
        return http.get<ResponseAPINotificationPage>(`${process.env.EXPO_PUBLIC_URL_NOTIFICATION}`, { params })
    },
    readNotification({ id }: { id: string }) {
        return http.patch(`${process.env.EXPO_PUBLIC_URL_NOTIFICATION}/${id}`)
    },
    deleteNotification({ id }: { id: string }) {
        return http.delete<ResponseApi<any, any>>(`${process.env.EXPO_PUBLIC_URL_NOTIFICATION}/${id}`)
    },
    getNewNotificationCount() {
        return http.get<ResponseNewNotificationCount>(`${process.env.EXPO_PUBLIC_URL_NOTIFICATION}/new/number`)
    },
    resetNewNotificationCount() {
        return http.patch<ResponseApi<any, any>>(`${process.env.EXPO_PUBLIC_URL_NOTIFICATION}/new/reset`)
    },
    readAllNotification() {
        return http.patch<ResponseApi<any, any>>(`${process.env.EXPO_PUBLIC_URL_NOTIFICATION}/read`)
    }
}

export default notificationApi

import { BaseQueryConfig, ResponseApi } from '@/types/utils.type'
import http from '@/services/core/http'
import { ResponseAPINotificationPage } from '@/types/notification.type'
import { ResponseNewNotificationCount } from '@/types/FCM.type'

const notificationApi = {
    getNotification({ params }: { params: BaseQueryConfig }) {
        return http.get<ResponseAPINotificationPage>(`${process.env.EXPO_PUBLIC_URL_NOTIFICATION}`, {
            params
        })
    },
    readNotification({ id }: { id: string }) {
        return http.put(`${process.env.EXPO_PUBLIC_URL_NOTIFICATION}/${id}/read`)
    },
    deleteNotification({ id }: { id: string }) {
        return http.delete<ResponseApi<any, any>>(`${process.env.EXPO_PUBLIC_URL_NOTIFICATION}/${id}/delete`)
    },
    getNewNotificationCount() {
        return http.get<ResponseNewNotificationCount>(`${process.env.EXPO_PUBLIC_URL_NOTIFICATION}/new`)
    },
    resetNewNotificationCount() {
        return http.put<ResponseApi<any, any>>(`${process.env.EXPO_PUBLIC_URL_NOTIFICATION}/reset-new`)
    },
    readAllNotification() {
        return http.put<ResponseApi<any, any>>(`${process.env.EXPO_PUBLIC_URL_NOTIFICATION}/read-all`)
    }
}

export default notificationApi

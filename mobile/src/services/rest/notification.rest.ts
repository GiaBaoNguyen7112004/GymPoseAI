import { BaseQueryConfig, ResponseApi } from '@/types/utils.type'
import http from '../core/httpClient'
import { ResponseAPINotificationPage } from '@/types/notification.type'

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
    }
}

export default notificationApi

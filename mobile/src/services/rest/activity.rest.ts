import http from '@/services/core/http'
import { BaseQueryConfig } from '@/types/utils.type'
import { ResponseAPIActivityPage } from '@/types/userActivity.type'

const activityApi = {
    getDailyActivity(params: BaseQueryConfig) {
        return http.get<ResponseAPIActivityPage>(`${process.env.EXPO_PUBLIC_URL_ACTIVITY}`, { params })
    }
}

export default activityApi

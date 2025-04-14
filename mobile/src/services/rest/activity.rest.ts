import http from '@/src/services/core/httpClient'
import { URL_ACTIVITY } from '@env'
import { BaseQueryConfig } from '@/src/types/utils.type'
import { ResponseAPIActivityPage } from '@/src/types/userActivity.type'

const activityApi = {
    getDailyActivity({ params }: { params: BaseQueryConfig }) {
        return http.get<ResponseAPIActivityPage>(`${URL_ACTIVITY}`, {
            params
        })
    }
}

export default activityApi

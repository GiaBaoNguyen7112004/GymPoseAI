import http from '@/src/services/core/httpClient'
import { URL_ACTIVITY } from '@env'
import { BaseQueryConfig, PaginationMeta, ResponseApi } from '@/src/types/utils.type'
import { UserActivity } from '@/src/types/userActivity.type'

const activityApi = {
    getDailyActivity({ params }: { params: BaseQueryConfig }) {
        return http.get<ResponseApi<UserActivity[], PaginationMeta>>(`${URL_ACTIVITY}`, {
            params
        })
    }
}

export default activityApi

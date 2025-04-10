import http from '@/src/services/core/httpClient'
import { URL_GET_WORKOUT_HISTORY } from '@env'
import { PaginationMeta, QueryConfigWorkoutHistory, ResponseApi } from '@/src/types/utils.type'
import { ViewModeType, workoutHistory, workoutHistoryOfDay } from '@/src/types/workoutHistory.type'

const workoutHistoryApi = {
    getWorkoutHistory({ params, user_id }: { params: QueryConfigWorkoutHistory; user_id: string }) {
        return http.get<ResponseApi<workoutHistory[], PaginationMeta>>(`${URL_GET_WORKOUT_HISTORY}/${user_id}`, {
            params
        })
    },
    getErrorsOfWorkoutById({ id }: { id: string }) {
        return http.get<ResponseApi<workoutHistory, PaginationMeta>>(`${URL_GET_WORKOUT_HISTORY}/${id}`)
    },
    getWorkoutHistoryByViewMode({ id, viewMode }: { id: string; viewMode: ViewModeType }) {
        return http.get<ResponseApi<workoutHistoryOfDay[], any>>(`${URL_GET_WORKOUT_HISTORY}/${id}/${viewMode}`)
    }
}

export default workoutHistoryApi

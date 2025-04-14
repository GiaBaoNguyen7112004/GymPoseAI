import http from '@/src/services/core/httpClient'
import { URL_GET_WORKOUT_HISTORY } from '@env'
import { PaginationMeta, ResponseApi, ViewModeType } from '@/src/types/utils.type'
import {
    pose_error,
    QueryConfigWorkoutHistory,
    workoutHistory,
    workoutHistoryOfDay
} from '@/src/types/workoutHistory.type'

const workoutHistoryApi = {
    getWorkoutHistory({ params, user_id }: { params: QueryConfigWorkoutHistory; user_id: string }) {
        return http.get<ResponseApi<workoutHistory[], PaginationMeta>>(`${URL_GET_WORKOUT_HISTORY}/${user_id}`, {
            params
        })
    },
    getWorkoutSummaryById({ id }: { id: string }) {
        return http.get<ResponseApi<workoutHistory, PaginationMeta>>(`${URL_GET_WORKOUT_HISTORY}/${id}/abc`)
    },
    getWorkoutHistoryByViewMode({ id, viewMode }: { id: string; viewMode: ViewModeType }) {
        return http.get<ResponseApi<workoutHistoryOfDay[], any>>(`${URL_GET_WORKOUT_HISTORY}/${id}/${viewMode}`)
    },
    getErrorsOfWorkoutById({ id }: { id: string }) {
        return http.get<ResponseApi<pose_error[], any>>(`${URL_GET_WORKOUT_HISTORY}/${id}/errors`)
    }
}

export default workoutHistoryApi

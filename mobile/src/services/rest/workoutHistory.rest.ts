import http from '@/services/core/httpClient'
import { ResponseApi, ViewModeType } from '@/types/utils.type'
import {
    pose_error,
    QueryConfigWorkoutHistory,
    ResponseAPIWorkoutHistoryPage,
    workoutHistory,
    workoutHistoryOfDay
} from '@/types/workoutHistory.type'

const workoutHistoryApi = {
    getWorkoutHistory({ params, user_id }: { params: QueryConfigWorkoutHistory; user_id: string }) {
        return http.get<ResponseAPIWorkoutHistoryPage>(
            `${process.env.EXPO_PUBLIC_URL_GET_WORKOUT_HISTORY}/${user_id}`,
            {
                params
            }
        )
    },
    getWorkoutSummaryById({ id }: { id: string }) {
        return http.get<ResponseApi<workoutHistory, any>>(
            `${process.env.EXPO_PUBLIC_URL_GET_WORKOUT_HISTORY}/${id}/abc`
        )
    },
    getWorkoutHistoryByViewMode({ id, viewMode }: { id: string; viewMode: ViewModeType }) {
        return http.get<ResponseApi<workoutHistoryOfDay[], any>>(
            `${process.env.EXPO_PUBLIC_URL_GET_WORKOUT_HISTORY}/${id}/${viewMode}`
        )
    },
    getErrorsOfWorkoutById({ id }: { id: string }) {
        return http.get<ResponseApi<pose_error[], any>>(
            `${process.env.EXPO_PUBLIC_URL_GET_WORKOUT_HISTORY}/${id}/errors`
        )
    }
}

export default workoutHistoryApi

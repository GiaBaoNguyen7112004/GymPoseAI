import http from '@/services/core/http'
import { ResponseApi, ViewModeType } from '@/types/utils.type'
import {
    pose_error,
    QueryConfigWorkoutHistory,
    ResponseAPIWorkoutHistoryPage,
    workoutHistory,
    workoutHistoryOfDay
} from '@/types/workoutHistory.type'

const workoutHistoryApi = {
    getWorkoutSummaryList({ params }: { params: QueryConfigWorkoutHistory }) {
        return http.get<ResponseAPIWorkoutHistoryPage>(`${process.env.EXPO_PUBLIC_URL_GET_WORKOUT_HISTORY}/history`, {
            params
        })
    },
    getWorkoutSummaryById({ id }: { id: string }) {
        return http.get<ResponseApi<workoutHistory, any>>(
            `${process.env.EXPO_PUBLIC_URL_GET_WORKOUT_HISTORY}/detail/${id}`
        )
    },
    getWorkoutSummaryStatistics(params: { viewMode: ViewModeType }) {
        return http.get<ResponseApi<workoutHistoryOfDay[], any>>(
            `${process.env.EXPO_PUBLIC_URL_GET_WORKOUT_HISTORY}/statistics`,
            { params }
        )
    }
}

export default workoutHistoryApi

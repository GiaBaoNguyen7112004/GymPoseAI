import http from '@/services/core/http'
import { ResponseApi, ViewModeType } from '@/types/utils.type'
import {
    QueryConfigWorkoutHistory,
    ResponseAPIWorkoutHistoryPage,
    workoutHistory,
    workoutHistoryOfDay
} from '@/types/workoutHistory.type'

const workoutHistoryApi = {
    getWorkoutSummaryList(params: QueryConfigWorkoutHistory) {
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
    },
    deleteWorkoutSummaryById({ id }: { id: string }) {
        return http.delete<ResponseApi<any, any>>(`${process.env.EXPO_PUBLIC_URL_GET_WORKOUT_HISTORY}/detail/${id}`)
    }
}

export default workoutHistoryApi

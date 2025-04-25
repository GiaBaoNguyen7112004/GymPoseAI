import http from '@/services/core/httpClient'
import { ResponseApi } from '@/types/utils.type'
import { CaloriesTargetOfDay, TodayTargetResponseAPI, WeekTargetResponseAPI } from '@/types/target.type'

const targetApi = {
    getTodayCaloriesTarget({ id }: { id: string }) {
        return http.get<ResponseApi<CaloriesTargetOfDay, null>>(`${process.env.EXPO_PUBLIC_URL_TARGETS}/calories/${id}`)
    },
    getTodayWaterTarget({ id }: { id: string }) {
        return http.get<ResponseApi<CaloriesTargetOfDay, null>>(`${process.env.EXPO_PUBLIC_URL_TARGETS}/water/${id}`)
    },
    getTodayTarget() {
        return http.get<TodayTargetResponseAPI>(process.env.EXPO_PUBLIC_URL_TARGETS)
    },
    updateTodayTarget(body: { water: number; calories: number }) {
        return http.put<TodayTargetResponseAPI>(process.env.EXPO_PUBLIC_URL_TARGETS, body)
    },
    getWeeklyStatisticsTarget() {
        return http.put<WeekTargetResponseAPI>(`${process.env.EXPO_PUBLIC_URL_TARGETS}/stat`)
    }
}

export default targetApi

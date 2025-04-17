import http from '@/services/core/httpClient'
import { URL_TARGETS } from '@env'
import { ResponseApi } from '@/types/utils.type'
import { CaloriesTargetOfDay, TodayTargetResponseAPI, WeekTargetResponseAPI } from '@/types/target.type'

const targetApi = {
    getTodayCaloriesTarget({ id }: { id: string }) {
        return http.get<ResponseApi<CaloriesTargetOfDay, null>>(`${URL_TARGETS}/calories/${id}`)
    },
    getTodayWaterTarget({ id }: { id: string }) {
        return http.get<ResponseApi<CaloriesTargetOfDay, null>>(`${URL_TARGETS}/water/${id}`)
    },
    getTodayTarget() {
        return http.get<TodayTargetResponseAPI>(URL_TARGETS)
    },
    updateTodayTarget(body: { water: number; calories: number }) {
        return http.put<TodayTargetResponseAPI>(URL_TARGETS, body)
    },
    getWeeklyStatisticsTarget() {
        return http.put<WeekTargetResponseAPI>(`${URL_TARGETS}/stat`)
    }
}

export default targetApi

import http from '@/services/core/http'
import {
    DailyCaloriesTargetResponseAPI,
    DailyTargetResponseAPI,
    DailyUpdateTargetReqBody,
    DailyWaterTargetResponseAPI,
    WeekTargetResponseAPI
} from '@/types/target.type'

const targetApi = {
    getDailyCaloriesTarget() {
        return http.get<DailyCaloriesTargetResponseAPI>(`${process.env.EXPO_PUBLIC_URL_TARGETS}/today/calories`)
    },
    getDailyWaterTarget() {
        return http.get<DailyWaterTargetResponseAPI>(`${process.env.EXPO_PUBLIC_URL_TARGETS}/today/water`)
    },
    getDailyTarget() {
        return http.get<DailyTargetResponseAPI>(`${process.env.EXPO_PUBLIC_URL_TARGETS}/today`)
    },
    updateDailyTarget(body: DailyUpdateTargetReqBody) {
        return http.patch<DailyTargetResponseAPI>(`${process.env.EXPO_PUBLIC_URL_TARGETS}/today`, body)
    },
    getWeeklyStatisticsTarget() {
        return http.put<WeekTargetResponseAPI>(`${process.env.EXPO_PUBLIC_URL_TARGETS}/target/weekly`)
    }
}

export default targetApi

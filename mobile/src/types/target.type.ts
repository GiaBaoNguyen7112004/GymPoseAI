import { ResponseApi } from './utils.type'

export interface CaloriesTargetOfDay {
    date: string
    calories_burned: number
    calories_target: number
}

export interface WaterTargetOfDay {
    date: string
    water_intake: number
    water_target: number
}

export interface StatsTargetOfDay {
    water: WaterTargetOfDay
    calories: CaloriesTargetOfDay
}

export type WeekTargetResponseAPI = ResponseApi<StatsTargetOfDay[], any>

export type TodayTargetResponseAPI = ResponseApi<
    {
        calories: number
        water: number
    },
    any
>

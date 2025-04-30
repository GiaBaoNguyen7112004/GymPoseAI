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

export interface IntakeSlot {
    label: string // e.g. "6am - 8am"
    start: string // e.g. "06:00"
    end: string // e.g. "08:00"
    amountMl: number // e.g. 600
}

export interface WaterIntake {
    date: string // ISO date string: "2025-04-30"
    intakes: IntakeSlot[]
}

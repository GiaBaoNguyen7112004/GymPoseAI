import { BaseQueryConfig, ViewModeType } from './utils.type'

export interface workoutHistory {
    id: string
    name_workout: string
    duration_minutes: number // in minutes
    start_time: string
    end_time: string
    calories_burned: number
    calories_base: number
    category: categories
    reps_count: number
    errors_count: number
}

export interface pose_error {
    id: string
    ai_result: string
    created_at: string
    rep_index: number
}

export interface workoutHistoryOfDay {
    date: string
    calories_burned: number
    calories_base: number
    category: categories[]
}

export type categories = 'abdominal muscles' | 'lower body' | 'full body'

export interface QueryConfigWorkoutHistory extends BaseQueryConfig {
    category?: categories
    viewMode?: ViewModeType
}

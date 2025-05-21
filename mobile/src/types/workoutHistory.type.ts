import { BaseExerciseInfo, Category } from './exercises.type'
import { BaseQueryConfig, PaginationMeta, ResponseApi, ViewModeType } from './utils.type'

export interface workoutHistory extends BaseExerciseInfo {
    start_time: string
    calories_burned: number
    calories_base: number
    reps_count: number
    errors_count: number
    pose_errors: pose_error[]
    elapsed_time: number
    category: Category
}

export interface pose_error {
    id: string
    ai_result: string
    created_at: string
    rep_index: number
    image_url: string
}

export interface workoutHistoryOfDay {
    date: string
    calories_burned: number
    calories_base: number
    category: Category[]
}

export interface QueryConfigWorkoutHistory extends BaseQueryConfig {
    category?: string
    viewMode?: ViewModeType
}

export type ResponseAPIWorkoutHistoryPage = ResponseApi<workoutHistory[], PaginationMeta>

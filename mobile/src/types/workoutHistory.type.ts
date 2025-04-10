export interface workoutHistory {
    id: string
    name_workout: string
    duration_minutes: number // in minutes
    start_time: string
    end_time: string
    calories_burned: number
    calories_base: number
    category: categories
}

export interface pose_error {
    id: string
    ai_result: string
    created_at: string
}

export interface workoutHistoryOfDay {
    date: string
    calories_burned: number
    calories_base: number
    category: categories[]
}

export type categories = 'abdominal muscles' | 'lower body' | 'full body'

export type ViewModeType = 'weekly' | 'monthly' | 'yearly'

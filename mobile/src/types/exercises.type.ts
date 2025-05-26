export interface BaseExerciseInfo {
    id: string
    name: string
    duration_minutes: number
    met?: number
    thumbnail_url: string
}
export interface Exercise extends BaseExerciseInfo {
    description: string
    media_url: string
    category: Category
    steps?: StepOfExercise[]
    is_training_supported: boolean
}

export interface Category {
    id: string
    name: string
    exercise_count: number
    duration_minutes: number
    calories_burned: number
    thumbnail_url: string
}

export interface StepOfExercise {
    id: string
    title: string
    description: string
    step_number: number
}

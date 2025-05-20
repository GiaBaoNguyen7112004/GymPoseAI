import { categories } from './workoutHistory.type'

export interface BaseExerciseInfo {
    id: string
    name: string
    duration_minutes: number
    met?: number
}
export interface Exercise extends BaseExerciseInfo {
    thumbnail_url: string
    description: string
    media_url: string
    category: Category
    steps?: StepOfExercise[]
}

export interface Category {
    id: string
    name: categories | string
    exercise_count: number
    duration_minutes: number
    calories_burned: number
    media_url: string
}

export interface StepOfExercise {
    id: string
    title: string
    description: string
    step_number: number
}

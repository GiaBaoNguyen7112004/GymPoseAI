import { categories } from './workoutHistory.type'

export interface BaseExerciseInfo {
    id: string
    name: string
    duration_minutes: number
    category: Category | categories
    met?: number
}
export interface Exercise {
    id: string
    thumbnail_url: string
    name: string
    duration_minutes: number
    description: string
    media_url: string
    category: Category
    met?: number
    steps?: StepOfExercise[]
}

export interface Category {
    id: string
    name: categories | string
    exercise_count: number
    duration_minutes: number
    calories_burned: number
}

export interface StepOfExercise {
    id: string
    title: string
    description: string
    step_number: number
}

import { categories } from './workoutHistory.type'

export interface Exercise {
    id: string
    name: string
    description: string
    media_url: string
    category: Category
    met?: number
    steps: Step[]
}

export interface Category {
    id: string
    name: categories | string
    exercise_count: number
    duration_minutes: number
}

export interface Step {
    id: string
    title: string
    description: string
    step_number: number
}

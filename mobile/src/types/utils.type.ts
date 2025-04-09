import { categories } from './workoutHistory.type'

export interface ResponseApi<Data, MetaType> {
    status: string
    message: string
    data: Data
    meta: MetaType
    errors: ErrorField[]
}

export interface QueryConfigWorkoutHistory {
    page: number
    limit: number
    order?: 'asc' | 'desc'
    sort_by?: 'createAt'
    viewMode?: 'weekly' | 'monthly' | 'yearly'
    category?: categories
}

export interface PaginationMeta {
    current_page: number
    limit: number
    total_page: number
}

export interface ErrorField {
    field: string
    message: string
    code: number | string
}

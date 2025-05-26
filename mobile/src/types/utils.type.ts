export interface ResponseApi<Data, MetaType> {
    status: string
    message: string
    data: Data
    meta: MetaType
    errors: ErrorField[]
}

export interface BaseQueryConfig {
    page: number
    limit: number
    sort_by?: 'created_at'
    order?: 'asc' | 'desc'
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

export type ViewModeType = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'all'

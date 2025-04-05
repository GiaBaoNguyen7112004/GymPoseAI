export interface ResponseApi<Data, MetaType> {
    status: string
    message: string
    data: Data
    meta: MetaType
    errors: ErrorField[]
}

export interface Pagination {
    page: number
    limit: number
    order: 'asc' | 'desc'
    sort_by: 'createAt' | undefined
}

export interface ErrorField {
    field: string
    message: string
    code: number | string
}

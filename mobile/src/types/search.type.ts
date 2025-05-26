import { Exercise } from './exercises.type'
import { ResponseApi } from './utils.type'

export interface SearchParams {
    query: string
    type: 'less' | 'hard'
}

export type ResponseApiSearch = ResponseApi<Exercise[], any>

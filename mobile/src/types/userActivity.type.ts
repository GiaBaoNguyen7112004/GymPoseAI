import { PaginationMeta, ResponseApi } from './utils.type'

export type ActivityType = 'drinking' | 'calorie_consumption'

export interface UserActivity {
    id: string
    activity: ActivityType
    name: string
    time: string
}

export type ResponseAPIActivityPage = ResponseApi<UserActivity[], PaginationMeta>

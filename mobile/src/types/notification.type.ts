import { PaginationMeta, ResponseApi } from './utils.type'

export interface Notification {
    id: string
    type: NotificationType
    title: string
    description: string
    created_at: string
    is_read: boolean
    meta_data?: NotificationMetadata
}

export interface NotificationMetadata {
    workout_id?: string
    exercise_id?: string
    activity_id?: string
    category_id?: string
}
export type NotificationType = 'WORKOUT' | 'ACTIVITY' | 'ADMIN' | 'EXERCISE' | 'SYSTEM'

export type ResponseAPINotificationPage = ResponseApi<Notification[], PaginationMeta>

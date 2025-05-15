import { PaginationMeta, ResponseApi } from './utils.type'

export interface Notification {
    id: string
    type: NotificationType
    title: string
    description: string
    created_at: string
    is_read: boolean
    metadata?: NotificationMetadata
}

export interface NotificationMetadata {
    workout_id?: string
    exercise_id?: string
    activity_id?: string
    category_id?: string
}
export type NotificationType = 'workout' | 'activity' | 'admin' | 'exercise' | 'system'

export type ResponseAPINotificationPage = ResponseApi<Notification[], PaginationMeta>

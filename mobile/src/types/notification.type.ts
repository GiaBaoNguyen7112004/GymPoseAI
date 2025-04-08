export interface Notification<Data> {
    id: string
    type: NotificationType
    title: string
    description: string
    created_at: string
    content: Data
    is_read: boolean
}

export type NotificationType = 'SUMMARY' | 'REMINDER' | 'SYSTEM' | 'ADMIN'

export interface NotificationForWorkoutHistory {}

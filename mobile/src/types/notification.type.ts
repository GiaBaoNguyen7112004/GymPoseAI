export interface Notification<Data> {
    id: string
    type: 'SUMMARY' | 'REMINDER'
    title: string
    description: string
    created_at: string
    content: Data
}

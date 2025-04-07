export interface Notification<Data> {
    id: string
    type: 'SUMMARY' | 'REMINDER' | 'INFO' | 'WARNING' | 'ERROR'
    title: string
    description: string
    created_at: string
    content: Data
}

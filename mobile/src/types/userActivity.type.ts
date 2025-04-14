export type ActivityType = 'drinking' | 'calorie_consumption'

export interface UserActivity {
    id: string
    activity: ActivityType
    name: string
    time: string
}

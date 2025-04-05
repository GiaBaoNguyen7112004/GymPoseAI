export interface workoutHistory {
    id: string
    duration_sec: number
    pose_errors: pose_error[]
}

export interface pose_error {
    id: string
    ai_result: string
    created_at: string
}

export interface WebSocketMessage<Data> {
    Key: string
    data: Data
}

export type StartNewExercisePayload = {
    exercise_id: string
    user_id: string
}
export type ResumeExercisePayload = {
    workout_summary_id: string
    user_id: string
}

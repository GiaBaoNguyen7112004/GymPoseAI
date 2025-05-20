import { DeviceConfig } from './peripheral.type'

export interface TrainingPayload {
    exercise_id: string | null
    workout_summary_id: string | null
    user_id: string
    config: DeviceConfig
}

export type StatusPayload = 'OK' | 'BUSY'

export type RequestTrainingPayload = 'START' | 'STOP' | 'PAUSE'

export interface ResponseTrainingPayload {
    workout_summary_id: string
}

export interface AIResponsePayload {
    rep_index: number
    content: string
    time: string
    user_id: string
}

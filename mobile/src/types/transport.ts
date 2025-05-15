import { MessageKey } from '@/constants/messageKey'
import { DataChannelMessageMap } from './messagePayloadMap'

export type DataChannelMessage<K extends MessageKey> = {
    key: K
    data: DataChannelMessageMap[K]
}

export type SignalMessage<Data> = {
    type: string
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

export type EventHandlerType = (data: any) => void

export type eventHandlerObjType = Record<string, EventHandlerType>

import { MessageKey } from '@/constants/messageKey'
import {
    TrainingPayload,
    StatusPayload,
    RequestTrainingPayload,
    ResponseTrainingPayload,
    AIResponsePayload
} from './payloadWithWebRTCTypes'

export interface DataChannelMessageMap {
    [MessageKey.TRAINING]: TrainingPayload
    [MessageKey.STATUS]: StatusPayload
    [MessageKey.REQUEST_TRAINING]: RequestTrainingPayload
    [MessageKey.RESPONSE_TRAINING]: ResponseTrainingPayload
    [MessageKey.AI_RESPONSE]: AIResponsePayload
}

export function isMessageKey(key: any): key is keyof DataChannelMessageMap {
    return Object.values(MessageKey).includes(key)
}

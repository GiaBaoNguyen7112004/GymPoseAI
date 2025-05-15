import { ResponseApi } from './utils.type'

export type RegisterFCMReqBody = {
    push_token: string
}
export type ResponseNewNotificationCount = ResponseApi<
    {
        new_notification_count: number
    },
    any
>

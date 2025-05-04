import { useMutation } from '@tanstack/react-query'
import { notificationApi } from '@/services/rest'
import { AxiosResponse } from 'axios'
import { ResponseApi } from '@/types/utils.type'

interface DeleteNotificationParams {
    onSuccessCallback?: (data: AxiosResponse<ResponseApi<any, any>, any>) => void
    onErrorCallback?: (error: Error) => void
}

const useDeleteNotification = ({ onErrorCallback, onSuccessCallback }: DeleteNotificationParams) => {
    const mutation = useMutation({
        mutationFn: notificationApi.deleteNotification,
        onSuccess: onSuccessCallback,
        onError: onErrorCallback
    })

    const handleDeleteNotification = async (id: string) => {
        await mutation.mutateAsync({ id })
    }

    return { handleDeleteNotification, isDeleting: mutation.isPending }
}

export default useDeleteNotification

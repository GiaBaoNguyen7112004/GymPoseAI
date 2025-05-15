import { notificationApi } from '@/services/rest'
import { useMutation } from '@tanstack/react-query'

function useReadAllNotifications() {
    const { mutate: markAllAsRead, ...rest } = useMutation({
        mutationFn: notificationApi.readAllNotification
    })

    return { markAllAsRead, ...rest }
}

export default useReadAllNotifications

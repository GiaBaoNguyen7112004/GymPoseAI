import { notificationApi } from '@/services/rest'
import { useQuery } from '@tanstack/react-query'

function useNewNotificationCount() {
    const { data } = useQuery({
        queryKey: ['new-notification'],
        queryFn: notificationApi.getNewNotificationCount,
        staleTime: 1000 * 60 * 5
    })
    const notificationCount = data?.data?.data?.new_notification_count ?? 0
    return { notificationCount }
}

export default useNewNotificationCount

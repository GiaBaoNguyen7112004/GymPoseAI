import { useInfiniteQuery } from '@tanstack/react-query'
import { notificationApi } from '@/services/rest'

const useNotifications = () => {
    return useInfiniteQuery({
        queryKey: ['notification'],
        queryFn: async ({ pageParam = 1 }) => {
            const res = await notificationApi.getNotification({ params: { page: pageParam, limit: 10 } })
            return res.data
        },
        getNextPageParam: ({ meta }) => (meta.current_page < meta.total_page ? meta.current_page + 1 : undefined),
        initialPageParam: 1,
        staleTime: 3 * 60 * 1000
    })
}

export default useNotifications

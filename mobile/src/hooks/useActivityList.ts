import { useInfiniteQuery } from '@tanstack/react-query'
import { activityApi } from '@/services/rest'

export const useActivityList = () => {
    return useInfiniteQuery({
        queryKey: ['activity-list-full'],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await activityApi.getDailyActivity({
                params: { page: pageParam, limit: 10 }
            })
            return response.data
        },
        getNextPageParam: ({ meta }) => (meta.current_page < meta.total_page ? meta.current_page + 1 : undefined),
        initialPageParam: 1
    })
}

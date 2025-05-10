import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query'
import { useMemo } from 'react'
import { workoutHistoryApi } from '@/services/rest'
import { QueryConfigWorkoutHistory, ResponseAPIWorkoutHistoryPage, categories } from '@/types/workoutHistory.type'
import { ViewModeType } from '@/types/utils.type'

export const useWorkoutHistory = (category: categories, viewMode: ViewModeType, order: 'asc' | 'desc') => {
    const queryConfig = useMemo<QueryConfigWorkoutHistory>(
        () => ({
            page: 1,
            limit: 10,
            category,
            viewMode,
            sort_by: 'createAt',
            order
        }),
        [category, viewMode, order]
    )

    return useInfiniteQuery<ResponseAPIWorkoutHistoryPage, Error>({
        queryKey: ['workout-history-screen', category, viewMode, order],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await workoutHistoryApi.getWorkoutSummaryList({
                ...queryConfig,
                page: pageParam as number
            })
            return response.data
        },
        getNextPageParam: (lastPage) => {
            const { current_page, total_page } = lastPage.meta
            return current_page < total_page ? current_page + 1 : undefined
        },
        initialPageParam: 1,
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60 * 5
    })
}

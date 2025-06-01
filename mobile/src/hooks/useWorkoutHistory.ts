import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query'
import { useMemo } from 'react'
import { workoutHistoryApi } from '@/services/rest'
import { QueryConfigWorkoutHistory, ResponseAPIWorkoutHistoryPage } from '@/types/workoutHistory.type'
import { isNull, isUndefined, omit, omitBy } from 'lodash'

export const useWorkoutHistory = (categoryId: string | null, viewMode: string, order: 'asc' | 'desc' = 'desc') => {
    const queryConfig = useMemo<QueryConfigWorkoutHistory>(
        () => ({
            page: 1,
            limit: 10,
            category: categoryId,
            viewMode,
            sort_by: 'created_at',
            order
        }),
        [categoryId, viewMode, order]
    )

    return useInfiniteQuery<ResponseAPIWorkoutHistoryPage, Error>({
        queryKey: ['workout-history-screen', categoryId, viewMode, order],
        queryFn: async ({ pageParam = 1 }) => {
            const queryParams = omitBy(
                {
                    ...queryConfig
                },
                [isUndefined, isNull]
            )
            const response = await workoutHistoryApi.getWorkoutSummaryList({
                ...queryParams,
                limit: queryConfig.limit,
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

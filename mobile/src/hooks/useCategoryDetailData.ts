import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { workoutApi, categoriesApi } from '@/services/rest'

export function useCategoryDetailData(category_id: string) {
    const {
        data: workoutData,
        isLoading,
        ...rest
    } = useQuery({
        queryKey: ['workout-category', category_id],
        queryFn: () => workoutApi.getWorkoutByCategoryId({ id: category_id }),
        staleTime: 30_000
    })

    const { data: categoryRes } = useQuery({
        queryKey: ['category', category_id],
        queryFn: () => categoriesApi.getCategoriesById({ id: category_id })
    })

    const workoutList = useMemo(() => workoutData?.data.data || [], [workoutData])
    const category = useMemo(() => categoryRes?.data.data, [categoryRes])

    return { workoutList, isLoading, category, ...rest }
}

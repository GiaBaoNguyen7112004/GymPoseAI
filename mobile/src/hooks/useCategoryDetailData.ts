import { useQuery } from '@tanstack/react-query'
import { workoutApi, categoriesApi } from '@/services/rest'

export function useCategoryDetailData(category_id: string) {
    const {
        data: workoutData,
        isLoading,
        ...rest
    } = useQuery({
        queryKey: ['workout-category', category_id],
        queryFn: () => workoutApi.getWorkoutByCategoryId({ id: category_id }),
        staleTime: 10 * 60 * 1000
    })

    const { data: categoryRes } = useQuery({
        queryKey: ['category', category_id],
        queryFn: () => categoriesApi.getCategoriesById({ id: category_id })
    })

    const workoutList = workoutData?.data.data || []
    const category = categoryRes?.data.data

    return { workoutList, isLoading, category, ...rest }
}

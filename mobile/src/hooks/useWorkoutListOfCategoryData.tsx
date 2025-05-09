import { workoutApi } from '@/services/rest'
import { useQuery } from '@tanstack/react-query'

interface WorkoutListOfCategoryData {
    categoryId: string
}

function useWorkoutListOfCategoryData({ categoryId }: WorkoutListOfCategoryData) {
    const { data: workoutData, ...rest } = useQuery({
        queryKey: ['workout-category', categoryId],
        queryFn: () => workoutApi.getWorkoutByCategoryId({ id: categoryId }),
        staleTime: 10 * 60 * 1000,
        enabled: !!categoryId
    })

    const workoutList = workoutData?.data.data || []
    return {
        workoutList,
        ...rest
    }
}

export default useWorkoutListOfCategoryData

import { workoutApi } from '@/services/rest'
import { getYouTubeVideoId } from '@/utils/common.util'
import { useQuery } from '@tanstack/react-query'

interface UseExerciseDataProps {
    exercise_id?: string
}
function useExerciseData({ exercise_id }: UseExerciseDataProps) {
    const { data, ...rest } = useQuery({
        queryKey: ['workout', exercise_id],
        queryFn: () => workoutApi.getWorkoutById({ id: exercise_id as string }),
        staleTime: 1000 * 60 * 10,
        enabled: !!exercise_id
    })

    const workoutData = data?.data?.data
    const workoutIdYoutube = getYouTubeVideoId(workoutData?.media_url || '')
    return { workoutData, workoutIdYoutube, ...rest }
}

export default useExerciseData

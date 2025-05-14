import { useQuery } from '@tanstack/react-query'
import { workoutHistoryApi } from '@/services/rest'
import { calculateWorkoutSummaryChart } from '@/utils/chart.util'
import { useMemo } from 'react'

export function useWorkoutSummaryData(workout_id?: string) {
    const {
        data: workoutRes,
        isPending,
        ...rest
    } = useQuery({
        queryKey: ['workout_id', workout_id],
        queryFn: () => workoutHistoryApi.getWorkoutSummaryById({ id: workout_id as string }),
        enabled: !!workout_id
    })

    const workoutData = workoutRes?.data.data
    const poseErrors = workoutData?.pose_errors || []

    const workoutDuration = useMemo(() => {
        const elapsedMinutes = (workoutData?.elapsed_time || 0) / 60
        return parseFloat(elapsedMinutes.toFixed(2))
    }, [workoutData?.elapsed_time])

    const progressData = useMemo(() => calculateWorkoutSummaryChart(workoutData), [workoutData])

    return { workoutData, poseErrors, workoutDuration, progressData, ...rest, isLoading: isPending }
}

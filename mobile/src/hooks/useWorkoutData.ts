import { useQuery } from '@tanstack/react-query'
import { workoutHistoryApi } from '@/services/rest'
import { calculateWorkoutSummaryChart } from '@/utils/chart.util'
import { useMemo } from 'react'

export function useWorkoutData(workout_id: string) {
    const { data: workoutRes, isPending } = useQuery({
        queryKey: ['workout_id', workout_id],
        queryFn: () => workoutHistoryApi.getWorkoutSummaryById({ id: workout_id })
    })

    const workout = workoutRes?.data.data
    const poseErrors = workout?.pose_errors || []

    const workoutDuration = useMemo(() => {
        const start = new Date(workout?.start_time || '')
        const end = new Date(workout?.end_time || '')
        return Math.floor((end.getTime() - start.getTime()) / 60000)
    }, [workout])

    const progressData = useMemo(() => calculateWorkoutSummaryChart(workout), [workout])

    return { workout, poseErrors, workoutDuration, progressData, isLoading: isPending }
}

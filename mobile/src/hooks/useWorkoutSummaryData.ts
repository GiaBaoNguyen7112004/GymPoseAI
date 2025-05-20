import { useQuery } from '@tanstack/react-query'
import { workoutHistoryApi } from '@/services/rest'
import { useMemo } from 'react'
import { clamp } from 'lodash'

export function useWorkoutSummaryData(workout_id?: string) {
    const {
        data: workoutRes,
        isPending,
        ...rest
    } = useQuery({
        queryKey: ['workout-summary', workout_id],
        queryFn: () => workoutHistoryApi.getWorkoutSummaryById({ id: workout_id as string }),
        enabled: !!workout_id
    })

    const workoutData = workoutRes?.data.data
    const poseErrors = workoutData?.pose_errors ?? []

    const repCount = useMemo(() => workoutData?.reps_count ?? 1, [workoutData?.reps_count])
    const poseErrorsCount = useMemo(() => poseErrors.length, [poseErrors])

    const formAccuracy = useMemo(() => {
        if (!repCount || poseErrorsCount === 0) return 100
        const accuracy = ((repCount - poseErrorsCount) / repCount) * 100
        return clamp(Math.round(accuracy), 0, 100)
    }, [repCount, poseErrorsCount])

    const progressPercentage = useMemo(() => {
        const elapsed = workoutData?.elapsed_time ?? 0
        const duration = workoutData?.duration_minutes ?? 0
        if (!duration) return 0
        const progress = (elapsed / (duration * 60)) * 100
        return clamp(Number(progress.toFixed(2)), 0, 100)
    }, [workoutData?.elapsed_time, workoutData?.duration_minutes])

    return {
        workoutData,
        poseErrors,
        repCount,
        poseErrorsCount,
        formAccuracy,
        progressPercentage,
        ...rest,
        isLoading: isPending
    }
}

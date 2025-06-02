import { useState, useEffect, useMemo } from 'react'
import useAppContext from '@/hooks/useAppContext'
import useBluetoothContext from '@/hooks/useBluetoothContext'
import { useWorkoutSummaryData } from '@/hooks/useWorkoutSummaryData'
import { calculateCaloriesBurned } from '@/utils/training.util'
import { TrainingPayload } from '@/types/payloadWithWebRTCTypes'
import { DeviceConfig } from '@/types/peripheral.type'
import useExerciseData from './useExerciseData'

type GymLiveMode = 'NEW' | 'RESUME'

interface UseWorkoutLogicProps {
    workoutHistoryId: string | undefined
    exercise_id: string | undefined
    setTrainingPayload: React.Dispatch<React.SetStateAction<TrainingPayload>>
}

const WORKOUT_MINUTES_TO_SECONDS = 60

export default function useWorkoutLogic({ workoutHistoryId, exercise_id, setTrainingPayload }: UseWorkoutLogicProps) {
    const { profile } = useAppContext()
    const { peripheralInfo } = useBluetoothContext()
    const [isPaused, setIsPaused] = useState<boolean>(true)
    const [timeLeft, setTimeLeft] = useState<number>(-1)
    const [isStarting, setIsStarting] = useState<boolean>(false)

    const {
        workoutData: workoutSummary,
        isLoading: isLoadingWorkoutSummary,
        refetch: refetchWorkoutSummary
    } = useWorkoutSummaryData(workoutHistoryId)
    const { workoutData, isLoading: isLoadingExercise } = useExerciseData({ exercise_id })

    const mode: GymLiveMode = workoutHistoryId ? 'RESUME' : 'NEW'
    const isLoading = mode === 'NEW' ? isLoadingExercise : isLoadingWorkoutSummary
    const exerciseData = mode === 'NEW' ? workoutData : workoutSummary

    const workoutDurationSeconds = useMemo(
        () => (exerciseData?.duration_minutes ?? 0) * WORKOUT_MINUTES_TO_SECONDS,
        [exerciseData?.duration_minutes]
    )

    const timeLeftInitial = useMemo(() => {
        let timeLeft = 0
        if (!exerciseData) timeLeft = -1
        if (mode === 'NEW') {
            timeLeft = Math.ceil(workoutDurationSeconds)
        } else {
            let elapsedSeconds = mode === 'RESUME' ? ((exerciseData as any)?.elapsed_time ?? 0) : 0
            timeLeft = Math.ceil(workoutDurationSeconds - elapsedSeconds)
        }
        setTimeLeft(timeLeft)
        return timeLeft
    }, [mode, exerciseData?.id, workoutDurationSeconds])

    const caloriesBurned = useMemo(
        () =>
            calculateCaloriesBurned({
                durationSeconds: workoutDurationSeconds - timeLeft,
                met: exerciseData?.met ?? 0,
                weightKg: profile?.weight ?? 0
            }),
        [workoutDurationSeconds, timeLeft, exerciseData?.met, profile?.weight]
    )

    useEffect(() => {
        setTrainingPayload({
            exercise_id: exercise_id ?? null,
            workout_summary_id: workoutHistoryId ?? null,
            user_id: profile?.id as string,
            config: peripheralInfo?.config as DeviceConfig
        })
    }, [exercise_id, workoutHistoryId, profile?.id, peripheralInfo?.config, setTrainingPayload])

    useEffect(() => {
        if (workoutHistoryId && exerciseData) setTimeLeft(timeLeftInitial)
        if (workoutHistoryId && !exerciseData) setTimeLeft(-1)
    }, [timeLeftInitial, workoutHistoryId, exerciseData])

    useEffect(() => {
        if (isPaused || timeLeft <= 0) return
        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000)
        return () => clearInterval(timer)
    }, [isPaused, timeLeft])

    return {
        isPaused,
        setIsPaused,
        timeLeft,
        setTimeLeft,
        isStarting,
        setIsStarting,
        workoutDurationSeconds,
        timeLeftInitial,
        caloriesBurned,
        mode,
        isLoading,
        exerciseData,
        refetchWorkoutSummary
    }
}

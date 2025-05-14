import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { View, StyleSheet, SafeAreaView, Animated, Easing, Alert } from 'react-native'
import { RTCView, MediaStream } from 'react-native-webrtc'
import AssessmentFeedback from './components/AssessmentFeedback'
import MetricsBar from './components/MetricsBar'
import ControlButtons from './components/ControlButtons'
import useWebRTC from '@/hooks/useWebRTC'
import { RootStackScreenProps } from '@/navigation/types'
import useAppContext from '@/hooks/useAppContext'
import useBluetoothContext from '@/hooks/useBluetoothContext'
import { useWorkoutSummaryData } from '@/hooks/useWorkoutSummaryData'
import useExerciseData from '@/hooks/useExcersieData'
import { formatTimeFromSeconds } from '@/utils/format.util'
import { calculateCaloriesBurned } from '@/utils/training.util'
import { AIResponsePayload, TrainingPayload } from '@/types/payloadWithWebRTCTypes'
import Countdown from '@/components/Countdown'
import { CountdownRef } from '@/components/Countdown/Countdown'
import LoaderModal from '@/components/LoaderModal'
import { workoutHistory } from '@/types/workoutHistory.type'
import PreCallBackgroundGradient from './components/backgroundPlaceholder'
import { DeviceConfig } from '@/types/peripheral.type'

type GymLiveMode = 'NEW' | 'RESUME'

const GymLiveScreen = ({ navigation, route }: RootStackScreenProps<'GymLiveScreen'>) => {
    const { workout_history_id, exercise_id } = route.params
    const { profile } = useAppContext()
    const { peripheralInfo } = useBluetoothContext()
    const [workoutHistoryId, setWorkoutHistoryId] = useState<string | undefined>(workout_history_id)
    const [assessmentResult, setAssessmentResult] = useState<string>('')
    const [isPaused, setIsPaused] = useState<boolean>(true)
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)
    const countdownRef = useRef<CountdownRef | null>(null)
    const [timeLeft, setTimeLeft] = useState<number>(-1)
    const [isStarting, setIsStarting] = useState<boolean>(false)

    const [trainingPayload, setTrainingPayload] = useState<TrainingPayload>({
        exercise_id: exercise_id ?? null,
        workout_summary_id: workoutHistoryId ?? null,
        user_id: profile?.id as string,
        config: peripheralInfo?.config as DeviceConfig
    })

    const {
        workoutData: WorkoutSummary,
        isLoading: isLoadingWorkoutSummary,
        refetch: refetchWorkoutSummary
    } = useWorkoutSummaryData(workoutHistoryId)
    const { workoutData, isLoading: isLoadingExercise } = useExerciseData({ exercise_id })

    const mode: GymLiveMode = workoutHistoryId == undefined ? 'NEW' : 'RESUME'

    const isLoading = useMemo(() => {
        return mode === 'NEW' ? isLoadingExercise : isLoadingWorkoutSummary
    }, [mode, isLoadingExercise, isLoadingWorkoutSummary])

    const exerciseData = useMemo(() => {
        return mode === 'NEW' ? workoutData : WorkoutSummary
    }, [mode, workoutData, WorkoutSummary])
    const timeLeftInitial = useMemo(() => {
        if (!exerciseData) return 0

        const durationMinutes = exerciseData?.duration_minutes || 0
        const durationSeconds = durationMinutes * 60

        if (mode === 'NEW') {
            return Math.ceil(durationSeconds)
        }

        if (mode === 'RESUME') {
            const elapsedSeconds = (exerciseData as workoutHistory)?.elapsed_time || 0
            const remaining = durationSeconds - elapsedSeconds
            return remaining > 0 ? Math.ceil(remaining) : 0
        }

        return 0
    }, [mode, WorkoutSummary?.elapsed_time, exercise_id])

    const handleAIResponse = useCallback((data: AIResponsePayload) => {
        const { content } = data
        setAssessmentResult(content)
        setTimeout(() => {
            setAssessmentResult('Good depth and form!')
        }, 1500)
    }, [])

    const { sendTrainingRequest, sendStartTraining, sendStopTraining, sendPauseTraining, isWebRTConnected } = useWebRTC(
        {
            wsSignalingUrl: `ws://${peripheralInfo?.ip_address}:8000`,
            onRemoteStream: (stream) => setRemoteStream(stream),
            onAIResponse: handleAIResponse
        }
    )

    const fadeAnim = useRef(new Animated.Value(0)).current
    const slideAnim = useRef(new Animated.Value(20)).current

    useEffect(() => {
        fadeAnim.setValue(0)
        slideAnim.setValue(20)
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                easing: Easing.ease,
                useNativeDriver: true
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 600,
                easing: Easing.ease,
                useNativeDriver: true
            })
        ]).start()
    }, [assessmentResult])

    useEffect(() => {
        setTimeLeft(timeLeftInitial)
    }, [timeLeftInitial])

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null
        if (!isPaused && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1)
            }, 1000)
        } else if (timeLeft === 0 && isLoading == false) {
            handleStop()
        }
        return () => {
            if (timer) clearInterval(timer)
        }
    }, [isPaused, timeLeft, isLoading])

    const handleStart = useCallback(async () => {
        try {
            if (!profile?.id) return
            setIsStarting(true)
            let result = await sendTrainingRequest(trainingPayload)
            console.log('Training request result:', result)
            if (result === 'OK') {
                countdownRef.current?.start(3)
            } else {
                throw new Error('Device is busy')
            }
        } catch (error) {
            console.error('Error sending training request:', error)
            Alert.alert(
                'Connection Error',
                'There was a problem connecting to the GymBot device. Please restart the device and try again.',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.goBack()
                    }
                ]
            )
        } finally {
            setIsStarting(false)
        }
    }, [trainingPayload])

    const handlePause = useCallback(async () => {
        if (isPaused == false) {
            setIsPaused(true)
            const { workout_summary_id } = await sendPauseTraining()
            setTrainingPayload((prev) => {
                return { ...prev, workout_summary_id }
            })
            setWorkoutHistoryId(workout_summary_id)
            refetchWorkoutSummary()
        } else {
            await handleStart()
        }
    }, [sendPauseTraining, handleStart, isPaused])

    const handleStop = useCallback(() => {
        sendStopTraining()
        navigation.navigate('Congratulation')
    }, [sendStopTraining])

    const triggerStartWorkout = useCallback(() => {
        sendStartTraining()
        setIsPaused(false)
    }, [])
    const workoutDurationSeconds = useMemo(() => {
        if (!exerciseData) return 0
        const durationMinutes = exerciseData?.duration_minutes || 0
        const durationSeconds = durationMinutes * 60
        return durationSeconds
    }, [exerciseData])

    const caloriesBurned = calculateCaloriesBurned({
        durationSeconds: workoutDurationSeconds - timeLeft,
        met: exerciseData?.met || 0,
        weightKg: profile?.weight || 0
    })
    return (
        <View style={styles.container}>
            <LoaderModal isVisible={isLoading || isStarting} title={isLoading ? 'Loading' : 'Starting'} />
            {remoteStream ? (
                <RTCView streamURL={remoteStream.toURL()} style={styles.background} objectFit='cover' />
            ) : (
                <PreCallBackgroundGradient />
            )}
            <View style={styles.overlay} />

            <SafeAreaView style={{ flex: 1, padding: 20, paddingTop: 60 }}>
                {assessmentResult && (
                    <AssessmentFeedback assessmentResult={assessmentResult} fadeAnim={fadeAnim} slideAnim={slideAnim} />
                )}
                <Countdown initialCount={3} ref={countdownRef} onFinish={triggerStartWorkout} />
                <MetricsBar
                    exerciseName={exerciseData?.name}
                    caloriesBurned={caloriesBurned}
                    timeLeft={formatTimeFromSeconds(timeLeft)}
                />
                <ControlButtons
                    isPaused={isPaused}
                    onStartWorkout={handleStart}
                    onTogglePause={handlePause}
                    onStopWorkout={handleStop}
                />
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#10172A'
    },
    background: {
        ...StyleSheet.absoluteFillObject
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent'
    }
})

export default GymLiveScreen

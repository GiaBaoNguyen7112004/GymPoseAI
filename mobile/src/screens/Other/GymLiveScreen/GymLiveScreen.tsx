import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { View, StyleSheet, SafeAreaView, Animated, Easing, Alert } from 'react-native'
import { RTCView, MediaStream } from 'react-native-webrtc'
import { useIsFocused } from '@react-navigation/native'
import AssessmentFeedback from './components/AssessmentFeedback'
import MetricsBar from './components/MetricsBar'
import ControlButtons from './components/ControlButtons'
import useWebRTC from '@/hooks/useWebRTC'
import { RootStackScreenProps } from '@/navigation/types'
import useAppContext from '@/hooks/useAppContext'
import useBluetoothContext from '@/hooks/useBluetoothContext'
import { useWorkoutSummaryData } from '@/hooks/useWorkoutSummaryData'
import { formatTimeFromSeconds } from '@/utils/format.util'
import { calculateCaloriesBurned } from '@/utils/training.util'
import { AIResponsePayload, TrainingPayload } from '@/types/payloadWithWebRTCTypes'
import Countdown, { CountdownRef } from '@/components/Countdown'
import LoaderModal from '@/components/LoaderModal'
import { workoutHistory } from '@/types/workoutHistory.type'
import PreCallBackgroundGradient from './components/backgroundPlaceholder'
import { DeviceConfig } from '@/types/peripheral.type'
import useExerciseData from '@/hooks/useExcersieData'
import { WebRTCConnectionStatus } from '@/services/rtc/WebRTCService'

type GymLiveMode = 'NEW' | 'RESUME'

interface GymLiveScreenProps extends RootStackScreenProps<'GymLiveScreen'> {}

// Constants
const ANIMATION_DURATION = 600
const WORKOUT_MINUTES_TO_SECONDS = 60

const GymLiveScreen: React.FC<GymLiveScreenProps> = ({ navigation, route }) => {
    const { workout_history_id, exercise_id } = route.params
    const { profile } = useAppContext()
    const { peripheralInfo } = useBluetoothContext()

    const isFocused = useIsFocused()

    const previousErrorRef = useRef<string | null>(null)

    // State
    const [workoutHistoryId, setWorkoutHistoryId] = useState<string | undefined>(workout_history_id)
    const [assessmentResult, setAssessmentResult] = useState<string>('')
    const [isPaused, setIsPaused] = useState<boolean>(true)
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)
    const [timeLeft, setTimeLeft] = useState<number>(-1)
    const [isStarting, setIsStarting] = useState<boolean>(false)
    const [isReconnecting, setIsReconnecting] = useState<boolean>(false)

    // Refs
    const countdownRef = useRef<CountdownRef>(null)
    const fadeAnim = useRef(new Animated.Value(0)).current
    const slideAnim = useRef(new Animated.Value(20)).current

    // Data hooks
    const {
        workoutData: workoutSummary,
        isLoading: isLoadingWorkoutSummary,
        refetch: refetchWorkoutSummary
    } = useWorkoutSummaryData(workoutHistoryId)
    const { workoutData, isLoading: isLoadingExercise } = useExerciseData({ exercise_id })

    const mode: GymLiveMode = workoutHistoryId ? 'RESUME' : 'NEW'
    const isLoading = mode === 'NEW' ? isLoadingExercise : isLoadingWorkoutSummary
    const exerciseData = mode === 'NEW' ? workoutData : workoutSummary

    const [trainingPayload, setTrainingPayload] = useState<TrainingPayload>({
        exercise_id: exercise_id ?? null,
        workout_summary_id: workoutHistoryId ?? null,
        user_id: profile?.id as string,
        config: peripheralInfo?.config as DeviceConfig
    })

    const workoutDurationSeconds = useMemo(
        () => (exerciseData?.duration_minutes ?? 0) * WORKOUT_MINUTES_TO_SECONDS,
        [exerciseData?.duration_minutes]
    )

    const timeLeftInitial = useMemo(() => {
        if (!exerciseData) return 0
        if (mode === 'NEW') return Math.ceil(workoutDurationSeconds)
        const elapsedSeconds = (exerciseData as workoutHistory)?.elapsed_time ?? 0
        return Math.max(Math.ceil(workoutDurationSeconds - elapsedSeconds), 0)
    }, [mode, exerciseData, workoutDurationSeconds])

    const caloriesBurned = useMemo(
        () =>
            calculateCaloriesBurned({
                durationSeconds: workoutDurationSeconds - timeLeft,
                met: exerciseData?.met ?? 0,
                weightKg: profile?.weight ?? 0
            }),
        [workoutDurationSeconds, timeLeft, exerciseData?.met, profile?.weight]
    )

    const handleStatusWebRTCChange = useCallback(
        (status: WebRTCConnectionStatus, details?: string) => {
            if (status === 'reconnect_failed' || status === 'signaling_failed') {
                handleConnectionError('Reconnect failed')
            } else if (status === 'reconnecting') {
                setIsReconnecting(true)
                setIsPaused(true)
            } else if (status === 'connected') {
                setIsReconnecting(false)
            }
        },
        [navigation]
    )

    const listenAIResponse = useCallback(({ content }: AIResponsePayload) => {
        setAssessmentResult(content)
        setTimeout(() => setAssessmentResult('Good depth and form!'), 1500)
    }, [])

    // WebRTC hook
    const { sendTrainingRequest, sendStartTraining, sendStopTraining, sendPauseTraining } = useWebRTC({
        wsSignalingUrl: `ws://${peripheralInfo?.ip_address}:8000`,
        onRemoteStream: setRemoteStream,
        onAIResponse: listenAIResponse,
        onStatusChange: handleStatusWebRTCChange
    })

    // Effects
    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: ANIMATION_DURATION,
                easing: Easing.ease,
                useNativeDriver: true
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: ANIMATION_DURATION,
                easing: Easing.ease,
                useNativeDriver: true
            })
        ]).start()
    }, [assessmentResult, fadeAnim, slideAnim])

    useEffect(() => {
        setTimeLeft(timeLeftInitial)
    }, [timeLeftInitial])

    useEffect(() => {
        if (isPaused || timeLeft <= 0) return
        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000)
        return () => clearInterval(timer)
    }, [isPaused, timeLeft])

    useEffect(() => {
        if (timeLeft === 0) sendStopTraining()
    }, [timeLeft, isLoading, sendStopTraining])

    // Handlers
    const handleConnectionError = useCallback(
        (errorDetails?: string) => {
            if (!isFocused) return

            const currentError = errorDetails || 'Unknown error'

            if (previousErrorRef.current === currentError) return

            previousErrorRef.current = currentError

            Alert.alert(
                'Connection Error',
                'There was a problem connecting to the GymBot device. Please restart the device and try again.',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            previousErrorRef.current = null
                            navigation.pop(1)
                        }
                    }
                ]
            )
        },
        [isFocused, navigation]
    )

    const handleStart = useCallback(async () => {
        if (!profile?.id) return
        setIsStarting(true)
        try {
            const result = await sendTrainingRequest(trainingPayload)
            if (result !== 'OK') throw new Error('Device is busy')
            countdownRef.current?.start(3)
        } catch (error) {
            console.error('Error sending training request:', error)
            handleConnectionError('Device is busy')
        } finally {
            setIsStarting(false)
        }
    }, [trainingPayload, profile?.id, sendTrainingRequest, handleConnectionError, setIsStarting])

    const handlePause = useCallback(async () => {
        console.log('handlePause', isPaused)
        if (isPaused) {
            console.log('handleStart', isPaused)
            await handleStart()
        } else {
            console.log('handlePause', isPaused)
            setIsPaused(true)
            try {
                const res = await sendPauseTraining()
                if (res !== 'OK') throw new Error('Device is busy')
                refetchWorkoutSummary()
            } catch (error) {
                handleConnectionError('Device is busy')
            }
        }
    }, [isPaused, handleStart, sendPauseTraining, refetchWorkoutSummary, handleConnectionError])

    const handleStop = useCallback(() => {
        sendStopTraining()
        navigation.navigate('Congratulation')
    }, [sendStopTraining, navigation])

    const triggerStartWorkout = useCallback(async () => {
        try {
            const { workout_summary_id } = await sendStartTraining()
            if (!workout_summary_id) throw new Error('Invalid workout summary ID')
            setTrainingPayload((prev) => ({ ...prev, workout_summary_id }))
            setWorkoutHistoryId(workout_summary_id)
            setIsPaused(false)
        } catch (error) {
            console.error('Error starting workout:', error)
            handleConnectionError('Invalid workout summary ID')
            setIsPaused(true)
        }
    }, [sendStartTraining, handleConnectionError])

    return (
        <View style={styles.container}>
            <LoaderModal
                isVisible={(isLoading || isStarting) && !isReconnecting}
                title={isLoading ? 'Loading' : 'Starting'}
            />
            <LoaderModal isVisible={isReconnecting} title='Reconnecting' />
            {remoteStream ? (
                <RTCView streamURL={remoteStream.toURL()} style={styles.background} objectFit='cover' />
            ) : (
                <PreCallBackgroundGradient />
            )}
            <View style={styles.overlay} />
            <SafeAreaView style={styles.safeArea}>
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
    },
    safeArea: {
        flex: 1,
        padding: 20,
        paddingTop: 60
    }
})

export default GymLiveScreen

import { useCallback, RefObject, MutableRefObject, useState } from 'react'
import { Alert } from 'react-native'
import useWebRTC from '@/hooks/useWebRTC'
import { NavigationProp } from '@react-navigation/native'
import { TrainingPayload, AIResponsePayload } from '@/types/payloadWithWebRTCTypes'
import { WebRTCConnectionStatus } from '@/services/rtc/WebRTCService'
import { RootStackParamList } from '@/navigation/types'
import { CountdownRef } from '@/components/Countdown'
import { MediaStream } from 'react-native-webrtc'
import useBluetoothContext from '@/hooks/useBluetoothContext'

interface UseWebRTCHandlersProps {
    trainingPayload: TrainingPayload
    isPaused: boolean
    debouncePauseValue: boolean
    setIsPaused: (paused: boolean) => void
    setIsStarting: (starting: boolean) => void
    setRemoteStream: (stream: MediaStream | null) => void
    setAssessmentResult: (result: string) => void
    navigation: NavigationProp<RootStackParamList>
    isFocused: boolean
    previousErrorRef: React.MutableRefObject<string | null>
    countdownRef: RefObject<CountdownRef>
    workoutHistoryId: string | undefined
    refetchWorkoutSummary: () => void
    setWorkoutHistoryId: (id: string | undefined) => void
}

export default function useWebRTCHandlers({
    trainingPayload,
    isPaused,
    debouncePauseValue,
    setIsPaused,
    setIsStarting,
    setRemoteStream,
    setAssessmentResult,
    navigation,
    isFocused,
    previousErrorRef,
    countdownRef,
    refetchWorkoutSummary,
    setWorkoutHistoryId
}: UseWebRTCHandlersProps) {
    const { peripheralInfo } = useBluetoothContext()
    const [isReconnecting, setIsReconnecting] = useState<boolean>(false)
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
                            navigation.goBack()
                        }
                    }
                ]
            )
        },
        [isFocused, navigation]
    )

    const listenAIResponse = useCallback(
        ({ content, ...rest }: AIResponsePayload) => {
            setAssessmentResult(content)
            setTimeout(() => setAssessmentResult('Good depth and form!'), 2500)
        },
        [setAssessmentResult]
    )

    const handleStatusWebRTCChange = useCallback(
        (status: WebRTCConnectionStatus, details?: string) => {
            if (status === 'reconnect_failed' || status === 'signaling_failed') {
                handleConnectionError('Reconnect failed')
            } else if (status === 'reconnecting') {
                setIsPaused(true)
                setIsReconnecting(true)
            } else if (status === 'connected') {
                setIsReconnecting(false)
            }
        },
        [handleConnectionError, setIsPaused]
    )

    const { sendTrainingRequest, sendStartTraining, sendStopTraining, sendPauseTraining } = useWebRTC({
        wsSignalingUrl: peripheralInfo?.ip_address as string,
        onRemoteStream: setRemoteStream,
        onAIResponse: listenAIResponse,
        onStatusChange: handleStatusWebRTCChange
    })

    const handleStart = useCallback(async () => {
        if (!trainingPayload.user_id) return
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
    }, [trainingPayload, sendTrainingRequest, handleConnectionError, setIsStarting, countdownRef])

    const handlePause = useCallback(async () => {
        if (isPaused && isPaused == debouncePauseValue) {
            await handleStart()
        } else if (!isPaused && isPaused == debouncePauseValue) {
            setIsPaused(true)
            try {
                const res = await sendPauseTraining()
                if (res !== 'OK') throw new Error('Device is busy')
            } catch (error) {
                handleConnectionError('Device is busy')
            }
        }
    }, [isPaused, handleStart, sendPauseTraining, refetchWorkoutSummary, handleConnectionError, setIsPaused])

    const handleStop = useCallback(() => {
        sendStopTraining()
        navigation.navigate('Congratulation')
    }, [sendStopTraining, navigation])

    const triggerStartWorkout = useCallback(async () => {
        try {
            const { workout_summary_id } = await sendStartTraining()
            if (!workout_summary_id) throw new Error('Invalid workout summary ID')
            setIsPaused(false)
            setWorkoutHistoryId(workout_summary_id)
            // console.log('Workout started with ID:', workout_summary_id)
        } catch (error) {
            // console.error('Error starting workout:', error)
            handleConnectionError('Invalid workout summary ID')
            setIsPaused(true)
        }
    }, [sendStartTraining, handleConnectionError, setIsPaused])

    return {
        handleStart,
        handlePause,
        handleStop,
        triggerStartWorkout,
        handleConnectionError,
        isReconnecting
    }
}

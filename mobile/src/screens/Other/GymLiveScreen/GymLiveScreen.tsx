import React, { useRef, useState } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { RTCView, MediaStream } from 'react-native-webrtc'
import { useIsFocused } from '@react-navigation/native'
import AssessmentFeedback from './components/AssessmentFeedback'
import MetricsBar from './components/MetricsBar'
import ControlButtons from './components/ControlButtons'
import Countdown, { CountdownRef } from '@/components/Countdown'
import LoaderModal from '@/components/LoaderModal'
import PreCallBackgroundGradient from './components/backgroundPlaceholder'
import { RootStackScreenProps } from '@/navigation/types'
import { TrainingPayload } from '@/types/payloadWithWebRTCTypes'
import { DeviceConfig } from '@/types/peripheral.type'
import useSlideAnimations from '@/hooks/useSlideAnimations'
import { formatTimeFromSeconds } from '@/utils/format.util'
import useWebRTCHandlers from '@/hooks/useWebRTCGymLiveHandlers'
import useWorkoutLogic from '@/hooks/useWorkoutGymeLiveLogic'
import useBluetoothContext from '@/hooks/useBluetoothContext'
import useUserData from '@/hooks/useUserData'

const ANIMATION_DURATION = 600

interface GymLiveScreenProps extends RootStackScreenProps<'GymLiveScreen'> {}

const GymLiveScreen: React.FC<GymLiveScreenProps> = ({ navigation, route }) => {
    const { peripheralInfo } = useBluetoothContext()
    const { userData } = useUserData()
    const { workout_history_id, exercise_id } = route.params
    const isFocused = useIsFocused()

    const [workoutHistoryId, setWorkoutHistoryId] = useState<string | undefined>(workout_history_id)
    const [assessmentResult, setAssessmentResult] = useState<string>('')
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)
    const [trainingPayload, setTrainingPayload] = useState<TrainingPayload>({
        exercise_id: exercise_id ?? null,
        workout_summary_id: workout_history_id ?? null,
        user_id: userData?.id ?? '',
        config: peripheralInfo?.config as DeviceConfig
    })

    const countdownRef = useRef<CountdownRef>(null)
    const previousErrorRef = useRef<string | null>(null)

    const { fadeAnim, slideAnim } = useSlideAnimations({ assessmentResult, duration: ANIMATION_DURATION })
    const {
        isPaused,
        setIsPaused,
        timeLeft,
        isStarting,
        setIsStarting,
        caloriesBurned,
        isLoading,
        exerciseData,
        refetchWorkoutSummary
    } = useWorkoutLogic({
        workoutHistoryId,
        exercise_id,
        setTrainingPayload
    })

    const { handleStart, handlePause, handleStop, triggerStartWorkout, isReconnecting } = useWebRTCHandlers({
        trainingPayload,
        setWorkoutHistoryId,
        isPaused,
        setIsPaused,
        setIsStarting,
        setRemoteStream,
        setAssessmentResult,
        navigation,
        isFocused,
        previousErrorRef,
        countdownRef,
        workoutHistoryId,
        refetchWorkoutSummary
    })

    return (
        <View style={styles.container}>
            <LoaderModal isVisible={isLoading || isStarting || isReconnecting} />
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
                    timeLeft={exerciseData ? formatTimeFromSeconds(timeLeft) : undefined}
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

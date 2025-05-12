import React, { useEffect, useState, useRef } from 'react'
import { View, StyleSheet, SafeAreaView, Animated, Easing } from 'react-native'
import { RTCView, MediaStream } from 'react-native-webrtc'
import AssessmentFeedback from './components/AssessmentFeedback'
import MetricsBar from './components/MetricsBar'
import ControlButtons from './components/ControlButtons'
import useWebRTC from '@/hooks/useWebRTC'
import { RootStackScreenProps } from '@/navigation/types'
import useAppContext from '@/hooks/useAppContext'

const GymLiveScreen = ({ navigation, route }: RootStackScreenProps<'GymLiveScreen'>) => {
    const { workout_history_id, exercise_id } = route.params
    const { profile } = useAppContext()

    const [exerciseName] = useState('Barbell Squats')
    const [caloriesBurned] = useState(210)
    const [assessmentResult, setAssessmentResult] = useState('Good depth and form!')
    const [isPaused, setIsPaused] = useState(false)
    const [timeLeft, setTimeLeft] = useState(1800)
    const fadeAnim = useRef(new Animated.Value(0)).current
    const slideAnim = useRef(new Animated.Value(20)).current
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)

    const { startConnection } = useWebRTC({
        wsSignalingUrl: `ws://192.168.35.54:8080`,
        onRemoteStream: (stream) => setRemoteStream(stream)
    })

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
        let timer: NodeJS.Timeout | null = null

        if (!isPaused && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1)
            }, 1000)
        } else if (timeLeft === 0 && !isPaused) {
            stopWorkout()
        }

        return () => {
            if (timer) clearInterval(timer)
        }
    }, [isPaused, timeLeft])

    useEffect(() => {
        const init = async () => {
            try {
                await startConnection()
                console.log('WebRTC connection started')
            } catch (err) {
                console.error('Error starting WebRTC connection:', err)
            }
        }

        init()
    }, [])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`
    }

    const stopWorkout = () => {
        setTimeLeft(0)
        setIsPaused(true)
        console.log('Workout Stopped!')
    }

    return (
        <View style={styles.container}>
            {remoteStream ? (
                <RTCView streamURL={remoteStream.toURL()} style={styles.background} objectFit='cover' />
            ) : (
                <View style={styles.backgroundPlaceholder} />
            )}
            <View style={styles.overlay} />

            <SafeAreaView style={{ flex: 1, padding: 20, paddingTop: 60 }}>
                <AssessmentFeedback assessmentResult={assessmentResult} fadeAnim={fadeAnim} slideAnim={slideAnim} />
                <MetricsBar
                    exerciseName={exerciseName}
                    caloriesBurned={caloriesBurned}
                    timeLeft={formatTime(timeLeft)}
                />
                <ControlButtons
                    isPaused={isPaused}
                    onTogglePause={() => setIsPaused((prev) => !prev)}
                    onStopWorkout={stopWorkout}
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
    backgroundPlaceholder: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000'
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent'
    }
})

export default GymLiveScreen

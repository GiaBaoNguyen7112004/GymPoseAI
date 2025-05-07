import React, { useEffect, useState, useRef } from 'react'
import { View, Image, StyleSheet, SafeAreaView, Animated, Easing } from 'react-native'
import AssessmentFeedback from './components/AssessmentFeedback'
import MetricsBar from './components/MetricsBar'
import ControlButtons from './components/ControlButtons'

const GymLiveScreen = () => {
    const [exerciseName] = useState('Barbell Squats')
    const [caloriesBurned] = useState(210)
    const [assessmentResult, setAssessmentResult] = useState('Good depth and form!')
    const [isPaused, setIsPaused] = useState(false)
    const [timeLeft, setTimeLeft] = useState(1800)
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
            <Image
                source={{
                    uri: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                }}
                style={styles.background}
                resizeMode='cover'
            />
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
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    }
})

export default GymLiveScreen

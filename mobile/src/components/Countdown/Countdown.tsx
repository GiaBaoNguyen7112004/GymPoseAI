import React, { useEffect, useImperativeHandle, useRef, useState, forwardRef, memo } from 'react'
import { View, Text, StyleSheet, Dimensions, Animated, Easing, Platform } from 'react-native'
import { BlurView } from 'expo-blur'

const { width } = Dimensions.get('window')
const COUNTDOWN_SIZE = width * 0.5

export interface CountdownRef {
    start: (value?: number) => void
    reset: () => void
}

interface CountdownProps {
    initialCount?: number
    onFinish?: () => void
    modernTextColor?: string
}

const Countdown = forwardRef<CountdownRef, CountdownProps>(
    ({ initialCount = 3, onFinish, modernTextColor = '#FFF' }, ref) => {
        const [count, setCount] = useState<number>(0)
        const [isVisible, setIsVisible] = useState<boolean>(false)
        const timerRef = useRef<NodeJS.Timeout | null>(null)
        const componentOpacityAnim = useRef(new Animated.Value(0)).current
        const numberScaleAnim = useRef(new Animated.Value(1)).current
        const numberOpacityAnim = useRef(new Animated.Value(1)).current

        const animateComponent = (toValue: number, callback?: () => void) => {
            Animated.timing(componentOpacityAnim, {
                toValue,
                duration: 300,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true
            }).start(callback)
        }

        const animateNumber = (isInitial: boolean = false) => {
            // Reset giá trị ban đầu
            numberScaleAnim.setValue(isInitial ? 0.8 : 1.2)
            numberOpacityAnim.setValue(isInitial ? 0 : 1)

            // Animation cho số mới
            Animated.parallel([
                Animated.timing(numberScaleAnim, {
                    toValue: 1,
                    duration: isInitial ? 400 : 200,
                    easing: Easing.out(Easing.back(1.2)),
                    useNativeDriver: true
                }),
                Animated.timing(numberOpacityAnim, {
                    toValue: 1,
                    duration: isInitial ? 300 : 200,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true
                })
            ]).start()
        }

        const fadeOutNumber = (callback: () => void) => {
            Animated.parallel([
                Animated.timing(numberScaleAnim, {
                    toValue: 0.8,
                    duration: 150,
                    easing: Easing.in(Easing.ease),
                    useNativeDriver: true
                }),
                Animated.timing(numberOpacityAnim, {
                    toValue: 0,
                    duration: 150,
                    easing: Easing.in(Easing.ease),
                    useNativeDriver: true
                })
            ]).start(callback)
        }

        useImperativeHandle(ref, () => ({
            start: (value?: number) => {
                clearTimer()
                const startValue = value ?? initialCount
                setCount(startValue)
                setIsVisible(true)
                animateComponent(1)
                if (startValue >= 0) {
                    animateNumber(true)
                }
                startTimer(startValue)
            },
            reset: () => {
                clearTimer()
                animateComponent(0, () => {
                    setIsVisible(false)
                    setCount(0)
                })
            }
        }))

        const clearTimer = () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
                timerRef.current = null
            }
        }

        const startTimer = (startValue: number) => {
            if (startValue < 0) {
                animateComponent(0, () => {
                    setIsVisible(false)
                    setCount(0)
                    onFinish?.()
                })
                return
            }

            timerRef.current = setInterval(() => {
                setCount((prev) => {
                    const nextCount = prev - 1
                    if (nextCount < 0) {
                        clearTimer()
                        fadeOutNumber(() => {
                            animateComponent(0, () => {
                                setIsVisible(false)
                                onFinish?.()
                            })
                        })
                        return 0
                    }
                    fadeOutNumber(() => animateNumber())
                    return nextCount
                })
            }, 1000)
        }

        useEffect(() => {
            return () => clearTimer()
        }, [])

        if (!isVisible) return null

        return (
            <Animated.View style={[styles.container, { opacity: componentOpacityAnim }]}>
                <BlurView intensity={90} tint='dark' style={styles.blurView}>
                    <Animated.View
                        style={{
                            opacity: numberOpacityAnim,
                            transform: [{ scale: numberScaleAnim }]
                        }}
                    >
                        <Text style={[styles.countText, { color: modernTextColor }]}>{count >= 0 ? count : 'GO!'}</Text>
                    </Animated.View>
                </BlurView>
            </Animated.View>
        )
    }
)

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    blurView: {
        width: COUNTDOWN_SIZE,
        height: COUNTDOWN_SIZE,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: COUNTDOWN_SIZE / 2,
        overflow: 'hidden'
    },
    countText: {
        fontSize: Math.min(120, COUNTDOWN_SIZE * 0.5),
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium'
    }
})

export default memo(Countdown)

import React, { useState } from 'react'

import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'

import { BlurView } from 'expo-blur'

import { Ionicons, MaterialIcons } from '@expo/vector-icons'

const COLORS = {
    textPrimary: '#E2E8F0',

    buttonGradient: 'linear-gradient(45deg, #3B82F6, #8B5CF6)',

    buttonPauseBackground: 'rgba(255, 255, 255, 0.1)',

    buttonStopBackground: '#EF4444',

    glow: '#60A5FA'
}

type Props = {
    isPaused: boolean

    onTogglePause: () => void

    onStopWorkout: () => void

    onStartWorkout: () => void

    blurIntensity?: number
}

const ControlButtons = ({ isPaused, onTogglePause, onStopWorkout, onStartWorkout, blurIntensity = 90 }: Props) => {
    const [hasStarted, setHasStarted] = useState(false)

    const [scaleAnim] = useState(new Animated.Value(1))

    const handleStart = () => {
        setHasStarted(true)

        onStartWorkout()
    }

    const animatePress = () => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.95,

                duration: 100,

                useNativeDriver: true
            }),

            Animated.timing(scaleAnim, {
                toValue: 1,

                duration: 100,

                useNativeDriver: true
            })
        ]).start()
    }

    return (
        <View style={styles.container}>
            {!hasStarted ? (
                <TouchableOpacity
                    style={styles.startButtonContainer}
                    onPress={() => {
                        animatePress()

                        handleStart()
                    }}
                    activeOpacity={0.8}
                >
                    <BlurView intensity={blurIntensity} tint='light' style={styles.startButton}>
                        <Animated.View style={[styles.startButtonInner, { transform: [{ scale: scaleAnim }] }]}>
                            <Ionicons name='play' size={36} color='#000' />
                        </Animated.View>
                    </BlurView>
                    <Text style={styles.label}>Start Train</Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.buttonGroup}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            animatePress()

                            onTogglePause()
                        }}
                        activeOpacity={0.8}
                    >
                        <BlurView intensity={blurIntensity} tint='dark' style={styles.pauseButton}>
                            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                                <Ionicons name={isPaused ? 'play' : 'pause'} size={28} color={COLORS.textPrimary} />
                            </Animated.View>
                        </BlurView>
                        <Text style={styles.label}>{isPaused ? 'Resume' : 'Pause'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            animatePress()

                            onStopWorkout()
                        }}
                        activeOpacity={0.8}
                    >
                        <View style={styles.stopButton}>
                            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                                <MaterialIcons name='stop' size={28} color='white' />
                            </Animated.View>
                        </View>
                        <Text style={styles.label}>Stop</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },

    startButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        height: 120
    },

    startButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 90,
        height: 90,
        borderRadius: 45,
        overflow: 'hidden',
        backgroundColor: COLORS.buttonPauseBackground,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        shadowColor: COLORS.glow,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 12
    },

    startButtonInner: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.buttonGradient,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
    },

    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 80
    },

    pauseButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
        backgroundColor: COLORS.buttonPauseBackground,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        shadowColor: COLORS.glow,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 8
    },

    stopButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
        backgroundColor: COLORS.buttonStopBackground,
        shadowColor: '#EF4444',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 8
    },

    label: {
        color: COLORS.textPrimary,
        fontSize: 14,
        fontWeight: '700',
        marginTop: 10,
        textTransform: 'uppercase',
        letterSpacing: 1,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2
    }
})

export default ControlButtons

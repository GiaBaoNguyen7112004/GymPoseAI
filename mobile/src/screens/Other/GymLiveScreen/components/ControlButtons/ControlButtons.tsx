import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { BlurView } from 'expo-blur'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

const COLORS = {
    textPrimary: '#E2E8F0',
    buttonPauseBackground: 'rgba(255, 255, 255, 0.15)',
    buttonStopBackground: '#DC2626'
}

type Props = {
    isPaused: boolean
    onTogglePause: () => void
    onStopWorkout: () => void
    blurIntensity?: number
}

const ControlButtons = ({ isPaused, onTogglePause, onStopWorkout, blurIntensity = 85 }: Props) => (
    <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={onTogglePause}>
            <BlurView intensity={blurIntensity} tint='dark' style={styles.pauseButton}>
                <Ionicons name={isPaused ? 'play' : 'pause'} size={28} color={COLORS.textPrimary} />
            </BlurView>
            <Text style={styles.label}>{isPaused ? 'Play' : 'Pause'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onStopWorkout}>
            <View style={styles.stopButton}>
                <MaterialIcons name='stop' size={28} color='white' />
            </View>
            <Text style={styles.label}>Stop</Text>
        </TouchableOpacity>
    </View>
)

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10
    },
    pauseButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 64,
        height: 64,
        borderRadius: 32,
        overflow: 'hidden',
        backgroundColor: COLORS.buttonPauseBackground,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)'
    },
    stopButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 64,
        height: 64,
        borderRadius: 32,
        overflow: 'hidden',
        backgroundColor: COLORS.buttonStopBackground
    },
    label: {
        color: COLORS.textPrimary,
        fontSize: 13,
        fontWeight: '600',
        marginTop: 8,
        textTransform: 'uppercase',
        letterSpacing: 0.5
    }
})

export default ControlButtons

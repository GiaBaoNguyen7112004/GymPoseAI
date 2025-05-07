import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'

const COLORS = {
    textSecondary: '#94A3B8',
    textPrimary: '#E2E8F0',
    highlightCalories: '#FACC15',
    highlightTimer: '#60A5FA'
}

type Props = {
    exerciseName: string
    caloriesBurned: number
    timeLeft: string
    blurIntensity?: number
}

const MetricsBar = ({ exerciseName, caloriesBurned, timeLeft, blurIntensity = 85 }: Props) => (
    <View style={styles.wrapper}>
        <BlurView intensity={blurIntensity} tint='dark' style={styles.container}>
            <View style={styles.item}>
                <Text style={styles.label}>Exercise</Text>
                <Text style={styles.value}>{exerciseName}</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.item}>
                <MaterialCommunityIcons name='fire' size={22} color={COLORS.highlightCalories} />
                <Text style={styles.label}>Calories</Text>
                <Text style={[styles.value, { color: COLORS.highlightCalories }]}>{caloriesBurned} kcal</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.item}>
                <MaterialCommunityIcons name='timer-sand' size={22} color={COLORS.highlightTimer} />
                <Text style={styles.label}>Time Left</Text>
                <Text style={[styles.value, { color: COLORS.highlightTimer, fontWeight: 'bold' }]}>{timeLeft}</Text>
            </View>
        </BlurView>
    </View>
)

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 16,
        overflow: 'hidden'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16
    },
    item: {
        flex: 1,
        alignItems: 'center'
    },
    label: {
        color: COLORS.textSecondary,
        fontSize: 12,
        fontWeight: '500',
        marginTop: 4,
        marginBottom: 4,
        textTransform: 'uppercase',
        letterSpacing: 0.5
    },
    value: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textPrimary
    },
    separator: {
        width: 1,
        height: '80%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginHorizontal: 16
    }
})

export default MetricsBar

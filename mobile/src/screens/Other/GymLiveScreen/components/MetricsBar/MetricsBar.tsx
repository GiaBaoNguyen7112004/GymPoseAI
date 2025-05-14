import React, { memo } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'

type Props = {
    exerciseName?: string
    caloriesBurned?: number
    timeLeft?: string
    blurIntensity?: number
}

const MetricsBar = ({ exerciseName, caloriesBurned, timeLeft, blurIntensity = 90 }: Props) => (
    <View style={styles.wrapper}>
        <BlurView intensity={blurIntensity} tint='dark' style={styles.container}>
            <View style={styles.item}>
                <Text style={styles.label}>Exercise</Text>
                <Text style={styles.value}>{exerciseName ?? '_ _'}</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.item}>
                <MaterialCommunityIcons name='fire' size={20} color='#F87171' />
                <Text style={styles.label}>Calories</Text>
                <Text style={styles.value}>{caloriesBurned ?? '_ _'} kcal</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.item}>
                <MaterialCommunityIcons name='timer-sand' size={20} color='#60A5FA' />
                <Text style={styles.label}>Time Left</Text>
                <Text style={styles.value}>{timeLeft ?? '_ _:_ _'}</Text>
            </View>
        </BlurView>
    </View>
)

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 12,
        overflow: 'hidden'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 14,
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    item: {
        flex: 1,
        alignItems: 'center'
    },
    label: {
        color: '#CBD5E1',
        fontSize: 10,
        fontWeight: '500',
        marginTop: 3,
        marginBottom: 3,
        textTransform: 'uppercase',
        letterSpacing: 0.8
    },
    value: {
        fontSize: 16,
        fontWeight: '500',
        color: '#F1F5F9'
    },
    separator: {
        width: 1,
        height: '70%',
        backgroundColor: 'rgba(255,255,255,0.15)',
        marginHorizontal: 12
    }
})

export default memo(MetricsBar)

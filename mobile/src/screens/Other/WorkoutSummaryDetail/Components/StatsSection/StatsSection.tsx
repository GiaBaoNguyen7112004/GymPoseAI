// WorkoutSummaryDetail/StatsSection.tsx
import { StyleSheet, Text, View } from 'react-native'
import { formatTimeFromSeconds, formatTimeFromMinutes } from '@/utils/format.util'
import { memo } from 'react'

interface StatsSectionProps {
    elapsedTime: number
    durationMinutes: number
    repCount: number
    formAccuracy: number
    poseErrorsCount: number
    caloriesBurned: number
}

const StatsSection = ({
    elapsedTime,
    durationMinutes,
    repCount,
    formAccuracy,
    poseErrorsCount,
    caloriesBurned
}: StatsSectionProps) => {
    return (
        <View style={styles.statsGrid}>
            <View style={styles.statsRow}>
                <View style={styles.statsCell}>
                    <Text style={styles.statValue}>{formatTimeFromSeconds(elapsedTime)}</Text>
                    <Text style={styles.statLabel}>Workout time</Text>
                </View>
                <View style={[styles.statsCell, styles.borderLeft]}>
                    <Text style={styles.statValue}>{formAccuracy}%</Text>
                    <Text style={styles.statLabel}>Pose Accuracy</Text>
                </View>
                <View style={[styles.statsCell, styles.borderLeft]}>
                    <Text style={styles.statValue}>{repCount}</Text>
                    <Text style={styles.statLabel}>Rep count</Text>
                </View>
            </View>
            <View style={styles.statsRow}>
                <View style={styles.statsCell}>
                    <Text style={styles.statValue}>{formatTimeFromMinutes(durationMinutes)}</Text>
                    <Text style={styles.statLabel}>Workout duration</Text>
                </View>
                <View style={[styles.statsCell, styles.borderLeft]}>
                    <Text style={styles.statValue}>{caloriesBurned.toFixed(2)}</Text>
                    <Text style={styles.statLabel}>Burned</Text>
                </View>
                <View style={[styles.statsCell, styles.borderLeft]}>
                    <Text style={styles.statValue}>{poseErrorsCount}</Text>
                    <Text style={styles.statLabel}>Pose errors</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    statsGrid: {
        marginTop: 16,
        marginHorizontal: 16,
        borderRadius: 8,
        marginBottom: 16
    },
    statsRow: { flexDirection: 'row' },
    statsCell: {
        flex: 1,
        padding: 5,
        alignItems: 'center'
    },
    borderLeft: {
        borderLeftWidth: 1,
        borderLeftColor: '#eee'
    },
    statValue: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 4,
        color: '#1D1617'
    },
    statLabel: {
        fontSize: 12,
        color: '#7B6F72'
    }
})

export default memo(StatsSection)

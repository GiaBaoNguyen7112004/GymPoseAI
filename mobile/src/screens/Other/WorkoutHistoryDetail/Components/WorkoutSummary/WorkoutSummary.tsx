// components/WorkoutSummary.tsx
import { View, Text, StyleSheet } from 'react-native'
import AvatarWithIcon from '@/components/AvatarWithIcon'
import { formatDate } from '@/utils/format.util'
import { COLOR_BRANDS } from '@/constants/common.constants'
import ActivityItem from '../ActivityItem'
import WorkoutHistoryProgressChart from '../WorkoutHistoryProgressChart/WorkoutHistoryProgressChart'
import { workoutHistory } from '@/types/workoutHistory.type'
import { ProgressChartData } from 'react-native-chart-kit/dist/ProgressChart'
import { memo } from 'react'

interface WorkoutSummaryProps {
    workout?: workoutHistory
    workoutDuration: number
    progressData: ProgressChartData
}

const WorkoutSummary = ({ workout, workoutDuration, progressData }: WorkoutSummaryProps) => {
    return (
        <View style={styles.cardTop}>
            <View style={styles.header}>
                <AvatarWithIcon size={40} colors={COLOR_BRANDS.secondary} icon='AbWorkout' />
                <View>
                    <Text style={styles.name}>{workout?.name_workout}</Text>
                    <Text style={styles.date}>{formatDate(new Date(workout?.start_time || ''))}</Text>
                </View>
            </View>

            <View style={styles.activityRow}>
                <View>
                    <ActivityItem
                        label='Calories Burned'
                        value={`${workout?.calories_burned || 0}`}
                        unit={`/ ${workout?.calories_base || 0} CAL`}
                        color={(progressData as any).colors[1]}
                    />
                    <ActivityItem
                        label='Exercise Time'
                        value={`${workoutDuration || 0}`}
                        unit={`/ ${workout?.duration_minutes || 0} MIN`}
                        color={(progressData as any).colors[0]}
                    />
                    <ActivityItem
                        label='Form Accuracy'
                        value={(progressData as any).toFixed(2)}
                        unit='%'
                        color={(progressData as any).colors[2]}
                    />
                </View>

                <View style={styles.chartWrapper}>
                    <WorkoutHistoryProgressChart data={progressData} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardTop: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 20,
        shadowColor: 'rgba(29, 22, 23, 0.1)',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 8
    },
    header: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
        marginBottom: 15
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1D1617'
    },
    date: {
        marginTop: 5,
        fontSize: 10,
        fontWeight: '400',
        color: '#7B6F72'
    },
    activityRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    chartWrapper: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default memo(WorkoutSummary)

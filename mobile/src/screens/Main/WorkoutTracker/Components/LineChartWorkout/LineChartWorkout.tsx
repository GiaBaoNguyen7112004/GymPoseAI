import LineChartSkeleton from '@/components/LineChartSkeleton'
import WorkoutChart from '@/components/WorkoutChart'
import { SCREEN_WIDTH } from '@/constants/devices.constant'
import useInteractionReadyState from '@/hooks/useInteractionReadyState'
import { workoutHistoryApi } from '@/services/rest'
import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import { StyleSheet, View } from 'react-native'
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart'

function LineChartWorkout() {
    const { data: workoutQuery } = useQuery({
        queryKey: ['workoutHistory', 'weekly'],
        queryFn: () => workoutHistoryApi.getWorkoutSummaryStatistics({ viewMode: 'weekly' }),
        staleTime: 1000 * 60 * 5
    })
    const workoutHistoryData = workoutQuery?.data.data || []

    const isChartReady = workoutHistoryData?.length > 0

    return (
        <View style={styles.graphContainer}>
            {isChartReady ? (
                <WorkoutChart
                    viewMode={'weekly'}
                    workoutData={workoutHistoryData}
                    chartConfig={chartConfig}
                    lineChartColor={lineChartColor}
                />
            ) : (
                <LineChartSkeleton />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    graphContainer: {
        marginTop: 30,
        flexDirection: 'row',
        height: 120,
        width: SCREEN_WIDTH * 0.9,
        alignSelf: 'center'
    }
})

export default memo(LineChartWorkout)

const chartConfig: AbstractChartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    decimalPlaces: 0,
    propsForHorizontalLabels: {
        dx: -15
    },
    color: (opacity = 1) => `rgba(134, 174, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForLabels: { fontSize: 12, fontWeight: '400', color: '#FFF' },
    propsForDots: { r: '2.5', strokeWidth: '1', stroke: '#FFF', fill: '#92A3FD' },
    propsForBackgroundLines: { strokeDasharray: '', strokeWidth: 1.2, stroke: '#F7F8F8' }
}

const lineChartColor = (opacity = 1) => `rgba(255, 255, 255, ${opacity})`

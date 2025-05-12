import { workoutSummaryProgressRingChart } from '@/config/chart.config'
import { memo } from 'react'
import { StyleSheet, View } from 'react-native'
import { ProgressChart } from 'react-native-chart-kit'
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart'
import { ProgressChartData } from 'react-native-chart-kit/dist/ProgressChart'

interface WorkoutHistoryProgressChartProps {
    data: ProgressChartData
    chartConfig?: AbstractChartConfig
}

function WorkoutHistoryProgressChart({
    data,
    chartConfig = workoutSummaryProgressRingChart.progressRingChartConfig
}: WorkoutHistoryProgressChartProps) {
    return (
        <View style={styles.chartContainer}>
            <ProgressChart
                data={data}
                width={120}
                height={120}
                strokeWidth={10}
                radius={32}
                chartConfig={chartConfig}
                hideLegend
                withCustomBarColorFromData
            />
        </View>
    )
}

export default memo(WorkoutHistoryProgressChart)

const styles = StyleSheet.create({
    chartContainer: {
        width: 120,
        height: 120
    }
})

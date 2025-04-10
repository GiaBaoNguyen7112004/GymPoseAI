import { useMemo } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart'

import Tooltip from './Components/Tooltip'
import { workoutHistoryOfDay } from '@/src/types/workoutHistory.type'
import {
    calculateChartData,
    defaultChartConfig,
    defaultLineColor,
    getChartWidth
} from '@/src/utils/chartWorkoutHistory.util'
import { useTooltip } from '@/src/hooks/useTooltip'

export type ViewModeType = 'weekly' | 'monthly' | 'yearly'

interface WorkoutChartProps {
    workoutData: workoutHistoryOfDay[]
    viewMode: ViewModeType
    chartConfig?: typeof defaultChartConfig
    lineChartColor?: (opacity: number) => string
}

export default function WorkoutChart({
    workoutData,
    viewMode,
    chartConfig = defaultChartConfig,
    lineChartColor = defaultLineColor
}: WorkoutChartProps) {
    const chartData = useMemo(() => calculateChartData(workoutData, viewMode), [workoutData, viewMode])

    const chartWidth = useMemo(() => getChartWidth(viewMode, chartData.length), [viewMode, chartData])

    const { tooltipData, handleDataPointClick } = useTooltip(chartData, viewMode)

    const chartContent: LineChartData = {
        labels: chartData.map((item) => item.label),
        datasets: [
            {
                data: chartData.map((item) => item.progress),
                color: lineChartColor,
                strokeWidth: 3
            }
        ]
    }

    if (workoutData.length === 0) {
        return (
            <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>No workout data available</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chartContainer}>
                <LineChart
                    data={chartContent}
                    width={chartWidth}
                    height={172}
                    yAxisSuffix='%'
                    chartConfig={chartConfig}
                    bezier
                    onDataPointClick={handleDataPointClick}
                    segments={4}
                    withVerticalLines={false}
                    withHorizontalLines
                    withDots
                    withShadow={false}
                    style={styles.chart}
                />
                {tooltipData?.visible && <Tooltip viewMode={viewMode} tooltipData={tooltipData} />}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'relative'
    },
    chartContainer: {
        position: 'relative',
        overflow: 'visible'
    },
    chart: {},
    noDataContainer: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noDataText: {
        color: '#999',
        fontSize: 16
    }
})

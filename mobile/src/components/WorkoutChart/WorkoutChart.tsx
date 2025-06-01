import { memo, useMemo } from 'react'
import { StyleSheet, View, ScrollView, Text, Pressable } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart'

import Tooltip from './Components/Tooltip'
import { workoutHistoryOfDay } from '@/types/workoutHistory.type'
import { useTooltip } from '@/hooks/useTooltip'
import { workoutHistoryLineChart } from '@/config/chart.config'
import { calculateWorkoutHistoryChart, getChartWidth } from '@/utils/chart.util'
import { ViewModeType } from '@/types/utils.type'
import { SCREEN_WIDTH } from '@/constants/devices.constant'

interface WorkoutChartProps {
    workoutData: workoutHistoryOfDay[]
    viewMode: ViewModeType
    chartConfig?: typeof workoutHistoryLineChart.lineChartConfig
    lineChartColor?: (opacity: number) => string
}

const WorkoutChart = ({
    workoutData,
    viewMode,
    chartConfig = workoutHistoryLineChart.lineChartConfig,
    lineChartColor = workoutHistoryLineChart.lineChartColor
}: WorkoutChartProps) => {
    const chartData = useMemo(() => calculateWorkoutHistoryChart(workoutData, viewMode), [workoutData, viewMode])
    const chartWidth = useMemo(() => getChartWidth(viewMode, chartData.length), [viewMode, chartData.length])

    const { tooltipData, handleDataPointClick, hideTooltip } = useTooltip(chartData, viewMode)

    const chartContent: LineChartData = useMemo(
        () => ({
            labels: chartData.map((item) => item.label),
            datasets: [
                {
                    data: chartData.map((item) => item.progress),
                    color: lineChartColor,
                    strokeWidth: 3
                }
            ]
        }),
        [chartData, lineChartColor]
    )

    const renderChart =
        workoutData.length === 0 ? (
            <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>No data available</Text>
            </View>
        ) : (
            <View style={styles.chartWrapper}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chartContainer}>
                    <LineChart
                        data={chartContent}
                        width={chartWidth as number}
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
                </ScrollView>
                {tooltipData?.visible && (
                    <Pressable style={styles.tooltipOverlay} onPress={hideTooltip}>
                        <Tooltip viewMode={viewMode} tooltipData={tooltipData} onClose={hideTooltip} />
                    </Pressable>
                )}
            </View>
        )

    return <View style={styles.container}>{renderChart}</View>
}

const styles = StyleSheet.create({
    container: {
        maxWidth: SCREEN_WIDTH * 0.9,
        position: 'relative',
        width: '100%',
        marginLeft: -10
    },
    chartWrapper: {
        position: 'relative'
    },
    chartContainer: {
        overflow: 'visible'
    },
    chart: {},
    tooltipOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
        pointerEvents: 'box-none'
    },
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

export default memo(WorkoutChart)

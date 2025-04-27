import { useMemo } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart'

import Tooltip from './Components/Tooltip'
import { workoutHistoryOfDay } from '@/types/workoutHistory.type'
import { useTooltip } from '@/hooks/useTooltip'
import { workoutHistoryLineChart } from '@/config/chart.config'
import { calculateWorkoutHistoryChart, getChartWidth } from '@/utils/chart.util'
import { ViewModeType } from '@/types/utils.type'
import LineChartSkeleton from '../LineChartSkeleton'

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

    const renderChart =
        workoutData.length === 0 ? (
            <LineChartSkeleton />
        ) : (
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
                {tooltipData?.visible && <Tooltip viewMode={viewMode} tooltipData={tooltipData} />}
            </ScrollView>
        )

    return <View style={styles.container}>{renderChart}</View>
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

export default WorkoutChart

import { useMemo, useState } from 'react'
import { Dimensions, StyleSheet, Text, View, ScrollView } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart'
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart'

import Tooltip, { TooltipDataType } from './Components/Tooltip'
import { formatDate } from '@/src/utils/format.util'
import { ViewModeType, workoutHistoryOfDay } from '@/src/types/workoutHistory.type'

const chartConfigDefault: AbstractChartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    decimalPlaces: 0,
    propsForHorizontalLabels: { dx: -15 },
    color: (opacity = 1) => `rgba(134, 174, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(128, 128, 128, ${opacity})`,
    propsForLabels: {
        fontSize: 12,
        fontWeight: '400',
        color: '#7B6F72'
    },
    propsForDots: {
        r: '2',
        strokeWidth: '1',
        stroke: '#86aeff'
    },
    propsForBackgroundLines: {
        strokeDasharray: '',
        strokeWidth: 1.2,
        stroke: '#DDDADA'
    }
}

const lineChartColorDefault = (opacity = 1) => `rgba(134, 174, 255, ${opacity})`

interface WorkoutChartProps {
    workoutData: workoutHistoryOfDay[]
    viewMode: ViewModeType
    chartConfig?: AbstractChartConfig
    lineChartColor?: (opacity: number) => string
}

interface DataPoint {
    date: Date
    label: string
    progress: number
    totalCaloriesBurned: number
}

function WorkoutChart({
    workoutData,
    viewMode,
    chartConfig = chartConfigDefault,
    lineChartColor = lineChartColorDefault
}: WorkoutChartProps) {
    const [tooltipData, setTooltipData] = useState<TooltipDataType | null>(null)

    const chartData = useMemo(() => calculateChartData(workoutData, viewMode), [workoutData, viewMode])

    const chartWidth = useMemo(() => {
        const baseWidth = Dimensions.get('window').width - 32
        if (viewMode === 'weekly') return baseWidth
        if (viewMode === 'monthly') return chartData.length * 60
        return chartData.length * 40
    }, [viewMode, chartData])

    const handleDataPointClick = ({ index, x, y }: { index: number; x: number; y: number }) => {
        if (!chartData[index]) return

        const current = chartData[index]
        const prev = index > 0 ? chartData[index - 1] : null

        const change = prev ? current.totalCaloriesBurned - prev.totalCaloriesBurned : 0
        const trendIcon = change > 0 ? '↑' : change < 0 ? '↓' : ''
        const trendColor = change > 0 ? '#4CAF50' : change < 0 ? '#F44336' : '#777'
        const percentageChange =
            prev && prev.totalCaloriesBurned !== 0 ? (change / prev.totalCaloriesBurned) * 100 : 100

        const comparisonLabel = prev
            ? viewMode === 'yearly'
                ? prev.date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                : viewMode === 'monthly'
                  ? prev.date.toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                    })
                  : formatDate(prev.date)
            : ''

        const comparisonText = prev ? `vs ${comparisonLabel}` : 'First data point'

        setTooltipData({
            visible: true,
            x,
            y,
            date: current.date,
            progress: Math.round(current.progress),
            totalCaloriesBurned: Math.round(current.totalCaloriesBurned),
            trendIcon,
            trendColor,
            comparisonText,
            comparisonValue: Math.round(percentageChange)
        })
    }

    const data: LineChartData = {
        labels: chartData.map((d) => d.label),
        datasets: [
            {
                data: chartData.map((d) => d.progress || 0),
                color: lineChartColor,
                strokeWidth: 3
            }
        ]
    }

    return (
        <View style={styles.container}>
            {workoutData.length === 0 ? (
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>No workout data available</Text>
                </View>
            ) : (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chartContainer}>
                    <LineChart
                        data={data}
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
            )}
        </View>
    )
}

export default WorkoutChart

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

// --- Helpers ---

const getChartDateRange = (viewMode: string) => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()
    const start = new Date(today)
    const end = new Date(today)

    if (viewMode === 'weekly') {
        start.setDate(today.getDate() - today.getDay())
        end.setDate(start.getDate() + 6)
    } else if (viewMode === 'monthly') {
        start.setDate(1)
        end.setMonth(month + 1)
        end.setDate(0)
    } else {
        start.setMonth(0, 1)
        end.setMonth(11, 31)
    }

    start.setHours(0, 0, 0, 0)
    end.setHours(23, 59, 59, 999)

    return { start, end }
}

const generateEmptyChartData = (viewMode: string, start: Date): DataPoint[] => {
    if (viewMode === 'weekly') {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        return days.map((day, i) => {
            const d = new Date(start)
            d.setDate(start.getDate() + i)
            return { date: d, label: day, progress: 0, totalCaloriesBurned: 0 }
        })
    }

    if (viewMode === 'monthly') {
        const daysInMonth = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate()
        return Array.from({ length: daysInMonth }, (_, i) => ({
            date: new Date(start.getFullYear(), start.getMonth(), i + 1),
            label: (i + 1).toString(),
            progress: 0,
            totalCaloriesBurned: 0
        }))
    }

    return Array.from({ length: 12 }, (_, i) => {
        const date = new Date(start.getFullYear(), i, 1)
        const label = date.toLocaleDateString('en-US', { month: 'short' })
        return { date, label, progress: 0, totalCaloriesBurned: 0 }
    })
}

const calculateChartData = (workoutData: workoutHistoryOfDay[], viewMode: string): DataPoint[] => {
    const { start, end } = getChartDateRange(viewMode)
    const chartData = generateEmptyChartData(viewMode, start)

    workoutData.forEach(({ date, calories_burned, calories_base }) => {
        const d = new Date(date)
        if (d >= start && d <= end) {
            let index: number

            if (viewMode === 'weekly') {
                index = Math.floor((d.getTime() - start.getTime()) / (1000 * 3600 * 24))
            } else if (viewMode === 'monthly') {
                index = d.getDate() - 1
            } else {
                index = d.getMonth()
            }

            if (chartData[index]) {
                chartData[index].totalCaloriesBurned += calories_burned
                chartData[index].progress = Math.min(
                    100,
                    (chartData[index].totalCaloriesBurned / (calories_base || 1)) * 100
                )
            }
        }
    })

    return chartData
}

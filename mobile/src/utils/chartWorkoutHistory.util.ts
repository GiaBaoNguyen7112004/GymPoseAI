import { Dimensions } from 'react-native'
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart'
import { workoutHistoryOfDay } from '@/src/types/workoutHistory.type'
import { ViewModeType } from '@/src/components/WorkoutChart'

// === Chart Configuration ===
export const defaultChartConfig: AbstractChartConfig = {
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

export const defaultLineColor = (opacity = 1) => `rgba(134, 174, 255, ${opacity})`

// === Data Types ===
export interface DataPoint {
    date: Date
    label: string
    progress: number
    totalCaloriesBurned: number
}

// === Utils ===

/**
 * Get start and end date range based on the selected view mode.
 */
export const getChartDateRange = (viewMode: ViewModeType) => {
    const today = new Date()
    const start = new Date(today)
    const end = new Date(today)

    switch (viewMode) {
        case 'weekly':
            start.setDate(today.getDate() - today.getDay())
            end.setDate(start.getDate() + 6)
            break
        case 'monthly':
            start.setDate(1)
            end.setMonth(start.getMonth() + 1, 0)
            break
        case 'yearly':
            start.setMonth(0, 1)
            end.setMonth(11, 31)
            break
    }

    start.setHours(0, 0, 0, 0)
    end.setHours(23, 59, 59, 999)

    return { start, end }
}

/**
 * Generate an array of empty data points based on view mode and start date.
 */
export const generateEmptyChartData = (viewMode: ViewModeType, start: Date): DataPoint[] => {
    switch (viewMode) {
        case 'weekly':
            return Array.from({ length: 7 }, (_, i) => {
                const date = new Date(start)
                date.setDate(start.getDate() + i)
                return {
                    date,
                    label: date.toLocaleDateString('en-US', { weekday: 'short' }),
                    progress: 0,
                    totalCaloriesBurned: 0
                }
            })

        case 'monthly':
            const daysInMonth = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate()
            return Array.from({ length: daysInMonth }, (_, i) => {
                const date = new Date(start.getFullYear(), start.getMonth(), i + 1)
                return {
                    date,
                    label: (i + 1).toString(),
                    progress: 0,
                    totalCaloriesBurned: 0
                }
            })

        case 'yearly':
            return Array.from({ length: 12 }, (_, i) => {
                const date = new Date(start.getFullYear(), i, 1)
                return {
                    date,
                    label: date.toLocaleDateString('en-US', { month: 'short' }),
                    progress: 0,
                    totalCaloriesBurned: 0
                }
            })

        default:
            return []
    }
}

/**
 * Calculate chart data from raw workout data.
 */
export const calculateChartData = (workoutData: workoutHistoryOfDay[], viewMode: ViewModeType): DataPoint[] => {
    const { start, end } = getChartDateRange(viewMode)
    const chartData = generateEmptyChartData(viewMode, start)

    workoutData.forEach(({ date, calories_burned, calories_base }) => {
        const d = new Date(date)
        if (d < start || d > end) return

        let index = 0
        switch (viewMode) {
            case 'weekly':
                index = Math.floor((d.getTime() - start.getTime()) / (1000 * 3600 * 24))
                break
            case 'monthly':
                index = d.getDate() - 1
                break
            case 'yearly':
                index = d.getMonth()
                break
        }

        const point = chartData[index]
        if (!point) return

        point.totalCaloriesBurned += calories_burned
        const base = calories_base || 1
        point.progress = Math.min(100, (point.totalCaloriesBurned / base) * 100)
    })

    return chartData
}

/**
 * Dynamically calculate chart width based on data length and view mode.
 */
export const getChartWidth = (viewMode: ViewModeType, dataLength: number) => {
    const screenWidth = Dimensions.get('window').width - 32

    switch (viewMode) {
        case 'weekly':
            return screenWidth
        case 'monthly':
            return dataLength * 60
        case 'yearly':
            return dataLength * 40
    }
}

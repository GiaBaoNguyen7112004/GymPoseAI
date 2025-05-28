import { ChartData } from 'react-native-chart-kit/dist/HelperTypes'
import { StatsTargetOfDay } from '../types/target.type'
import { pose_error, workoutHistoryOfDay } from '../types/workoutHistory.type'
import { Dimensions } from 'react-native'
import { ViewModeType } from '../types/utils.type'
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart'
import { pose_error_Data } from '@/screens/Other/WorkoutSummaryDetail/Components/PoseErrorChart/PoseErrorChart'

// Constants for days of the week
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export interface DataPoint {
    date: Date
    label: string
    progress: number
    totalCaloriesBurned: number
}

/**
 * Calculate progress chart data for activity tracking
 */
export function calculateActivityProgressChart(stats: StatsTargetOfDay[]): ChartData {
    const progressData = new Array(7).fill(0)
    const backgroundData = new Array(7).fill(100)

    // Handle empty array case - return default empty state
    if (!stats || stats.length === 0) {
        return {
            labels: WEEKDAYS,
            datasets: [
                {
                    data: progressData, // All zeros for empty state
                    colors: getProgressColorPalette()
                }
            ]
        }
    }

    stats.forEach(({ calories, water }) => {
        const dateStr = calories.date.replace(' ', 'T')
        const dayIndex = new Date(dateStr).getDay()

        const caloriesProgress = calories.calories_target
            ? (calories.calories_burned / calories.calories_target) * 100
            : 0

        const waterProgress = water.water_target ? (water.water_intake / water.water_target) * 100 : 0

        const averageProgress = (caloriesProgress + waterProgress) / 2
        progressData[dayIndex] = Math.round(Math.min(averageProgress, 100)) // Cap at 100%
        backgroundData[dayIndex] = 100 - progressData[dayIndex]
    })

    return {
        labels: WEEKDAYS,
        datasets: [
            {
                data: progressData,
                colors: getProgressColorPalette()
            }
        ]
    }
}

/**
 * Get consistent color palette for progress chart
 */
function getProgressColorPalette() {
    return [
        (opacity = 1) => '#D8B4FE',
        (opacity = 1) => '#A5B4FC',
        (opacity = 1) => '#D8B4FE',
        (opacity = 1) => '#A5B4FC',
        (opacity = 1) => '#D8B4FE',
        (opacity = 1) => '#A5B4FC',
        (opacity = 1) => '#D8B4FE'
    ]
}

// Alternative approach with more visual feedback for empty state
export function calculateActivityProgressChartWithEmptyState(stats: StatsTargetOfDay[]): ChartData {
    const progressData = new Array(7).fill(0)

    // For empty state, you might want to show a subtle background pattern
    if (!stats || stats.length === 0) {
        return {
            labels: WEEKDAYS,
            datasets: [
                {
                    data: new Array(7).fill(5), // Small value to show empty bars
                    colors: new Array(7).fill((opacity = 1) => '#F3F4F6') // Light gray for empty state
                }
            ]
        }
    }

    // ... rest of the logic remains the same
    stats.forEach(({ calories, water }) => {
        const dateStr = calories.date.replace(' ', 'T')
        const dayIndex = new Date(dateStr).getDay()

        const caloriesProgress = calories.calories_target
            ? (calories.calories_burned / calories.calories_target) * 100
            : 0

        const waterProgress = water.water_target ? (water.water_intake / water.water_target) * 100 : 0

        const averageProgress = (caloriesProgress + waterProgress) / 2
        progressData[dayIndex] = Math.round(Math.min(averageProgress, 100))
    })

    return {
        labels: WEEKDAYS,
        datasets: [
            {
                data: progressData,
                colors: getProgressColorPalette()
            }
        ]
    }
}

/** Get date range based on selected view mode */
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

/** Generate empty chart data based on view mode */
export const generateEmptyChartData = (viewMode: ViewModeType, start: Date): DataPoint[] => {
    if (viewMode === 'weekly') {
        return Array.from({ length: 7 }, (_, i) => {
            const date = new Date(start)
            date.setDate(start.getDate() + i)
            return createEmptyDataPoint(date)
        })
    }

    if (viewMode === 'monthly') {
        const daysInMonth = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate()
        return Array.from({ length: daysInMonth }, (_, i) => {
            const date = new Date(start.getFullYear(), start.getMonth(), i + 1)
            return createEmptyDataPoint(date)
        })
    }

    if (viewMode === 'yearly') {
        return Array.from({ length: 12 }, (_, i) => {
            const date = new Date(start.getFullYear(), i, 1)
            return createEmptyDataPoint(date)
        })
    }

    return []
}

const createEmptyDataPoint = (date: Date): DataPoint => ({
    date,
    label: date.toLocaleDateString('en-US', { weekday: 'short' }),
    progress: 0,
    totalCaloriesBurned: 0
})

export const calculateWorkoutHistoryChart = (
    workoutData: workoutHistoryOfDay[],
    viewMode: ViewModeType
): DataPoint[] => {
    const { start, end } = getChartDateRange(viewMode)
    const chartData = generateEmptyChartData(viewMode, start)
    workoutData.forEach(({ date, calories_burned, calories_base }) => {
        const d = new Date(date)
        if (d < start || d > end) return

        let index = 0
        if (viewMode === 'weekly') {
            index = Math.floor((d.getTime() - start.getTime()) / (1000 * 3600 * 24))
        } else if (viewMode === 'monthly') {
            index = d.getDate() - 1
        } else if (viewMode === 'yearly') {
            index = d.getMonth()
        }

        const point = chartData[index]
        if (!point) return

        point.totalCaloriesBurned += calories_burned
        const base = calories_base || 1
        point.progress = Math.min(100, (point.totalCaloriesBurned / base) * 100)
    })

    return chartData
}

/** Dynamically calculate chart width based on view mode and data length */
export const getChartWidth = (viewMode: ViewModeType, dataLength: number) => {
    const screenWidth = Dimensions.get('window').width - 32

    if (viewMode === 'weekly') return screenWidth
    if (viewMode === 'monthly') return dataLength * 60
    if (viewMode === 'yearly') return dataLength * 40

    return screenWidth
}

export const transformPoseErrors = (errors: pose_error[]): pose_error_Data[] => {
    const total = errors.length
    const errorMap = new Map()

    for (const item of errors) {
        const key = item.ai_result
        errorMap.set(key, (errorMap.get(key) || 0) + 1)
    }

    return Array.from(errorMap.entries()).map(([label, count]) => ({
        label,
        count: count.toString(),
        percent: parseFloat(((count / total) * 100).toFixed(2))
    }))
}

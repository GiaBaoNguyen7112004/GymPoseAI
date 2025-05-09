import { ChartData } from 'react-native-chart-kit/dist/HelperTypes'
import { StatsTargetOfDay } from '../types/target.type'
import { workoutHistory, workoutHistoryOfDay } from '../types/workoutHistory.type'
import { ProgressChartData } from 'react-native-chart-kit/dist/ProgressChart'
import { Dimensions } from 'react-native'
import { ViewModeType } from '../types/utils.type'

// Constants for days of the week
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export interface DataPoint {
    date: Date
    label: string
    progress: number
    totalCaloriesBurned: number
}

/** Calculate progress chart data for activity tracking */
export function calculateActivityProgressChart(stats: StatsTargetOfDay[]): ChartData {
    const progressData = new Array(7).fill(0)
    const backgroundData = new Array(7).fill(100)

    stats.forEach(({ calories, water }) => {
        const dayIndex = new Date(calories.date).getDay()

        const caloriesProgress = calories.calories_target
            ? (calories.calories_burned / calories.calories_target) * 100
            : 0

        const waterProgress = water.water_target ? (water.water_intake / water.water_target) * 100 : 0

        const averageProgress = (caloriesProgress + waterProgress) / 2
        progressData[dayIndex] = Math.round(averageProgress)
        backgroundData[dayIndex] = 100 - progressData[dayIndex]
    })

    // Màu cho phần đã hoàn thành (progress)
    const progressColorPalette = [
        (opacity = 1) => '#D8B4FE',
        (opacity = 1) => '#A5B4FC',
        (opacity = 1) => '#D8B4FE',
        (opacity = 1) => '#A5B4FC',
        (opacity = 1) => '#D8B4FE',
        (opacity = 1) => '#A5B4FC',
        (opacity = 1) => '#D8B4FE'
    ]

    // Màu nâu cho phần chưa hoàn thành (background)
    const backgroundColorPalette = new Array(7).fill((opacity = 1) => 'rgba(165, 120, 90, 0.6)')

    return {
        labels: WEEKDAYS,
        datasets: [
            {
                data: progressData,
                colors: progressColorPalette
            },
            {
                data: backgroundData,
                colors: backgroundColorPalette
            }
        ]
    }
}

/** Calculate workout summary progress chart */
export const calculateWorkoutSummaryChart = (workoutSummaryData?: workoutHistory): ProgressChartData => {
    const defaultSummary: workoutHistory = {
        calories_base: 1,
        calories_burned: 0,
        category: 'abdominal muscles',
        duration_minutes: 0,
        end_time: new Date().toISOString(),
        start_time: new Date().toISOString(),
        id: '',
        name_workout: '',
        reps_count: 1,
        errors_count: 0,
        pose_errors: []
    }

    const summary = workoutSummaryData || defaultSummary
    const workoutStartTime = new Date(summary.start_time).getTime()
    const workoutEndTime = new Date(summary.end_time).getTime()

    const workoutDuration = Math.max(1, Math.floor((workoutEndTime - workoutStartTime) / 60000))
    const exerciseProgress = summary.duration_minutes ? workoutDuration / summary.duration_minutes : 0
    const caloriesProgress = summary.calories_base ? summary.calories_burned / summary.calories_base : 0
    const formAccuracy = summary.reps_count ? 100 - (summary.errors_count / summary.reps_count) * 100 : 0

    return {
        labels: ['Exercise Progress', 'Calories Progress', 'Form Accuracy'],
        data: [exerciseProgress, caloriesProgress, formAccuracy],
        colors: ['#9DCEFF', '#FF8DA8', '#0284C7']
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

/** Convert workout data into chart data */
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

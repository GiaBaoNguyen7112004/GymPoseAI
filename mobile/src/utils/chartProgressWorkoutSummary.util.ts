import { ProgressChartData } from 'react-native-chart-kit/dist/ProgressChart'
import { workoutHistory } from '../types/workoutHistory.type'

export const calculateData = (workoutSummaryData?: workoutHistory, errors_count?: number) => {
    const summary: workoutHistory = workoutSummaryData || {
        calories_base: 1,
        calories_burned: 0,
        category: 'abdominal muscles',
        duration_minutes: 0,
        end_time: new Date().toISOString(),
        start_time: new Date().toISOString(),
        id: '',
        name_workout: '',
        reps_count: 1,
        errors_count: 0
    }
    errors_count = errors_count ? errors_count : 0
    const workoutStartTime = new Date(summary.start_time)
    const workoutEndTime = new Date(summary.end_time)

    const workoutDuration = Math.floor((workoutEndTime.getTime() - workoutStartTime.getTime()) / 60000)
    const exerciseProgress = workoutDuration / summary.duration_minutes
    const caloriesProgress = summary.calories_burned / summary.calories_base
    const formAccuracy = 100 - (errors_count / summary.reps_count) * 100

    const dataChart: ProgressChartData = {
        labels: ['exerciseProgress', 'caloriesProgress', 'formAccuracy'],
        data: [exerciseProgress, caloriesProgress, formAccuracy],
        colors: ['#FF927D', '#9DCEFF', '#FF8DA8']
    }
    return dataChart
}

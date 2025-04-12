import { ProgressChartData } from 'react-native-chart-kit/dist/ProgressChart'
import { workoutHistory } from '../types/workoutHistory.type'

export const calculateData = (workoutSummaryData?: workoutHistory): ProgressChartData => {
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
        errors_count: 0
    }

    const summary = workoutSummaryData || defaultSummary
    const workoutStartTime = new Date(summary.start_time).getTime()
    const workoutEndTime = new Date(summary.end_time).getTime()

    const workoutDuration = Math.max(1, Math.floor((workoutEndTime - workoutStartTime) / 60000))
    const exerciseProgress = summary.duration_minutes ? workoutDuration / summary.duration_minutes : 0
    const caloriesProgress = summary.calories_base ? summary.calories_burned / summary.calories_base : 0
    const formAccuracy = summary.reps_count ? 100 - (summary.errors_count / summary.reps_count) * 100 : 0

    return {
        labels: ['exerciseProgress', 'caloriesProgress', 'formAccuracy'],
        data: [exerciseProgress, caloriesProgress, formAccuracy],
        colors: ['#9DCEFF', '#FF8DA8', '#0284C7']
    }
}

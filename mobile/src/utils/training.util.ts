/**
 * Calculates the number of calories burned based on MET, body weight, and workout duration in minutes.
 * @param met - MET value of the exercise
 * @param weightKg - Body weight in kilograms
 * @param durationMinutes - Workout duration in minutes
 * @returns Calories burned (rounded to 2 decimal places)
 */

interface CalculateCaloriesBurnedParams {
    met: number
    weightKg: number
    durationSeconds: number
}
export const calculateCaloriesBurned = ({ durationSeconds, met, weightKg }: CalculateCaloriesBurnedParams): number => {
    durationSeconds = Math.max(durationSeconds, 0)
    const durationHours = durationSeconds / (60 * 60)
    const calories = met * weightKg * durationHours
    return parseFloat(calories.toFixed(2))
}

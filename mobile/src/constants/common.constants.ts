import { categories } from '../types/workoutHistory.type'
import { IconName } from './icon.constants'

export const COLOR_BRANDS: { [key: string]: [string, string, ...string[]] } = {
    primary: ['#92A3FD', '#9DCEFF'],
    secondary: ['#EEA4CE', '#C58BF2']
}
export const ICONS_CATEGORY_MAP: Map<categories, IconName> = new Map([
    ['abdominal muscles', 'AbWorkout'],
    ['lower body', 'loweBodyWorkout'],
    ['full body', 'FullBodyWorkout']
])

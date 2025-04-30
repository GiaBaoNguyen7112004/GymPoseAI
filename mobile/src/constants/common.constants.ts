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

export const DATA_GOAL = [
    {
        id: '1',
        title: 'Improve Shape',
        desc: 'I have a low amount of body fat and need / want to build more muscle',
        nameIcon: 'AbWorkout'
    },
    {
        id: '2',
        title: 'Lean & Tone',
        desc: 'I’m “skinny fat”. look thin but have no shape. I want to add learn muscle in the right way',
        nameIcon: 'loweBodyWorkout'
    },
    {
        id: '3',
        title: 'Lose a Fat',
        desc: 'I have over 20 lbs to lose. I want to drop all this fat and gain muscle mass',
        nameIcon: 'FullBodyWorkout'
    }
]

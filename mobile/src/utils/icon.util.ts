import { Ionicons } from '@expo/vector-icons'

const availableIconsFill: (keyof typeof Ionicons.glyphMap)[] = [
    'walk',
    'body',
    'barbell',
    'fitness',
    'bicycle',
    'accessibility',
    'flame',
    'pulse',
    'footsteps',
    'medkit'
] as const

export const getIconByIndex = (index: number): keyof typeof Ionicons.glyphMap => {
    const safeIndex = Math.abs(index) % availableIconsFill.length
    return availableIconsFill[safeIndex]
}

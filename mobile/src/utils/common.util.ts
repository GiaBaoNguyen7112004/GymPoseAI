import { Linking } from 'react-native'
import { COLOR_BRANDS } from '../constants/common.constants'
import { IconName } from '../constants/icon.constants'
import { NotificationType } from '../types/notification.type'
import { IntakeSlot } from '@/types/target.type'

export function getYouTubeVideoId(url: string) {
    const regex =
        /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|embed|shorts|watch)\?v=|watch\?.+&v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    const match = url.match(regex)
    return match ? match[1] : null
}

export function getAvatarWithIconNotify(type: NotificationType) {
    const isActivity = type === 'activity'
    const iconColor = isActivity ? COLOR_BRANDS.secondary : COLOR_BRANDS.primary
    const iconName: IconName = isActivity ? 'humanDrinking' : 'FullBodyWorkout'
    return {
        icon: iconName,
        colors: iconColor
    }
}

export const openLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err))
}

export function getCurrentIntakeSlot(intakes: IntakeSlot[]): IntakeSlot | null {
    const now = new Date()
    const nowMinutes = now.getHours() * 60 + now.getMinutes()

    for (const intake of intakes) {
        const [startHour, startMinute] = intake.start.split(':').map(Number)
        const [endHour, endMinute] = intake.end.split(':').map(Number)

        const startMinutes = startHour * 60 + startMinute
        const endMinutes = endHour * 60 + endMinute

        if (nowMinutes >= startMinutes && nowMinutes < endMinutes) {
            return intake
        }
    }

    return null
}

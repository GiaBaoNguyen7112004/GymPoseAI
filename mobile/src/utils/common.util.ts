import { COLOR_BRANDS } from '../constants/common.constants'
import { IconName } from '../constants/icon.constants'
import { NotificationType } from '../types/notification.type'

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

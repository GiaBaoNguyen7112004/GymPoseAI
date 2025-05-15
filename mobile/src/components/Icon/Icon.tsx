import { ICONS, IconName } from '@/constants/icon.constants'
import { memo } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

interface IconProps {
    name: IconName
    size?: number
    width?: number | string
    height?: number | string
    fill?: string
    stroke?: string
    style?: StyleProp<ViewStyle>
    [key: string]: any
}

const Icon: React.FC<IconProps> = ({ name, size = 24, width, height, fill, stroke, style, ...props }) => {
    const SelectedIcon = ICONS[name]

    return <SelectedIcon width={width ?? size} height={height ?? size} stroke={stroke} style={style} {...props} />
}

export default memo(Icon)

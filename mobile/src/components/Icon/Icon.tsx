import { IconName, ICONS } from '@/constants/icon.constants'
import { useMemo } from 'react'
import { StyleProp } from 'react-native'

interface IconProps {
    name: IconName
    size?: number
    width?: number | string
    height?: number | string
    fill?: string
    stroke?: string
    style?: StyleProp<any>
    [key: string]: any
}

const Icon: React.FC<IconProps> = ({ name, size = 24, width, height, fill, stroke, style, ...props }) => {
    const SelectedIcon = useMemo(() => ICONS[name], [name, ICONS])

    const fillColor = fill ? { fill } : {}
    const strokeColor = stroke ? { stroke: stroke } : {}

    return (
        <SelectedIcon
            width={width ? width : size}
            height={height ? height : size}
            {...fillColor}
            {...strokeColor}
            {...props}
            style={style}
        />
    )
}

export default Icon

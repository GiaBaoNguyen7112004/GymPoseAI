import { IconName, ICONS } from '@/src/constants/icon.constants'
import { useMemo } from 'react'

interface IconProps {
    name: IconName
    size?: number
    width?: number | string
    fill?: string
    stroke?: string
    [key: string]: any
}

const Icon: React.FC<IconProps> = ({ name, size = 24, width, fill, stroke, ...props }) => {
    const SelectedIcon = useMemo(() => ICONS[name], [name, ICONS])

    const fillColor = fill ? { fill } : {}
    const strokeColor = stroke ? { stroke: stroke } : {}

    return <SelectedIcon height={size} width={width ? width : size} {...fillColor} {...strokeColor} {...props} />
}

export default Icon

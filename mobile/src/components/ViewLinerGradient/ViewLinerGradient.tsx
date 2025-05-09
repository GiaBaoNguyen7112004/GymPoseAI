import { COLOR_BRANDS } from '@/constants/common.constants'
import { LinearGradient, LinearGradientPoint } from 'expo-linear-gradient'
import { memo } from 'react'

interface ViewLinerGradientProps {
    children?: React.ReactNode
    style?: object
    colors?: [string, string, ...string[]]
    start?: LinearGradientPoint
    end?: LinearGradientPoint
}

function ViewLinerGradient({
    children,
    colors = COLOR_BRANDS.primary,
    style,
    start = { x: 1, y: 0 },
    end = { x: 0, y: 0 }
}: ViewLinerGradientProps) {
    return (
        <LinearGradient colors={colors} start={start} end={end} style={style}>
            {children}
        </LinearGradient>
    )
}

export default memo(ViewLinerGradient)
